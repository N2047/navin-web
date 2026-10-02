const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  updateStats,
  getSocialLinks,
  saveSocialLink,
  deleteSocialLink
} = require('../controllers/profileController');
const { authenticateAdmin } = require('../middleware/auth');

// Public route
router.get('/', getProfile);
router.get('/social-links', getSocialLinks);

// Admin routes
router.put('/', authenticateAdmin, updateProfile);
router.put('/stats', authenticateAdmin, updateStats);
router.post('/social-links', authenticateAdmin, saveSocialLink);
router.delete('/social-links/:id', authenticateAdmin, deleteSocialLink);

module.exports = router;
