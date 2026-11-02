import { prisma } from '../config/database.js';
import { experienceSchema } from '../validators/schemas.js';

export const getExperiences = async (req, res, next) => {
  try {
    if (!prisma) return res.json({ success: true, data: [] });
    const items = await prisma.experience.findMany({ orderBy: { orderIndex: 'asc' } });
    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    next(error);
  }
};

export const createExperience = async (req, res, next) => {
  try {
    const validated = experienceSchema.parse(req.body);
    const item = await prisma.experience.create({ data: validated });
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

export const updateExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validated = experienceSchema.partial().parse(req.body);
    const item = await prisma.experience.update({ where: { id }, data: validated });
    res.json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

export const deleteExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.experience.delete({ where: { id } });
    res.json({ success: true, message: 'Experience record deleted.' });
  } catch (error) {
    next(error);
  }
};
