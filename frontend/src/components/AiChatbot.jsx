import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { Bot, X, Send, Sparkles, Volume2, Square, RefreshCw, User } from 'lucide-react';

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
        text: data.reply || (isNepali ? 'माफ गर्नुहोस्, अहिले जवाफ प्राप्त गर्न सकिएन।' : 'Sorry, I couldn\'t process that inquiry right now.')
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: isNepali ? 'सर्भरसँग सम्पर्क हुन सकेन।' : 'Connection error. Please try again.'
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
