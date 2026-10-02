const express = require('express');
const router = express.Router();
const { getOverview, getVisitorStats } = require('../controllers/analyticsController');
const { authenticateAdmin } = require('../middleware/auth');

router.get('/overview', authenticateAdmin, getOverview);
router.get('/visitors', authenticateAdmin, getVisitorStats);

module.exports = router;
