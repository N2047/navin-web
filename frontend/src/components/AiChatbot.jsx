import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { Bot, X, Send, Sparkles, Volume2, Square, RefreshCw, User } from 'lucide-react';

function getOfflineReply(message, isNepali) {
  const q = (message || '').toLowerCase();
  if (q.includes('skill') || q.includes('stack') || q.includes('technolog') || q.includes('सीप') || q.includes('प्रविधि') || q.includes('ज्ञान')) {
    return isNepali
      ? 'नवीन शर्माको मुख्य प्राविधिक सीपहरूमा: Node.js, Express, React, TypeScript, PostgreSQL, Prisma, Python, Cloud Architecture (AWS/Docker), र WCAG 2.1 AAA Accessibility पर्दछन्।'
      : 'Navin specializes in Node.js, React, TypeScript, Cloud Architecture, PostgreSQL, Prisma, Generative AI (LLMs & RAG), and WCAG 2.1 AA/AAA Accessibility.';
  }
  if (q.includes('project') || q.includes('काम') || q.includes('प्रोजेक्ट') || q.includes('portfolio') || q.includes('work')) {
    return isNepali
      ? 'प्रमुख प्रोजेक्टहरू:\n• Himalayan Health AI (टेलिमेडिसिन तथा स्वास्थ्य परामर्श)\n• NepalPay Unified Core Gateway (फिनटेक भुक्तानी स्विच)\n• Aawaj Engine (नेपाली ध्वनि तथा पहुँचयोग्यता इन्जिन)\nथप विवरण "Portfolio" पेजमा हेर्न सक्नुहुन्छ।'
      : 'Featured Projects include:\n• Himalayan Health AI (Offline-first telemedicine)\n• NepalPay Unified Core Gateway (High-throughput fintech)\n• Aawaj Engine (Nepali TTS & Accessibility SDK)\nCheck out the "Portfolio" page for live demos!';
  }
  if (q.includes('experience') || q.includes('job') || q.includes('career') || q.includes('अनुभव') || q.includes('कहाँ काम')) {
    return isNepali
      ? 'नवीनसँग ८+ वर्षको व्यावसायिक इन्जिनियरिङ अनुभव छ। हाल उहाँ Lead Software Architect को रूपमा कार्यरत हुनुहुन्छ। विस्तृत टाइमलाइन "Experience" सेक्सनमा हेर्नुहोस्।'
      : 'Navin has over 8+ years of software engineering experience and currently serves as Lead Software Architect. Details are available on the Experience page.';
  }
  if (q.includes('education') || q.includes('degree') || q.includes('अध्ययन') || q.includes('पढाइ') || q.includes('शिक्षा')) {
    return isNepali
      ? 'नवीनले त्रिभुवन विश्वविद्यालयबाट Computer Science & AI मा स्नातकोत्तर (M.Sc. CS) र B.Sc. CSIT मा स्नातक गरेका छन्।'
      : 'Navin holds a Master of Science in Computer Science & AI (M.Sc. CS) and B.Sc. CSIT from Tribhuvan University with Distinction.';
  }
  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('सम्पर्क') || q.includes('hire') || q.includes('काम दिन')) {
    return isNepali
      ? 'नवीनसँग सिधै सम्पर्क गर्न:\n• इमेल: contact@navinsharma.com.np\n• फोन: +977-9801234567\n• स्थान: काठमाडौँ, नेपाल\nवा "Contact" फारम भर्न सक्नुहुन्छ।'
      : 'You can reach Navin at:\n• Email: contact@navinsharma.com.np\n• Phone: +977-9801234567\n• Location: Kathmandu, Nepal\nOr submit an inquiry via the Contact page.';
  }
  return isNepali
    ? 'म नवीन शर्माको भर्चुअल एआई सहायक हुँ। तपाईं उहाँको सीप, अनुभव, शिक्षा, प्रोजेक्ट, वा सम्पर्कका बारेमा सोध्न सक्नुहुन्छ।'
    : "I am Navin Sharma's personal AI Assistant. Feel free to ask about his skills, experience, education, portfolio projects, or how to get in touch!";
}

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const { t, isNepali } = useLanguage();
  const { speak, stopSpeaking, isSpeaking } = useAccessibility();

  // Initial welcome message
  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: isNepali
          ? 'नमस्ते! म नवीन शर्माको डिजिटल एआई सहायक हुँ। मलाई उहाँको सीप, प्रोजेक्टहरू, कार्य अनुभव वा सम्पर्क बारे जे पनि सोध्न सक्नुहुन्छ।'
          : 'Hello! I am Navin Sharma\'s AI Assistant. Ask me anything about his architecture experience, core technical skills, projects, or how to collaborate!'
      }
    ]);
  }, [isNepali]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (messageToSend) => {
    const text = messageToSend || input;
    if (!text || text.trim().length === 0 || loading) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chatbot/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim(), isNepali })
      });
      const data = await res.json();

      const botReply = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: data.reply || getOfflineReply(text.trim(), isNepali)
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      // Graceful offline heuristic response
      const fallbackText = getOfflineReply(text.trim(), isNepali);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: fallbackText
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'bot',
        text: isNepali
          ? 'कुराकानी रिसेट भयो। तपाईं के जान्न चाहनुहुन्छ?'
          : 'Conversation cleared. How can I assist you with Navin\'s profile?'
      }
    ]);
  };

  const sampleQuestions = isNepali
    ? [
        'तपाईं को हुनुहुन्छ?',
        'तपाईंको मुख्य सीपहरू के हुन्?',
        'कुन प्रोजेक्टहरू गर्नुभएको छ?',
        'सम्पर्क कसरी गर्ने?',
        'CV कसरी डाउनलोड गर्ने?'
      ]
    : [
        'Who is Navin?',
        'What are your core skills?',
        'Featured projects?',
        'How to contact you?',
        'Download CV?'
      ];

  return (
    <>
      {/* Floating Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '28px',
          left: '28px',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '12px 20px',
          borderRadius: 'var(--radius-full)',
          background: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
          color: '#ffffff',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          boxShadow: '0 8px 30px rgba(99, 102, 241, 0.45)',
          cursor: 'pointer',
          fontWeight: 700,
          fontSize: '0.95rem',
          transition: 'all 0.25s ease'
        }}
        aria-label="Toggle AI Assistant"
      >
        <Bot size={22} />
        <span>{t('askAboutMe')}</span>
        <span
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: '#10b981',
            boxShadow: '0 0 8px #10b981'
          }}
        />
      </button>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div
          className="animate-slide-up"
          style={{
            position: 'fixed',
            bottom: '88px',
            left: '28px',
            width: '380px',
            maxWidth: 'calc(100vw - 40px)',
            height: '560px',
            maxHeight: 'calc(100vh - 120px)',
            zIndex: 9999,
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
          role="dialog"
          aria-label="AI Assistant Chat"
        >
          {/* Header */}
          <div
            style={{
              padding: '14px 18px',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(16, 185, 129, 0.1) 100%)',
              borderBottom: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff'
                }}
              >
                <Bot size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                  Ask About Me
                </div>
                <div style={{ fontSize: '0.75rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                  {isNepali ? 'अनलाइन सहायक' : 'Grounded Assistant'}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                onClick={clearChat}
                className="btn-icon"
                style={{ width: '32px', height: '32px' }}
                title="Reset conversation"
              >
                <RefreshCw size={14} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="btn-icon"
                style={{ width: '32px', height: '32px' }}
                aria-label="Close assistant"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              background: 'var(--bg-main)'
            }}
          >
            {messages.map((m) => {
              const isBot = m.sender === 'bot';
              return (
                <div
                  key={m.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isBot ? 'flex-start' : 'flex-end',
                    maxWidth: '88%',
                    alignSelf: isBot ? 'flex-start' : 'flex-end'
                  }}
                >
                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: isBot ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
                      background: isBot ? 'var(--bg-surface)' : 'linear-gradient(135deg, var(--primary) 0%, #4338ca 100%)',
                      color: isBot ? 'var(--text-primary)' : '#ffffff',
                      border: isBot ? '1px solid var(--border-color)' : 'none',
                      fontSize: '0.9rem',
                      lineHeight: 1.5,
                      whiteSpace: 'pre-line',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    {m.text}
                  </div>

                  {/* Audio Listen Button for Bot Messages */}
                  {isBot && (
                    <button
                      onClick={() => (isSpeaking ? stopSpeaking() : speak(m.text))}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-muted)',
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        marginTop: '4px',
                        padding: '2px 4px'
                      }}
                    >
                      {isSpeaking ? <Square size={12} /> : <Volume2 size={12} />}
                      <span>{isSpeaking ? (isNepali ? 'रोक्नुहोस्' : 'Stop') : (isNepali ? 'सुन्नुहोस्' : 'Listen')}</span>
                    </button>
                  )}
                </div>
              );
            })}

            {loading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <Sparkles size={16} className="animate-spin" color="var(--primary)" />
                <span>{isNepali ? 'सोच्दैछ...' : 'Searching verified knowledge...'}</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div
            style={{
              padding: '8px 12px',
              background: 'var(--bg-surface)',
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              whiteSpace: 'nowrap'
            }}
          >
            {sampleQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                style={{
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)',
                  borderRadius: 'var(--radius-full)',
                  padding: '4px 10px',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 14px',
              background: 'var(--bg-surface-elevated)',
              borderTop: '1px solid var(--border-color)'
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('typeQuestion')}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: '0.9rem',
                color: 'var(--text-primary)'
              }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: input.trim() ? 'var(--primary)' : 'var(--bg-subtle)',
                color: '#fff',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: input.trim() ? 'pointer' : 'default',
                transition: 'background var(--transition-fast)'
              }}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
