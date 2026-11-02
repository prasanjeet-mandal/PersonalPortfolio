import { Router } from 'express';
import authRoutes from './authRoutes.js';
import projectRoutes from './projectRoutes.js';
import skillRoutes from './skillRoutes.js';
import educationRoutes from './educationRoutes.js';
import achievementRoutes from './achievementRoutes.js';
import experienceRoutes from './experienceRoutes.js';
import contactRoutes from './contactRoutes.js';
import resumeRoutes from './resumeRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/skills', skillRoutes);
router.use('/education', educationRoutes);
router.use('/achievements', achievementRoutes);
router.use('/experiences', experienceRoutes);
router.use('/contact', contactRoutes);
router.use('/resume', resumeRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Prasanjeet Kumar Mandal Portfolio API',
    version: '1.0.0',
  });
});

export default router;
