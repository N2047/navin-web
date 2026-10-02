const express = require('express');
const router = express.Router();
const { login, me, updatePassword, updateProfile } = require('../controllers/authController');
const { authenticateAdmin } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');

router.post('/login', authLimiter, login);
router.get('/me', authenticateAdmin, me);
router.put('/password', authenticateAdmin, updatePassword);
router.put('/profile', authenticateAdmin, updateProfile);

module.exports = router;
