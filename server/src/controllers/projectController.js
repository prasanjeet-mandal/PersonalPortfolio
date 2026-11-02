import { prisma } from '../config/database.js';
import { projectSchema } from '../validators/schemas.js';

export const getProjects = async (req, res, next) => {
  try {
    if (!prisma) {
      return res.json({ success: true, count: 0, data: [] });
    }

    const projects = await prisma.project.findMany({
      orderBy: { orderIndex: 'asc' },
      include: {
        technologies: true,
        features: true,
      },
    });

    res.json({
      success: true,
      count: projects.length,
      data: projects.map(p => ({
        ...p,
        technologies: p.technologies.map(t => t.name),
        keyFeatures: p.features.map(f => f.feature),
      })),
    });
  } catch (error) {
    next(error);
  }
};

export const getProjectBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    if (!prisma) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    const project = await prisma.project.findUnique({
      where: { slug },
      include: {
        technologies: true,
        features: true,
      },
    });

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    res.json({
      success: true,
      data: {
        ...project,
        technologies: project.technologies.map(t => t.name),
        keyFeatures: project.features.map(f => f.feature),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const validated = projectSchema.parse(req.body);

    const coverImage = req.file ? `/uploads/projects/${req.file.filename}` : validated.coverImage;

    const project = await prisma.project.create({
      data: {
        slug: validated.slug,
        title: validated.title,
        category: validated.category,
        filterCategory: validated.filterCategory,
        tagline: validated.tagline,
        summary: validated.summary,
        featured: validated.featured,
        badge: validated.badge,
        architecture: validated.architecture,
        githubUrl: validated.githubUrl,
        liveUrl: validated.liveUrl,
        coverImage,
        statusNote: validated.statusNote,
        technologies: {
          create: validated.technologies.map(name => ({ name })),
        },
        features: {
          create: validated.features.map(feature => ({ feature })),
        },
      },
      include: {
        technologies: true,
        features: true,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully.',
      data: project,
    });
  } catch (error) {
    if (error.errors) {
      return res.status(400).json({ success: false, message: error.errors[0].message });
    }
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validated = projectSchema.partial().parse(req.body);

    const coverImage = req.file ? `/uploads/projects/${req.file.filename}` : validated.coverImage;

    // Delete existing relation items if array provided
    if (validated.technologies) {
      await prisma.projectTechnology.deleteMany({ where: { projectId: id } });
    }
    if (validated.features) {
      await prisma.projectFeature.deleteMany({ where: { projectId: id } });
    }

    const updated = await prisma.project.update({
      where: { id },
      data: {
        ...validated,
        coverImage: coverImage !== undefined ? coverImage : undefined,
        technologies: validated.technologies ? {
          create: validated.technologies.map(name => ({ name })),
        } : undefined,
        features: validated.features ? {
          create: validated.features.map(feature => ({ feature })),
        } : undefined,
      },
      include: {
        technologies: true,
        features: true,
      },
    });

    res.json({
      success: true,
      message: 'Project updated successfully.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.project.delete({ where: { id } });
    res.json({ success: true, message: 'Project deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
