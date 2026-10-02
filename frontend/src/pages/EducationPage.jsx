import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import TimelineItem from '../components/TimelineItem';
import CertificateModal from '../components/CertificateModal';
import TextToSpeechButton from '../components/TextToSpeechButton';
import { GraduationCap } from 'lucide-react';

export default function EducationPage() {
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState(null);
  const { t, getContent, isNepali } = useLanguage();

  useEffect(() => {
    fetch('/api/education')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setEducations(d.educations || []);
      })
      .catch((e) => console.error('Education fetch error:', e))
      .finally(() => setLoading(false));
  }, []);

  const speechText = educations
    .map((e) => `${getContent(e.degree, e.degreeNe)} in ${getContent(e.fieldOfStudy, e.fieldOfStudyNe)} from ${getContent(e.institution, e.institutionNe)}`)
    .join('. ');

  return (
    <div style={{ padding: '60px 0 100px 0' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        {/* Header */}
        <div className="section-title-wrap">
          <div className="section-tag">
            <GraduationCap size={14} />
            <span>{t('education')}</span>
          </div>
          <h1 className="section-heading">{t('academicJourney')}</h1>
          <p className="section-subtitle">
            {isNepali
              ? 'कम्प्युटर विज्ञान, वितरित प्रणाली तथा एआई विषयमा उच्च शैक्षिक योग्यता।'
              : 'Rigorous academic foundations in Computer Science, Distributed Systems, and AI.'}
          </p>
          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
            <TextToSpeechButton textToRead={speechText} />
          </div>
        </div>

        {/* Education Timeline */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
            Loading academic credentials...
          </div>
        ) : (
          <div style={{ marginTop: '40px' }}>
            {educations.map((edu) => (
              <TimelineItem
                key={edu.id}
                type="education"
                item={edu}
                onCertificateClick={(item) => setSelectedCert(item)}
              />
            ))}
          </div>
        )}
      </div>

      {selectedCert && (
        <CertificateModal
          item={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </div>
  );
}
