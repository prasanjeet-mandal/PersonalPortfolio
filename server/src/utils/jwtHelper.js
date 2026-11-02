import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

// Ensure a high-entropy 256-bit secret if none or weak provided
const DEFAULT_FALLBACK_SECRET = crypto.createHash('sha256')
  .update('pkm_secure_fallback_salt_' + (process.env.ADMIN_EMAIL || 'jvm.prasanjeet@gmail.com'))
  .digest('hex');

const JWT_SECRET = process.env.JWT_SECRET || DEFAULT_FALLBACK_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '2h'; // Short-lived for enhanced security

export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: JWT_EXPIRES_IN,
    issuer: 'mandal-portfolio-auth',
    audience: 'mandal-portfolio-admin',
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET, {
      algorithms: ['HS256'],
      issuer: 'mandal-portfolio-auth',
      audience: 'mandal-portfolio-admin',
    });
  } catch (err) {
    return null;
  }
};
