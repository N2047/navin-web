const express = require('express');
const router = express.Router();
const { uploadMedia, getMedia, deleteMedia } = require('../controllers/mediaController');
const { authenticateAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/upload', authenticateAdmin, upload.array('files', 10), uploadMedia);
router.get('/', authenticateAdmin, getMedia);
router.delete('/:id', authenticateAdmin, deleteMedia);

module.exports = router;
