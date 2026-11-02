import path from 'path';
import fs from 'fs';
import { prisma } from '../config/database.js';

export const getActiveResume = async (req, res, next) => {
  try {
    if (prisma) {
      const active = await prisma.resume.findFirst({
        where: { isActive: true },
        orderBy: { uploadedAt: 'desc' },
      });

      if (active && fs.existsSync(active.filePath)) {
        return res.download(active.filePath, active.fileName);
      }
    }

    // Default fallback to client public PDF
    const defaultPath = path.resolve('../client/public/resume/Prasanjeet_Kumar_Mandal_Resume.pdf');
    if (fs.existsSync(defaultPath)) {
      return res.download(defaultPath, 'Prasanjeet_Kumar_Mandal_Resume.pdf');
    }

    res.status(404).json({ success: false, message: 'Resume document not found.' });
  } catch (error) {
    next(error);
  }
};

export const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No PDF file uploaded.' });
    }

    const { filename, path: filePath, size } = req.file;

    if (prisma) {
      // Deactivate previous active resumes
      await prisma.resume.updateMany({
        where: { isActive: true },
        data: { isActive: false },
      });

      const resume = await prisma.resume.create({
        data: {
          fileName: filename,
          filePath,
          fileSize: size,
          isActive: true,
        },
      });

      return res.status(201).json({
        success: true,
        message: 'Resume PDF uploaded and set as active.',
        data: resume,
      });
    }

    res.status(201).json({
      success: true,
      message: 'Resume file saved to disk.',
      file: filename,
    });
  } catch (error) {
    next(error);
  }
};
