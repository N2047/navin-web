import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    // Navigation
    home: 'Home',
    about: 'About Me',
    skills: 'Skills',
    portfolio: 'Portfolio',
    experience: 'Experience',
    education: 'Education',
    achievements: 'Achievements',
    blog: 'Blog',
    gallery: 'Gallery',
    contact: 'Contact',
    search: 'Search',
    admin: 'Admin',
    adminDashboard: 'Dashboard',

    // Hero Section
    downloadCv: 'Download CV',
    contactMe: 'Get In Touch',
    learnMore: 'Explore My Work',
    aboutMeAction: 'More About Me',
    yearsExp: 'Years of Experience',
    completedProjects: 'Projects Delivered',
    trainingsConducted: 'Workshops & Mentorships',
    majorAchievements: 'Awards & Honors',

    // Headings
    featuredWorks: 'Featured Works',
    featuredWorksSubtitle: 'A curated selection of resilient digital platforms, AI tools, and accessible systems.',
    coreProficiencies: 'Core Competencies',
    coreProficienciesSubtitle: 'Deep engineering and architectural skills spanning modern clouds, AI, and inclusive design.',
    recentMilestones: 'Recent Honors & Recognition',
    latestArticles: 'Latest Thought Leadership',
    latestArticlesSubtitle: 'Deep technical articles, architectural patterns, and accessibility insights.',
    allProjects: 'All Projects',
    viewDetails: 'View Project Details',
    livePreview: 'Live Preview',
    githubRepo: 'GitHub Code',
    technologiesUsed: 'Technologies Used',

    // About Section
    personalBio: 'Personal Biography',
    personalJourney: 'My Journey',
    careerVision: 'Career Vision & Focus',
    expertiseAreas: 'Core Areas of Expertise',

    // Experience & Education
    workTimeline: 'Professional Timeline',
    academicJourney: 'Academic Qualifications',
    present: 'Present',
    responsibilities: 'Key Responsibilities',
    keyAccomplishments: 'Key Accomplishments',
    viewCertificate: 'View Certificate',

    // Blog
    publishedOn: 'Published',
    readingTime: 'Reading Time',
    byAuthor: 'By',
    shareArticle: 'Share this Article',
    relatedPosts: 'Related Articles',
    backToBlogs: 'Back to Blog List',
    allCategories: 'All Categories',

    // Contact
    getInTouchHeading: 'Let\'s Start a Conversation',
    contactSubtitle: 'Whether you want to collaborate on transformative software, discuss AI architectures, or explore digital accessibility, reach out below.',
    fullName: 'Full Name',
    emailAddress: 'Email Address',
    phoneNumber: 'Phone Number',
    subject: 'Subject',
    message: 'Your Message',
    sendMessage: 'Send Message',
    sending: 'Sending...',
    messageSuccess: 'Your message has been sent successfully!',
    directInfo: 'Direct Contact Details',
    officeLocation: 'Location',

    // Accessibility
    accessibilitySettings: 'Accessibility Controls',
    fontSize: 'Font Size',
    normal: 'Normal',
    large: 'Large',
    extraLarge: 'Extra Large',
    contrast: 'Contrast',
    normalContrast: 'Normal Contrast',
    highContrast: 'High Contrast',
    listenText: 'Listen to Page',
    stopListening: 'Stop Audio',
    reducedMotion: 'Reduced Motion',

    // Search & Chatbot
    searchPlaceholder: 'Search projects, blogs, skills, and experience...',
    askAboutMe: 'Ask About Me (AI Assistant)',
    aiIntro: 'Ask me anything about Navin\'s skills, projects, background, and how to collaborate!',
    typeQuestion: 'Type your question...',
    quickQuestions: 'Suggested questions:',

    // Common & Footer
    quickLinks: 'Quick Navigation',
    privacyPolicy: 'Privacy Policy',
    termsOfUse: 'Terms of Use',
    accessibilityStatement: 'Accessibility Statement',
    allRightsReserved: 'All rights reserved.',
    skipToContent: 'Skip to main content'
  },
  ne: {
    // Navigation
    home: 'गृहपृष्ठ',
    about: 'मेरो बारेमा',
    skills: 'सीपहरू',
    portfolio: 'प्रोजेक्टहरू',
    experience: 'कार्य अनुभव',
    education: 'शैक्षिक योग्यता',
    achievements: 'उपलब्धिहरू',
    blog: 'लेखहरू',
    gallery: 'ग्यालरी',
    contact: 'सम्पर्क',
    search: 'खोजी गर्नुहोस्',
    admin: 'प्रशासक',
    adminDashboard: 'ड्यासबोर्ड',

    // Hero Section
    downloadCv: 'बायोडाटा (CV) डाउनलोड',
    contactMe: 'सम्पर्क गर्नुहोस्',
    learnMore: 'मेरो काम हेर्नुहोस्',
    aboutMeAction: 'थप विवरण',
    yearsExp: 'वर्षको अनुभव',
    completedProjects: 'सम्पन्न प्रोजेक्टहरू',
    trainingsConducted: 'तालिम तथा कार्यशाला',
    majorAchievements: 'प्रमुख सम्मान तथा पुरस्कार',

    // Headings
    featuredWorks: 'विशेष प्रोजेक्टहरू',
    featuredWorksSubtitle: 'भरपर्दो डिजिटल प्लेटफर्म, कृत्रिम बुद्धिमत्ता (एआई) र पहुँचयोग्य प्रणालीहरूको संग्रह।',
    coreProficiencies: 'प्रमुख प्राविधिक दक्षताहरू',
    coreProficienciesSubtitle: 'आधुनिक क्लाउड, एआई र सबैका लागि उपयोगी डिजिटल डिजाइनमा विशेष ज्ञान।',
    recentMilestones: 'हालैका सम्मान तथा मान्यता',
    latestArticles: 'नवीनतम प्राविधिक लेखहरू',
    latestArticlesSubtitle: 'सफ्टवेयर आर्किटेक्चर, एआई र डिजिटल पहुँचयोग्यता सम्बन्धी विचारोत्तेजक लेखहरू।',
    allProjects: 'सबै प्रोजेक्टहरू',
    viewDetails: 'विस्तृत विवरण हेर्नुहोस्',
    livePreview: 'प्रत्यक्ष अवलोकन (Live)',
    githubRepo: 'गिटहब कोड',
    technologiesUsed: 'प्रयोग गरिएका प्रविधिहरू',

    // About Section
    personalBio: 'व्यक्तिगत जीवनी',
    personalJourney: 'मेरो प्रविधि यात्रा',
    careerVision: 'व्यावसायिक दृष्टिकोण र उद्देश्य',
    expertiseAreas: 'विशेषज्ञताका क्षेत्रहरू',

    // Experience & Education
    workTimeline: 'व्यावसायिक अनुभवको समयरेखा',
    academicJourney: 'शैक्षिक पृष्ठभूमि तथा योग्यता',
    present: 'हालसम्म',
    responsibilities: 'मुख्य जिम्मेवारीहरू',
    keyAccomplishments: 'विशेष सफलताहरू',
    viewCertificate: 'प्रमाणपत्र हेर्नुहोस्',

    // Blog
    publishedOn: 'प्रकाशन मिति',
    readingTime: 'पढ्न लाग्ने समय',
    byAuthor: 'लेखक',
    shareArticle: 'लेख सेयर गर्नुहोस्',
    relatedPosts: 'सम्बन्धित लेखहरू',
    backToBlogs: 'सबै लेखहरूमा फर्कनुहोस्',
    allCategories: 'सबै वर्गहरू',

    // Contact
    getInTouchHeading: 'कुराकानी सुरु गरौँ',
    contactSubtitle: 'नयाँ सफ्टवेयर निर्माण, एआई प्रणाली वा डिजिटल पहुँचयोग्यता विषयमा सहकार्य गर्न तलको फारम मार्फत सम्पर्क गर्नुहोस्।',
    fullName: 'पूरा नाम',
    emailAddress: 'इमेल ठेगाना',
    phoneNumber: 'फोन नम्बर',
    subject: 'विषय',
    message: 'तपाईंको सन्देश',
    sendMessage: 'सन्देश पठाउनुहोस्',
    sending: 'पठाउँदैछ...',
    messageSuccess: 'तपाईंको सन्देश सफलतापूर्वक पठाइयो!',
    directInfo: 'प्रत्यक्ष सम्पर्क विवरण',
    officeLocation: 'ठेगाना',

    // Accessibility
    accessibilitySettings: 'पहुँचयोग्यता नियन्त्रण',
    fontSize: 'अक्षरको आकार',
    normal: 'सामान्य',
    large: 'ठूलो',
    extraLarge: 'अति ठूलो',
    contrast: 'कन्ट्रास्ट (रंग स्पष्टता)',
    normalContrast: 'सामान्य',
    highContrast: 'उच्च कन्ट्रास्ट',
    listenText: 'पृष्ठ सुन्नुहोस्',
    stopListening: 'आवाज बन्द गर्नुहोस्',
    reducedMotion: 'एनिमेशन कम गर्नुहोस्',

    // Search & Chatbot
    searchPlaceholder: 'प्रोजेक्ट, ब्लग, सीप वा अनुभव खोज्नुहोस्...',
    askAboutMe: 'मेरो बारेमा सोध्नुहोस् (एआई सहायक)',
    aiIntro: 'नवीनको सीप, प्रोजेक्ट, अनुभव वा सहकार्य बारे जे पनि सोध्न सक्नुहुन्छ!',
    typeQuestion: 'आफ्नो प्रश्न यहाँ लेख्नुहोस्...',
    quickQuestions: 'केही सुझाएका प्रश्नहरू:',

    // Common & Footer
    quickLinks: 'महत्त्वपूर्ण लिङ्कहरू',
    privacyPolicy: 'गोपनीयता नीति',
    termsOfUse: 'प्रयोगका सर्तहरू',
    accessibilityStatement: 'पहुँचयोग्यता प्रतिबद्धता',
    allRightsReserved: 'सर्वाधिकार सुरक्षित।',
    skipToContent: 'मुख्य सामग्रीमा जानुहोस्'
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('navin_web_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('navin_web_lang', language);
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'ne' : 'en'));
  };

  const t = (key) => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  // Helper for bilingual content from database models
  const getContent = (enText, neText) => {
    if (language === 'ne' && neText && neText.trim().length > 0) {
      return neText;
    }
    return enText || '';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, getContent, isNepali: language === 'ne' }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
