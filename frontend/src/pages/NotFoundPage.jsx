import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  const { isNepali } = useLanguage();

  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        textAlign: 'center'
      }}
    >
      <div className="glass-panel animate-slide-up" style={{ padding: '48px', maxWidth: '520px', width: '100%' }}>
        <div
          style={{
            fontSize: '6rem',
            fontWeight: 800,
            lineHeight: 1,
            color: 'var(--primary)',
            marginBottom: '16px',
            fontFamily: 'var(--font-display)'
          }}
        >
          404
        </div>
        <h1 style={{ fontSize: '1.6rem', marginBottom: '12px', fontWeight: 800 }}>
          {isNepali ? 'पृष्ठ फेला परेन' : 'Page Not Found'}
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '28px', lineHeight: 1.6 }}>
          {isNepali
            ? 'तपाईंले खोज्नुभएको पृष्ठ सारिएको वा मेटाइएको हुनसक्छ।'
            : 'The page you are seeking does not exist or may have been relocated.'}
        </p>
        <Link to="/" className="btn btn-primary" style={{ gap: '8px' }}>
          <Home size={18} />
          <span>{isNepali ? 'गृहपृष्ठमा फर्कनुहोस्' : 'Return to Home'}</span>
        </Link>
      </div>
    </div>
  );
}
