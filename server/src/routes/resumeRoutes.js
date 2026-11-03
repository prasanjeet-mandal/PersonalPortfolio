import { Router } from 'express';
import { 
  getActiveResume, 
  uploadResume, 
  getResumeStats, 
  trackDownload 
} from '../controllers/resumeController.js';
import { requireAdmin } from '../middleware/authMiddleware.js';
import { uploadResumePdf } from '../middleware/uploadMiddleware.js';

const router = Router();

router.get('/stats', getResumeStats);
router.post('/track-download', trackDownload);
router.get('/download', getActiveResume);
router.post('/upload', requireAdmin, uploadResumePdf.single('resume'), uploadResume);

export default router;
