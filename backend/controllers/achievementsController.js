const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAchievements = async (req, res) => {
  try {
    const { featured } = req.query;
    const where = {};
    if (featured === 'true') where.isFeatured = true;

    const achievements = await prisma.achievement.findMany({
      where,
      orderBy: [{ order: 'asc' }, { date: 'desc' }]
    });
    res.json({ success: true, achievements });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve achievements.', error: error.message });
  }
};

const createAchievement = async (req, res) => {
  try {
    const data = { ...req.body };
    data.order = Number(data.order) || 0;
    data.isFeatured = Boolean(data.isFeatured);

    const achievement = await prisma.achievement.create({ data });
    res.status(201).json({ success: true, message: 'Achievement created.', achievement });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create achievement.', error: error.message });
  }
};

const updateAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    if (data.order !== undefined) data.order = Number(data.order);
    if (data.isFeatured !== undefined) data.isFeatured = Boolean(data.isFeatured);

    const updated = await prisma.achievement.update({
      where: { id },
      data
    });
    res.json({ success: true, message: 'Achievement updated.', achievement: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update achievement.', error: error.message });
  }
};

const deleteAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.achievement.delete({ where: { id } });
    res.json({ success: true, message: 'Achievement deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete achievement.', error: error.message });
  }
};

module.exports = {
  getAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement
};
