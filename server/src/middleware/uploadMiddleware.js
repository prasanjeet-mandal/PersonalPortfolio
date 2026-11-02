import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure upload directories exist
const projectUploadDir = path.resolve('uploads/projects');
const resumeUploadDir = path.resolve('uploads/resume');

[projectUploadDir, resumeUploadDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Storage engine for project images
const projectStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, projectUploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `project-${uniqueSuffix}${ext}`);
  },
});

// Storage engine for resume files
const resumeStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, resumeUploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `Prasanjeet_Kumar_Mandal_Resume_${Date.now()}${ext}`);
  },
});

// File filter for images
const imageFileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|svg\+xml|svg/;
  const isMimeValid = allowedTypes.test(file.mimetype);
  const isExtValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (isMimeValid && isExtValid) {
    cb(null, true);
  } else {
    cb(new Error('Invalid image format. Only JPEG, PNG, WEBP, and SVG are allowed.'));
  }
};

// File filter for resume (PDF only)
const pdfFileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf' || path.extname(file.originalname).toLowerCase() === '.pdf') {
    cb(null, true);
  } else {
    cb(new Error('Invalid document format. Only PDF files are accepted for resume.'));
  }
};

export const uploadProjectImage = multer({
  storage: projectStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: imageFileFilter,
});

export const uploadResumePdf = multer({
  storage: resumeStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: pdfFileFilter,
});
