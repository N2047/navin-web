// Fallback data for static deployments (such as InfinityFree, GitHub Pages, or Netlify)
// when the Node.js backend server is not directly reachable.

export const initialProfile = {
  id: 'navin-profile-1',
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
  profilePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  heroImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
  email: 'contact@navinsharma.com.np',
  phone: '+977-9801234567',
  location: 'Kathmandu, Nepal',
  locationNe: 'काठमाडौँ, नेपाल',
  cvUrl: '#',
  cvFileName: 'Navin_Sharma_CV.pdf',
  projectsCompleted: 38,
  yearsExperience: 8,
  trainingsCount: 24,
  achievementsCount: 15
};

export const initialSocialLinks = [
  { id: '1', platform: 'GitHub', url: 'https://github.com/N2047/navin-web', icon: 'Github', order: 1, isVisible: true },
  { id: '2', platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'Linkedin', order: 2, isVisible: true },
  { id: '3', platform: 'Twitter / X', url: 'https://x.com', icon: 'Twitter', order: 3, isVisible: true },
  { id: '4', platform: 'YouTube', url: 'https://youtube.com', icon: 'Youtube', order: 4, isVisible: true },
  { id: '5', platform: 'Facebook', url: 'https://facebook.com', icon: 'Facebook', order: 5, isVisible: true }
];

export const initialSkillCategories = [
  {
    id: 'cat-1',
    name: 'Full-Stack & Cloud Architecture',
    nameNe: 'फुल-स्ट्याक तथा क्लाउड आर्किटेक्चर',
    slug: 'full-stack-cloud',
    order: 1,
    skills: [
      { id: 's1', name: 'Node.js & Express / NestJS', proficiency: 96, level: 'Expert', isFeatured: true },
      { id: 's2', name: 'React 18 & Next.js Ecosystem', proficiency: 94, level: 'Expert', isFeatured: true },
      { id: 's3', name: 'TypeScript & Modern JavaScript', proficiency: 92, level: 'Expert', isFeatured: true },
      { id: 's4', name: 'PostgreSQL, Prisma & Redis', proficiency: 90, level: 'Expert', isFeatured: true },
      { id: 's5', name: 'Docker, Kubernetes & CI/CD', proficiency: 85, level: 'Advanced', isFeatured: false },
      { id: 's6', name: 'AWS & Cloudflare Edge Services', proficiency: 86, level: 'Advanced', isFeatured: false }
    ]
  },
  {
    id: 'cat-2',
    name: 'AI, Machine Learning & NLP',
    nameNe: 'कृत्रिम बौद्धिकता, मेसिन लर्निङ तथा एनएलपी',
    slug: 'ai-ml-nlp',
    order: 2,
    skills: [
      { id: 's7', name: 'Large Language Models (LLMs) & RAG', proficiency: 90, level: 'Advanced', isFeatured: true },
      { id: 's8', name: 'Python (PyTorch, Hugging Face, FastAPI)', proficiency: 88, level: 'Advanced', isFeatured: true },
      { id: 's9', name: 'Devanagari NLP & Local Speech Systems', proficiency: 87, level: 'Advanced', isFeatured: false },
      { id: 's10', name: 'Vector DBs (Pinecone, Chroma, pgvector)', proficiency: 84, level: 'Advanced', isFeatured: false }
    ]
  },
  {
    id: 'cat-3',
    name: 'Accessibility (A11y) & UX Architecture',
    nameNe: 'डिजिटल पहुँचयोग्यता तथा प्रयोगकर्ता अनुभव',
    slug: 'accessibility-ux',
    order: 3,
    skills: [
      { id: 's11', name: 'WCAG 2.1 / 2.2 AA & AAA Standards', proficiency: 98, level: 'Expert', isFeatured: true },
      { id: 's12', name: 'Screen Reader Testing (NVDA, JAWS, VoiceOver)', proficiency: 94, level: 'Expert', isFeatured: true },
      { id: 's13', name: 'Inclusive Design & Universal Ergonomics', proficiency: 92, level: 'Expert', isFeatured: false }
    ]
  }
];

