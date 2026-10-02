import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPage() {
  const { t, isNepali } = useLanguage();

  return (
    <div style={{ padding: '60px 0 100px 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="section-title-wrap">
          <div className="section-tag">
            <ShieldCheck size={14} />
            <span>Legal</span>
          </div>
          <h1 className="section-heading">{t('privacyPolicy')}</h1>
        </div>

        <div className="glass-panel" style={{ padding: '36px', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
          <p style={{ marginBottom: '20px' }}>
            {isNepali
              ? 'यस व्यक्तिगत वेबसाइटमा तपाईंको गोपनीयतालाई पूर्ण सम्मान गरिन्छ। कुनै पनि अनाधिकृत तेस्रो पक्षीय ट्र्याकरहरू वा विज्ञापन स्क्रिप्टहरू यस वेबसाइटमा प्रयोग गरिएको छैन।'
              : 'Your privacy is treated with utmost respect on this personal digital identity portal. No invasive third-party ad networks or tracking brokers are used.'}
          </p>

          <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginTop: '24px', marginBottom: '12px', fontWeight: 700 }}>
            {isNepali ? '१. संकलित तथ्याङ्क' : '1. Information Collected'}
          </h2>
          <p style={{ marginBottom: '16px' }}>
            {isNepali
              ? 'सम्पर्क फारम प्रयोग गर्दा तपाईंले स्वेच्छाले प्रदान गर्नुभएको नाम, इमेल र सन्देश मात्र सञ्चारका लागि सुरक्षित भण्डारण गरिन्छ।'
              : 'When you contact me through the message form, only the information you explicitly provide (name, email, subject, message) is saved for communication purposes.'}
          </p>

          <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginTop: '24px', marginBottom: '12px', fontWeight: 700 }}>
            {isNepali ? '२. कुकीज र लोकल स्टोरेज' : '2. Storage & Preferences'}
          </h2>
          <p style={{ marginBottom: '16px' }}>
            {isNepali
              ? 'तपाईंको भाषा रोजाइ (नेपाली वा अंग्रेजी), डार्क/लाइट मोड, र पहुँचयोग्यता सेटिङहरू तपाईंको आफ्नै ब्राउजरको लोकल स्टोरेजमा मात्र सुरक्षित रहन्छन्।'
              : 'Preferences such as dark/light mode, language choice (Nepali/English), and accessibility font scales are stored locally on your device using browser localStorage.'}
          </p>

          <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginTop: '24px', marginBottom: '12px', fontWeight: 700 }}>
            {isNepali ? '३. सम्पर्क' : '3. Inquiries'}
          </h2>
          <p>
            {isNepali
              ? 'गोपनीयता सम्बन्धी कुनै प्रश्न भएमा contact@navinsharma.com.np मा सम्पर्क गर्न सक्नुहुन्छ।'
              : 'For any privacy inquiries or data removal requests, feel free to write to contact@navinsharma.com.np.'}
          </p>
        </div>
      </div>
    </div>
  );
}
