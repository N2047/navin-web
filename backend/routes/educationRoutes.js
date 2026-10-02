const express = require('express');
const router = express.Router();
const {
  getEducations,
  createEducation,
  updateEducation,
  deleteEducation
} = require('../controllers/educationController');
const { authenticateAdmin } = require('../middleware/auth');

router.get('/', getEducations);
router.post('/', authenticateAdmin, createEducation);
router.put('/:id', authenticateAdmin, updateEducation);
router.delete('/:id', authenticateAdmin, deleteEducation);

module.exports = router;