export const initialProjects = [
  {
    id: 'proj-1',
    title: 'Himalayan Health AI - Telemedicine & Triage',
    titleNe: 'हिमालयन हेल्थ एआई - टेलिमेडिसिन तथा स्वास्थ्य परामर्श',
    slug: 'himalayan-health-ai',
    category: 'AI & Healthcare',
    categoryNe: 'एआई तथा स्वास्थ्य प्रविधि',
    featuredImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'AI-assisted medical symptom triage platform designed for remote mountainous regions of Nepal with offline-first synchronization.',
    shortDescriptionNe: 'नेपालका दुर्गम हिमाली क्षेत्रहरूका लागि डिजाइन गरिएको अफलाइन-सक्षम एआई स्वास्थ्य परीक्षण तथा परामर्श प्रणाली।',
    fullDescription: 'Himalayan Health AI is an offline-first distributed telemedicine and diagnostic triage platform tailored to rugged geography where internet connectivity is intermittent. It uses a quantized on-device NLP model trained on clinical protocols to prioritize medical assistance in both Nepali and English.',
    fullDescriptionNe: 'हिमालयन हेल्थ एआई एक विकेन्द्रित टेलिमेडिसिन प्रणाली हो, जसले इन्टरनेट नभएको अवस्थामा पनि काम गर्न सक्छ। यसले देवनागरी भाषामा बिरामीका लक्षणहरू विश्लेषण गरी उचित प्राथमिक उपचार र डाक्टरसँग परामर्शको व्यवस्था गर्दछ।',
    technologies: JSON.stringify(['Node.js', 'React', 'FastAPI', 'Offline SQLite', 'WebSockets', 'WCAG AAA']),
    projectUrl: 'https://github.com/N2047/navin-web',
    githubUrl: 'https://github.com/N2047/navin-web',
    isFeatured: true,
    order: 1
  },
  {
    id: 'proj-2',
    title: 'NepalPay Unified Core Fintech Gateway',
    titleNe: 'नेपालपे युनिफाइड कोर फिनटेक गेटवे',
    slug: 'nepalpay-unified-gateway',
    category: 'Fintech & Cloud Systems',
    categoryNe: 'फिनटेक तथा क्लाउड प्रणाली',
    featuredImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'High-throughput payment gateway processing 100,000+ daily transactions with 99.999% availability and banking-grade encryption.',
    shortDescriptionNe: 'दैनिक १ लाखभन्दा बढी भुक्तानी कारोबार सम्पन्न गर्ने सुरक्षित, तीव्र र भरपर्दो डिजिटल वित्तीय पूर्वाधार।',
    fullDescription: 'Engineered a next-generation distributed payment settlement switch handling national interoperable transactions across commercial banks and microfinance institutions.',
    fullDescriptionNe: 'नेपालका वाणिज्य बैंकहरू तथा वित्तीय संस्थाहरूबीच अन्तर-आबद्धता कायम गर्ने उच्च क्षमतायुक्त भुक्तानी स्विचको सफल निर्माण।',
    technologies: JSON.stringify(['Node.js', 'Redis Cluster', 'PostgreSQL', 'Docker', 'OAuth2 / mTLS']),
    projectUrl: 'https://github.com/N2047/navin-web',
    githubUrl: 'https://github.com/N2047/navin-web',
    isFeatured: true,
    order: 2
  },
  {
    id: 'proj-3',
    title: 'Aawaj: Devanagari Voice & Accessibility Engine',
    titleNe: 'आवाज: देवनागरी ध्वनि तथा डिजिटल पहुँच इन्जिन',
    slug: 'aawaj-accessibility-engine',
    category: 'Speech & Accessibility',
    categoryNe: 'ध्वनि तथा पहुँचयोग्यता',
    featuredImage: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Browser-native text-to-speech and screen-reading assistant optimized for Nepali language dialects and visually impaired citizens.',
    shortDescriptionNe: 'दृष्टिविहीन नागरिकहरूका लागि विशेष रूपमा तयार गरिएको नेपाली भाषाको टेक्स्ट-टु-स्पीच तथा पहुँचयोग्य वेब इन्जिन।',
    fullDescription: 'Aawaj provides an embeddable accessibility SDK that adds high-contrast modes, dynamic font resizers, and high-fidelity Nepali synthetic speech directly inside web applications.',
    fullDescriptionNe: 'आवाज एक खुला-स्रोत पहुँचयोग्यता सफ्टवेयर हो जसले कुनै पनि वेबसाइटलाई दृष्टिविहीन तथा विभिन्न शारीरिक क्षमता भएका नागरिकमैत्री बनाउँछ।',
    technologies: JSON.stringify(['Web Speech API', 'React', 'Audio Worklets', 'WAI-ARIA', 'Vanilla CSS']),
    projectUrl: 'https://github.com/N2047/navin-web',
    githubUrl: 'https://github.com/N2047/navin-web',
    isFeatured: true,
    order: 3
  }
];

