import { prisma } from '../config/database.js';
import { educationSchema } from '../validators/schemas.js';

export const getEducation = async (req, res, next) => {
  try {
    if (!prisma) {
      return res.json({ success: true, data: [] });
    }
    const education = await prisma.education.findMany({
      orderBy: { orderIndex: 'asc' },
    });
    res.json({ success: true, count: education.length, data: education });
  } catch (error) {
    next(error);
  }
};

export const createEducation = async (req, res, next) => {
  try {
    const validated = educationSchema.parse(req.body);
    const item = await prisma.education.create({ data: validated });
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

export const updateEducation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validated = educationSchema.partial().parse(req.body);
    const item = await prisma.education.update({ where: { id }, data: validated });
    res.json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

export const deleteEducation = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.education.delete({ where: { id } });
    res.json({ success: true, message: 'Education record deleted.' });
  } catch (error) {
    next(error);
  }
};
