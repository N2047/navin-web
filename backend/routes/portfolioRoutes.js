const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/portfolioController');
const { authenticateAdmin } = require('../middleware/auth');

// Public routes
router.get('/', getProjects);
router.get('/:slug', getProjectBySlug);

// Admin routes
router.post('/', authenticateAdmin, createProject);
router.put('/:id', authenticateAdmin, updateProject);
router.delete('/:id', authenticateAdmin, deleteProject);

module.exports = router;
