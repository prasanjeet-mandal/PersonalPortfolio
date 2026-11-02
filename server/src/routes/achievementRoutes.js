import { Router } from 'express';
import { getAchievements, createAchievement, updateAchievement, deleteAchievement } from '../controllers/achievementController.js';
import { requireAdmin } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getAchievements);
router.post('/', requireAdmin, createAchievement);
router.put('/:id', requireAdmin, updateAchievement);
router.delete('/:id', requireAdmin, deleteAchievement);

export default router;
