const express = require('express');
const router = express.Router();
const { getCvInfo, downloadCv, uploadCv } = require('../controllers/cvController');
const { authenticateAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.get('/info', getCvInfo);
router.get('/download', downloadCv);

// Admin route
router.post('/upload', authenticateAdmin, upload.single('cvFile'), uploadCv);

module.exports = router;
