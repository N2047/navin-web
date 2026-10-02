const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getSkills = async (req, res) => {
  try {
    const categories = await prisma.skillCategory.findMany({
      orderBy: { order: 'asc' },
      include: {
        skills: {
          orderBy: { order: 'asc' }
        }
      }
    });
    res.json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve skills.', error: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, nameNe, slug, order } = req.body;
    const cleanSlug = slug ? slug.toLowerCase().replace(/[^a-z0-9_-]/g, '-') : name.toLowerCase().replace(/[^a-z0-9_-]/g, '-');
    const category = await prisma.skillCategory.create({
      data: {
        name,
        nameNe,
        slug: cleanSlug,
        order: Number(order) || 0
      }
    });
    res.status(201).json({ success: true, message: 'Skill category created.', category });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create skill category.', error: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, nameNe, slug, order } = req.body;
    const category = await prisma.skillCategory.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(nameNe !== undefined && { nameNe }),
        ...(slug && { slug }),
        ...(order !== undefined && { order: Number(order) })
      }
    });
    res.json({ success: true, message: 'Skill category updated.', category });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update category.', error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.skillCategory.delete({ where: { id } });
    res.json({ success: true, message: 'Skill category deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete category.', error: error.message });
  }
};

const createSkill = async (req, res) => {
  try {
    const { name, nameNe, categoryId, level, percentage, icon, order, isFeatured } = req.body;
    const skill = await prisma.skill.create({
      data: {
        name,
        nameNe,
        categoryId,
        level: level || 'Expert',
        percentage: Number(percentage) || 90,
        icon: icon || 'Code',
        order: Number(order) || 0,
        isFeatured: Boolean(isFeatured)
      }
    });
    res.status(201).json({ success: true, message: 'Skill created.', skill });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create skill.', error: error.message });
  }
};

const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, nameNe, categoryId, level, percentage, icon, order, isFeatured } = req.body;
    const skill = await prisma.skill.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(nameNe !== undefined && { nameNe }),
        ...(categoryId && { categoryId }),
        ...(level && { level }),
        ...(percentage !== undefined && { percentage: Number(percentage) }),
        ...(icon !== undefined && { icon }),
        ...(order !== undefined && { order: Number(order) }),
        ...(isFeatured !== undefined && { isFeatured: Boolean(isFeatured) })
      }
    });
    res.json({ success: true, message: 'Skill updated.', skill });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update skill.', error: error.message });
  }
};

const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.skill.delete({ where: { id } });
    res.json({ success: true, message: 'Skill deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete skill.', error: error.message });
  }
};

module.exports = {
  getSkills,
  createCategory,
  updateCategory,
  deleteCategory,
  createSkill,
  updateSkill,
  deleteSkill
};