export const initialExperiences = [
  {
    id: 'exp-1',
    companyName: 'Apex Cloud & Cognitive Labs',
    companyNameNe: 'एपेक्स क्लाउड तथा कग्निटिभ ल्याब्स',
    position: 'Lead Software Architect',
    positionNe: 'प्रमुख सफ्टवेयर आर्किटेक्ट',
    jobType: 'Full-time',
    location: 'Kathmandu, Nepal / Hybrid',
    locationNe: 'काठमाडौँ, नेपाल',
    startDate: '2022-04-01T00:00:00.000Z',
    isCurrent: true,
    description: 'Directing the architecture of mission-critical cloud backends, microservices migration, and enterprise AI integrations across South Asia.',
    descriptionNe: 'क्लाउड पूर्वाधार, आधुनिक माइक्रोसर्भिसेज र इन्टरप्राइज एआई प्रणालीहरूको मुख्य आर्किटेक्चर तथा इन्जिनियरिङ टोलीको नेतृत्व।',
    technologies: JSON.stringify(['Node.js', 'NestJS', 'React', 'Kubernetes', 'PostgreSQL', 'LangChain', 'AWS'])
  },
  {
    id: 'exp-2',
    companyName: 'NextGen Financial Technologies',
    companyNameNe: 'नेक्स्टजेन फाइनान्सियल टेक्नोलोजिज',
    position: 'Senior Full-Stack Engineer & Team Lead',
    positionNe: 'वरिष्ठ फुल-स्ट्याक इन्जिनियर तथा टोली प्रमुख',
    jobType: 'Full-time',
    location: 'Lalitpur, Nepal',
    locationNe: 'ललितपुर, नेपाल',
    startDate: '2019-02-01T00:00:00.000Z',
    endDate: '2022-03-31T00:00:00.000Z',
    isCurrent: false,
    description: 'Led a team of 12 software developers in launching cross-border remittance switches and mobile banking integrations.',
    descriptionNe: '१२ जना सफ्टवेयर विकासकर्ताको टोलीलाई परिचालन गरी रेमिट्यान्स भुक्तानी प्रणाली र मोबाइल बैंकिङ सोलुसन्सको सफल निर्माण।',
    technologies: JSON.stringify(['Express.js', 'React', 'TypeScript', 'Docker', 'Redis', 'Kafka'])
  }
];

