import { Router } from 'express';
import { 
  getProjects, 
  getProjectBySlug, 
  createProject, 
  updateProject, 
  deleteProject 
} from '../controllers/projectController.js';
import { requireAdmin } from '../middleware/authMiddleware.js';
import { uploadProjectImage } from '../middleware/uploadMiddleware.js';

const router = Router();

router.get('/', getProjects);
router.get('/:slug', getProjectBySlug);
router.post('/', requireAdmin, uploadProjectImage.single('coverImage'), createProject);
router.put('/:id', requireAdmin, uploadProjectImage.single('coverImage'), updateProject);
router.delete('/:id', requireAdmin, deleteProject);

export default router;
