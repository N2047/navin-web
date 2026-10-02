const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Built-in intelligent context-grounded response engine
const buildLocalAnswer = (query = '', profile, skills, projects, experience, education, isNepali) => {
  const q = query.toLowerCase();

  // Detect language if not explicitly provided
  const devanagariRegex = /[\u0900-\u097F]/;
  const isQueryNepali = isNepali || devanagariRegex.test(query);

  // Intent: Identity / Introduction / Who are you
  if (
    q.includes('who are you') ||
    q.includes('about you') ||
    q.includes('who is') ||
    q.includes('introduce') ||
    q.includes('को हुनुहुन्छ') ||
    q.includes('परिचय') ||
    q.includes('बारेमा')
  ) {
    if (isQueryNepali) {
      return `नमस्ते! म ${profile?.fullNameNe || 'नवीन शर्मा'} हुँ — ${profile?.professionalTitleNe || 'प्रमुख सफ्टवेयर आर्किटेक्ट तथा एआई विशेषज्ञ'}। ${profile?.shortBioNe || ''} म विशेषगरी सुरक्षित डिजिटल आर्किटेक्चर, जेनेरेटिभ एआई, र सबैका लागि पहुँचयोग्य (Accessible) सफ्टवेयर निर्माणमा काम गर्दछु।`;
    }
    return `Hello! I am ${profile?.fullName || 'Navin Sharma'}, a ${profile?.professionalTitle || 'Lead Software Architect & AI Specialist'}. ${profile?.shortBio || ''} I specialize in distributed enterprise backends, generative AI solutions, and inclusive digital accessibility (WCAG).`;
  }

  // Intent: Skills
  if (
    q.includes('skill') ||
    q.includes('tech stack') ||
    q.includes('technolog') ||
    q.includes('सीप') ||
    q.includes('प्रविधि') ||
    q.includes('के के आउँछ')
  ) {
    const topSkills = skills.slice(0, 8).map(s => isQueryNepali ? (s.nameNe || s.name) : s.name).join(', ');
    if (isQueryNepali) {
      return `मेरो प्रमुख प्राविधिक सीपहरूमा: ${topSkills} समावेश छन्। म विशेष गरी Node.js, React, Cloud Architecture, Generative AI (LLMs & RAG), र WCAG 2.1 Web Accessibility मा विशेषज्ञता राख्दछु। तपाईं थप विवरण "Skills" पेजमा हेर्न सक्नुहुन्छ।`;
    }
    return `My core technical competencies include: ${topSkills}. I specialize in full-stack JavaScript/TypeScript (Node.js & React), cloud-native microservices, LLM prompt engineering & RAG pipelines, and digital accessibility compliance. You can explore all details on the Skills section.`;
  }

  // Intent: Projects / Portfolio
  if (
    q.includes('project') ||
    q.includes('portfolio') ||
    q.includes('work') ||
    q.includes('काम') ||
    q.includes('प्रोजेक्ट') ||
    q.includes('के बनाउनुभएको')
  ) {
    const projectList = projects.slice(0, 3).map(p => `• ${isQueryNepali ? (p.titleNe || p.title) : p.title}: ${isQueryNepali ? (p.shortDescNe || p.shortDesc) : p.shortDesc}`).join('\n');
    if (isQueryNepali) {
      return `मैले विकास गरेका केही मुख्य प्रोजेक्टहरू यस प्रकार छन्:\n${projectList}\n\nविस्तृत विवरणका लागि वेबसाइटको "Portfolio" पृष्ठ अवलोकन गर्नुहोस्।`;
    }
    return `Here are some of my featured engineering projects:\n${projectList}\n\nFeel free to explore live previews and code repositories in the "Portfolio" section.`;
  }

  // Intent: Experience
  if (
    q.includes('experience') ||
    q.includes('job') ||
    q.includes('career') ||
    q.includes('company') ||
    q.includes('अनुभव') ||
    q.includes('जागिर') ||
    q.includes('कहाँ काम')
  ) {
    const expList = experience.slice(0, 3).map(e => `• ${e.position} at ${e.organization} (${e.startDate})`).join('\n');
    if (isQueryNepali) {
      return `मेरो ८ वर्षभन्दा बढीको व्यावसायिक अनुभव छ। हाल म एपेक्स डिजिटल सिस्टम्समा प्रमुख सफ्टवेयर आर्किटेक्टको रूपमा कार्यरत छु:\n${expList}\n\nविस्तृत कार्य विवरण "Experience" सेक्सनमा उपलब्ध छ।`;
    }
    return `I have over 8+ years of professional engineering experience. Currently serving as Lead Software Architect:\n${expList}\n\nCheck out the "Experience" page for the interactive career timeline.`;
  }

  // Intent: Education
  if (
    q.includes('education') ||
    q.includes('degree') ||
    q.includes('university') ||
    q.includes('college') ||
    q.includes('अध्ययन') ||
    q.includes('पढाइ') ||
    q.includes('शिक्षा')
  ) {
    const eduList = education.map(e => `• ${e.degree} in ${e.fieldOfStudy} from ${e.institution}`).join('\n');
    if (isQueryNepali) {
      return `मेरो शैक्षिक पृष्ठभूमि:\n${eduList}\n\nमैले त्रिभुवन विश्वविद्यालयबाट कम्प्युटर विज्ञान तथा सूचना प्रविधिमा स्नातकोत्तर (M.Sc. CSIT) उपाधि हासिल गरेको छु।`;
    }
    return `My educational credentials:\n${eduList}\n\nI earned my Master of Science in Computer Science and IT with distinction honors from Tribhuvan University.`;
  }

  // Intent: Contact
  if (
    q.includes('contact') ||
    q.includes('email') ||
    q.includes('phone') ||
    q.includes('reach') ||
    q.includes('hire') ||
    q.includes('सम्पर्क') ||
    q.includes('फोन') ||
    q.includes('इमेल')
  ) {
    if (isQueryNepali) {
      return `तपाईं मलाई इमेल मार्फत ${profile?.email || 'contact@navinsharma.com.np'} मा वा फोन नं. ${profile?.phone || '+977-9801234567'} मा प्रत्यक्ष सम्पर्क गर्न सक्नुहुन्छ। साथै, यस वेबसाइटको "Contact" फारम भरेर पनि सन्देश पठाउन सक्नुहुन्छ!`;
    }
    return `You can reach me directly via email at ${profile?.email || 'contact@navinsharma.com.np'} or by phone at ${profile?.phone || '+977-9801234567'}. You can also leave a message directly on the "Contact" page!`;
  }

  // Intent: CV / Resume
  if (q.includes('cv') || q.includes('resume') || q.includes('बायोडाटा')) {
    if (isQueryNepali) {
      return `तपाईं मेरो अद्यावधिक CV/बायोडाटा होमपेजको "Download CV" बटनबाट सीधै डाउनलोड गर्न सक्नुहुन्छ।`;
    }
    return `You can view and download my complete up-to-date Curriculum Vitae (PDF) right from the "Download CV" button on the home page or navigation menu.`;
  }

  // Default response
  if (isQueryNepali) {
    return `म नवीन शर्माको भर्चुअल सहायक हुँ। तपाईं मसँग उहाँको परिचय, सीपहरू (Skills), प्रोजेक्टहरू (Portfolio), कार्य अनुभव (Experience), शिक्षा वा सम्पर्क विवरण बारेमा सोध्न सक्नुहुन्छ। म तपाईंलाई कसरी सहयोग गर्न सक्छु?`;
  }
  return `I am Navin Sharma's virtual assistant. You can ask me about his technical background, skills, featured projects, career timeline, education, or how to get in touch. How can I help you today?`;
};

