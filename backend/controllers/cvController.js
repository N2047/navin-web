const path = require('path');
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getCvInfo = async (req, res) => {
  try {
    const profile = await prisma.profile.findFirst({
      select: { cvUrl: true, cvFileName: true, cvDownloadCount: true }
    });
    res.json({
      success: true,
      cv: profile || { cvUrl: null, cvFileName: null, cvDownloadCount: 0 }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve CV info.', error: error.message });
  }
};

const downloadCv = async (req, res) => {
  try {
    const profile = await prisma.profile.findFirst();
    if (!profile || !profile.cvUrl) {
      return res.status(404).json({ success: false, message: 'CV file is not currently available.' });
    }

    // Increment download count
    await prisma.profile.update({
      where: { id: profile.id },
      data: { cvDownloadCount: { increment: 1 } }
    });

    const isLocal = profile.cvUrl.startsWith('/uploads/');
    if (isLocal) {
      const filePath = path.join(__dirname, '..', profile.cvUrl);
      if (fs.existsSync(filePath)) {
        return res.download(filePath, profile.cvFileName || 'Navin_Sharma_CV.pdf');
      }
    }

    // Fallback: return file url for redirect or download
    res.json({
      success: true,
      cvUrl: profile.cvUrl,
      fileName: profile.cvFileName || 'Navin_Sharma_CV.pdf'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to process CV download.', error: error.message });
  }
};

const uploadCv = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No CV PDF file was uploaded.' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    const fileName = req.file.originalname;

    let profile = await prisma.profile.findFirst();
    if (profile) {
      profile = await prisma.profile.update({
        where: { id: profile.id },
        data: {
          cvUrl: fileUrl,
          cvFileName: fileName
        }
      });
    }

    // Also register in Media library
    await prisma.media.create({
      data: {
        fileName: req.file.filename,
        originalName: fileName,
        mimeType: req.file.mimetype,
        size: req.file.size,
        url: fileUrl,
        path: req.file.path
      }
    });

    res.json({
      success: true,
      message: 'CV uploaded successfully.',
      cvUrl: fileUrl,
      cvFileName: fileName
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to upload CV.', error: error.message });
  }
};

module.exports = {
  getCvInfo,
  downloadCv,
  uploadCv
};
