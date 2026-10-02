import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { Plus, Trash2, Edit2, Save, X, Award } from 'lucide-react';

export default function AdminAchievements() {
  const { authFetch } = useAuth();
  const toast = useToast();

  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingAch, setEditingAch] = useState(null);

  const fetchAchievements = () => {
    authFetch('/api/achievements')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setAchievements(d.achievements || []);
      })
      .catch((e) => console.error('Achievements error:', e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const isNew = !editingAch.id;
    const url = isNew ? '/api/achievements' : `/api/achievements/${editingAch.id}`;
    const method = isNew ? 'POST' : 'PUT';

    try {
      const res = await authFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingAch)
      });
      const data = await res.json();
      if (data.success) {
        toast.success(isNew ? 'Achievement created.' : 'Achievement updated.');
        setEditingAch(null);
        fetchAchievements();
      }
    } catch (e) {
      toast.error('Failed to save achievement.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this achievement?')) return;
    try {
      await authFetch(`/api/achievements/${id}`, { method: 'DELETE' });
      toast.success('Achievement deleted.');
      fetchAchievements();
    } catch (e) {
      toast.error('Failed to delete achievement.');
    }
  };

  if (loading) return <div>Loading achievements...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '1000px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '6px' }}>Honors & Achievements</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage awards, certifications, and public honors.</p>
        </div>
        <button
          onClick={() =>
            setEditingAch({
              title: '',
              titleNe: '',
              organization: '',
              organizationNe: '',
              date: '2025',
              description: '',
              certificateUrl: '',
              isFeatured: true
            })
          }
          className="btn btn-primary btn-sm"
        >
          <Plus size={16} />
          <span>New Achievement</span>
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {achievements.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                background: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-md)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{item.title}</h3>
                  {item.isFeatured && <span className="badge badge-emerald">Featured</span>}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>
                  {item.organization} • {item.date}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => setEditingAch(item)} className="btn btn-secondary btn-sm">
                  <Edit2 size={14} />
                  <span>Edit</span>
                </button>
                <button onClick={() => handleDelete(item.id)} className="btn-icon" style={{ color: '#ef4444' }}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editingAch && (
        <div className="modal-overlay" role="dialog">
          <div className="modal-content animate-slide-up" style={{ padding: '28px', maxWidth: '680px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>
                {editingAch.id ? 'Edit Achievement' : 'Add New Achievement'}
              </h2>
              <button onClick={() => setEditingAch(null)} className="btn-icon">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Title (English)</label>
                  <input
                    type="text"
                    value={editingAch.title}
                    onChange={(e) => setEditingAch({ ...editingAch, title: e.target.value })}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Title (नेपाली)</label>
                  <input
                    type="text"
                    value={editingAch.titleNe || ''}
                    onChange={(e) => setEditingAch({ ...editingAch, titleNe: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Organization (English)</label>
                  <input
                    type="text"
                    value={editingAch.organization}
                    onChange={(e) => setEditingAch({ ...editingAch, organization: e.target.value })}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Organization (नेपाली)</label>
                  <input
                    type="text"
                    value={editingAch.organizationNe || ''}
                    onChange={(e) => setEditingAch({ ...editingAch, organizationNe: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Year / Date</label>
                  <input
                    type="text"
                    value={editingAch.date}
                    onChange={(e) => setEditingAch({ ...editingAch, date: e.target.value })}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Certificate URL (PDF / Image)</label>
                  <input
                    type="text"
                    value={editingAch.certificateUrl || ''}
                    onChange={(e) => setEditingAch({ ...editingAch, certificateUrl: e.target.value })}
                    placeholder="/uploads/award.pdf or https://..."
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description (English)</label>
                <textarea
                  rows="3"
                  value={editingAch.description || ''}
                  onChange={(e) => setEditingAch({ ...editingAch, description: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description (नेपाली)</label>
                <textarea
                  rows="3"
                  value={editingAch.descriptionNe || ''}
                  onChange={(e) => setEditingAch({ ...editingAch, descriptionNe: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <input
                  type="checkbox"
                  id="featured-ach-cb"
                  checked={editingAch.isFeatured || false}
                  onChange={(e) => setEditingAch({ ...editingAch, isFeatured: e.target.checked })}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                />
                <label htmlFor="featured-ach-cb" style={{ fontWeight: 600 }}>
                  Feature on Homepage
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setEditingAch(null)} className="btn btn-secondary btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  <Save size={16} />
                  <span>Save Achievement</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
