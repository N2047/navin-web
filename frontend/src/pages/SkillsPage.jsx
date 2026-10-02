import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import SkillBar from '../components/SkillBar';
import TextToSpeechButton from '../components/TextToSpeechButton';
import { Cpu, Layers, Sparkles } from 'lucide-react';
import { initialSkillCategories } from '../data/initialData';

export default function SkillsPage() {
  const [categories, setCategories] = useState(initialSkillCategories);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(false);
  const { t, getContent, isNepali } = useLanguage();

  useEffect(() => {
    fetch('/api/skills')
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.categories?.length) setCategories(d.categories);
      })
      .catch((e) => console.error('Skills error:', e))
      .finally(() => setLoading(false));
  }, []);

  const allSkills = categories.flatMap((c) => c.skills);
  const displayedCategories =
    activeTab === 'all'
      ? categories
      : categories.filter((c) => c.slug === activeTab);

  const skillsText = categories
    .map((c) => `${getContent(c.name, c.nameNe)}: ${c.skills.map((s) => s.name).join(', ')}`)
    .join('. ');

  return (
    <div style={{ padding: '60px 0 100px 0' }}>
      <div className="container">
        {/* Page Header */}
        <div className="section-title-wrap">
          <div className="section-tag">
            <Cpu size={14} />
            <span>{t('skills')}</span>
          </div>
          <h1 className="section-heading">{t('coreProficiencies')}</h1>
          <p className="section-subtitle">{t('coreProficienciesSubtitle')}</p>
          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
            <TextToSpeechButton textToRead={skillsText} />
          </div>
        </div>

        {/* Category Tabs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '40px'
          }}
        >
          <button
            onClick={() => setActiveTab('all')}
            className={`btn ${activeTab === 'all' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          >
            {isNepali ? 'सबै सीपहरू' : 'All Proficiencies'} ({allSkills.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.slug)}
              className={`btn ${activeTab === cat.slug ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            >
              {getContent(cat.name, cat.nameNe)} ({cat.skills?.length || 0})
            </button>
          ))}
        </div>

        {/* Categories & Skills Matrix */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
            Loading skills matrix...
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {displayedCategories.map((cat) => (
              <div key={cat.id} className="glass-panel" style={{ padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                  <Layers size={22} color="var(--primary)" />
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>
                    {getContent(cat.name, cat.nameNe)}
                  </h2>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '18px'
                  }}
                >
                  {cat.skills?.map((skill) => (
                    <SkillBar key={skill.id} skill={skill} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
