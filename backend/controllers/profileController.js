const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getProfile = async (req, res) => {
  try {
    let profile = await prisma.profile.findFirst();
    if (!profile) {
      // Create a default placeholder if none exists
      profile = await prisma.profile.create({
        data: {
          fullName: 'Navin Sharma',
          fullNameNe: 'नवीन शर्मा',
          professionalTitle: 'Lead Software Architect',
          professionalTitleNe: 'प्रमुख सफ्टवेयर आर्किटेक्ट',
          tagline: 'Engineering resilient digital architectures & ethical AI solutions.',
          taglineNe: 'दिगो डिजिटल आर्किटेक्चर र नैतिक एआई समाधान निर्माण।',
          shortBio: 'Lead Software Architect and accessibility advocate.',
          shortBioNe: 'सफ्टवेयर आर्किटेक्ट तथा पहुँचयोग्यता अभियन्ता।',
          detailedBio: 'Detailed bio goes here.',
          email: 'contact@navinsharma.com.np'
        }
      });
    }

    const socialLinks = await prisma.socialLink.findMany({
      where: req.admin ? {} : { isVisible: true },
      orderBy: { order: 'asc' }
    });

    res.json({
      success: true,
      profile,
      socialLinks
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve profile.', error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    let profile = await prisma.profile.findFirst();
    if (!profile) {
      profile = await prisma.profile.create({ data: req.body });
    } else {
      profile = await prisma.profile.update({
        where: { id: profile.id },
        data: req.body
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully.',
      profile
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update profile.', error: error.message });
  }
};

const updateStats = async (req, res) => {
  try {
    const { projectsCompleted, yearsExperience, trainingsCount, achievementsCount } = req.body;
    const profile = await prisma.profile.findFirst();
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found.' });
    }

    const updated = await prisma.profile.update({
      where: { id: profile.id },
      data: {
        projectsCompleted: Number(projectsCompleted) || 0,
        yearsExperience: Number(yearsExperience) || 0,
        trainingsCount: Number(trainingsCount) || 0,
        achievementsCount: Number(achievementsCount) || 0
      }
    });

    res.json({ success: true, message: 'Statistics updated.', profile: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update statistics.', error: error.message });
  }
};

const getSocialLinks = async (req, res) => {
  try {
    const links = await prisma.socialLink.findMany({
      orderBy: { order: 'asc' }
    });
    res.json({ success: true, socialLinks: links });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to load social links.', error: error.message });
  }
};

const saveSocialLink = async (req, res) => {
  try {
    const { id, platform, url, icon, order, isVisible } = req.body;
    let link;
    if (id) {
      link = await prisma.socialLink.update({
        where: { id },
        data: {
          platform,
          url,
          icon,
          order: Number(order) || 0,
          isVisible: isVisible !== undefined ? Boolean(isVisible) : true
        }
      });
    } else {
      link = await prisma.socialLink.create({
        data: {
          platform,
          url,
          icon,
          order: Number(order) || 0,
          isVisible: isVisible !== undefined ? Boolean(isVisible) : true
        }
      });
    }
    res.json({ success: true, message: 'Social link saved.', link });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to save social link.', error: error.message });
  }
};

const deleteSocialLink = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.socialLink.delete({ where: { id } });
    res.json({ success: true, message: 'Social link deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete social link.', error: error.message });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  updateStats,
  getSocialLinks,
  saveSocialLink,
  deleteSocialLink
};
