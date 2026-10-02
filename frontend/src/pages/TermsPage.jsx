import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { FileText } from 'lucide-react';

export default function TermsPage() {
  const { t, isNepali } = useLanguage();

  return (
    <div style={{ padding: '60px 0 100px 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="section-title-wrap">
          <div className="section-tag">
            <FileText size={14} />
            <span>Legal</span>
          </div>
          <h1 className="section-heading">{t('termsOfUse')}</h1>
        </div>

        <div className="glass-panel" style={{ padding: '36px', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
          <p style={{ marginBottom: '20px' }}>
            {isNepali
              ? 'यस व्यक्तिगत वेबसाइटमा उपलब्ध सामग्रीहरू व्यावसायिक परिचय, प्राविधिक ज्ञान आदानप्रदान र व्यक्तिगत पोर्टफोलियो प्रस्तुतीकरणका लागि हुन्।'
              : 'The materials provided on this website are for personal professional introduction, technical knowledge sharing, and portfolio presentation.'}
          </p>

          <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginTop: '24px', marginBottom: '12px', fontWeight: 700 }}>
            {isNepali ? 'बौद्धिक सम्पत्ति' : 'Intellectual Property'}
          </h2>
          <p style={{ marginBottom: '16px' }}>
            {isNepali
              ? 'यस वेबसाइटमा प्रकाशित ब्लग लेख, परियोजना विवरण र मौलिक विचारहरू लेखकको बौद्धिक सम्पत्ति हुन्। स्रोत खुलाएर उद्धरण गर्न पाइनेछ।'
              : 'Articles, architectural reflections, and open-source project references remain the intellectual property of Navin Sharma. Constructive citations with appropriate source attribution are welcome.'}
          </p>
        </div>
      </div>
    </div>
  );
}
