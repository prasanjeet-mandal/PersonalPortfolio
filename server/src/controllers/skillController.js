import { prisma } from '../config/database.js';
import { skillSchema } from '../validators/schemas.js';

export const getSkills = async (req, res, next) => {
  try {
    if (!prisma) {
      return res.json({ success: true, data: [] });
    }

    const skills = await prisma.skill.findMany({
      orderBy: [{ category: 'asc' }, { orderIndex: 'asc' }],
    });

    // Group skills by category for frontend convenience
    const grouped = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {});

    const formatted = Object.keys(grouped).map(category => ({
      category,
      skills: grouped[category],
    }));

    res.json({ success: true, count: skills.length, data: formatted });
  } catch (error) {
    next(error);
  }
};

export const createSkill = async (req, res, next) => {
  try {
    const validated = skillSchema.parse(req.body);
    const skill = await prisma.skill.create({ data: validated });
    res.status(201).json({ success: true, data: skill });
  } catch (error) {
    next(error);
  }
};

export const updateSkill = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validated = skillSchema.partial().parse(req.body);
    const skill = await prisma.skill.update({ where: { id }, data: validated });
    res.json({ success: true, data: skill });
  } catch (error) {
    next(error);
  }
};

export const deleteSkill = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.skill.delete({ where: { id } });
    res.json({ success: true, message: 'Skill deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
