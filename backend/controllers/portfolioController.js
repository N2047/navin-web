const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getProjects = async (req, res) => {
  try {
    const { category, featured, search } = req.query;
    const where = {};

    if (category && category !== 'All') {
      where.category = category;
    }
    if (featured === 'true') {
      where.isFeatured = true;
    }
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { shortDesc: { contains: search } },
        { description: { contains: search } },
        { technologies: { contains: search } }
      ];
    }

    const projects = await prisma.portfolio.findMany({
      where,
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }]
    });

    const parsed = projects.map(p => ({
      ...p,
      technologies: p.technologies ? (typeof p.technologies === 'string' ? JSON.parse(p.technologies) : p.technologies) : [],
      galleryImages: p.galleryImages ? (typeof p.galleryImages === 'string' ? JSON.parse(p.galleryImages) : p.galleryImages) : []
    }));

    res.json({ success: true, count: parsed.length, projects: parsed });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve projects.', error: error.message });
  }
};

const getProjectBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const project = await prisma.portfolio.findFirst({
      where: {
        OR: [{ slug }, { id: slug }]
      }
    });

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    // Increment views
    await prisma.portfolio.update({
      where: { id: project.id },
      data: { viewsCount: { increment: 1 } }
    });

    res.json({
      success: true,
      project: {
        ...project,
        technologies: project.technologies ? JSON.parse(project.technologies) : [],
        galleryImages: project.galleryImages ? JSON.parse(project.galleryImages) : []
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve project.', error: error.message });
  }
};

const createProject = async (req, res) => {
  try {
    const {
      title,
      titleNe,
      slug,
      category,
      shortDesc,
      shortDescNe,
      description,
      descriptionNe,
      thumbnail,
      galleryImages,
      technologies,
      projectUrl,
      githubUrl,
      videoUrl,
      client,
      completionDate,
      isFeatured,
      order
    } = req.body;

    const baseSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const cleanSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const project = await prisma.portfolio.create({
      data: {
        title,
        titleNe,
        slug: cleanSlug,
        category: category || 'Web Development',
        shortDesc: shortDesc || '',
        shortDescNe,
        description: description || '',
        descriptionNe,
        thumbnail: thumbnail || '',
        galleryImages: Array.isArray(galleryImages) ? JSON.stringify(galleryImages) : (galleryImages || '[]'),
        technologies: Array.isArray(technologies) ? JSON.stringify(technologies) : (technologies || '[]'),
        projectUrl,
        githubUrl,
        videoUrl,
        client,
        completionDate,
        isFeatured: Boolean(isFeatured),
        order: Number(order) || 0
      }
    });

    res.status(201).json({ success: true, message: 'Project created successfully.', project });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create project.', error: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };

    if (data.technologies && Array.isArray(data.technologies)) {
      data.technologies = JSON.stringify(data.technologies);
    }
    if (data.galleryImages && Array.isArray(data.galleryImages)) {
      data.galleryImages = JSON.stringify(data.galleryImages);
    }
    if (data.order !== undefined) {
      data.order = Number(data.order);
    }
    if (data.isFeatured !== undefined) {
      data.isFeatured = Boolean(data.isFeatured);
    }

    const updated = await prisma.portfolio.update({
      where: { id },
      data
    });

    res.json({ success: true, message: 'Project updated.', project: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update project.', error: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.portfolio.delete({ where: { id } });
    res.json({ success: true, message: 'Project deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete project.', error: error.message });
  }
};

module.exports = {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject
};
