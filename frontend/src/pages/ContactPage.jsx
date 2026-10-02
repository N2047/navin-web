import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../contexts/ToastContext';
import TextToSpeechButton from '../components/TextToSpeechButton';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Sparkles
} from 'lucide-react';

export default function ContactPage() {
  const { profile, socialLinks } = useOutletContext() || {};
  const { t, getContent, isNepali } = useLanguage();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    honeypot: '' // Anti-spam trap
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg(isNepali ? 'कृपया नाम, इमेल र सन्देश अनिवार्य भर्नुहोस्।' : 'Please provide your name, email, and message.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        toast.success(t('messageSuccess'));
        setFormData({ name: '', email: '', phone: '', subject: '', message: '', honeypot: '' });
      } else {
        setErrorMsg(data.message || 'Failed to send message.');
        toast.error(data.message || 'Failed to send message.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again.');
      toast.error('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const contactSpeech = `${t('getInTouchHeading')}. ${t('contactSubtitle')}`;

  return (
    <div style={{ padding: '60px 0 100px 0' }}>
      <div className="container">
        {/* Header */}
        <div className="section-title-wrap">
          <div className="section-tag">
            <MessageSquare size={14} />
            <span>{t('contact')}</span>
          </div>
          <h1 className="section-heading">{t('getInTouchHeading')}</h1>
          <p className="section-subtitle">{t('contactSubtitle')}</p>
          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
            <TextToSpeechButton textToRead={contactSpeech} />
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'flex-start'
          }}
        >
          {/* Direct Details Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass-panel" style={{ padding: '36px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '20px' }}>
                {t('directInfo')}
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '28px' }}>
                {isNepali
                  ? 'म सामान्यतया २४ घण्टाभित्र इमेलको जवाफ दिन्छु। तपाईं सीधै कल वा इमेल पनि गर्न सक्नुहुन्छ।'
                  : 'I usually respond to serious inquiries within 24 hours. Feel free to connect directly via email or phone.'}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '0.95rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: 'var(--primary-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--primary)'
                    }}
                  >
                    <Mail size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Email</div>
                    <a
                      href={`mailto:${profile?.email || 'contact@navinsharma.com.np'}`}
                      style={{ fontWeight: 600, color: 'var(--text-primary)' }}
                    >
                      {profile?.email || 'contact@navinsharma.com.np'}
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: 'rgba(16, 185, 129, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#10b981'
                    }}
                  >
                    <Phone size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Phone</div>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      {profile?.phone || '+977-9801234567'}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: 'rgba(245, 158, 11, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#f59e0b'
                    }}
                  >
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('officeLocation')}</div>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      {getContent(profile?.location, profile?.locationNe) || 'Kathmandu, Nepal'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Consultation Highlight */}
            <div
              className="glass-card"
              style={{
                padding: '24px',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <Sparkles size={20} color="var(--primary)" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                  {isNepali ? 'सल्लाह तथा परामर्श' : 'Advisory & Mentorship'}
                </h3>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                {isNepali
                  ? 'नेपालका विद्यार्थीहरू, इन्जिनियरहरू र सामाजिक संस्थाहरूका लागि डिजिटल पहुँचयोग्यता विषयमा निःशुल्क मार्गदर्शन उपलब्ध छ।'
                  : 'Available for pro-bono consultations regarding digital accessibility standards for civic institutions and NGOs.'}
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="glass-panel" style={{ padding: '36px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '24px' }}>
              {isNepali ? 'सन्देश फारम' : 'Send a Message'}
            </h2>

            {submitted ? (
              <div
                className="animate-slide-up"
                style={{
                  padding: '28px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  textAlign: 'center'
                }}
              >
                <CheckCircle2 size={48} color="#10b981" style={{ margin: '0 auto 16px auto' }} />
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '8px' }}>
                  {t('messageSuccess')}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '20px' }}>
                  {isNepali
                    ? 'तपाईंको सन्देश सुरक्षित रूपमा प्राप्त भयो। म चाँडै सम्पर्क गर्नेछु।'
                    : 'Your message was successfully received in my inbox. I will review and respond shortly.'}
                </p>
                <button onClick={() => setSubmitted(false)} className="btn btn-secondary btn-sm">
                  {isNepali ? 'अर्को सन्देश पठाउनुहोस्' : 'Send Another Message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {errorMsg && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(239, 68, 68, 0.12)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#ef4444',
                      fontSize: '0.875rem',
                      marginBottom: '20px'
                    }}
                  >
                    <AlertCircle size={18} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Honeypot hidden input */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  style={{ display: 'none' }}
                  tabIndex="-1"
                  autoComplete="off"
                />

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-name">
                      {t('fullName')} *
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Jane Doe"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-email">
                      {t('emailAddress')} *
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="jane@example.com"
                      className="form-input"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-phone">
                      {t('phoneNumber')}
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+977-98XXXXXXXX"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-subject">
                      {t('subject')}
                    </label>
                    <input
                      type="text"
                      id="contact-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Collaboration / Project Inquiry"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">
                    {t('message')} *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder={isNepali ? 'तपाईंको सन्देश यहाँ लेख्नुहोस्...' : 'Share your ideas or message here...'}
                    className="form-textarea"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', gap: '8px' }}
                >
                  <Send size={18} />
                  <span>{submitting ? t('sending') : t('sendMessage')}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
