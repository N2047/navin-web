import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Eye, CheckCircle2, Volume2, Type, Sliders, Keyboard } from 'lucide-react';

export default function AccessibilityPage() {
  const { t, isNepali } = useLanguage();

  return (
    <div style={{ padding: '60px 0 100px 0' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
        <div className="section-title-wrap">
          <div className="section-tag">
            <Eye size={14} />
            <span>Inclusive Design</span>
          </div>
          <h1 className="section-heading">{t('accessibilityStatement')}</h1>
          <p className="section-subtitle">
            {isNepali
              ? 'सबै नागरिक र प्रयोगकर्ताहरूका लागि पूर्ण पहुँचयोग्य डिजिटल अनुभव सुनिश्चित गर्ने प्रतिबद्धता।'
              : 'Our steadfast commitment to universal web accessibility and WCAG standards.'}
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '36px', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
          <p style={{ marginBottom: '24px', fontSize: '1.05rem', color: 'var(--text-primary)' }}>
            {isNepali
              ? 'यो वेबसाइट कुनै पनि शारीरिक वा प्राविधिक सीमितता भएका नागरिकहरू (विशेष गरी दृष्टिबिहीन, कम देख्ने, वा किबोर्ड मात्र प्रयोगकर्ताहरू) ले सहजै चलाउन सक्ने गरी निर्माण गरिएको छ।'
              : 'This personal digital identity has been designed from the ground up according to the Web Content Accessibility Guidelines (WCAG) 2.1 level AA/AAA recommendations.'}
          </p>

          <h2 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '16px', fontWeight: 700 }}>
            {isNepali ? 'उपलब्ध पहुँचयोग्यता सुविधाहरू:' : 'Implemented Assistive Features:'}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px', marginBottom: '32px' }}>
            <div style={{ padding: '16px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 700, marginBottom: '6px' }}>
                <Volume2 size={18} />
                <span>Text-to-Speech (TTS)</span>
              </div>
              <p style={{ fontSize: '0.875rem' }}>
                {isNepali
                  ? 'वेबसाइटको सामग्री अडियो मार्फत नेपाली र अंग्रेजी दुवै भाषामा सुन्न सकिने सुविधा।'
                  : 'Synthesized speech playback for headings, biographies, and blog posts via Web Speech API.'}
              </p>
            </div>

            <div style={{ padding: '16px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', fontWeight: 700, marginBottom: '6px' }}>
                <Type size={18} />
                <span>Font Scaling</span>
              </div>
              <p style={{ fontSize: '0.875rem' }}>
                {isNepali
                  ? 'अक्षरको आकार सामान्य, ठूलो वा अति ठूलो बनाउन मिल्ने नियन्त्रण।'
                  : 'Multi-step font scaling (Normal, Large, Extra Large) preserving UI layout.'}
              </p>
            </div>

            <div style={{ padding: '16px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b', fontWeight: 700, marginBottom: '6px' }}>
                <Sliders size={18} />
                <span>High Contrast Mode</span>
              </div>
              <p style={{ fontSize: '0.875rem' }}>
                {isNepali
                  ? 'दृष्टिगत समस्या भएकाहरूका लागि विशेष उच्च कन्ट्रास्ट डिस्प्ले।'
                  : 'High contrast visual styling maximizing readability and element boundary outlines.'}
              </p>
            </div>

            <div style={{ padding: '16px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ec4899', fontWeight: 700, marginBottom: '6px' }}>
                <Keyboard size={18} />
                <span>Keyboard Navigability</span>
              </div>
              <p style={{ fontSize: '0.875rem' }}>
                {isNepali
                  ? 'माउस बिना Tab र Shift+Tab मार्फत सबै इन्टरफेस चलाउन मिल्ने व्यवस्था।'
                  : 'Complete keyboard support with skip-to-content links and distinctive focus indicators.'}
              </p>
            </div>
          </div>

          <h2 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '12px', fontWeight: 700 }}>
            {isNepali ? 'प्रतिक्रिया तथा सुझाव' : 'Accessibility Feedback'}
          </h2>
          <p>
            {isNepali
              ? 'यदि तपाईंलाई यस वेबसाइटमा कुनै पनि पहुँचयोग्यता सम्बन्धी कठिनाइ परेमा कृपया contact@navinsharma.com.np मा जानकारी गराउनुहोला। म यसलाई तत्काल सुधार गर्न प्रतिबद्ध छु।'
              : 'If you encounter any accessibility hurdles or have recommendations for improving accessibility in Devanagari or assistive devices, please email contact@navinsharma.com.np.'}
          </p>
        </div>
      </div>
    </div>
  );
}
