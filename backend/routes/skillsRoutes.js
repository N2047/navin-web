const express = require('express');
const router = express.Router();
const {
  getSkills,
  createCategory,
  updateCategory,
  deleteCategory,
  createSkill,
  updateSkill,
  deleteSkill
} = require('../controllers/skillsController');
const { authenticateAdmin } = require('../middleware/auth');

// Public route
router.get('/', getSkills);

// Category Admin routes
router.post('/categories', authenticateAdmin, createCategory);
router.put('/categories/:id', authenticateAdmin, updateCategory);
router.delete('/categories/:id', authenticateAdmin, deleteCategory);

// Skill Admin routes
router.post('/', authenticateAdmin, createSkill);
router.put('/:id', authenticateAdmin, updateSkill);
router.delete('/:id', authenticateAdmin, deleteSkill);

module.exports = router;
