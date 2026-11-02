import { verifyToken } from '../utils/jwtHelper.js';
import { prisma } from '../config/database.js';

export const requireAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Valid Bearer authorization header required.',
      });
    }

    const token = authHeader.split(' ')[1];
    if (!token || token.length < 20) {
      return res.status(401).json({
        success: false,
        message: 'Malformed or missing authorization token.',
      });
    }

    const decoded = verifyToken(token);

    if (!decoded || decoded.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired session token. Please re-authenticate.',
      });
    }

    // Verify against DB if online
    if (prisma && decoded.id) {
      const admin = await prisma.admin.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          email: true,
          name: true,
          tokenVersion: true,
          lockUntil: true,
        },
      });

      if (!admin) {
        return res.status(401).json({
          success: false,
          message: 'Admin account not found or access revoked.',
        });
      }

      // Check if account is temporarily locked
      if (admin.lockUntil && new Date(admin.lockUntil) > new Date()) {
        const remainingMinutes = Math.ceil((new Date(admin.lockUntil) - new Date()) / 60000);
        return res.status(423).json({
          success: false,
          message: `Account is temporarily locked. Try again in ${remainingMinutes} minutes.`,
        });
      }

      // Check token version (Token Revocation defense)
      if (decoded.tokenVersion && decoded.tokenVersion !== admin.tokenVersion) {
        return res.status(401).json({
          success: false,
          message: 'Session has been revoked. Please log in again.',
        });
      }

      req.admin = admin;
    } else {
      req.admin = decoded;
    }

    next();
  } catch (error) {
    console.error('Auth verification error:', error);
    return res.status(500).json({ success: false, message: 'Authentication verification failure.' });
  }
};
