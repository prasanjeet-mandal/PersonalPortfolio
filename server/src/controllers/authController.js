import bcrypt from 'bcryptjs';
import { prisma } from '../config/database.js';
import { generateToken } from '../utils/jwtHelper.js';
import { loginSchema } from '../validators/schemas.js';

// Dummy hash for constant-time comparison against timing attacks
const DUMMY_HASH = '$2a$12$K1r6fUeS7l90W3z8nC6B2e0yM9.yV1b7K4.D5a6F7g8H9j0k1L2m3';

export const login = async (req, res, next) => {
  try {
    const validated = loginSchema.parse(req.body);
    const email = validated.email.toLowerCase().trim();
    const { password } = validated;

    let admin = null;
    if (prisma) {
      try {
        admin = await prisma.admin.findUnique({
          where: { email },
        });
      } catch (dbErr) {
        console.warn('Database connection unavailable for auth check:', dbErr.message);
      }
    }

    // 1. Account Lockout Check
    if (admin && admin.lockUntil && new Date(admin.lockUntil) > new Date()) {
      const remainingMinutes = Math.ceil((new Date(admin.lockUntil) - new Date()) / 60000);
      return res.status(423).json({
        success: false,
        message: `Account is temporarily locked due to multiple failed attempts. Please try again in ${remainingMinutes} minutes.`,
      });
    }

    // 2. Timing attack mitigation: If user not found, perform dummy comparison
    const passwordHashToCompare = admin ? admin.passwordHash : DUMMY_HASH;
    const isMatch = await bcrypt.compare(password, passwordHashToCompare);

    if (!admin || !isMatch) {
      if (admin && prisma) {
        try {
          // Increment failed attempts
          const newAttempts = (admin.failedAttempts || 0) + 1;
          const shouldLock = newAttempts >= 5;
          const lockUntil = shouldLock ? new Date(Date.now() + 30 * 60 * 1000) : null; // 30 min lockout

          await prisma.admin.update({
            where: { id: admin.id },
            data: {
              failedAttempts: newAttempts,
              lockUntil,
            },
          });

          if (shouldLock) {
            return res.status(423).json({
              success: false,
              message: 'Account locked for 30 minutes due to 5 consecutive failed login attempts.',
            });
          }
        } catch (err) {
          console.warn('Could not update failed attempts audit:', err.message);
        }
      }

      return res.status(401).json({
        success: false,
        message: 'Invalid credentials or unauthorized access.',
      });
    }

    // 3. Reset failed attempts & record login audit on success
    if (prisma) {
      try {
        await prisma.admin.update({
          where: { id: admin.id },
          data: {
            failedAttempts: 0,
            lockUntil: null,
            lastLoginAt: new Date(),
            lastLoginIp: req.ip || req.headers['x-forwarded-for'] || null,
          },
        });
      } catch (err) {
        console.warn('Could not update login audit:', err.message);
      }
    }

    // 4. Generate short-lived secure token with tokenVersion
    const token = generateToken({
      id: admin.id,
      email: admin.email,
      role: 'admin',
      tokenVersion: admin.tokenVersion || 1,
    });

    res.json({
      success: true,
      message: 'Secure Authentication Verified.',
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
      },
    });
  } catch (error) {
    if (error.errors) {
      return res.status(400).json({ success: false, message: error.errors[0].message });
    }
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    res.json({
      success: true,
      admin: {
        email: req.admin.email,
        name: req.admin.name || 'Prasanjeet Kumar Mandal',
        role: 'admin',
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Change Admin Password with Instant Session Revocation
 */
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const adminId = req.admin.id;

    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 8 characters long.',
      });
    }

    if (!prisma) {
      return res.status(503).json({ success: false, message: 'Database connection required to change password.' });
    }

    const admin = await prisma.admin.findUnique({ where: { id: adminId } });
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin account not found.' });
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Current password verification failed.' });
    }

    const newHash = await bcrypt.hash(newPassword, 12);

    // Increment tokenVersion to revoke all active tokens immediately
    await prisma.admin.update({
      where: { id: adminId },
      data: {
        passwordHash: newHash,
        tokenVersion: (admin.tokenVersion || 1) + 1,
      },
    });

    res.json({
      success: true,
      message: 'Password changed successfully. All other active sessions have been terminated.',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Logout & Revoke all active tokens
 */
export const logoutAll = async (req, res, next) => {
  try {
    if (prisma && req.admin.id) {
      await prisma.admin.update({
        where: { id: req.admin.id },
        data: {
          tokenVersion: { increment: 1 },
        },
      });
    }

    res.json({
      success: true,
      message: 'Logged out successfully from all devices.',
    });
  } catch (error) {
    next(error);
  }
};
