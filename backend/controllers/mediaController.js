const path = require('path');
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const uploadMedia = async (req, res) => {
  try {
    if (!req.file && (!req.files || req.files.length === 0)) {
      return res.status(400).json({ success: false, message: 'No media file provided.' });
    }

    const files = req.files || [req.file];
    const createdMedia = [];

    for (const file of files) {
      const fileUrl = `/uploads/${file.filename}`;
      const media = await prisma.media.create({
        data: {
          fileName: file.filename,
          originalName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
          url: fileUrl,
          path: file.path
        }
      });
      createdMedia.push(media);
    }

    res.status(201).json({
      success: true,
      message: 'Media uploaded successfully.',
      media: createdMedia.length === 1 ? createdMedia[0] : createdMedia
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to upload media.', error: error.message });
  }
};

const getMedia = async (req, res) => {
  try {
    const { page = 1, limit = 24, search, type } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const where = {};
    if (search) {
      where.OR = [
        { fileName: { contains: search } },
        { originalName: { contains: search } }
      ];
    }
    if (type) {
      where.mimeType = { contains: type };
    }

    const [total, media] = await Promise.all([
      prisma.media.count({ where }),
      prisma.media.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum
      })
    ]);

    res.json({
      success: true,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      media
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve media library.', error: error.message });
  }
};

const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const media = await prisma.media.findUnique({ where: { id } });

    if (!media) {
      return res.status(404).json({ success: false, message: 'Media item not found.' });
    }

    // Try deleting physical file
    const filePath = path.join(__dirname, '..', 'uploads', media.fileName);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.error('Error removing file from disk:', err.message);
      }
    }

    await prisma.media.delete({ where: { id } });
    res.json({ success: true, message: 'Media item removed successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete media item.', error: error.message });
  }
};

module.exports = {
  uploadMedia,
  getMedia,
  deleteMedia
};
