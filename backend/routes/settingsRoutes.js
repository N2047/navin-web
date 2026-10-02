const express = require('express');
const router = express.Router();
const { getPublicSettings, getAllSettings, updateSettings } = require('../controllers/settingsController');
const { authenticateAdmin } = require('../middleware/auth');

router.get('/public', getPublicSettings);
router.get('/', authenticateAdmin, getAllSettings);
router.put('/', authenticateAdmin, updateSettings);

module.exports = router;
