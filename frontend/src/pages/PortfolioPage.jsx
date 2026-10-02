import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ProjectCard from '../components/ProjectCard';
import Lightbox from '../components/Lightbox';
import { FolderGit2, Search, ExternalLink, Calendar, Layers, X, Eye } from 'lucide-react';
import { Github } from '../components/SocialIcons';
import { initialProjects } from '../data/initialData';

export default function PortfolioPage() {
  const [projects, setProjects] = useState(initialProjects);
  const [category, setCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  const { t, getContent, isNepali } = useLanguage();

  useEffect(() => {
    fetch('/api/portfolio')
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.projects?.length) setProjects(d.projects);
      })
      .catch((e) => console.error('Portfolio error:', e))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...new Set(projects.map((p) => p.category).filter(Boolean))];

  const filtered = projects.filter((p) => {
    const matchesCategory = category === 'All' || p.category === category;
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      !term ||
      p.title.toLowerCase().includes(term) ||
      (p.titleNe && p.titleNe.toLowerCase().includes(term)) ||
      p.shortDesc.toLowerCase().includes(term) ||
      (p.technologies && p.technologies.some((t) => t.toLowerCase().includes(term)));
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ padding: '60px 0 100px 0' }}>
      <div className="container">
        {/* Header */}
        <div className="section-title-wrap">
          <div className="section-tag">
            <FolderGit2 size={14} />
            <span>{t('portfolio')}</span>
          </div>
          <h1 className="section-heading">{t('allProjects')}</h1>
          <p className="section-subtitle">{t('featuredWorksSubtitle')}</p>
        </div>

        {/* Filter and Search Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            marginBottom: '36px'
          }}
        >
          {/* Category Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`btn ${category === cat ? 'btn-primary' : 'btn-secondary'} btn-sm`}
              >
                {cat === 'All' && isNepali ? 'सबै' : cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', width: '280px', maxWidth: '100%' }}>
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)'
              }}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isNepali ? 'प्रोजेक्ट खोज्नुहोस्...' : 'Search projects...'}
              className="form-input"
              style={{ paddingLeft: '36px', height: '40px', fontSize: '0.875rem' }}
            />
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
            Loading portfolio...
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
            <p>{isNepali ? 'कुनै प्रोजेक्ट फेला परेन।' : 'No matching projects found.'}</p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '30px'
            }}
          >
            {filtered.map((proj) => (
              <ProjectCard
                key={proj.id}
                project={proj}
                onSelect={(p) => setSelectedProject(p)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="modal-content animate-slide-up"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '800px', padding: '32px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span className="badge badge-primary" style={{ marginBottom: '8px' }}>
                  {selectedProject.category}
                </span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
                  {getContent(selectedProject.title, selectedProject.titleNe)}
                </h2>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="btn-icon"
                style={{ width: '36px', height: '36px' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Thumbnail */}
            {selectedProject.thumbnail && (
              <img
                src={selectedProject.thumbnail}
                alt={selectedProject.title}
                style={{
                  width: '100%',
                  maxHeight: '360px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  marginBottom: '20px',
                  cursor: 'pointer'
                }}
                onClick={() => setLightboxImage(selectedProject.thumbnail)}
              />
            )}

            {/* Description */}
            <div
              style={{
                fontSize: '1rem',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                marginBottom: '24px',
                whiteSpace: 'pre-line'
              }}
            >
              {getContent(selectedProject.description, selectedProject.descriptionNe)}
            </div>

            {/* Technologies */}
            {selectedProject.technologies?.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '10px' }}>
                  {t('technologiesUsed')}:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {selectedProject.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: '4px 10px',
                        background: 'var(--bg-subtle)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.85rem',
                        fontWeight: 600
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery Screenshots */}
            {selectedProject.galleryImages?.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '10px' }}>
                  Screenshots & Media:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
                  {selectedProject.galleryImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Screenshot ${idx + 1}`}
                      style={{ width: '100%', height: '90px', objectFit: 'cover', borderRadius: '6px', cursor: 'pointer' }}
                      onClick={() => setLightboxImage(img)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Action Links */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '12px',
                borderTop: '1px solid var(--border-color)',
                paddingTop: '20px'
              }}
            >
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn btn-secondary"
                >
                  <Github size={16} />
                  <span>{t('githubRepo')}</span>
                </a>
              )}
              {selectedProject.projectUrl && (
                <a
                  href={selectedProject.projectUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn btn-primary"
                >
                  <ExternalLink size={16} />
                  <span>{t('livePreview')}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox for screenshots */}
      {lightboxImage && (
        <Lightbox
          image={lightboxImage}
          title={selectedProject ? selectedProject.title : ''}
          onClose={() => setLightboxImage(null)}
        />
      )}
    </div>
  );
}
