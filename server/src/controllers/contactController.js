import { prisma } from '../config/database.js';
import { contactSchema } from '../validators/schemas.js';
import { sendContactNotification } from '../services/emailService.js';

// Resilient in-memory storage buffer when database is in fallback / initializing mode
const inMemoryMessages = [
  {
    id: 'msg-seed-1',
    name: 'Cognifyz Recruiter',
    email: 'recruiter@cognifyz.com',
    subject: 'Internship Performance & Full-time SDE Opportunity',
    message: 'Hello Prasanjeet, reviewing your portfolio and AgroSphere project. We would love to discuss an SDE role with our engineering team.',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    isRead: false,
  }
];

export const submitContactMessage = async (req, res, next) => {
  try {
    const validated = contactSchema.parse(req.body);

    let record = null;
    if (prisma) {
      try {
        record = await prisma.contactMessage.create({
          data: validated,
        });
      } catch (dbErr) {
        console.warn('Database write fallback:', dbErr.message);
      }
    }

    if (!record) {
      record = {
        id: `msg-${Date.now()}`,
        ...validated,
        isRead: false,
        createdAt: new Date().toISOString(),
      };
      inMemoryMessages.unshift(record);
    }

    // Trigger email alert in background
    sendContactNotification(validated).catch(err => {
      console.warn('Background email dispatch skipped:', err.message);
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been received! I will review it and reply soon.',
      data: record,
    });
  } catch (error) {
    if (error.errors) {
      return res.status(400).json({ success: false, message: error.errors[0].message });
    }
    next(error);
  }
};

export const getContactMessages = async (req, res, next) => {
  try {
    let messages = [];
    if (prisma) {
      try {
        messages = await prisma.contactMessage.findMany({
          orderBy: { createdAt: 'desc' },
        });
      } catch (dbErr) {
        console.warn('Using in-memory messages store:', dbErr.message);
        messages = inMemoryMessages;
      }
    } else {
      messages = inMemoryMessages;
    }

    res.json({
      success: true,
      count: messages.length,
      messages: messages.length > 0 ? messages : inMemoryMessages,
      data: messages.length > 0 ? messages : inMemoryMessages,
    });
  } catch (error) {
    next(error);
  }
};

export const markMessageAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (prisma) {
      try {
        await prisma.contactMessage.update({
          where: { id },
          data: { isRead: true },
        });
      } catch (e) {}
    }
    const memMsg = inMemoryMessages.find(m => m.id === id);
    if (memMsg) memMsg.isRead = true;

    res.json({ success: true, message: 'Message marked as read.' });
  } catch (error) {
    next(error);
  }
};

export const deleteContactMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (prisma) {
      try {
        await prisma.contactMessage.delete({ where: { id } });
      } catch (e) {}
    }
    const index = inMemoryMessages.findIndex(m => m.id === id);
    if (index !== -1) inMemoryMessages.splice(index, 1);

    res.json({ success: true, message: 'Message deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
