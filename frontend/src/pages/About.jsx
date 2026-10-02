import React, { useState, useEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../contexts/ToastContext';
import TextToSpeechButton from '../components/TextToSpeechButton';
import {
  User,
  Download,
  CheckCircle,
  Compass,
  Target,
  Sparkles,
  MapPin,
  Mail,
  Phone,
  Briefcase
} from 'lucide-react';

import { initialProfile } from '../data/initialData';

export default function About() {
  const { profile: layoutProfile } = useOutletContext() || {};
  const [profile, setProfile] = useState(layoutProfile || initialProfile);
  const { t, getContent, isNepali } = useLanguage();
  const toast = useToast();

  useEffect(() => {
    if (!profile) {
      fetch('/api/profile')
        .then((r) => r.json())
        .then((d) => {
          if (d.success) setProfile(d.profile);
        })
        .catch(() => {});
    }
  }, [profile]);

  const handleDownloadCv = () => {
    toast.info(isNepali ? 'CV डाउनलोड सुरु भयो...' : 'Downloading CV...');
    window.open('/api/cv/download', '_blank');
  };

  const fullName = getContent(profile?.fullName, profile?.fullNameNe) || 'Navin Sharma';
  const title = getContent(profile?.professionalTitle, profile?.professionalTitleNe) || 'Lead Software Architect';
  const detailedBio = getContent(profile?.detailedBio, profile?.detailedBioNe) || '';
  const journey = getContent(profile?.journey, profile?.journeyNe) || '';
  const careerObjective = getContent(profile?.careerObjective, profile?.careerObjectiveNe) || '';

  let areas = [];
  try {
    areas = profile?.areasOfExpertise ? JSON.parse(profile.areasOfExpertise) : [];
  } catch (e) {
    areas = ['Cloud Architecture', 'AI / LLMs', 'Web Accessibility (WCAG)', 'Full-Stack Web', 'Database Optimization'];
  }

  return (
    <div style={{ padding: '60px 0 100px 0' }}>
      <div className="container">
        {/* Page Header */}
        <div className="section-title-wrap">
          <div className="section-tag">
            <User size={14} />
            <span>{t('about')}</span>
          </div>
          <h1 className="section-heading">{isNepali ? 'मेरो बारेमा' : 'About Me'}</h1>
          <p className="section-subtitle">
            {getContent(profile?.tagline, profile?.taglineNe)}
          </p>
          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
            <TextToSpeechButton textToRead={`${fullName}. ${title}. ${detailedBio}. ${journey}`} />
          </div>
        </div>

        {/* Bio Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'flex-start',
            marginBottom: '60px'
          }}
        >
          {/* Left: Photo & Quick Contact Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div
              className="glass-card"
              style={{ padding: '16px', borderRadius: '24px', textAlign: 'center' }}
            >
              <img
                src={profile?.profilePhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80'}
                alt={fullName}
                style={{
                  width: '100%',
                  maxHeight: '380px',
                  objectFit: 'cover',
                  borderRadius: '18px',
                  marginBottom: '16px'
                }}
              />
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{fullName}</h2>
              <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '16px' }}>
                {title}
              </div>

              <button onClick={handleDownloadCv} className="btn btn-primary" style={{ width: '100%' }}>
                <Download size={18} />
                <span>{t('downloadCv')}</span>
              </button>
            </div>

            {/* Quick Details List */}
            <div className="glass-card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', fontWeight: 700 }}>
                {t('directInfo')}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.925rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <MapPin size={16} color="var(--primary)" />
                  <span>{getContent(profile?.location, profile?.locationNe) || 'Kathmandu, Nepal'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Mail size={16} color="var(--primary)" />
                  <span>{profile?.email || 'contact@navinsharma.com.np'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Phone size={16} color="var(--primary)" />
                  <span>{profile?.phone || '+977-9801234567'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Briefcase size={16} color="var(--primary)" />
                  <span>{profile?.yearsExperience || 8}+ {t('yearsExp')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Detailed Journey & Vision */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Biography */}
            <div className="glass-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <User size={22} color="var(--primary)" />
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700 }}>{t('personalBio')}</h2>
              </div>
              <div style={{ color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '1.025rem', whiteSpace: 'pre-line' }}>
                {detailedBio}
              </div>
            </div>

            {/* My Journey */}
            {journey && (
              <div className="glass-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <Compass size={22} color="var(--accent)" />
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 700 }}>{t('personalJourney')}</h2>
                </div>
                <div style={{ color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '1.025rem', whiteSpace: 'pre-line' }}>
                  {journey}
                </div>
              </div>
            )}

            {/* Career Objective */}
            {careerObjective && (
              <div className="glass-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <Target size={22} color="#f59e0b" />
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 700 }}>{t('careerVision')}</h2>
                </div>
                <div style={{ color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '1.025rem', whiteSpace: 'pre-line' }}>
                  {careerObjective}
                </div>
              </div>
            )}

            {/* Areas of Expertise */}
            {areas.length > 0 && (
              <div className="glass-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <Sparkles size={22} color="#ec4899" />
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 700 }}>{t('expertiseAreas')}</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                  {areas.map((area, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 14px',
                        background: 'var(--bg-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)'
                      }}
                    >
                      <CheckCircle size={16} color="var(--primary)" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
