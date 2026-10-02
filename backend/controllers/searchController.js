const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const globalSearch = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim().length < 2) {
      return res.json({
        success: true,
        query: q || '',
        totalResults: 0,
        results: {
          blog: [],
          portfolio: [],
          experience: [],
          education: [],
          achievements: []
        }
      });
    }

    const query = q.trim();

    const [blogs, portfolios, experiences, educations, achievements] = await Promise.all([
      // Blog search
      prisma.blogPost.findMany({
        where: {
          isPublished: true,
          OR: [
            { title: { contains: query } },
            { titleNe: { contains: query } },
            { excerpt: { contains: query } },
            { content: { contains: query } },
            { category: { contains: query } }
          ]
        },
        take: 6,
        select: { id: true, title: true, titleNe: true, slug: true, excerpt: true, category: true, publishedAt: true }
      }),
      // Portfolio search
      prisma.portfolio.findMany({
        where: {
          OR: [
            { title: { contains: query } },
            { titleNe: { contains: query } },
            { shortDesc: { contains: query } },
            { description: { contains: query } },
            { category: { contains: query } },
            { technologies: { contains: query } }
          ]
        },
        take: 6,
        select: { id: true, title: true, titleNe: true, slug: true, shortDesc: true, category: true, thumbnail: true }
      }),
      // Experience search
      prisma.experience.findMany({
        where: {
          OR: [
            { organization: { contains: query } },
            { organizationNe: { contains: query } },
            { position: { contains: query } },
            { positionNe: { contains: query } },
            { responsibilities: { contains: query } }
          ]
        },
        take: 4,
        select: { id: true, organization: true, organizationNe: true, position: true, positionNe: true, startDate: true, endDate: true }
      }),
      // Education search
      prisma.education.findMany({
        where: {
          OR: [
            { institution: { contains: query } },
            { degree: { contains: query } },
            { fieldOfStudy: { contains: query } }
          ]
        },
        take: 4,
        select: { id: true, institution: true, degree: true, fieldOfStudy: true, startYear: true, endYear: true }
      }),
      // Achievements search
      prisma.achievement.findMany({
        where: {
          OR: [
            { title: { contains: query } },
            { titleNe: { contains: query } },
            { organization: { contains: query } },
            { description: { contains: query } }
          ]
        },
        take: 4,
        select: { id: true, title: true, titleNe: true, organization: true, date: true, description: true }
      })
    ]);

    const totalResults = blogs.length + portfolios.length + experiences.length + educations.length + achievements.length;

    res.json({
      success: true,
      query,
      totalResults,
      results: {
        blog: blogs,
        portfolio: portfolios,
        experience: experiences,
        education: educations,
        achievements
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Search query execution failed.', error: error.message });
  }
};

module.exports = { globalSearch };
