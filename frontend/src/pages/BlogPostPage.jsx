import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../contexts/ToastContext';
import TextToSpeechButton from '../components/TextToSpeechButton';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Copy,
  Check,
  Eye,
  BookOpen
} from 'lucide-react';
import { Facebook, Linkedin, Twitter, WhatsApp } from '../components/SocialIcons';
import { initialBlogPosts } from '../data/initialData';

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(() => initialBlogPosts.find((p) => p.slug === slug) || null);
  const [relatedPosts, setRelatedPosts] = useState(() => initialBlogPosts.filter((p) => p.slug !== slug));
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const { t, getContent, isNepali } = useLanguage();
  const toast = useToast();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    fetch(`/api/blog/${slug}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.post) {
          setPost(d.post);
          setRelatedPosts(d.relatedPosts || []);
        }
      })
      .catch(() => {
        const found = initialBlogPosts.find((p) => p.slug === slug);
        if (found) {
          setPost(found);
          setRelatedPosts(initialBlogPosts.filter((p) => p.slug !== slug));
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success(isNepali ? 'लिङ्क कपी गरियो!' : 'Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div style={{ padding: '100px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
        Loading article content...
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ padding: '100px 0', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '16px' }}>Article Not Found</h2>
        <Link to="/blog" className="btn btn-primary">
          <ArrowLeft size={16} />
          <span>{t('backToBlogs')}</span>
        </Link>
      </div>
    );
  }

  const title = getContent(post.title, post.titleNe);
  const content = getContent(post.content, post.contentNe);
  const currentUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(title);

  return (
    <div style={{ padding: '40px 0 100px 0' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        {/* Back Link */}
        <Link
          to="/blog"
          className="btn btn-outline btn-sm"
          style={{ marginBottom: '28px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <ArrowLeft size={15} />
          <span>{t('backToBlogs')}</span>
        </Link>

        {/* Article Meta Header */}
        <header style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
            <span className="badge badge-primary">{post.category}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <Clock size={14} />
              <span>{post.readingTime}</span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <Eye size={14} />
              <span>{post.viewsCount || 1} views</span>
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              fontWeight: 800,
              lineHeight: 1.25,
              marginBottom: '20px'
            }}
          >
            {title}
          </h1>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              borderTop: '1px solid var(--border-color)',
              borderBottom: '1px solid var(--border-color)',
              padding: '16px 0'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                <User size={16} color="var(--primary)" />
                <span>{post.author || 'Navin Sharma'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                <Calendar size={15} />
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Audio Listen Button */}
            <TextToSpeechButton textToRead={`${title}. ${content}`} size="small" />
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage && (
          <div
            style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              marginBottom: '40px',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <img
              src={post.featuredImage}
              alt={title}
              style={{ width: '100%', maxHeight: '440px', objectFit: 'cover' }}
            />
          </div>
        )}

        {/* Article Body Content */}
        <article
          style={{
            fontSize: '1.08rem',
            lineHeight: 1.8,
            color: 'var(--text-primary)',
            whiteSpace: 'pre-line',
            marginBottom: '48px'
          }}
        >
          {content}
        </article>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: '0.85rem',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-secondary)'
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Social Share Bar */}
        <div
          className="glass-card"
          style={{
            padding: '20px 24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            marginBottom: '60px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
            <Share2 size={18} color="var(--primary)" />
            <span>{t('shareArticle')}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
              target="_blank"
              rel="noreferrer"
              className="btn-icon"
              title="Share on Facebook"
              aria-label="Share on Facebook"
            >
              <Facebook size={16} />
            </a>

            {/* LinkedIn */}
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`}
              target="_blank"
              rel="noreferrer"
              className="btn-icon"
              title="Share on LinkedIn"
              aria-label="Share on LinkedIn"
            >
              <Linkedin size={16} />
            </a>

            {/* Twitter/X */}
            <a
              href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${currentUrl}`}
              target="_blank"
              rel="noreferrer"
              className="btn-icon"
              title="Share on X"
              aria-label="Share on X"
            >
              <Twitter size={16} />
            </a>

            {/* WhatsApp */}
            <a
              href={`https://api.whatsapp.com/send?text=${shareTitle}%20${currentUrl}`}
              target="_blank"
              rel="noreferrer"
              className="btn-icon"
              title="Share on WhatsApp"
              aria-label="Share on WhatsApp"
            >
              <WhatsApp size={16} />
            </a>

            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className="btn-icon"
              title="Copy link to clipboard"
              aria-label="Copy link"
            >
              {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
            </button>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '24px' }}>
              {t('relatedPosts')}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/blog/${rel.slug}`}
                  className="glass-card"
                  style={{ textDecoration: 'none', padding: '18px', display: 'flex', flexDirection: 'column' }}
                >
                  <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.4 }}>
                    {getContent(rel.title, rel.titleNe)}
                  </h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 'auto' }}>
                    {rel.readingTime}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