const askAssistant = async (req, res) => {
  try {
    const { message, isNepali } = req.body;
    if (!message || message.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Message is required.' });
    }

    // Retrieve approved personal & professional context from database
    const [profile, skills, projects, experience, education, setting] = await Promise.all([
      prisma.profile.findFirst(),
      prisma.skill.findMany({ take: 15, orderBy: { percentage: 'desc' } }),
      prisma.portfolio.findMany({ take: 6, select: { title: true, titleNe: true, shortDesc: true, shortDescNe: true, category: true } }),
      prisma.experience.findMany({ take: 4, select: { organization: true, position: true, startDate: true } }),
      prisma.education.findMany({ select: { institution: true, degree: true, fieldOfStudy: true } }),
      prisma.siteSetting.findUnique({ where: { key: 'enable_ai_chatbot' } })
    ]);

    if (setting && setting.value === 'false') {
      return res.json({
        success: true,
        reply: isNepali ? 'सहायक अहिले उपलब्ध छैन।' : 'The assistant is currently turned off.'
      });
    }

    // Check if an external LLM key is configured in env
    const geminiKey = process.env.GEMINI_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    if (geminiKey) {
      try {
        const promptContext = `You are "Ask About Me", the personal AI assistant on Navin Sharma's professional website.
Approved Information:
Name: ${profile?.fullName} (${profile?.fullNameNe})
Title: ${profile?.professionalTitle}
Bio: ${profile?.shortBio}
Email: ${profile?.email}
Phone: ${profile?.phone}
Location: ${profile?.location}
Top Skills: ${skills.map(s => s.name).join(', ')}
Key Projects: ${projects.map(p => p.title).join('; ')}
Experience: ${experience.map(e => `${e.position} at ${e.organization}`).join('; ')}
Education: ${education.map(e => `${e.degree} from ${e.institution}`).join('; ')}

Instructions:
1. Answer visitor questions politely and concisely based strictly on the approved information above.
2. If asked something unknown, politely offer the visitor to reach out via the Contact form or email.
3. Match the user's language (English or Nepali).

Visitor's message: "${message}"`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptContext }] }]
          })
        });

        if (response.ok) {
          const data = await response.json();
          const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (generatedText) {
            return res.json({ success: true, reply: generatedText });
          }
        }
      } catch (llmErr) {
        console.error('LLM API error, falling back to local engine:', llmErr.message);
      }
    }

    // Default: Fast, reliable, deterministic local grounded knowledge engine
    const reply = buildLocalAnswer(message, profile, skills, projects, experience, education, isNepali);
    res.json({ success: true, reply });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Assistant error.', error: error.message });
  }
};

module.exports = { askAssistant };
