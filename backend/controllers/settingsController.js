const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getPublicSettings = async (req, res) => {
  try {
    const settings = await prisma.siteSetting.findMany();
    const settingsMap = {};
    settings.forEach(s => {
      // Exclude secret keys from public view
      if (!s.key.toLowerCase().includes('secret') && !s.key.toLowerCase().includes('key')) {
        settingsMap[s.key] = s.value;
      }
    });

    res.json({ success: true, settings: settingsMap });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve site settings.', error: error.message });
  }
};

const getAllSettings = async (req, res) => {
  try {
    const settings = await prisma.siteSetting.findMany({
      orderBy: { key: 'asc' }
    });
    res.json({ success: true, settings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve all settings.', error: error.message });
  }
};

const updateSettings = async (req, res) => {
  try {
    const { settings } = req.body; // Can be an array of { key, value, type } or key-value object

    if (Array.isArray(settings)) {
      for (const item of settings) {
        await prisma.siteSetting.upsert({
          where: { key: item.key },
          update: { value: String(item.value), ...(item.type && { type: item.type }) },
          create: { key: item.key, value: String(item.value), type: item.type || 'text' }
        });
      }
    } else if (typeof settings === 'object' && settings !== null) {
      for (const [key, val] of Object.entries(settings)) {
        await prisma.siteSetting.upsert({
          where: { key },
          update: { value: String(val) },
          create: { key, value: String(val), type: 'text' }
        });
      }
    }

    const updated = await prisma.siteSetting.findMany({ orderBy: { key: 'asc' } });
    res.json({ success: true, message: 'Settings saved successfully.', settings: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to save settings.', error: error.message });
  }
};

module.exports = {
  getPublicSettings,
  getAllSettings,
  updateSettings
};
