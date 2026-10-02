import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { Plus, Trash2, Edit2, Save, X, ExternalLink } from 'lucide-react';

export default function AdminPortfolio() {
  const { authFetch } = useAuth();
  const toast = useToast();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProj, setEditingProj] = useState(null);

  const fetchProjects = () => {
    authFetch('/api/portfolio')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setProjects(d.projects || []);
      })
      .catch((e) => console.error('Portfolio error:', e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const isNew = !editingProj.id;
    const url = isNew ? '/api/portfolio' : `/api/portfolio/${editingProj.id}`;
    const method = isNew ? 'POST' : 'PUT';

    const payload = {
      ...editingProj,
      technologies: typeof editingProj.technologies === 'string'
        ? editingProj.technologies.split(',').map((t) => t.trim()).filter(Boolean)
        : editingProj.technologies
    };

    try {
      const res = await authFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        toast.success(isNew ? 'Project created.' : 'Project updated.');
        setEditingProj(null);
        fetchProjects();
      }
    } catch (e) {
      toast.error('Failed to save project.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await authFetch(`/api/portfolio/${id}`, { method: 'DELETE' });
      toast.success('Project deleted.');
      fetchProjects();
    } catch (e) {
      toast.error('Failed to delete project.');
    }
  };

  if (loading) return <div>Loading portfolio...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '1000px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '6px' }}>Portfolio Projects</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage showcased engineering works, applications, and links.</p>
        </div>
        <button
          onClick={() =>
            setEditingProj({
              title: '',
              titleNe: '',
              category: 'Full-Stack Web',
              shortDesc: '',
              shortDescNe: '',
              description: '',
              descriptionNe: '',
              thumbnail: '',
              technologies: 'React, Node.js',
              projectUrl: '',
              githubUrl: '',
              isFeatured: true
            })
          }
          className="btn btn-primary btn-sm"
        >
          <Plus size={16} />
          <span>New Project</span>
        </button>
      </div>

      {/* Projects Table / Cards */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {projects.map((proj) => (
            <div
              key={proj.id}
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
                {proj.thumbnail && (
                  <img
                    src={proj.thumbnail}
                    alt={proj.title}
                    style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '6px' }}
                  />
                )}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{proj.title}</h3>
                    {proj.isFeatured && <span className="badge badge-emerald">Featured</span>}
                  </div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                    {proj.category} • {proj.viewsCount} views
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                  onClick={() =>
                    setEditingProj({
                      ...proj,
                      technologies: Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies
                    })
                  }
                  className="btn btn-secondary btn-sm"
                >
                  <Edit2 size={14} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(proj.id)}
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

      {/* Edit / Create Modal */}
      {editingProj && (
        <div className="modal-overlay" role="dialog">
          <div className="modal-content animate-slide-up" style={{ padding: '28px', maxWidth: '720px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>
                {editingProj.id ? 'Edit Project' : 'Create New Project'}
              </h2>
              <button onClick={() => setEditingProj(null)} className="btn-icon">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Project Title (English)</label>
                  <input
                    type="text"
                    value={editingProj.title}
                    onChange={(e) => setEditingProj({ ...editingProj, title: e.target.value })}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Project Title (नेपाली)</label>
                  <input
                    type="text"
                    value={editingProj.titleNe || ''}
                    onChange={(e) => setEditingProj({ ...editingProj, titleNe: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    value={editingProj.category}
                    onChange={(e) => setEditingProj({ ...editingProj, category: e.target.value })}
                    placeholder="e.g. Accessibility & AI, Fintech"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Thumbnail URL</label>
                  <input
                    type="text"
                    value={editingProj.thumbnail || ''}
                    onChange={(e) => setEditingProj({ ...editingProj, thumbnail: e.target.value })}
                    placeholder="/uploads/project.jpg or https://..."
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Short Description (English)</label>
                <textarea
                  rows="2"
                  value={editingProj.shortDesc || ''}
                  onChange={(e) => setEditingProj({ ...editingProj, shortDesc: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Short Description (नेपाली)</label>
                <textarea
                  rows="2"
                  value={editingProj.shortDescNe || ''}
                  onChange={(e) => setEditingProj({ ...editingProj, shortDescNe: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Detailed Description</label>
                <textarea
                  rows="4"
                  value={editingProj.description || ''}
                  onChange={(e) => setEditingProj({ ...editingProj, description: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Technologies (comma separated)</label>
                <input
                  type="text"
                  value={editingProj.technologies || ''}
                  onChange={(e) => setEditingProj({ ...editingProj, technologies: e.target.value })}
                  placeholder="React, Node.js, Web Speech API, PostgreSQL"
                  className="form-input"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Live Demo URL</label>
                  <input
                    type="url"
                    value={editingProj.projectUrl || ''}
                    onChange={(e) => setEditingProj({ ...editingProj, projectUrl: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">GitHub Code URL</label>
                  <input
                    type="url"
                    value={editingProj.githubUrl || ''}
                    onChange={(e) => setEditingProj({ ...editingProj, githubUrl: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <input
                  type="checkbox"
                  id="featured-proj-cb"
                  checked={editingProj.isFeatured || false}
                  onChange={(e) => setEditingProj({ ...editingProj, isFeatured: e.target.checked })}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                />
                <label htmlFor="featured-proj-cb" style={{ fontWeight: 600 }}>
                  Feature on Homepage
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setEditingProj(null)} className="btn btn-secondary btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  <Save size={16} />
                  <span>Save Project</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
