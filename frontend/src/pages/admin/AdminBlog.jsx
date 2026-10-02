import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { Plus, Trash2, Edit2, Save, X, BookOpen, Eye, Clock, CheckCircle } from 'lucide-react';

export default function AdminBlog() {
  const { authFetch } = useAuth();
  const toast = useToast();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null);

  const fetchPosts = () => {
    authFetch('/api/blog?all=true&limit=100')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setPosts(d.posts || []);
      })
      .catch((e) => console.error('Blog error:', e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const isNew = !editingPost.id;
    const url = isNew ? '/api/blog' : `/api/blog/${editingPost.id}`;
    const method = isNew ? 'POST' : 'PUT';

    const payload = {
      ...editingPost,
      tags: typeof editingPost.tags === 'string'
        ? editingPost.tags.split(',').map((t) => t.trim()).filter(Boolean)
        : editingPost.tags
    };

    try {
      const res = await authFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        toast.success(isNew ? 'Blog post created.' : 'Blog post updated.');
        setEditingPost(null);
        fetchPosts();
      }
    } catch (e) {
      toast.error('Failed to save blog post.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    try {
      await authFetch(`/api/blog/${id}`, { method: 'DELETE' });
      toast.success('Blog post deleted.');
      fetchPosts();
    } catch (e) {
      toast.error('Failed to delete blog post.');
    }
  };

  if (loading) return <div>Loading blogs...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '1000px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '6px' }}>Blog & Articles</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Publish technical articles, architectural guides, and insights.</p>
        </div>
        <button
          onClick={() =>
            setEditingPost({
              title: '',
              titleNe: '',
              category: 'Web Accessibility',
              tags: 'Accessibility, Engineering',
              excerpt: '',
              excerptNe: '',
              content: '',
              contentNe: '',
              featuredImage: '',
              isFeatured: false,
              isPublished: true
            })
          }
          className="btn btn-primary btn-sm"
        >
          <Plus size={16} />
          <span>Write New Post</span>
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {posts.map((post) => (
            <div
              key={post.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                background: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-md)',
                gap: '16px',
                flexWrap: 'wrap'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                {post.featuredImage && (
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '6px' }}
                  />
                )}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{post.title}</h3>
                    {post.isPublished ? (
                      <span className="badge badge-emerald">Published</span>
                    ) : (
                      <span className="badge" style={{ background: '#f59e0b', color: '#fff' }}>Draft</span>
                    )}
                    {post.isFeatured && <span className="badge badge-primary">Featured</span>}
                  </div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                    {post.category} • {post.readingTime} • {post.viewsCount || 0} views • {new Date(post.publishedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() =>
                    setEditingPost({
                      ...post,
                      tags: Array.isArray(post.tags) ? post.tags.join(', ') : post.tags
                    })
                  }
                  className="btn btn-secondary btn-sm"
                >
                  <Edit2 size={14} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="btn-icon"
                  style={{ color: '#ef4444' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editingPost && (
        <div className="modal-overlay" role="dialog">
          <div className="modal-content animate-slide-up" style={{ padding: '28px', maxWidth: '800px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>
                {editingPost.id ? 'Edit Article' : 'Compose New Article'}
              </h2>
              <button onClick={() => setEditingPost(null)} className="btn-icon">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Article Title (English)</label>
                  <input
                    type="text"
                    value={editingPost.title}
                    onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Article Title (नेपाली)</label>
                  <input
                    type="text"
                    value={editingPost.titleNe || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, titleNe: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    value={editingPost.category}
                    onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Featured Image URL</label>
                  <input
                    type="text"
                    value={editingPost.featuredImage || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, featuredImage: e.target.value })}
                    placeholder="/uploads/banner.jpg or https://..."
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Tags (comma separated)</label>
                <input
                  type="text"
                  value={editingPost.tags || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, tags: e.target.value })}
                  placeholder="Accessibility, Node.js, AI"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Excerpt / Summary (English)</label>
                <textarea
                  rows="2"
                  value={editingPost.excerpt || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Excerpt / Summary (नेपाली)</label>
                <textarea
                  rows="2"
                  value={editingPost.excerptNe || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, excerptNe: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Article Content (English)</label>
                <textarea
                  rows="8"
                  value={editingPost.content || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  required
                  className="form-textarea"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Article Content (नेपाली)</label>
                <textarea
                  rows="6"
                  value={editingPost.contentNe || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, contentNe: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '24px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={editingPost.isPublished !== false}
                    onChange={(e) => setEditingPost({ ...editingPost, isPublished: e.target.checked })}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                  />
                  <span style={{ fontWeight: 600 }}>Published (visible on website)</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={editingPost.isFeatured || false}
                    onChange={(e) => setEditingPost({ ...editingPost, isFeatured: e.target.checked })}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                  />
                  <span style={{ fontWeight: 600 }}>Feature on Homepage</span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setEditingPost(null)} className="btn btn-secondary btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  <Save size={16} />
                  <span>Save Article</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
