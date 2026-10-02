import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { BookOpen, Search, Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { initialBlogPosts } from '../data/initialData';

export default function BlogPage() {
  const [posts, setPosts] = useState(initialBlogPosts);
  const [categories, setCategories] = useState(['All', 'Software Architecture', 'Accessibility & UX']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const { t, getContent, isNepali } = useLanguage();

  useEffect(() => {
    setLoading(true);
    const catQuery = selectedCategory !== 'All' ? `&category=${encodeURIComponent(selectedCategory)}` : '';
    const searchParam = search ? `&search=${encodeURIComponent(search)}` : '';

    fetch(`/api/blog?page=${page}&limit=6${catQuery}${searchParam}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setPosts(d.posts || []);
          setTotalPages(d.totalPages || 1);
          if (d.categories && categories.length === 0) {
            setCategories(d.categories);
          }
        }
      })
      .catch((e) => console.error('Blog error:', e))
      .finally(() => setLoading(false));
  }, [page, selectedCategory, search]);

  return (
    <div style={{ padding: '60px 0 100px 0' }}>
      <div className="container">
        {/* Header */}
        <div className="section-title-wrap">
          <div className="section-tag">
            <BookOpen size={14} />
            <span>{t('blog')}</span>
          </div>
          <h1 className="section-heading">{t('latestArticles')}</h1>
          <p className="section-subtitle">{t('latestArticlesSubtitle')}</p>
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
          {/* Categories */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setPage(1);
              }}
              className={`btn ${selectedCategory === 'All' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            >
              {isNepali ? 'सबै' : 'All'}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setPage(1);
                }}
                className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'} btn-sm`}
              >
                {cat}
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
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder={isNepali ? 'लेख खोज्नुहोस्...' : 'Search articles...'}
              className="form-input"
              style={{ paddingLeft: '36px', height: '40px', fontSize: '0.875rem' }}
            />
          </div>
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
            Loading blog posts...
          </div>
        ) : posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
            <p>{isNepali ? 'कुनै लेख फेला परेन।' : 'No articles found matching criteria.'}</p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '30px',
              marginBottom: '48px'
            }}
          >
            {posts.map((post) => (
              <article
                key={post.id}
                className="glass-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 0,
                  overflow: 'hidden'
                }}
              >
                {post.featuredImage && (
                  <div style={{ height: '200px', width: '100%', overflow: 'hidden' }}>
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}

                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '12px'
                    }}
                  >
                    <span className="badge badge-primary">{post.category}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <Clock size={13} />
                      <span>{post.readingTime}</span>
                    </span>
                  </div>

                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '10px', lineHeight: 1.35 }}>
                    <Link to={`/blog/${post.slug}`} style={{ color: 'inherit' }}>
                      {getContent(post.title, post.titleNe)}
                    </Link>
                  </h2>

                  <p
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.9rem',
                      lineHeight: 1.6,
                      marginBottom: '18px',
                      flex: 1
                    }}
                  >
                    {getContent(post.excerpt, post.excerptNe)}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid var(--border-color)',
                      paddingTop: '14px',
                      fontSize: '0.825rem',
                      color: 'var(--text-muted)'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={13} />
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    </span>

                    <Link
                      to={`/blog/${post.slug}`}
                      style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <span>{isNepali ? 'पूरा पढ्नुहोस्' : 'Read More'}</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="btn btn-secondary btn-sm"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPage(idx + 1)}
                className={`btn ${page === idx + 1 ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                style={{ width: '38px', height: '38px', padding: 0 }}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="btn btn-secondary btn-sm"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
