import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Mail, Phone, MapPin, Heart, ArrowUp } from 'lucide-react';
import { Github, Linkedin, Twitter, Youtube, Facebook } from './SocialIcons';

export default function Footer({ profile, socialLinks }) {
  const { t, getContent, isNepali } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSocialIcon = (platform = '') => {
    const p = platform.toLowerCase();
    if (p.includes('git')) return <Github size={18} />;
    if (p.includes('link')) return <Linkedin size={18} />;
    if (p.includes('twit') || p.includes('x')) return <Twitter size={18} />;
    if (p.includes('you')) return <Youtube size={18} />;
    if (p.includes('face')) return <Facebook size={18} />;
    return <Mail size={18} />;
  };

  return (
    <footer
      style={{
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-color)',
        padding: '60px 0 30px 0',
        marginTop: 'auto'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '40px',
            marginBottom: '48px'
          }}
        >
          {/* Brand & Summary */}
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '12px' }}>
              {isNepali ? 'नवीन शर्मा' : 'Navin Sharma'}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', marginBottom: '20px', lineHeight: 1.6 }}>
              {getContent(profile?.tagline, profile?.taglineNe) ||
                'Engineering resilient digital architectures, ethical AI solutions, and hyper-accessible web experiences.'}
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {socialLinks && socialLinks.length > 0 ? (
                socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="btn-icon"
                    style={{ width: '38px', height: '38px' }}
                    aria-label={link.platform}
                  >
                    {getSocialIcon(link.platform)}
                  </a>
                ))
              ) : (
                <>
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="btn-icon" aria-label="GitHub"><Github size={18} /></a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="btn-icon" aria-label="LinkedIn"><Linkedin size={18} /></a>
                  <a href="https://x.com" target="_blank" rel="noreferrer" className="btn-icon" aria-label="Twitter"><Twitter size={18} /></a>
                </>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '16px', color: 'var(--text-primary)' }}>
              {t('quickLinks')}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <Link to="/about" style={{ color: 'var(--text-secondary)' }}>{t('about')}</Link>
              <Link to="/portfolio" style={{ color: 'var(--text-secondary)' }}>{t('portfolio')}</Link>
              <Link to="/skills" style={{ color: 'var(--text-secondary)' }}>{t('skills')}</Link>
              <Link to="/experience" style={{ color: 'var(--text-secondary)' }}>{t('experience')}</Link>
              <Link to="/education" style={{ color: 'var(--text-secondary)' }}>{t('education')}</Link>
              <Link to="/achievements" style={{ color: 'var(--text-secondary)' }}>{t('achievements')}</Link>
              <Link to="/blog" style={{ color: 'var(--text-secondary)' }}>{t('blog')}</Link>
              <Link to="/gallery" style={{ color: 'var(--text-secondary)' }}>{t('gallery')}</Link>
            </div>
          </div>

          {/* Direct Contact Info */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '16px', color: 'var(--text-primary)' }}>
              {t('directInfo')}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} color="var(--primary)" />
                <a href={`mailto:${profile?.email || 'contact@navinsharma.com.np'}`} style={{ color: 'inherit' }}>
                  {profile?.email || 'contact@navinsharma.com.np'}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={16} color="var(--primary)" />
                <span>{profile?.phone || '+977-9801234567'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={16} color="var(--primary)" />
                <span>{getContent(profile?.location, profile?.locationNe) || 'Kathmandu, Nepal'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div
          style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            fontSize: '0.875rem',
            color: 'var(--text-muted)'
          }}
        >
          <div>
            © {new Date().getFullYear()} {isNepali ? 'नवीन शर्मा' : 'Navin Sharma'}. {t('allRightsReserved')}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <Link to="/privacy" style={{ color: 'var(--text-muted)' }}>{t('privacyPolicy')}</Link>
            <Link to="/terms" style={{ color: 'var(--text-muted)' }}>{t('termsOfUse')}</Link>
            <Link to="/accessibility" style={{ color: 'var(--text-muted)' }}>{t('accessibilityStatement')}</Link>
          </div>

          <button
            onClick={scrollToTop}
            className="btn-icon"
            style={{ width: '36px', height: '36px' }}
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
