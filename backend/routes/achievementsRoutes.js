const express = require('express');
const router = express.Router();
const {
  getAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement
} = require('../controllers/achievementsController');
const { authenticateAdmin } = require('../middleware/auth');

router.get('/', getAchievements);
router.post('/', authenticateAdmin, createAchievement);
router.put('/:id', authenticateAdmin, updateAchievement);
router.delete('/:id', authenticateAdmin, deleteAchievement);

module.exports = router;
