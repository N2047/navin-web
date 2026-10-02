import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import CertificateModal from '../components/CertificateModal';
import TextToSpeechButton from '../components/TextToSpeechButton';
import { Award, Eye, Calendar, Building2 } from 'lucide-react';

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const { t, getContent, isNepali } = useLanguage();

  useEffect(() => {
    fetch('/api/achievements')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setAchievements(d.achievements || []);
      })
      .catch((e) => console.error('Achievements error:', e))
      .finally(() => setLoading(false));
  }, []);

  const speechText = achievements
    .map((a) => `${getContent(a.title, a.titleNe)} from ${getContent(a.organization, a.organizationNe)} in ${a.date}`)
    .join('. ');

  return (
    <div style={{ padding: '60px 0 100px 0' }}>
      <div className="container">
        {/* Header */}
        <div className="section-title-wrap">
          <div className="section-tag">
            <Award size={14} />
            <span>{t('achievements')}</span>
          </div>
          <h1 className="section-heading">{t('recentMilestones')}</h1>
          <p className="section-subtitle">
            {isNepali
              ? 'डिजिटल पहुँचयोग्यता, नवप्रवर्तन, र प्राविधिक उत्कृष्टता बापत प्राप्त सम्मानहरू।'
              : 'Honors, official certifications, and prestigious national accolades.'}
          </p>
          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
            <TextToSpeechButton textToRead={speechText} />
          </div>
        </div>

        {/* Cards Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
            Loading achievements...
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '28px'
            }}
          >
            {achievements.map((item) => (
              <div
                key={item.id}
                className="glass-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '28px',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span className="badge badge-emerald" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={13} />
                    <span>{item.date}</span>
                  </span>
                  <Award size={22} color="var(--accent)" />
                </div>

                <h2 style={{ fontSize: '1.25rem', marginBottom: '8px', fontWeight: 700 }}>
                  {getContent(item.title, item.titleNe)}
                </h2>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'var(--primary)',
                    fontWeight: 600,
                    fontSize: '0.925rem',
                    marginBottom: '14px'
                  }}
                >
                  <Building2 size={16} />
                  <span>{getContent(item.organization, item.organizationNe)}</span>
                </div>

                <p
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.925rem',
                    lineHeight: 1.6,
                    marginBottom: '20px',
                    flex: 1
                  }}
                >
                  {getContent(item.description, item.descriptionNe)}
                </p>

                {item.certificateUrl && (
                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="btn btn-secondary btn-sm"
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      <Eye size={15} />
                      <span>{t('viewCertificate')}</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedItem && (
        <CertificateModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}
