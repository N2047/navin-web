const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/blogController');
const { authenticateAdmin } = require('../middleware/auth');

// Note: optional admin check for getPosts so admin can fetch unpublished drafts
const optionalAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const jwt = require('jsonwebtoken');
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      req.admin = decoded;
    } catch (e) {}
  }
  next();
};

router.get('/', optionalAdmin, getPosts);
router.get('/:slug', getPostBySlug);
router.post('/', authenticateAdmin, createPost);
router.put('/:id', authenticateAdmin, updatePost);
router.delete('/:id', authenticateAdmin, deletePost);

module.exports = router;
