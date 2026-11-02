import { prisma } from '../config/database.js';
import { contactSchema } from '../validators/schemas.js';
import { sendContactNotification } from '../services/emailService.js';

export const submitContactMessage = async (req, res, next) => {
  try {
    const validated = contactSchema.parse(req.body);

    let record = null;
    if (prisma) {
      record = await prisma.contactMessage.create({
        data: validated,
      });
    }

    // Attempt email alert
    sendContactNotification(validated).catch(err => {
      console.warn('Background email dispatch failed:', err.message);
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been received! I will review it and reply soon.',
      data: record || { ...validated, id: 'temp-id', createdAt: new Date() },
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
    if (!prisma) return res.json({ success: true, count: 0, data: [] });
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    next(error);
  }
};

export const markMessageAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!prisma) return res.json({ success: true });
    await prisma.contactMessage.update({
      where: { id },
      data: { isRead: true },
    });
    res.json({ success: true, message: 'Message marked as read.' });
  } catch (error) {
    next(error);
  }
};

export const deleteContactMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!prisma) return res.json({ success: true });
    await prisma.contactMessage.delete({ where: { id } });
    res.json({ success: true, message: 'Message deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
