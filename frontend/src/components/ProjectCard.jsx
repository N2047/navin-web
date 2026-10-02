import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ExternalLink, ArrowUpRight, FolderGit2 } from 'lucide-react';
import { Github } from './SocialIcons';

export default function ProjectCard({ project, onSelect }) {
  const { t, getContent } = useLanguage();

  const title = getContent(project.title, project.titleNe);
  const shortDesc = getContent(project.shortDesc, project.shortDescNe);
  const technologies = Array.isArray(project.technologies) ? project.technologies : [];

  return (
    <article
      className="glass-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '0',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          position: 'relative',
          height: '210px',
          width: '100%',
          overflow: 'hidden',
          background: 'var(--bg-subtle)'
        }}
      >
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={title}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.4s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)'
            }}
          >
            <FolderGit2 size={42} opacity={0.5} />
          </div>
        )}

        {/* Category badge */}
        <span
          className="badge badge-primary"
          style={{
            position: 'absolute',
            top: '14px',
            left: '14px',
            backdropFilter: 'blur(8px)',
            background: 'rgba(15, 23, 42, 0.75)',
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.15)'
          }}
        >
          {project.category}
        </span>

        {project.isFeatured && (
          <span
            className="badge badge-emerald"
            style={{
              position: 'absolute',
              top: '14px',
              right: '14px',
              backdropFilter: 'blur(8px)',
              background: 'rgba(5, 150, 105, 0.85)',
              color: '#ffffff'
            }}
          >
            ★ Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div
        style={{
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1
        }}
      >
        <h3
          onClick={() => onSelect && onSelect(project)}
          style={{
            fontSize: '1.2rem',
            marginBottom: '10px',
            cursor: 'pointer',
            transition: 'color var(--transition-fast)'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
        >
          {title}
        </h3>

        <p
          style={{
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            marginBottom: '18px',
            lineHeight: 1.55,
            flex: 1
          }}
        >
          {shortDesc}
        </p>

        {/* Tech tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
          {technologies.slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '3px 8px',
                borderRadius: '6px',
                background: 'var(--bg-subtle)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-color)'
              }}
            >
              {tech}
            </span>
          ))}
          {technologies.length > 4 && (
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', alignSelf: 'center' }}>
              +{technologies.length - 4}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--border-color)',
            paddingTop: '14px'
          }}
        >
          <button
            onClick={() => onSelect && onSelect(project)}
            className="btn btn-outline btn-sm"
            style={{ padding: '6px 12px', fontSize: '0.825rem' }}
          >
            <span>{t('viewDetails')}</span>
            <ArrowUpRight size={14} />
          </button>

          <div style={{ display: 'flex', gap: '8px' }}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-icon"
                style={{ width: '34px', height: '34px' }}
                title={t('githubRepo')}
                aria-label={t('githubRepo')}
              >
                <Github size={15} />
              </a>
            )}
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-icon"
                style={{ width: '34px', height: '34px' }}
                title={t('livePreview')}
                aria-label={t('livePreview')}
              >
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
