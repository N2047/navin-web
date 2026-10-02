const express = require('express');
const router = express.Router();
const {
  getAlbums,
  getAlbum,
  getAllItems,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  createItem,
  updateItem,
  deleteItem
} = require('../controllers/galleryController');
const { authenticateAdmin } = require('../middleware/auth');

// Public routes
router.get('/albums', getAlbums);
router.get('/albums/:id', getAlbum);
router.get('/items', getAllItems);

// Album Admin routes
router.post('/albums', authenticateAdmin, createAlbum);
router.put('/albums/:id', authenticateAdmin, updateAlbum);
router.delete('/albums/:id', authenticateAdmin, deleteAlbum);

// Items Admin routes
router.post('/items', authenticateAdmin, createItem);
router.put('/items/:id', authenticateAdmin, updateItem);
router.delete('/items/:id', authenticateAdmin, deleteItem);

module.exports = router;
