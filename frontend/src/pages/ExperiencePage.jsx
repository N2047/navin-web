import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import TimelineItem from '../components/TimelineItem';
import TextToSpeechButton from '../components/TextToSpeechButton';
import { Briefcase } from 'lucide-react';

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, getContent, isNepali } = useLanguage();

  useEffect(() => {
    fetch('/api/experience')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setExperiences(d.experiences || []);
      })
      .catch((e) => console.error('Experience fetch error:', e))
      .finally(() => setLoading(false));
  }, []);

  const timelineSpeech = experiences
    .map((e) => `${getContent(e.position, e.positionNe)} at ${getContent(e.organization, e.organizationNe)}, ${e.startDate}`)
    .join('. ');

  return (
    <div style={{ padding: '60px 0 100px 0' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        {/* Header */}
        <div className="section-title-wrap">
          <div className="section-tag">
            <Briefcase size={14} />
            <span>{t('experience')}</span>
          </div>
          <h1 className="section-heading">{t('workTimeline')}</h1>
          <p className="section-subtitle">
            {isNepali
              ? '८ वर्षभन्दा बढीको उद्यम सफ्टवेयर आर्किटेक्चर, कन्सल्टिङ र प्राविधिक नेतृत्वको यात्रा।'
              : 'A chronological journey of enterprise engineering leadership and software consulting.'}
          </p>
          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
            <TextToSpeechButton textToRead={timelineSpeech} />
          </div>
        </div>

        {/* Timeline Items */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
            Loading professional timeline...
          </div>
        ) : (
          <div style={{ marginTop: '40px' }}>
            {experiences.map((exp) => (
              <TimelineItem key={exp.id} type="experience" item={exp} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
