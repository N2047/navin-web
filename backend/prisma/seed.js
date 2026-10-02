const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Admin User
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'N@bin2047', salt);
  const adminEmail = process.env.ADMIN_EMAIL || 'ndhungel47@gmail.com';

  await prisma.admin.upsert({
    where: { email: adminEmail },
    update: { passwordHash, name: 'Navin Dhungel' },
    create: {
      email: adminEmail,
      username: 'navin_admin',
      passwordHash,
      name: 'Navin Dhungel',
      role: 'superadmin'
    }
  });
  console.log('✅ Admin user created/verified');

  // 2. Profile
  const existingProfile = await prisma.profile.findFirst();
  const profileData = {
    fullName: 'Navin Sharma',
    fullNameNe: 'नवीन शर्मा',
    professionalTitle: 'Lead Software Architect & AI Systems Specialist',
    professionalTitleNe: 'प्रमुख सफ्टवेयर आर्किटेक्ट तथा एआई प्रणाली विशेषज्ञ',
    tagline: 'Engineering resilient digital architectures, ethical AI solutions, and hyper-accessible web experiences.',
    taglineNe: 'दिगो डिजिटल आर्किटेक्चर, नैतिक एआई समाधान र पूर्ण पहुँचयोग्य वेब अनुभवहरूको निर्माण।',
    shortBio: 'Over 8+ years of expertise in architecting high-scale enterprise platforms, generative AI applications, and inclusive digital products across South Asia and global markets.',
    shortBioNe: 'दक्षिण एसिया तथा अन्तर्राष्ट्रिय स्तरमा बृहत् डिजिटल प्लेटफर्म, एआई प्रणाली र समावेशी प्रविधि विकासमा ८ वर्षभन्दा बढीको व्यावसायिक अनुभव।',
    detailedBio: `I am a dedicated Lead Software Architect, Tech Consultant, and Accessibility Evangelist with an unwavering commitment to engineering software that empowers humans. Over the past decade, my work has spanned resilient microservices, distributed cloud architectures, human-centered AI interfaces, and nationwide digital public goods in Nepal.

I specialize in full-stack JavaScript/TypeScript ecosystems, Python AI pipelines, relational & vector databases, and WCAG-compliant accessible user experiences. Beyond coding, I mentor aspiring engineers, write technical insights, and advocate for digital rights and digital accessibility across South Asia.`,
    detailedBioNe: `म एक समर्पित सफ्टवेयर आर्किटेक्ट, प्राविधिक सल्लाहकार र डिजिटल पहुँच (Accessibility) अभियन्ता हुँ। मेरो प्रमुख उद्देश्य मानव जीवनलाई सहज र प्रभावकारी बनाउने प्रविधिको निर्माण गर्नु हो। विगत एक दशकदेखि मैले आधुनिक माइक्रोसर्भिसेज, क्लाउड आर्किटेक्चर, जेनेरेटिभ एआई र नेपालमा नागरिक-केन्द्रित डिजिटल प्रविधिहरूको विकासमा काम गर्दै आएको छु।

म फुल-स्ट्याक इकोसिस्टम, पाइथन एआई पाइपलाइन, डाटाबेस व्यवस्थापन र अपाङ्गता-मैत्री (WCAG) वेब इन्टरफेस निर्माणमा विशेष दख्खल राख्दछु। यसका साथै म युवा इन्जिनियरहरूलाई मेन्टरिङ गर्न, अनुसन्धानात्मक लेखहरू लेख्न र डिजिटल समावेशीता प्रवर्द्धन गर्न सधैं अग्रसर छु।`,
    journey: `My tech journey began with building open-source localized tools for Nepali communities. Over time, that passion evolved into designing enterprise fintech backends, building NLP tools for Devanagari script, and speaking at regional technology symposiums. Today, I bridge the gap between complex engineering, state-of-the-art AI, and empathetic user design.`,
    journeyNe: `मेरो प्रविधि यात्रा नेपाली समुदायका लागि खुला-स्रोत (Open Source) उपकरणहरू निर्माणबाट सुरु भएको थियो। समयक्रमसँगै त्यो लगाव बैंकिङ तथा फिनटेक ब्याकइन्ड डिजाइन, देवनागरी लिपिका लागि प्राकृतिक भाषा प्रशोधन (NLP) र क्षेत्रीय प्रविधि सम्मेलनहरूमा विस्तार भयो। आज म जटिल इन्जिनियरिङ, अत्याधुनिक एआई र मानव-मैत्री डिजाइनलाई जोड्ने कार्य गर्दछु।`,
    careerObjective: 'To architect scalable, secure, and transformative software ecosystems that solve critical socioeconomic challenges while advancing digital accessibility and open technology standards.',
    careerObjectiveNe: 'डिजिटल पहुँचयोग्यता र खुला प्रविधिलाई आत्मसात गर्दै महत्त्वपूर्ण सामाजिक तथा आर्थिक चुनौतीहरू समाधान गर्ने सुरक्षित र प्रभावकारी सफ्टवेयर प्रणालीहरू निर्माण गर्नु मेरो मुख्य लक्ष्य हो।',
    areasOfExpertise: JSON.stringify([
      'Cloud Architecture & Microservices',
      'AI / LLM Integration & Prompt Engineering',
      'Web Accessibility (WCAG 2.1 AA/AAA)',
      'High-Performance Full-Stack Web Apps',
      'Database Optimization & Distributed Systems',
      'Technical Mentorship & Agile Leadership'
    ]),
    profilePhoto: '/uploads/profile-photo.png',
    heroImage: '/uploads/hero-banner.png',
    email: 'contact@navinsharma.com.np',
    phone: '+977-9801234567',
    location: 'Kathmandu, Nepal',
    locationNe: 'काठमाडौँ, नेपाल',
    cvUrl: '/uploads/navin-sharma-cv.pdf',
    cvFileName: 'Navin_Sharma_Curriculum_Vitae_2026.pdf',
    cvDownloadCount: 142,
    projectsCompleted: 38,
    yearsExperience: 8,
    trainingsCount: 24,
    achievementsCount: 15
  };

  if (existingProfile) {
    await prisma.profile.update({
      where: { id: existingProfile.id },
      data: profileData
    });
  } else {
    await prisma.profile.create({ data: profileData });
  }
  console.log('✅ Profile data seeded');

  // 3. Social Links
  await prisma.socialLink.deleteMany();
  await prisma.socialLink.createMany({
    data: [
      { platform: 'GitHub', url: 'https://github.com', icon: 'Github', order: 1, isVisible: true },
      { platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'Linkedin', order: 2, isVisible: true },
      { platform: 'Twitter / X', url: 'https://x.com', icon: 'Twitter', order: 3, isVisible: true },
      { platform: 'YouTube', url: 'https://youtube.com', icon: 'Youtube', order: 4, isVisible: true },
      { platform: 'Facebook', url: 'https://facebook.com', icon: 'Facebook', order: 5, isVisible: true }
    ]
  });
  console.log('✅ Social links seeded');

  // 4. Skill Categories & Skills
  await prisma.skill.deleteMany();
  await prisma.skillCategory.deleteMany();

  const itCat = await prisma.skillCategory.create({
    data: { name: 'Full-Stack & Cloud Architecture', nameNe: 'फुल-स्ट्याक तथा क्लाउड आर्किटेक्चर', slug: 'full-stack-cloud', order: 1 }
  });
  const aiCat = await prisma.skillCategory.create({
    data: { name: 'AI & Data Engineering', nameNe: 'कृत्रिम बुद्धिमत्ता तथा डाटा इन्जिनियरिङ', slug: 'ai-data', order: 2 }
  });
  const a11yCat = await prisma.skillCategory.create({
    data: { name: 'Accessibility & Design Systems', nameNe: 'पहुँचयोग्यता तथा डिजाइन प्रणाली', slug: 'accessibility-design', order: 3 }
  });
  const leadCat = await prisma.skillCategory.create({
    data: { name: 'Leadership & Research', nameNe: 'नेतृत्व तथा अनुसन्धान', slug: 'leadership-research', order: 4 }
  });
  const langCat = await prisma.skillCategory.create({
    data: { name: 'Languages', nameNe: 'भाषाहरू', slug: 'languages', order: 5 }
  });

  await prisma.skill.createMany({
    data: [
      // IT & Cloud
      { name: 'Node.js & Express / NestJS', nameNe: 'नोड जेएस र एक्सप्रेस', categoryId: itCat.id, level: 'Expert', percentage: 95, icon: 'Server', order: 1, isFeatured: true },
      { name: 'React.js & Next.js Ecosystem', nameNe: 'रियाक्ट र नेक्स्ट जेएस', categoryId: itCat.id, level: 'Expert', percentage: 94, icon: 'Layout', order: 2, isFeatured: true },
      { name: 'PostgreSQL, Prisma ORM & Redis', nameNe: 'पोस्टग्रेस र डाटाबेस', categoryId: itCat.id, level: 'Advanced', percentage: 90, icon: 'Database', order: 3, isFeatured: true },
      { name: 'Docker, CI/CD & AWS Cloud', nameNe: 'डकर, सीआई/सीडी र एडब्लुएस', categoryId: itCat.id, level: 'Advanced', percentage: 88, icon: 'Cloud', order: 4, isFeatured: false },
      { name: 'REST & GraphQL API Design', nameNe: 'एपीआई डिजाइन', categoryId: itCat.id, level: 'Expert', percentage: 96, icon: 'Code', order: 5, isFeatured: false },

      // AI & Data
      { name: 'LLM Integration & Prompt Engineering', nameNe: 'एलएलएम इन्टिग्रेसन र प्रम्प्ट इन्जिनियरिङ', categoryId: aiCat.id, level: 'Expert', percentage: 92, icon: 'Cpu', order: 1, isFeatured: true },
      { name: 'Python (FastAPI, PyTorch, LangChain)', nameNe: 'पाइथन र ल्याङ्गचेन', categoryId: aiCat.id, level: 'Advanced', percentage: 88, icon: 'Terminal', order: 2, isFeatured: true },
      { name: 'RAG Systems & Vector Embeddings', nameNe: 'आरएजी प्रणाली तथा भेक्टर डाटाबेस', categoryId: aiCat.id, level: 'Advanced', percentage: 86, icon: 'Layers', order: 3, isFeatured: false },
      { name: 'Devanagari NLP & Speech Processing', nameNe: 'देवनागरी एनएलपी र अडियो प्रोसेसिङ', categoryId: aiCat.id, level: 'Advanced', percentage: 84, icon: 'Mic', order: 4, isFeatured: false },

      // Accessibility & UI
      { name: 'WCAG 2.1 AA/AAA Compliance', nameNe: 'डब्ल्युसीएजी पहुँचयोग्यता मापदण्ड', categoryId: a11yCat.id, level: 'Expert', percentage: 98, icon: 'Eye', order: 1, isFeatured: true },
      { name: 'Screen Reader & ARIA Semantics', nameNe: 'स्क्रिन रिडर तथा एआरआईए', categoryId: a11yCat.id, level: 'Expert', percentage: 95, icon: 'Volume2', order: 2, isFeatured: true },
      { name: 'Design Systems & Mobile First UI', nameNe: 'डिजाइन सिस्टम तथा मोबाइल-फर्स्ट यूआई', categoryId: a11yCat.id, level: 'Advanced', percentage: 90, icon: 'Smartphone', order: 3, isFeatured: false },

      // Leadership
      { name: 'Agile & Technical Product Strategy', nameNe: 'एजाइल तथा प्राविधिक रणनीति', categoryId: leadCat.id, level: 'Expert', percentage: 90, icon: 'CheckCircle', order: 1, isFeatured: false },
      { name: 'Social Development & Public Sector Tech', nameNe: 'सामाजिक विकास र सार्वजनिक प्रविधि', categoryId: leadCat.id, level: 'Advanced', percentage: 88, icon: 'Users', order: 2, isFeatured: false },

      // Languages
      { name: 'Nepali (नेपाली)', nameNe: 'नेपाली (मातृभाषा)', categoryId: langCat.id, level: 'Native', percentage: 100, icon: 'Globe', order: 1, isFeatured: false },
      { name: 'English', nameNe: 'अंग्रेजी (धाराप्रवाह)', categoryId: langCat.id, level: 'Fluent / Professional', percentage: 96, icon: 'Globe', order: 2, isFeatured: false }
    ]
  });
  console.log('✅ Skills and categories seeded');

  // 5. Portfolio Items
  await prisma.portfolio.deleteMany();
  await prisma.portfolio.createMany({
    data: [
      {
        title: 'SajiloAwaaz: Accessible Screen Reader & Speech Engine for Devanagari',
        titleNe: 'सजिलोआवाज: नेपाली भाषाका लागि पहुँचयोग्य स्क्रिन रिडर तथा वाचन प्रणाली',
        slug: 'sajilo-awaaz-accessible-devanagari-speech',
        category: 'Accessibility & AI',
        shortDesc: 'A high-accuracy, lightweight text-to-speech and assistive reader designed for visually impaired citizens in Nepal.',
        shortDescNe: 'दृष्टिबिहीन तथा श्रवण समस्या भएका नागरिकका लागि निर्मित आधुनिक नेपाली टेक्स्ट-टु-स्पीच तथा अडियो रिडर।',
        description: `SajiloAwaaz was engineered to eliminate barriers for visually impaired individuals interacting with digital services. Utilizing Web Speech synthesis alongside a custom neural Devanagari phoneme converter, it achieves sub-100ms latency on low-bandwidth mobile connections.

Key Highlights:
- 100% WCAG 2.1 AAA accessibility score
- Works offline with Progressive Web App service workers
- Adopted by 12+ educational organizations across Nepal`,
        descriptionNe: `सजिलोआवाज दृष्टिबिहीन व्यक्तिहरूलाई डिजिटल सेवाहरूसँग जोड्न निर्माण गरिएको हो। यसमा उच्च गुणस्तरको नेपाली ध्वनि प्रविधि प्रयोग गरिएको छ जसले कम इन्टरनेट गतिमा पनि तीव्र गतिमा अडियो उत्पादन गर्दछ।`,
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
        galleryImages: JSON.stringify([
          'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80'
        ]),
        technologies: JSON.stringify(['React', 'Web Speech API', 'Node.js', 'FastAPI', 'IndexedDB']),
        projectUrl: 'https://example.com/sajilo-awaaz',
        githubUrl: 'https://github.com/example/sajilo-awaaz',
        completionDate: '2025-11',
        isFeatured: true,
        order: 1,
        viewsCount: 642
      },
      {
        title: 'HimalayaFlow: Distributed Microservices Core for Fintech & Remittance',
        titleNe: 'हिमालयफ्लो: डिजिटल रेमिट्यान्स तथा वित्तीय कारोबारका लागि भरपर्दो कोर प्रणाली',
        slug: 'himalayaflow-fintech-microservices',
        category: 'Fintech & Cloud',
        shortDesc: 'Fault-tolerant distributed transactional engine handling 12,000+ daily cross-border remittances with zero reconciliation discrepancies.',
        shortDescNe: 'दैनिक हजारौँ सीमापार कारोबारहरूलाई सुरक्षित र त्रुटिरहित ढंगले व्यवस्थापन गर्ने आधुनिक वित्तीय इन्जिन।',
        description: `Designed and led the core engineering of an event-driven microservices architecture for real-time payment reconciliation, KYC compliance, and audit logging.

Engineered with Redis distributed locks, PostgreSQL partitioned schemas, and automated disaster-recovery failover across dual cloud availability zones.`,
        descriptionNe: `रियल-टाइम भुक्तानी मिलान, केवाईसी प्रमाणीकरण र बैंक इन्टिग्रेसनलाई सहज बनाउन निर्माण गरिएको सुरक्षित आर्किटेक्चर।`,
        thumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80',
        galleryImages: JSON.stringify([
          'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80'
        ]),
        technologies: JSON.stringify(['Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes']),
        projectUrl: 'https://example.com/himalayaflow',
        githubUrl: 'https://github.com/example/himalayaflow',
        completionDate: '2025-06',
        isFeatured: true,
        order: 2,
        viewsCount: 489
      },
      {
        title: 'KrishiGyan AI: Multilingual Agritech Copilot for Farmers',
        titleNe: 'कृषिज्ञान एआई: नेपाली कृषकहरूका लागि बहुभाषिक स्मार्ट परामर्श प्लेटफर्म',
        slug: 'krishigyan-ai-multilingual-agritech',
        category: 'AI & Data Science',
        shortDesc: 'Voice-first AI assistant allowing farmers to diagnose crop diseases and query market wholesale prices in spoken Nepali and local dialects.',
        shortDescNe: 'कृषकहरूले बोली मार्फत बालीनालीको रोग पहिचान गर्न र बजार मूल्य बुझ्न सक्ने स्मार्ट एआई सहयोगी।',
        description: `Combines computer vision for leaf-pest diagnostics with a Retrieval-Augmented Generation (RAG) knowledge engine indexing over 4,000 agricultural extension advisories.

Provides instant voice answers in Nepali, Maithili, and Bhojpuri through an ultra-simple chat interface.`,
        descriptionNe: `पातको फोटोबाटै रोग पत्ता लगाउने र बोली मार्फत तत्काल समाधान दिने कृषक-मैत्री स्मार्ट प्लेटफर्म।`,
        thumbnail: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=80',
        galleryImages: JSON.stringify([
          'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=1200&auto=format&fit=crop&q=80'
        ]),
        technologies: JSON.stringify(['Python', 'LangChain', 'FastAPI', 'React', 'Whisper AI', 'Tailored Vector DB']),
        projectUrl: 'https://example.com/krishigyan',
        githubUrl: 'https://github.com/example/krishigyan-ai',
        completionDate: '2024-12',
        isFeatured: true,
        order: 3,
        viewsCount: 820
      },
      {
        title: 'OpenGov Nepal: Open Data & Civic Engagement Portal',
        titleNe: 'ओपनगभ नेपाल: खुला तथ्याङ्क तथा नागरिक अन्तरक्रिया डिजिटल पोर्टल',
        slug: 'opengov-nepal-open-data-portal',
        category: 'Civic Tech & Public Goods',
        shortDesc: 'A transparent municipal budget tracking and citizen feedback platform built for municipal bodies in Gandaki & Bagmati provinces.',
        shortDescNe: 'नगरपालिका तथा स्थानीय तहको बजेट पारदर्शिता र नागरिक सुझाव संकलन गर्ने खुला प्लेटफर्म।',
        description: `Bridges local governance transparency with interactive charts, open geo-spatial dataset downloads (GeoJSON/CSV), and bilingual citizen grievance filing.`,
        descriptionNe: `स्थानीय निकायहरूको बजेट, योजना र प्रगति विवरण नागरिक सामु खुला र पारदर्शी ढंगले प्रस्तुत गर्ने माध्यम।`,
        thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
        galleryImages: JSON.stringify([
          'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80'
        ]),
        technologies: JSON.stringify(['React', 'Node.js', 'PostgreSQL', 'Chart.js', 'Mapbox GL']),
        projectUrl: 'https://example.com/opengov-nepal',
        githubUrl: 'https://github.com/example/opengov-nepal',
        completionDate: '2024-04',
        isFeatured: false,
        order: 4,
        viewsCount: 315
      }
    ]
  });
  console.log('✅ Portfolio seeded');

  // 6. Experience
  await prisma.experience.deleteMany();
  await prisma.experience.createMany({
    data: [
      {
        organization: 'Apex Digital Systems Global',
        organizationNe: 'एपेक्स डिजिटल सिस्टम्स ग्लोबल',
        position: 'Lead Software Architect & Tech Principal',
        positionNe: 'प्रमुख सफ्टवेयर आर्किटेक्ट तथा प्राविधिक नेतृत्व',
        location: 'Kathmandu / Hybrid',
        locationNe: 'काठमाडौँ',
        startDate: '2023 - Present',
        endDate: null,
        isCurrent: true,
        responsibilities: JSON.stringify([
          'Direct enterprise software architecture and engineering roadmaps for a 22-person multidisciplinary engineering department.',
          'Lead the modernization of core legacy services into cloud-native microservices with 99.98% uptime SLAs.',
          'Formulate company-wide accessibility benchmarks, ensuring all web portals meet strict WCAG 2.1 AA mandates.'
        ]),
        responsibilitiesNe: JSON.stringify([
          '२२ जना इन्जिनियरहरूको टोलीलाई प्राविधिक मार्गदर्शन तथा सफ्टवेयर आर्किटेक्चर निर्देशन।',
          'क्लाउड माइक्रोसर्भिसेज मार्फत उच्च गति र ९९.९८% विश्वसनीयता सुनिश्चितता।',
          'कम्पनीका सम्पूर्ण उत्पादनहरूमा WCAG २.१ AA मापदण्ड अनुसार पहुँचयोग्यता लागू।'
        ]),
        achievements: JSON.stringify([
          'Reduced API p99 latency by 58% across distributed transaction clusters.',
          'Successfully rolled out AI copilot tooling, saving 350+ hours of manual testing annually.'
        ]),
        achievementsNe: JSON.stringify([
          'सर्भर प्रतिक्रिया समय ५८% ले तीव्र बनाउन सफल।',
          'आन्तरिक कार्यक्षमता अभिवृद्धि गर्न एआई उपकरणहरूको प्रभावकारी कार्यान्वयन।'
        ]),
        logo: '',
        order: 1
      },
      {
        organization: 'TechVision Innovations',
        organizationNe: 'टेकभिजन इनोभेसन्स',
        position: 'Senior Full-Stack Consultant',
        positionNe: 'वरिष्ठ फुल-स्ट्याक कन्सल्टेन्ट',
        location: 'Lalitpur, Nepal',
        locationNe: 'ललितपुर, नेपाल',
        startDate: '2020',
        endDate: '2023',
        isCurrent: false,
        responsibilities: JSON.stringify([
          'Architected high-throughput RESTful and GraphQL APIs for banking and remittance clients.',
          'Designed responsive, keyboard-navigable web dashboards utilizing React and modern CSS.',
          'Mentored 14 junior developers through structured pair-programming and code review rituals.'
        ]),
        responsibilitiesNe: JSON.stringify([
          'बैंकिङ तथा भुक्तानी प्रणालीका लागि सुरक्षित र भरपर्दो एपीआईहरूको निर्माण।',
          'आधुनिक रियाक्ट तथा रेस्पोन्सिभ इन्टरफेसको विकास र कनिष्ठ इन्जिनियरहरूलाई मेन्टरिङ।'
        ]),
        achievements: JSON.stringify([
          'Received "Consultant of the Year 2022" for zero-downtime database migration.',
          'Standardized CI/CD automated test pipelines across 8 client accounts.'
        ]),
        achievementsNe: JSON.stringify([
          'उत्कृष्ट कार्यसम्पादन बापत सन् २०२२ मा "उत्कृष्ट कन्सल्टेन्ट" अवार्ड प्राप्त।',
          'सफ्टवेयर डेलिभरी गति दोब्बर बनाउन स्वचालित सीआई/सीडी प्रणाली स्थापना।'
        ]),
        logo: '',
        order: 2
      },
      {
        organization: 'Nepal Civic Tech Lab',
        organizationNe: 'नेपाल सिभिक टेक ल्याब',
        position: 'Software Engineer & Accessibility Lead',
        positionNe: 'सफ्टवेयर इन्जिनियर तथा पहुँचयोग्यता प्रमुख',
        location: 'Kathmandu, Nepal',
        locationNe: 'काठमाडौँ, नेपाल',
        startDate: '2018',
        endDate: '2020',
        isCurrent: false,
        responsibilities: JSON.stringify([
          'Built accessible citizen portals and data visualization tools for community transparency.',
          'Conducted accessibility audits with assistive technology users (screen readers, sip-and-puff devices).'
        ]),
        responsibilitiesNe: JSON.stringify([
          'नागरिक सरोकार र खुला तथ्याङ्क सम्बन्धी डिजिटल पोर्टलहरूको निर्माण।',
          'अपाङ्गता भएका व्यक्तिहरूसँग सहकार्य गर्दै वेबसाइटको पहुँचयोग्यता परीक्षण र सुधार।'
        ]),
        achievements: JSON.stringify([
          'Authored the widely referenced "Devanagari Web Accessibility Field Guide".'
        ]),
        achievementsNe: JSON.stringify([
          'नेपाली भाषामा पहिलो "डिजिटल पहुँचयोग्यता मार्गदर्शिका" तयार।'
        ]),
        logo: '',
        order: 3
      }
    ]
  });
  console.log('✅ Experience seeded');

  // 7. Education
  await prisma.education.deleteMany();
  await prisma.education.createMany({
    data: [
      {
        institution: 'Tribhuvan University, Institute of Science and Technology',
        institutionNe: 'त्रिभुवन विश्वविद्यालय, विज्ञान तथा प्रविधि अध्ययन संस्थान',
        degree: 'Master of Science (M.Sc.)',
        degreeNe: 'स्नातकोत्तर (एम.एस.सी.)',
        fieldOfStudy: 'Computer Science and Information Technology',
        fieldOfStudyNe: 'कम्प्युटर विज्ञान तथा सूचना प्रविधि',
        startYear: '2019',
        endYear: '2021',
        description: 'Specialized in Distributed Systems, Natural Language Processing, and Artificial Intelligence with Distinction Honors.',
        descriptionNe: 'वितरित प्रणाली, प्राकृतिक भाषा प्रशोधन र कृत्रिम बुद्धिमत्ता विषयमा विशिष्ट श्रेणी सहित उत्तीर्ण।',
        certificateUrl: '/uploads/msc-degree.pdf',
        logo: '',
        order: 1
      },
      {
        institution: 'Patan Multiple Campus, Tribhuvan University',
        institutionNe: 'पाटन संयुक्त क्याम्पस, त्रिभुवन विश्वविद्यालय',
        degree: 'Bachelor of Science (B.Sc. CSIT)',
        degreeNe: 'स्नातक (बी.एस.सी. सीएसआईटी)',
        fieldOfStudy: 'Computer Science & Information Technology',
        fieldOfStudyNe: 'कम्प्युटर साइन्स र सूचना प्रविधि',
        startYear: '2014',
        endYear: '2018',
        description: 'Core coursework in Algorithms, Data Structures, Software Engineering, Database Management, and Network Security.',
        descriptionNe: 'एल्गोरिदम, सफ्टवेयर इन्जिनियरिङ, डाटाबेस तथा नेटवर्क सुरक्षामा उच्च प्राप्तांक।',
        certificateUrl: '/uploads/bsc-degree.pdf',
        logo: '',
        order: 2
      }
    ]
  });
  console.log('✅ Education seeded');

  // 8. Achievements
  await prisma.achievement.deleteMany();
  await prisma.achievement.createMany({
    data: [
      {
        title: 'National Digital Accessibility Champion Award',
        titleNe: 'राष्ट्रिय डिजिटल पहुँचयोग्यता सम्मान',
        organization: 'Federation of Persons with Disabilities & Tech Council',
        organizationNe: 'राष्ट्रिय अपाङ्ग महासंघ तथा प्रविधि परिषद्',
        date: '2025',
        description: 'Conferred for pioneering high-fidelity Devanagari speech synthesis and advocacy of WCAG compliance in public websites.',
        descriptionNe: 'नेपाली भाषामा पहुँचयोग्य सफ्टवेयर विकास तथा डिजिटल समावेशीतामा पुर्याएको योगदानको कदरस्वरूप।',
        certificateUrl: '/uploads/award-accessibility-2025.pdf',
        isFeatured: true,
        order: 1
      },
      {
        title: 'Winner - National Smart Governance Hackathon',
        titleNe: 'विजेता - राष्ट्रिय स्मार्ट शासन ह्याकाथन',
        organization: 'Ministry of Communications and Information Technology',
        organizationNe: 'सञ्चार तथा सूचना प्रविधि मन्त्रालय',
        date: '2024',
        description: 'First prize among 80+ engineering teams for building an automated municipal service delivery and grievance resolution bot.',
        descriptionNe: '८० भन्दा बढी प्रतिस्पर्धीहरूमध्ये नागरिक गुनासो समाधान गर्ने स्मार्ट प्रविधि विकास गरी प्रथम स्थान हासिल।',
        certificateUrl: '/uploads/hackathon-winner.pdf',
        isFeatured: true,
        order: 2
      },
      {
        title: 'AWS Certified Solutions Architect – Professional',
        titleNe: 'एडब्लुएस सर्टिफाइड सोलुसन्स आर्किटेक्ट',
        organization: 'Amazon Web Services (AWS)',
        organizationNe: 'अमेजन वेब सर्भिसेज (एडब्लुएस)',
        date: '2023',
        description: 'Validated mastery in designing distributed, resilient, and cost-optimized multi-region cloud infrastructures.',
        descriptionNe: 'क्लाउड पूर्वाधार, स्केलेबिलिटी र सुरक्षा डिजाइनमा अन्तर्राष्ट्रिय व्यावसायिक प्रमाणीकरण।',
        certificateUrl: '/uploads/aws-certified.pdf',
        isFeatured: true,
        order: 3
      },
      {
        title: 'Certified Information Privacy Technologist (CIPT)',
        titleNe: 'सर्टिफाइड इन्फर्मेसन प्राइभेसी टेक्नोलोजिस्ट',
        organization: 'International Association of Privacy Professionals (IAPP)',
        organizationNe: 'इन्टरनेसनल एसोसिएसन अफ प्राइभेसी प्रोफेसनल्स',
        date: '2022',
        description: 'Recognized expertise in data protection-by-design, encryption standards, and digital consumer rights architecture.',
        descriptionNe: 'डिजिटल डेटा गोपनीयता, सुरक्षा र उपभोक्ता अधिकार संरक्षण सम्बन्धी प्रमाणीकरण।',
        certificateUrl: '/uploads/cipt-cert.pdf',
        isFeatured: false,
        order: 4
      }
    ]
  });
  console.log('✅ Achievements seeded');

  // 9. Blog Posts
  await prisma.blogPost.deleteMany();
  await prisma.blogPost.createMany({
    data: [
      {
        title: 'Building Inclusive Digital Products: A Pragmatic Guide to WCAG 2.1 in South Asia',
        titleNe: 'समावेशी डिजिटल उत्पादन निर्माण: दक्षिण एसियामा WCAG २.१ कार्यान्वयनको व्यावहारिक मार्गदर्शिका',
        slug: 'building-inclusive-digital-products-wcag-guide',
        excerpt: 'Why digital accessibility is not an optional afterthought, and how engineers can build truly screen-reader friendly interfaces for Nepali users.',
        excerptNe: 'डिजिटल पहुँचयोग्यता किन ऐच्छिक विषय होइन, र नेपाली प्रयोगकर्ताहरूका लागि कसरी वास्तविक स्क्रिन-रिडर-मैत्री इन्टरफेस बनाउने।',
        content: `### Why Accessibility Matters in Modern Web Engineering

Digital platforms now govern access to banking, healthcare, education, and civic rights. When we construct web interfaces that ignore semantic HTML, proper contrast, or assistive technology cues, we actively disenfranchise millions of capable individuals.

#### Core Pillars of Accessible Web Design

1. **Semantic Hierarchy**: Every page must have one unambiguous \`<h1>\` tag followed by logical headings (\`<h2>\`, \`<h3>\`). Screen reader users traverse pages through heading landmarks.
2. **Keyboard First**: Every button, link, and modal must be operable without a mouse. Test with Tab, Shift+Tab, and Enter keys.
3. **Contrast & Typography**: Use minimum 4.5:1 contrast ratios for body copy. Avoid hardcoding tiny fonts; respect browser font zoom preferences.
4. **Devanagari Phonetics**: Nepali text requires UTF-8 integrity and clear phonetic clues so speech synthesizers do not mispronounce complex compound conjuncts (संयुक्ताक्षर).

By treating accessibility as foundational engineering hygiene rather than a checklist at the finish line, our software becomes faster, more resilient, and genuinely universal.`,
        contentNe: `### आधुनिक वेब इन्जिनियरिङमा पहुँचयोग्यताको महत्त्व

आजको युगमा बैंकिङ, शिक्षा, स्वास्थ्य र नागरिक अधिकारहरू डिजिटल माध्यमबाट उपलब्ध छन्। जब हामी अपाङ्गता भएका व्यक्तिहरूलाई ध्यान नदिई वेबसाइट बनाउँछौं, हामी लाखौँ नागरिकलाई सेवाबाट वञ्चित गर्दछौं।

यस लेखमा हामीले सिमान्टिक एचटीएमएल, किबोर्ड नेभिगेसन, कन्ट्रास्ट र नेपाली देवनागरी लिपिका लागि स्क्रिन रिडर अनुकूलन गर्ने विधिहरू विस्तृत रूपमा चर्चा गरेका छौँ।`,
        featuredImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1000&auto=format&fit=crop&q=80',
        category: 'Web Accessibility',
        tags: JSON.stringify(['Accessibility', 'WCAG', 'Inclusion', 'UX']),
        readingTime: '6 min read',
        viewsCount: 320,
        isFeatured: true,
        isPublished: true,
        publishedAt: new Date('2026-02-15')
      },
      {
        title: 'Architecting Resilient Node.js Microservices: Lessons from Production',
        titleNe: 'उत्पादनमा भरपर्दो नोड जेएस माइक्रोसर्भिसेज निर्माण: वास्तविक अनुभवका पाठहरू',
        slug: 'architecting-resilient-nodejs-microservices',
        excerpt: 'Strategies for memory management, graceful shutdowns, rate limiting, and zero-downtime database migrations in high-concurrency Node.js clusters.',
        excerptNe: 'नोड जेएस क्लस्टरमा मेमोरी व्यवस्थापन, सुरक्षित बन्द (Graceful Shutdown) र तीव्र डाटाबेस मिलानका प्रभावकारी रणनीतिहरू।',
        content: `### Surviving Real-World Traffic Spikes

Node.js is notoriously fast for I/O operations due to its asynchronous event loop. However, under non-trivial enterprise loads, unhandled promise rejections, event loop starvation, and database connection pool exhaustion can cascade into total outage.

#### Lessons Learned in the Trenches

- **Circuit Breakers**: Wrap external HTTP calls and downstream microservices with circuit breakers to prevent ripple failures.
- **Graceful Shutdown**: Always capture \`SIGTERM\` and \`SIGINT\` to drain in-flight requests and close DB pools cleanly before the container terminates.
- **Safe Rate Limiting**: Implement distributed token-bucket rate limiting backed by Redis rather than relying purely on in-memory counters.

By designing every service under the assumption that external dependencies will occasionally fail, we guarantee continuous user availability.`,
        contentNe: `### वास्तविक ट्राफिकमा नोड जेएस व्यवस्थापन

नोड जेएसको इभेन्ट लुप अत्यन्त तीव्र छ, तर जब ठूलो संख्यामा प्रयोगकर्ताहरू आउँछन्, मेमोरी लिक र डाटाबेस कनेक्सन व्यवस्थापन चुनौतीपूर्ण बन्न सक्छ। यस लेखमा हामीले उत्पादन वातावरणमा सिकेका महत्त्वपूर्ण प्राविधिक पाठहरू समावेश गरेका छौँ।`,
        featuredImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1000&auto=format&fit=crop&q=80',
        category: 'Backend & Cloud',
        tags: JSON.stringify(['Node.js', 'Microservices', 'Architecture', 'DevOps']),
        readingTime: '8 min read',
        viewsCount: 540,
        isFeatured: true,
        isPublished: true,
        publishedAt: new Date('2026-01-10')
      },
      {
        title: 'Demystifying Generative AI & RAG for Low-Resource Languages',
        titleNe: 'कम-स्रोत भाषाहरूका लागि जेनेरेटिभ एआई तथा आरएजी (RAG) प्रविधिको प्रयोग',
        slug: 'demystifying-generative-ai-rag-low-resource-languages',
        excerpt: 'How modern retrieval-augmented generation pipelines bridge vocabulary gaps and eliminate hallucination for languages like Nepali.',
        excerptNe: 'नेपाली जस्ता कम-स्रोत भाषाहरूमा एआईलाई सटीक बनाउन र गलत उत्तर रोक्न आरएजी प्रणाली कसरी काम गर्दछ।',
        content: `### The Challenge with Multilingual LLMs

Global large language models are trained overwhelmingly on English and high-resource European languages. When queried in Nepali, models frequently hallucinate or revert to stilted translations.

#### The Power of RAG (Retrieval-Augmented Generation)

By anchoring the LLM to a verified domain-specific vector database containing localized agricultural, legal, or health knowledge, we eliminate hallucination. The model's role transforms from an untrusted memory store into a fluent linguistic translator of vetted facts.`,
        contentNe: `ठूला भाषा मोडेलहरू (LLMs) मा नेपाली भाषाको सामग्री कम भएकाले धेरै पटक गलत उत्तर आउने सम्भावना रहन्छ। आरएजी प्रणालीले आधिकारिक दस्तावेजहरूबाट मात्र तथ्य खोजेर उत्तर दिने भएकाले यसको विश्वसनीयता उच्च हुन्छ।`,
        featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1000&auto=format&fit=crop&q=80',
        category: 'Artificial Intelligence',
        tags: JSON.stringify(['AI', 'LLM', 'RAG', 'NLP', 'Nepali']),
        readingTime: '7 min read',
        viewsCount: 412,
        isFeatured: false,
        isPublished: true,
        publishedAt: new Date('2025-12-05')
      }
    ]
  });
  console.log('✅ Blog posts seeded');

  // 10. Gallery Albums & Items
  await prisma.galleryItem.deleteMany();
  await prisma.galleryAlbum.deleteMany();

  const album1 = await prisma.galleryAlbum.create({
    data: {
      title: 'Tech Conferences & Keynotes',
      titleNe: 'प्रविधि सम्मेलन तथा मुख्य सम्बोधन',
      slug: 'tech-conferences-keynotes',
      description: 'Moments from national and international tech conferences, symposiums, and keynote talks.',
      descriptionNe: 'राष्ट्रिय तथा अन्तर्राष्ट्रिय प्रविधि सम्मेलनहरूमा प्रस्तुत गरिएका विचार र मुख्य क्षणहरू।',
      coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
      order: 1
    }
  });

  const album2 = await prisma.galleryAlbum.create({
    data: {
      title: 'Community Tech Workshops & Mentorship',
      titleNe: 'सामुदायिक कार्यशाला तथा मेन्टरिङ',
      slug: 'community-tech-workshops',
      description: 'Hands-on coding bootcamps, accessibility training sessions, and university youth mentorship.',
      descriptionNe: 'युवा विद्यार्थी तथा इन्जिनियरहरूका लागि सञ्चालन गरिएका प्राविधिक कार्यशाला र प्रशिक्षण कार्यक्रमहरू।',
      coverImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
      order: 2
    }
  });

  await prisma.galleryItem.createMany({
    data: [
      {
        albumId: album1.id,
        title: 'Keynote on Accessible Web Future',
        titleNe: 'पहुँचयोग्य वेब भविष्य सम्बन्धी मुख्य सम्बोधन',
        type: 'photo',
        mediaUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80',
        caption: 'Speaking on digital equity and screen reader design at Nepal Tech Summit 2025.',
        captionNe: 'नेपाल टेक समिट २०२५ मा डिजिटल समानता र पहुँचयोग्यता सम्बन्धी मन्तव्य।',
        order: 1
      },
      {
        albumId: album1.id,
        title: 'Panel Discussion: Ethical AI in Governance',
        titleNe: 'अन्तरक्रिया: सुशासनमा नैतिक एआईको भूमिका',
        type: 'photo',
        mediaUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&auto=format&fit=crop&q=80',
        caption: 'Panel discussion on AI safety, data privacy, and inclusive technology.',
        captionNe: 'एआई सुरक्षा र डाटा गोपनीयता सम्बन्धी विशेष अन्तरक्रिया कार्यक्रम।',
        order: 2
      },
      {
        albumId: album2.id,
        title: 'Hands-on Full-Stack Architecture Workshop',
        titleNe: 'फुल-स्ट्याक आर्किटेक्चर प्रयोगात्मक कार्यशाला',
        type: 'photo',
        mediaUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80',
        caption: 'Mentoring 40 university graduates on building production-ready Node.js APIs.',
        captionNe: '४० जना विद्यार्थीहरूलाई आधुनिक नोड जेएस एपीआई निर्माण तालिम दिँदै।',
        order: 3
      },
      {
        albumId: album2.id,
        title: 'Digital Inclusion Lab Session',
        titleNe: 'डिजिटल समावेशीता प्रयोगात्मक सत्र',
        type: 'photo',
        mediaUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80',
        caption: 'Collaborative code testing with assistive technology user groups.',
        captionNe: 'अपाङ्गता भएका प्रयोगकर्ताहरूसँग सहकार्य गर्दै प्रत्यक्ष कोड परीक्षण।',
        order: 4
      }
    ]
  });
  console.log('✅ Gallery seeded');

  // 11. Site Settings
  await prisma.siteSetting.deleteMany();
  await prisma.siteSetting.createMany({
    data: [
      { key: 'site_title', value: 'Navin Sharma | Lead Software Architect & AI Specialist', type: 'text' },
      { key: 'site_title_ne', value: 'नवीन शर्मा | प्रमुख सफ्टवेयर आर्किटेक्ट तथा एआई विशेषज्ञ', type: 'text' },
      { key: 'meta_description', value: 'Personal professional digital identity of Navin Sharma - Senior Software Architect, AI Specialist, and Digital Accessibility Advocate in Nepal.', type: 'text' },
      { key: 'meta_description_ne', value: 'नवीन शर्माको व्यक्तिगत व्यावसायिक डिजिटल पोर्टल - सफ्टवेयर आर्किटेक्ट, एआई विशेषज्ञ तथा डिजिटल पहुँचयोग्यता अभियन्ता।', type: 'text' },
      { key: 'meta_keywords', value: 'Navin Sharma, Software Architect, Nepal, Node.js, React, Accessibility, WCAG, Artificial Intelligence, Fintech', type: 'text' },
      { key: 'contact_email', value: 'contact@navinsharma.com.np', type: 'text' },
      { key: 'contact_phone', value: '+977-9801234567', type: 'text' },
      { key: 'contact_location', value: 'Kathmandu, Nepal', type: 'text' },
      { key: 'maintenance_mode', value: 'false', type: 'boolean' },
      { key: 'enable_ai_chatbot', value: 'true', type: 'boolean' },
      { key: 'chatbot_system_prompt', value: 'You are "Ask About Me", the intelligent personal AI assistant representing Navin Sharma on his professional website. You are courteous, articulate, and accurate. You answer questions strictly based on Navin\'s real background: he is a Lead Software Architect with 8+ years experience in Node.js, React, AI/LLMs, and WCAG Web Accessibility, based in Kathmandu, Nepal. Respond in the same language as the user (English or Nepali).', type: 'text' }
    ]
  });
  console.log('✅ Site settings seeded');

  console.log('🎉 Seeding successfully completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error during database seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
