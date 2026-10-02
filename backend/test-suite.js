// Comprehensive Automated Verification Suite
async function runTests() {
  console.log('🧪 Starting End-to-End System Verification...\n');
  let passed = 0;
  let failed = 0;

  const test = async (name, fn) => {
    try {
      await fn();
      console.log(`✅ [PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`❌ [FAIL] ${name}:`, err.message);
      failed++;
    }
  };

  let adminToken = '';

  // 1. Health Endpoint
  await test('GET /api/health', async () => {
    const r = await fetch('http://localhost:5000/api/health');
    const d = await r.json();
    if (d.status !== 'healthy') throw new Error('Status not healthy');
  });

  // 2. Profile Endpoint
  await test('GET /api/profile', async () => {
    const r = await fetch('http://localhost:5000/api/profile');
    const d = await r.json();
    if (!d.success || !d.profile.fullName) throw new Error('Invalid profile payload');
  });

  // 3. Skills Endpoint
  await test('GET /api/skills', async () => {
    const r = await fetch('http://localhost:5000/api/skills');
    const d = await r.json();
    if (!d.success || d.categories.length === 0) throw new Error('No skill categories returned');
  });

  // 4. Portfolio Endpoint
  await test('GET /api/portfolio', async () => {
    const r = await fetch('http://localhost:5000/api/portfolio');
    const d = await r.json();
    if (!d.success || d.projects.length === 0) throw new Error('No portfolio items returned');
  });

  // 5. Experience Endpoint
  await test('GET /api/experience', async () => {
    const r = await fetch('http://localhost:5000/api/experience');
    const d = await r.json();
    if (!d.success || d.experiences.length === 0) throw new Error('No experience items returned');
  });

  // 6. Education Endpoint
  await test('GET /api/education', async () => {
    const r = await fetch('http://localhost:5000/api/education');
    const d = await r.json();
    if (!d.success || d.educations.length === 0) throw new Error('No education items returned');
  });

  // 7. Achievements Endpoint
  await test('GET /api/achievements', async () => {
    const r = await fetch('http://localhost:5000/api/achievements');
    const d = await r.json();
    if (!d.success || d.achievements.length === 0) throw new Error('No achievements returned');
  });

  // 8. Blog Endpoint
  await test('GET /api/blog', async () => {
    const r = await fetch('http://localhost:5000/api/blog');
    const d = await r.json();
    if (!d.success || d.posts.length === 0) throw new Error('No blog posts returned');
  });

  // 9. Gallery Albums & Items
  await test('GET /api/gallery/albums & items', async () => {
    const [r1, r2] = await Promise.all([
      fetch('http://localhost:5000/api/gallery/albums'),
      fetch('http://localhost:5000/api/gallery/items')
    ]);
    const d1 = await r1.json();
    const d2 = await r2.json();
    if (!d1.success || !d2.success || d1.albums.length === 0 || d2.items.length === 0) {
      throw new Error('Gallery data missing');
    }
  });

  // 10. Global Multi-Category Search
  await test('GET /api/search?q=accessibility', async () => {
    const r = await fetch('http://localhost:5000/api/search?q=accessibility');
    const d = await r.json();
    if (!d.success || d.totalResults === 0) throw new Error('Search failed or returned 0 results');
  });

  // 11. AI Assistant Chatbot
  await test('POST /api/chatbot/ask (Ask About Me)', async () => {
    const r = await fetch('http://localhost:5000/api/chatbot/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'What are your core skills?', isNepali: false })
    });
    const d = await r.json();
    if (!d.success || !d.reply || d.reply.length < 10) throw new Error('Chatbot response invalid');
  });

  // 12. Contact Form Submission
  await test('POST /api/contact (Public Inquiry)', async () => {
    const r = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Ramesh Thapa',
        email: 'ramesh.thapa@example.com',
        phone: '+977-9812345678',
        subject: 'Tech Collaboration Proposal',
        message: 'Hello Navin, let us discuss an enterprise architecture engagement.'
      })
    });
    const d = await r.json();
    if (!d.success) throw new Error(d.message || 'Contact submission failed');
  });

  // 13. CV Download & Tracking
  await test('GET /api/cv/info', async () => {
    const r = await fetch('http://localhost:5000/api/cv/info');
    const d = await r.json();
    if (!d.success || d.cv.cvDownloadCount === undefined) throw new Error('CV payload invalid');
  });

  // 14. Admin Authentication
  await test('POST /api/auth/login (Admin Credentials)', async () => {
    const r = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        identifier: 'admin@example.com',
        password: 'Admin@12345'
      })
    });
    const d = await r.json();
    if (!d.success || !d.token) throw new Error(d.message || 'Admin login failed');
    adminToken = d.token;
  });

  // 15. Protected Admin Endpoints
  await test('GET /api/analytics/overview (Admin Protected)', async () => {
    const r = await fetch('http://localhost:5000/api/analytics/overview', {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const d = await r.json();
    if (!d.success || d.stats.totalVisitors === undefined) throw new Error('Analytics failed');
  });

  await test('GET /api/contact (Admin Inquiries List)', async () => {
    const r = await fetch('http://localhost:5000/api/contact', {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const d = await r.json();
    if (!d.success || d.messages.length === 0) throw new Error('Admin messages failed');
  });

  // 16. Frontend Dev Server Check
  await test('GET Frontend (http://localhost:5173/)', async () => {
    const r = await fetch('http://localhost:5173/');
    const text = await r.text();
    if (!text.includes('id="root"')) throw new Error('Frontend HTML missing root div');
  });

  console.log(`\n========================================`);
  console.log(`RESULTS: ${passed} Passed, ${failed} Failed`);
  console.log(`========================================\n`);

  if (failed > 0) process.exit(1);
}

runTests();
