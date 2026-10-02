const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getEducations = async (req, res) => {
  try {
    const educations = await prisma.education.findMany({
      orderBy: [{ order: 'asc' }, { startYear: 'desc' }]
    });
    res.json({ success: true, educations });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve education history.', error: error.message });
  }
};

const createEducation = async (req, res) => {
  try {
    const data = { ...req.body };
    data.order = Number(data.order) || 0;
    const education = await prisma.education.create({ data });
    res.status(201).json({ success: true, message: 'Education added.', education });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add education.', error: error.message });
  }
};

const updateEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    if (data.order !== undefined) data.order = Number(data.order);

    const education = await prisma.education.update({
      where: { id },
      data
    });
    res.json({ success: true, message: 'Education updated.', education });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update education.', error: error.message });
  }
};

const deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.education.delete({ where: { id } });
    res.json({ success: true, message: 'Education deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete education.', error: error.message });
  }
};

module.exports = {
  getEducations,
  createEducation,
  updateEducation,
  deleteEducation
};
