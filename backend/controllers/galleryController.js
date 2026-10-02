const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAlbums = async (req, res) => {
  try {
    const albums = await prisma.galleryAlbum.findMany({
      orderBy: { order: 'asc' },
      include: {
        _count: { select: { items: true } }
      }
    });
    res.json({ success: true, albums });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve albums.', error: error.message });
  }
};

const getAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const album = await prisma.galleryAlbum.findFirst({
      where: {
        OR: [{ id }, { slug: id }]
      },
      include: {
        items: {
          orderBy: { order: 'asc' }
        }
      }
    });

    if (!album) {
      return res.status(404).json({ success: false, message: 'Album not found.' });
    }

    res.json({ success: true, album });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve album.', error: error.message });
  }
};

const getAllItems = async (req, res) => {
  try {
    const { albumId, type } = req.query;
    const where = {};
    if (albumId && albumId !== 'all') where.albumId = albumId;
    if (type) where.type = type;

    const items = await prisma.galleryItem.findMany({
      where,
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      include: {
        album: {
          select: { id: true, title: true, titleNe: true, slug: true }
        }
      }
    });
    res.json({ success: true, count: items.length, items });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve gallery items.', error: error.message });
  }
};

const createAlbum = async (req, res) => {
  try {
    const { title, titleNe, slug, description, descriptionNe, coverImage, order } = req.body;
    const baseSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const cleanSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const album = await prisma.galleryAlbum.create({
      data: {
        title,
        titleNe,
        slug: cleanSlug,
        description,
        descriptionNe,
        coverImage,
        order: Number(order) || 0
      }
    });
    res.status(201).json({ success: true, message: 'Album created.', album });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create album.', error: error.message });
  }
};

const updateAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    if (data.order !== undefined) data.order = Number(data.order);

    const album = await prisma.galleryAlbum.update({
      where: { id },
      data
    });
    res.json({ success: true, message: 'Album updated.', album });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update album.', error: error.message });
  }
};

const deleteAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.galleryAlbum.delete({ where: { id } });
    res.json({ success: true, message: 'Album deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete album.', error: error.message });
  }
};

const createItem = async (req, res) => {
  try {
    const { albumId, title, titleNe, type, mediaUrl, thumbnailUrl, caption, captionNe, order } = req.body;
    const item = await prisma.galleryItem.create({
      data: {
        albumId: albumId || null,
        title,
        titleNe,
        type: type || 'photo',
        mediaUrl,
        thumbnailUrl: thumbnailUrl || mediaUrl,
        caption,
        captionNe,
        order: Number(order) || 0
      }
    });
    res.status(201).json({ success: true, message: 'Gallery item added.', item });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add item.', error: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    if (data.order !== undefined) data.order = Number(data.order);

    const item = await prisma.galleryItem.update({
      where: { id },
      data
    });
    res.json({ success: true, message: 'Gallery item updated.', item });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update item.', error: error.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.galleryItem.delete({ where: { id } });
    res.json({ success: true, message: 'Gallery item deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete item.', error: error.message });
  }
};

module.exports = {
  getAlbums,
  getAlbum,
  getAllItems,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  createItem,
  updateItem,
  deleteItem
};
