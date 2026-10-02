const express = require('express');
const router = express.Router();
const { askAssistant } = require('../controllers/chatbotController');
const { chatbotLimiter } = require('../middleware/rateLimiter');

router.post('/ask', chatbotLimiter, askAssistant);

module.exports = router;
