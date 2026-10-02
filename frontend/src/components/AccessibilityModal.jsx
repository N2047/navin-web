import React from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { useLanguage } from '../contexts/LanguageContext';
import { X, Type, Eye, Sliders, Volume2, Square, Info } from 'lucide-react';

export default function AccessibilityModal({ isOpen, onClose }) {
  const {
    fontSize,
    setFontSize,
    contrast,
    setContrast,
    reducedMotion,
    setReducedMotion,
    speak,
    stopSpeaking,
    isSpeaking,
    speechRate,
    setSpeechRate
  } = useAccessibility();

  const { t, isNepali } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="a11y-modal-title">
      <div className="modal-content animate-slide-up" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sliders size={22} color="var(--primary)" />
            <h2 id="a11y-modal-title" style={{ fontSize: '1.35rem', fontWeight: 700 }}>
              {t('accessibilitySettings')}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="btn-icon"
            aria-label="Close accessibility modal"
            style={{ width: '36px', height: '36px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Font Size Scaling */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Type size={18} color="var(--primary)" />
            <label style={{ fontWeight: 600, fontSize: '0.95rem' }}>{t('fontSize')}</label>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            <button
              onClick={() => setFontSize('normal')}
              className={`btn ${fontSize === 'normal' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.9rem' }}
            >
              A {t('normal')}
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`btn ${fontSize === 'large' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '1rem', fontWeight: 700 }}
            >
              A+ {t('large')}
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={`btn ${fontSize === 'xlarge' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '1.15rem', fontWeight: 800 }}
            >
              A++ {t('extraLarge')}
            </button>
          </div>
        </div>

        {/* Contrast Modes */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Eye size={18} color="var(--primary)" />
            <label style={{ fontWeight: 600, fontSize: '0.95rem' }}>{t('contrast')}</label>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <button
              onClick={() => setContrast('normal')}
              className={`btn ${contrast === 'normal' ? 'btn-primary' : 'btn-secondary'}`}
            >
              {t('normalContrast')}
            </button>
            <button
              onClick={() => setContrast('high')}
              className={`btn ${contrast === 'high' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ border: '2px solid yellow', color: contrast === 'high' ? '#000' : 'inherit' }}
            >
              ⚡ {t('highContrast')}
            </button>
          </div>
        </div>

        {/* Reduced Motion Toggle */}
        <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{t('reducedMotion')}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {isNepali ? 'वेबसाइटको एनिमेशन र गति कम गर्नुहोस्।' : 'Minimize animations and visual movement.'}
            </div>
          </div>
          <input
            type="checkbox"
            id="reduced-motion-cb"
            checked={reducedMotion}
            onChange={(e) => setReducedMotion(e.target.checked)}
            style={{ width: '22px', height: '22px', accentColor: 'var(--primary)', cursor: 'pointer' }}
          />
        </div>

        {/* Text-to-Speech Section */}
        <div style={{ marginBottom: '24px', padding: '16px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Volume2 size={18} color="var(--primary)" />
              <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                {isNepali ? 'टेक्स्ट-टु-स्पीच वाचन नियन्त्रण' : 'Text-to-Speech Speed'}
              </div>
            </div>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{speechRate}x</span>
          </div>
          <input
            type="range"
            min="0.75"
            max="1.5"
            step="0.25"
            value={speechRate}
            onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer', marginBottom: '12px' }}
          />
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => {
                const sample = isNepali
                  ? 'नमस्ते! यो नवीन शर्माको व्यावसायिक वेबसाइटको वाचन परीक्षण हो।'
                  : 'Hello! This is a voice test for Navin Sharma\'s professional website.';
                speak(sample);
              }}
              className="btn btn-secondary btn-sm"
              style={{ flex: 1 }}
            >
              <Volume2 size={16} /> {isNepali ? 'आवाज परीक्षण' : 'Test Voice'}
            </button>
            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                className="btn btn-outline btn-sm"
                style={{ color: '#ef4444', borderColor: '#ef4444' }}
              >
                <Square size={16} /> {t('stopListening')}
              </button>
            )}
          </div>
        </div>

        {/* Keyboard Navigation Tip */}
        <div style={{ display: 'flex', gap: '8px', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
          <Info size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
          <span>
            {isNepali
              ? 'टिप: तपाइँ Tab र Shift+Tab कुञ्जीहरू प्रयोग गरेर वेबसाइटका सबै बटन र लिङ्कहरू नेभिगेट गर्न सक्नुहुन्छ।'
              : 'Tip: You can navigate between all interactive elements using Tab and Shift+Tab keys.'}
          </span>
        </div>
      </div>
    </div>
  );
}
