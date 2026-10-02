const express = require('express');
const router = express.Router();
const {
  sendMessage,
  getMessages,
  updateMessage,
  deleteMessage
} = require('../controllers/contactController');
const { authenticateAdmin } = require('../middleware/auth');
const { contactLimiter } = require('../middleware/rateLimiter');

// Public route for visitors to send messages
router.post('/', contactLimiter, sendMessage);

// Admin routes
router.get('/', authenticateAdmin, getMessages);
router.put('/:id', authenticateAdmin, updateMessage);
router.delete('/:id', authenticateAdmin, deleteMessage);

module.exports = router;
