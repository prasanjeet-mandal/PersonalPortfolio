import { prisma } from '../config/database.js';
import { achievementSchema } from '../validators/schemas.js';

export const getAchievements = async (req, res, next) => {
  try {
    if (!prisma) return res.json({ success: true, data: [] });
    const items = await prisma.achievement.findMany({ orderBy: { orderIndex: 'asc' } });
    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    next(error);
  }
};

export const createAchievement = async (req, res, next) => {
  try {
    const validated = achievementSchema.parse(req.body);
    const item = await prisma.achievement.create({ data: validated });
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

export const updateAchievement = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validated = achievementSchema.partial().parse(req.body);
    const item = await prisma.achievement.update({ where: { id }, data: validated });
    res.json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

export const deleteAchievement = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.achievement.delete({ where: { id } });
    res.json({ success: true, message: 'Achievement record deleted.' });
  } catch (error) {
    next(error);
  }
};