export const initialEducation = [
  {
    id: 'edu-1',
    degree: 'Master of Science in Computer Science & AI',
    degreeNe: 'कम्प्युटर विज्ञान तथा एआईमा स्नातकोत्तर (M.Sc. CS)',
    institution: 'Tribhuvan University, Institute of Science & Technology',
    institutionNe: 'त्रिभुवन विश्वविद्यालय, विज्ञान तथा प्रविधि अध्ययन संस्थान',
    fieldOfStudy: 'Artificial Intelligence & Distributed Systems',
    fieldOfStudyNe: 'कृत्रिम बौद्धिकता तथा विकेन्द्रित प्रणाली',
    startYear: 2017,
    endYear: 2019,
    isCurrent: false,
    grade: 'Distinction (4.0 GPA equivalent)',
    description: 'Specialized in natural language processing for low-resource languages and high-performance distributed computing.',
    descriptionNe: 'नेपाली तथा दक्षिण एसियाली भाषाहरूको प्राकृतिक भाषा प्रशोधन (NLP) र उच्च-क्षमतायुक्त क्लाउड प्रणालीमा विशेष अनुसन्धान।'
  },
  {
    id: 'edu-2',
    degree: 'Bachelor of Science in Computer Science & IT (B.Sc. CSIT)',
    degreeNe: 'कम्प्युटर विज्ञान तथा सूचना प्रविधिमा स्नातक (B.Sc. CSIT)',
    institution: 'Tribhuvan University',
    institutionNe: 'त्रिभुवन विश्वविद्यालय',
    fieldOfStudy: 'Software Engineering & Database Architecture',
    fieldOfStudyNe: 'सफ्टवेयर इन्जिनियरिङ तथा डाटाबेस आर्किटेक्चर',
    startYear: 2012,
    endYear: 2016,
    isCurrent: false,
    grade: 'First Division with Honors',
    description: 'Focused on algorithms, data structures, relational database design, and web accessibility standards.',
    descriptionNe: 'एल्गोरिदम, डाटा स्ट्रक्चर्स, रिलेसनल डाटाबेस डिजाइन र वेब विकासमा उत्कृष्ट नतिजा सहित अध्ययन सम्पन्न।'
  }
];

export const initialAchievements = [
  {
    id: 'ach-1',
    title: 'National Digital Innovation Award 2024',
    titleNe: 'राष्ट्रिय डिजिटल नवप्रवर्तन पुरस्कार २०२४',
    issuer: 'Ministry of Communication & Information Technology (MoCIT)',
    issuerNe: 'सञ्चार तथा सूचना प्रविधि मन्त्रालय, नेपाल सरकार',
    issueDate: '2024-05-02T00:00:00.000Z',
    category: 'National Award',
    categoryNe: 'राष्ट्रिय पुरस्कार',
    description: 'Conferred for building the open-source accessible civic reporting portal deployed across 14 municipalities.',
    descriptionNe: '१४ वटा स्थानीय तहहरूमा सफल प्रयोगमा आएको पहुँचयोग्य डिजिटल नागरिक पोर्टल निर्माण गरेबापत प्रदान गरिएको।'
  },
  {
    id: 'ach-2',
    title: 'AWS Certified Solutions Architect - Professional',
    titleNe: 'एडब्ल्युएस प्रमाणित सोलुसन्स आर्किटेक्ट - प्रोफेसनल',
    issuer: 'Amazon Web Services (AWS)',
    issuerNe: 'अमेजन वेब सर्भिसेज (AWS)',
    issueDate: '2023-08-15T00:00:00.000Z',
    category: 'Global Certification',
    categoryNe: 'अन्तर्राष्ट्रिय प्रमाणीकरण',
    description: 'Validated expertise in architecting resilient, fault-tolerant, and secure enterprise architectures on AWS cloud.',
    descriptionNe: 'क्लाउड पूर्वाधारमा उच्च क्षमतायुक्त, सुरक्षित र आधुनिक आर्किटेक्चर निर्माणमा अन्तर्राष्ट्रिय प्रमाणीकरण।'
  }
];

