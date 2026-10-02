const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getExperiences = async (req, res) => {
  try {
    const list = await prisma.experience.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }]
    });

    const parsed = list.map(item => ({
      ...item,
      responsibilities: item.responsibilities ? (typeof item.responsibilities === 'string' ? JSON.parse(item.responsibilities) : item.responsibilities) : [],
      responsibilitiesNe: item.responsibilitiesNe ? (typeof item.responsibilitiesNe === 'string' ? JSON.parse(item.responsibilitiesNe) : item.responsibilitiesNe) : [],
      achievements: item.achievements ? (typeof item.achievements === 'string' ? JSON.parse(item.achievements) : item.achievements) : [],
      achievementsNe: item.achievementsNe ? (typeof item.achievementsNe === 'string' ? JSON.parse(item.achievementsNe) : item.achievementsNe) : []
    }));

    res.json({ success: true, count: parsed.length, experiences: parsed });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve experience.', error: error.message });
  }
};

const createExperience = async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.responsibilities && Array.isArray(data.responsibilities)) {
      data.responsibilities = JSON.stringify(data.responsibilities);
    }
    if (data.responsibilitiesNe && Array.isArray(data.responsibilitiesNe)) {
      data.responsibilitiesNe = JSON.stringify(data.responsibilitiesNe);
    }
    if (data.achievements && Array.isArray(data.achievements)) {
      data.achievements = JSON.stringify(data.achievements);
    }
    if (data.achievementsNe && Array.isArray(data.achievementsNe)) {
      data.achievementsNe = JSON.stringify(data.achievementsNe);
    }
    data.order = Number(data.order) || 0;
    data.isCurrent = Boolean(data.isCurrent);

    const experience = await prisma.experience.create({ data });
    res.status(201).json({ success: true, message: 'Experience added.', experience });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add experience.', error: error.message });
  }
};

const updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    if (data.responsibilities && Array.isArray(data.responsibilities)) {
      data.responsibilities = JSON.stringify(data.responsibilities);
    }
    if (data.responsibilitiesNe && Array.isArray(data.responsibilitiesNe)) {
      data.responsibilitiesNe = JSON.stringify(data.responsibilitiesNe);
    }
    if (data.achievements && Array.isArray(data.achievements)) {
      data.achievements = JSON.stringify(data.achievements);
    }
    if (data.achievementsNe && Array.isArray(data.achievementsNe)) {
      data.achievementsNe = JSON.stringify(data.achievementsNe);
    }
    if (data.order !== undefined) data.order = Number(data.order);
    if (data.isCurrent !== undefined) data.isCurrent = Boolean(data.isCurrent);

    const updated = await prisma.experience.update({
      where: { id },
      data
    });
    res.json({ success: true, message: 'Experience updated.', experience: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update experience.', error: error.message });
  }
};

const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.experience.delete({ where: { id } });
    res.json({ success: true, message: 'Experience deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete experience.', error: error.message });
  }
};

module.exports = {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience
};
