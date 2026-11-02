import { Router } from 'express';
import { getSkills, createSkill, updateSkill, deleteSkill } from '../controllers/skillController.js';
import { requireAdmin } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getSkills);
router.post('/', requireAdmin, createSkill);
router.put('/:id', requireAdmin, updateSkill);
router.delete('/:id', requireAdmin, deleteSkill);

export default router;