export const initialBlogPosts = [
  {
    id: 'blog-1',
    title: 'Architecting Resilient Full-Stack Systems: From Monolith to Microservices',
    titleNe: 'दिगो फुल-स्ट्याक प्रणाली निर्माण: मोनोलिथबाट आधुनिक माइक्रोसर्भिसेजसम्म',
    slug: 'architecting-resilient-fullstack-systems',
    summary: 'A deep architectural dive into decomposing legacy systems into scalable Node.js services, database partitioning, and event-driven communication.',
    summaryNe: 'ठूला सफ्टवेयर प्रणालीहरूलाई तीव्र, भरपर्दो र स्केलेबल बनाउन अपनाउनुपर्ने प्राविधिक रणनीतिहरूको विस्तृत विश्लेषण।',
    content: `# Architecting Resilient Full-Stack Systems

Building software that scales requires balancing simplicity with architectural longevity. In this article, we examine the migration patterns that empower growing systems to thrive under 100x traffic loads.

### 1. The Power of Modularity
Start modular before going distributed. Well-defined service boundaries within a structured codebase prevent premature network overhead while keeping your domain models clean.

### 2. Database Decoupling & Caching
Relying on a single relational database for hot transactional paths creates bottlenecks. Employ Redis for session state and rate limits, while maintaining strict ACID guarantees on primary stores.

### 3. Comprehensive Accessibility
Performance is an accessibility feature. A fast, WCAG AAA-compliant web application reaches every citizen regardless of hardware or physical ability.`,
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    tags: JSON.stringify(['Architecture', 'Node.js', 'Microservices', 'System Design']),
    category: 'Software Architecture',
    readingTime: 6,
    viewsCount: 384,
    publishedAt: '2026-09-15T00:00:00.000Z',
    isPublished: true
  },
  {
    id: 'blog-2',
    title: 'Web Accessibility (WCAG 2.2): Why Inclusive Design Matters for Everyone',
    titleNe: 'वेब पहुँचयोग्यता (WCAG २.२): किन समावेशी डिजाइन सबैका लागि अपरिहार्य छ?',
    slug: 'web-accessibility-inclusive-design',
    summary: 'How implementing semantic HTML, keyboard navigation, screen reader testing, and high-contrast modes unlocks your product to 1.3 billion people globally.',
    summaryNe: 'सबै नागरिकहरू, विशेषगरी दृष्टिविहीन तथा फरक क्षमता भएका व्यक्तिहरूका लागि वेबसाइट सहज बनाउने उपायहरू।',
    content: `# Web Accessibility: Engineering for Every Human

Digital accessibility is not an afterthought; it is a fundamental human right in the modern digital age.

### The Four Principles of WCAG (POUR)
- **Perceivable:** Information and UI components must be presentable to users in ways they can perceive.
- **Operable:** UI components and navigation must be operable via keyboard, voice, or switch controls.
- **Understandable:** Content and operation must be clear and predictable.
- **Robust:** Content must be reliably interpreted by a wide variety of user agents, including assistive technologies.`,
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    tags: JSON.stringify(['Accessibility', 'A11y', 'WCAG', 'Frontend']),
    category: 'Accessibility & UX',
    readingTime: 5,
    viewsCount: 512,
    publishedAt: '2026-09-28T00:00:00.000Z',
    isPublished: true
  }
];

export const initialGalleryItems = [
  {
    id: 'g-1',
    title: 'National Tech Symposium Keynote',
    titleNe: 'राष्ट्रिय प्रविधि सम्मेलनमा मुख्य मन्तव्य',
    imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80',
    category: 'Speaking',
    categoryNe: 'प्रवचन तथा कार्यशाला',
    albumName: 'Conferences & Keynotes',
    albumNameNe: 'सम्मेलन तथा कार्यशालाहरू'
  },
  {
    id: 'g-2',
    title: 'Accessibility & Inclusive Tech Workshop',
    titleNe: 'पहुँचयोग्यता तथा समावेशी प्रविधि कार्यशाला',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    category: 'Mentorship',
    categoryNe: 'मेन्टरिङ',
    albumName: 'Mentorship & Community',
    albumNameNe: 'सामुदायिक योगदान'
  }
];
