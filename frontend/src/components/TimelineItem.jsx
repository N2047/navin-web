import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle, FileText } from 'lucide-react';

export default function TimelineItem({
  type = 'experience',
  item,
  onCertificateClick
}) {
  const { t, getContent, isNepali } = useLanguage();

  const isExperience = type === 'experience';

  const title = isExperience
    ? getContent(item.position, item.positionNe)
    : getContent(item.degree, item.degreeNe);

  const org = isExperience
    ? getContent(item.organization, item.organizationNe)
    : getContent(item.institution, item.institutionNe);

  const dateStr = isExperience
    ? (item.isCurrent ? `${item.startDate} — ${t('present')}` : `${item.startDate} — ${item.endDate || ''}`)
    : `${item.startYear} — ${item.endYear || t('present')}`;

  const responsibilities = Array.isArray(item.responsibilities)
    ? (isNepali && Array.isArray(item.responsibilitiesNe) && item.responsibilitiesNe.length > 0
        ? item.responsibilitiesNe
        : item.responsibilities)
    : [];

  const achievements = Array.isArray(item.achievements)
    ? (isNepali && Array.isArray(item.achievementsNe) && item.achievementsNe.length > 0
        ? item.achievementsNe
        : item.achievements)
    : [];

  const description = getContent(item.description, item.descriptionNe);

  return (
    <div
      style={{
        display: 'flex',
        gap: '24px',
        position: 'relative',
        paddingBottom: '36px'
      }}
    >
      {/* Icon Spine */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexShrink: 0
        }}
      >
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: isExperience ? 'var(--primary)' : 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: `0 0 16px ${isExperience ? 'var(--primary-glow)' : 'rgba(16, 185, 129, 0.4)'}`,
            zIndex: 2
          }}
        >
          {isExperience ? <Briefcase size={20} /> : <GraduationCap size={22} />}
        </div>
        <div
          style={{
            width: '2px',
            flex: 1,
            background: 'var(--border-color)',
            marginTop: '8px'
          }}
        />
      </div>

      {/* Card Content */}
      <div
        className="glass-card"
        style={{
          flex: 1,
          padding: '24px',
          position: 'relative'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            marginBottom: '8px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontSize: '0.875rem', fontWeight: 600 }}>
            <Calendar size={15} />
            <span>{dateStr}</span>
          </div>

          {item.location && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              <MapPin size={14} />
              <span>{getContent(item.location, item.locationNe)}</span>
            </div>
          )}
        </div>

        <h3 style={{ fontSize: '1.25rem', marginBottom: '6px' }}>{title}</h3>

        <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--primary)', marginBottom: '14px' }}>
          {org}
        </div>

        {description && (
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', marginBottom: '16px', lineHeight: 1.6 }}>
            {description}
          </p>
        )}

        {/* Responsibilities list */}
        {responsibilities.length > 0 && (
          <div style={{ marginBottom: '14px' }}>
            <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
              {t('responsibilities')}:
            </div>
            <ul style={{ listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {responsibilities.map((resp, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle size={15} color="var(--primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Key achievements list */}
        {achievements.length > 0 && (
          <div style={{ marginBottom: '14px' }}>
            <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--accent)', marginBottom: '8px' }}>
              {t('keyAccomplishments')}:
            </div>
            <ul style={{ listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {achievements.map((ach, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 700 }}>★</span>
                  <span>{ach}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Certificate view button */}
        {item.certificateUrl && (
          <div style={{ marginTop: '14px', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
            <button
              onClick={() => onCertificateClick && onCertificateClick(item)}
              className="btn btn-outline btn-sm"
              style={{ padding: '6px 12px', fontSize: '0.825rem' }}
            >
              <FileText size={15} />
              <span>{t('viewCertificate')}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
