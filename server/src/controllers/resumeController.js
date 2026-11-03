import path from 'path';
import fs from 'fs';
import { prisma } from '../config/database.js';

let inMemoryDownloadCount = 18;

export const getResumeStats = async (req, res, next) => {
  try {
    res.json({
      success: true,
      downloads: inMemoryDownloadCount,
      format: 'PDF (ATS-Friendly)',
      fileName: 'Prasanjeet_Kumar_Mandal_Resume.pdf',
    });
  } catch (error) {
    next(error);
  }
};

export const trackDownload = async (req, res, next) => {
  try {
    inMemoryDownloadCount += 1;
    res.json({
      success: true,
      downloads: inMemoryDownloadCount,
    });
  } catch (error) {
    next(error);
  }
};

export const getActiveResume = async (req, res, next) => {
  try {
    inMemoryDownloadCount += 1;

    if (prisma) {
      try {
        const active = await prisma.resume.findFirst({
          where: { isActive: true },
          orderBy: { uploadedAt: 'desc' },
        });

        if (active && fs.existsSync(active.filePath)) {
          return res.download(active.filePath, active.fileName);
        }
      } catch (e) {}
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
      try {
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
      } catch (e) {}
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
