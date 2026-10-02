import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Search, X, BookOpen, Briefcase, Award, GraduationCap, FolderGit2, Loader2, ArrowRight } from 'lucide-react';

export default function GlobalSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { t, getContent, isNepali } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults(null);
      setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        if (data.success) {
          setResults(data.results);
        }
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }, 280);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const handleSelect = (url) => {
    onClose();
    navigate(url);
  };

  const totalHits = results
    ? (results.blog?.length || 0) +
      (results.portfolio?.length || 0) +
      (results.experience?.length || 0) +
      (results.education?.length || 0) +
      (results.achievements?.length || 0)
    : 0;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-content animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '680px', padding: 0, overflow: 'hidden' }}
      >
        {/* Search Input Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-color)',
            background: 'var(--bg-surface-elevated)'
          }}
        >
          {loading ? (
            <Loader2 size={20} className="animate-spin" color="var(--primary)" />
          ) : (
            <Search size={20} color="var(--text-muted)" />
          )}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '1.05rem',
              color: 'var(--text-primary)'
            }}
          />
          <button
            onClick={onClose}
            className="btn-icon"
            style={{ width: '32px', height: '32px' }}
            aria-label="Close search"
          >
            <X size={16} />
          </button>
        </div>

        {/* Results Container */}
        <div style={{ maxHeight: '60vh', overflowY: 'auto', padding: '16px 20px' }}>
          {!query && (
            <div style={{ textAlign: 'center', padding: '36px 20px', color: 'var(--text-muted)' }}>
              <Search size={36} style={{ margin: '0 auto 12px auto', opacity: 0.4 }} />
              <p>{isNepali ? 'खोज्नका लागि कम्तीमा २ अक्षरहरू टाइप गर्नुहोस्...' : 'Type at least 2 characters to search across everything...'}</p>
            </div>
          )}

          {query && !loading && totalHits === 0 && (
            <div style={{ textAlign: 'center', padding: '36px 20px', color: 'var(--text-muted)' }}>
              <p>{isNepali ? 'कुनै नतिजा फेला परेन।' : `No matches found for "${query}".`}</p>
            </div>
          )}

          {/* Portfolio Results */}
          {results?.portfolio?.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                <FolderGit2 size={16} />
                <span>{t('portfolio')} ({results.portfolio.length})</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {results.portfolio.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSelect(`/portfolio#${p.slug}`)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-subtle)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'background var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--primary-light)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--bg-subtle)')}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{getContent(p.title, p.titleNe)}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{p.category}</div>
                    </div>
                    <ArrowRight size={16} color="var(--primary)" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Blog Results */}
          {results?.blog?.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '8px', textTransform: 'uppercase' }}>
                <BookOpen size={16} />
                <span>{t('blog')} ({results.blog.length})</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {results.blog.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => handleSelect(`/blog/${b.slug}`)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-subtle)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--primary-light)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--bg-subtle)')}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{getContent(b.title, b.titleNe)}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{b.category}</div>
                    </div>
                    <ArrowRight size={16} color="var(--primary)" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience Results */}
          {results?.experience?.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 700, color: '#f59e0b', marginBottom: '8px', textTransform: 'uppercase' }}>
                <Briefcase size={16} />
                <span>{t('experience')} ({results.experience.length})</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {results.experience.map((e) => (
                  <div
                    key={e.id}
                    onClick={() => handleSelect('/experience')}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-subtle)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                        {getContent(e.position, e.positionNe)} — {getContent(e.organization, e.organizationNe)}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{e.startDate}</div>
                    </div>
                    <ArrowRight size={16} color="var(--primary)" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements Results */}
          {results?.achievements?.length > 0 && (
            <div style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 700, color: '#ec4899', marginBottom: '8px', textTransform: 'uppercase' }}>
                <Award size={16} />
                <span>{t('achievements')} ({results.achievements.length})</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {results.achievements.map((a) => (
                  <div
                    key={a.id}
                    onClick={() => handleSelect('/achievements')}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-subtle)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{getContent(a.title, a.titleNe)}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{a.organization} ({a.date})</div>
                    </div>
                    <ArrowRight size={16} color="var(--primary)" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
