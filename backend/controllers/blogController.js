const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const estimateReadingTime = (text = '') => {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
};

const getPosts = async (req, res) => {
  try {
    const { page = 1, limit = 9, search, category, tag, featured, all } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const where = {};

    // If not admin requesting all posts, only return published ones
    if (all !== 'true' || !req.admin) {
      where.isPublished = true;
    }

    if (category && category !== 'All') {
      where.category = category;
    }

    if (featured === 'true') {
      where.isFeatured = true;
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { excerpt: { contains: search } },
        { content: { contains: search } },
        { category: { contains: search } }
      ];
    }

    if (tag) {
      where.tags = { contains: tag };
    }

    const [total, posts] = await Promise.all([
      prisma.blogPost.count({ where }),
      prisma.blogPost.findMany({
        where,
        orderBy: [{ isFeatured: 'desc' }, { publishedAt: 'desc' }, { createdAt: 'desc' }],
        skip,
        take: limitNum
      })
    ]);

    const parsed = posts.map(p => ({
      ...p,
      tags: p.tags ? (typeof p.tags === 'string' ? JSON.parse(p.tags) : p.tags) : []
    }));

    // Also get list of all unique categories
    const allPosts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      select: { category: true }
    });
    const categories = Array.from(new Set(allPosts.map(p => p.category).filter(Boolean)));

    res.json({
      success: true,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      posts: parsed,
      categories
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve blog posts.', error: error.message });
  }
};

const getPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await prisma.blogPost.findFirst({
      where: {
        OR: [{ slug }, { id: slug }]
      }
    });

    if (!post) {
      return res.status(404).json({ success: false, message: 'Blog post not found.' });
    }

    // Increment views asynchronously
    await prisma.blogPost.update({
      where: { id: post.id },
      data: { viewsCount: { increment: 1 } }
    });

    // Related posts in same category
    const relatedPosts = await prisma.blogPost.findMany({
      where: {
        category: post.category,
        id: { not: post.id },
        isPublished: true
      },
      take: 3,
      select: { id: true, title: true, titleNe: true, slug: true, excerpt: true, featuredImage: true, readingTime: true, publishedAt: true }
    });

    res.json({
      success: true,
      post: {
        ...post,
        tags: post.tags ? JSON.parse(post.tags) : []
      },
      relatedPosts
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve post.', error: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const {
      title,
      titleNe,
      slug,
      excerpt,
      excerptNe,
      content,
      contentNe,
      featuredImage,
      category,
      tags,
      isFeatured,
      isPublished,
      author
    } = req.body;

    const baseSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const cleanSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
    const readingTime = estimateReadingTime(content);

    const post = await prisma.blogPost.create({
      data: {
        title,
        titleNe,
        slug: cleanSlug,
        excerpt: excerpt || '',
        excerptNe,
        content: content || '',
        contentNe,
        featuredImage: featuredImage || '',
        category: category || 'Technology',
        tags: Array.isArray(tags) ? JSON.stringify(tags) : (tags || '[]'),
        readingTime,
        isFeatured: Boolean(isFeatured),
        isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
        author: author || (req.admin ? req.admin.name : 'Navin Sharma')
      }
    });

    res.status(201).json({ success: true, message: 'Blog post created.', post });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create blog post.', error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };

    if (data.tags && Array.isArray(data.tags)) {
      data.tags = JSON.stringify(data.tags);
    }
    if (data.content) {
      data.readingTime = estimateReadingTime(data.content);
    }
    if (data.isFeatured !== undefined) {
      data.isFeatured = Boolean(data.isFeatured);
    }
    if (data.isPublished !== undefined) {
      data.isPublished = Boolean(data.isPublished);
    }

    const updated = await prisma.blogPost.update({
      where: { id },
      data
    });

    res.json({ success: true, message: 'Blog post updated.', post: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update post.', error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.blogPost.delete({ where: { id } });
    res.json({ success: true, message: 'Blog post deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete post.', error: error.message });
  }
};

module.exports = {
  getPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost
};
