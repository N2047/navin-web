const express = require('express');
const router = express.Router();
const {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience
} = require('../controllers/experienceController');
const { authenticateAdmin } = require('../middleware/auth');

router.get('/', getExperiences);
router.post('/', authenticateAdmin, createExperience);
router.put('/:id', authenticateAdmin, updateExperience);
router.delete('/:id', authenticateAdmin, deleteExperience);

module.exports = router;
