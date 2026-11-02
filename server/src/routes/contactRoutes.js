import { Router } from 'express';
import { 
  submitContactMessage, 
  getContactMessages, 
  markMessageAsRead, 
  deleteContactMessage 
} from '../controllers/contactController.js';
import { requireAdmin } from '../middleware/authMiddleware.js';
import { contactLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/', contactLimiter, submitContactMessage);
router.get('/', requireAdmin, getContactMessages);
router.patch('/:id/read', requireAdmin, markMessageAsRead);
router.delete('/:id', requireAdmin, deleteContactMessage);

export default router;
