const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getOverview = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalVisitors,
      todayVisitors,
      portfolioCount,
      blogCount,
      unreadMessages,
      totalMessages,
      achievementCount,
      galleryCount,
      profile
    ] = await Promise.all([
      prisma.visitorAnalytics.count(),
      prisma.visitorAnalytics.count({ where: { visitedAt: { gte: today } } }),
      prisma.portfolio.count(),
      prisma.blogPost.count(),
      prisma.contactMessage.count({ where: { isRead: false } }),
      prisma.contactMessage.count(),
      prisma.achievement.count(),
      prisma.galleryItem.count(),
      prisma.profile.findFirst({ select: { cvDownloadCount: true } })
    ]);

    res.json({
      success: true,
      stats: {
        totalVisitors,
        todayVisitors,
        portfolioCount,
        blogCount,
        unreadMessages,
        totalMessages,
        achievementCount,
        galleryCount,
        cvDownloads: profile?.cvDownloadCount || 0
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve overview statistics.', error: error.message });
  }
};

const getVisitorStats = async (req, res) => {
  try {
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - 30);

    const visitors = await prisma.visitorAnalytics.findMany({
      where: { visitedAt: { gte: daysAgo } },
      orderBy: { visitedAt: 'desc' },
      take: 1000
    });

    // Group visits by date (YYYY-MM-DD)
    const dailyMap = {};
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      dailyMap[dateStr] = 0;
    }

    const deviceMap = { Desktop: 0, Mobile: 0, Tablet: 0 };
    const browserMap = {};
    const pageMap = {};

    visitors.forEach(v => {
      const dateStr = v.visitedAt.toISOString().split('T')[0];
      if (dailyMap[dateStr] !== undefined) {
        dailyMap[dateStr]++;
      }

      if (v.deviceType && deviceMap[v.deviceType] !== undefined) {
        deviceMap[v.deviceType]++;
      } else {
        deviceMap['Desktop']++;
      }

      const br = v.browser || 'Other';
      browserMap[br] = (browserMap[br] || 0) + 1;

      const p = v.path || '/';
      pageMap[p] = (pageMap[p] || 0) + 1;
    });

    const dailyVisits = Object.keys(dailyMap).map(date => ({ date, count: dailyMap[date] }));
    const topPages = Object.entries(pageMap)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    res.json({
      success: true,
      dailyVisits,
      devices: deviceMap,
      browsers: browserMap,
      topPages,
      recentVisitors: visitors.slice(0, 20)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve visitor analytics.', error: error.message });
  }
};

module.exports = {
  getOverview,
  getVisitorStats
};
