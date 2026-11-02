import { Router } from 'express';
import { getExperiences, createExperience, updateExperience, deleteExperience } from '../controllers/experienceController.js';
import { requireAdmin } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getExperiences);
router.post('/', requireAdmin, createExperience);
router.put('/:id', requireAdmin, updateExperience);
router.delete('/:id', requireAdmin, deleteExperience);

export default router;
