const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const parseUserAgent = (ua = '') => {
  let deviceType = 'Desktop';
  if (/mobile/i.test(ua)) deviceType = 'Mobile';
  else if (/tablet|ipad/i.test(ua)) deviceType = 'Tablet';

  let browser = 'Unknown';
  if (/edg/i.test(ua)) browser = 'Edge';
  else if (/chrome/i.test(ua)) browser = 'Chrome';
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Safari';
  else if (/firefox/i.test(ua)) browser = 'Firefox';
  else if (/opera|opr/i.test(ua)) browser = 'Opera';

  let os = 'Unknown';
  if (/windows/i.test(ua)) os = 'Windows';
  else if (/macintosh|mac os x/i.test(ua)) os = 'macOS';
  else if (/linux/i.test(ua)) os = 'Linux';
  else if (/android/i.test(ua)) os = 'Android';
  else if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS';

  return { deviceType, browser, os };
};

const trackVisitor = async (req, res, next) => {
  // Only track GET requests that are page views or public APIs (exclude static assets & admin)
  if (req.method === 'GET' && !req.path.startsWith('/admin') && !req.path.startsWith('/uploads')) {
    try {
      const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
      const ipHash = crypto.createHash('sha256').update(clientIp + 'salt_navin_web').digest('hex').substring(0, 16);
      const ua = req.headers['user-agent'] || '';
      const { deviceType, browser, os } = parseUserAgent(ua);
      const referrer = req.headers['referer'] || req.headers['referrer'] || '';

      // Async record without blocking request
      prisma.visitorAnalytics.create({
        data: {
          path: req.path,
          ipHash,
          userAgent: ua.substring(0, 255),
          deviceType,
          browser,
          os,
          referrer: referrer.substring(0, 255)
        }
      }).catch(() => {});
    } catch (e) {
      // Ignore tracking errors to never interrupt visitor flow
    }
  }
  next();
};

module.exports = { trackVisitor };
