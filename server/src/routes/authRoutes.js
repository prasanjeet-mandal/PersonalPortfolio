import { Router } from 'express';
import { login, getMe, changePassword, logoutAll } from '../controllers/authController.js';
import { requireAdmin } from '../middleware/authMiddleware.js';
import { loginLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Public login (protected by strict rate limiting & account lockout)
router.post('/login', loginLimiter, login);

// Protected Admin Session Routes
router.get('/me', requireAdmin, getMe);
router.post('/change-password', requireAdmin, changePassword);
router.post('/logout-all', requireAdmin, logoutAll);

export default router;
