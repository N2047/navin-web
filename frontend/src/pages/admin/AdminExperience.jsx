import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { Plus, Trash2, Edit2, Save, X, Briefcase } from 'lucide-react';

export default function AdminExperience() {
  const { authFetch } = useAuth();
  const toast = useToast();

  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingExp, setEditingExp] = useState(null);

  const fetchExperiences = () => {
    authFetch('/api/experience')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setExperiences(d.experiences || []);
      })
      .catch((e) => console.error('Experience fetch error:', e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const isNew = !editingExp.id;
    const url = isNew ? '/api/experience' : `/api/experience/${editingExp.id}`;
    const method = isNew ? 'POST' : 'PUT';

    const payload = {
      ...editingExp,
      responsibilities: typeof editingExp.responsibilities === 'string'
        ? editingExp.responsibilities.split('\n').map((r) => r.trim()).filter(Boolean)
        : editingExp.responsibilities,
      achievements: typeof editingExp.achievements === 'string'
        ? editingExp.achievements.split('\n').map((a) => a.trim()).filter(Boolean)
        : editingExp.achievements
    };

    try {
      const res = await authFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        toast.success(isNew ? 'Experience created.' : 'Experience updated.');
        setEditingExp(null);
        fetchExperiences();
      }
    } catch (e) {
      toast.error('Failed to save experience.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this experience entry?')) return;
    try {
      await authFetch(`/api/experience/${id}`, { method: 'DELETE' });
      toast.success('Experience deleted.');
      fetchExperiences();
    } catch (e) {
      toast.error('Failed to delete experience.');
    }
  };

  if (loading) return <div>Loading experiences...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '1000px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '6px' }}>Career Experience</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage roles, organizations, dates, and responsibilities.</p>
        </div>
        <button
          onClick={() =>
            setEditingExp({
              organization: '',
              organizationNe: '',
              position: '',
              positionNe: '',
              location: 'Kathmandu, Nepal',
              startDate: '2023',
              endDate: '',
              isCurrent: false,
              responsibilities: '',
              achievements: ''
            })
          }
          className="btn btn-primary btn-sm"
        >
          <Plus size={16} />
          <span>Add Experience</span>
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {experiences.map((exp) => (
            <div
              key={exp.id}
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
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{exp.position}</h3>
                  {exp.isCurrent && <span className="badge badge-emerald">Current Role</span>}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>
                  {exp.organization} • {exp.startDate} {exp.endDate ? `— ${exp.endDate}` : ''}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() =>
                    setEditingExp({
                      ...exp,
                      responsibilities: Array.isArray(exp.responsibilities) ? exp.responsibilities.join('\n') : exp.responsibilities,
                      achievements: Array.isArray(exp.achievements) ? exp.achievements.join('\n') : exp.achievements
                    })
                  }
                  className="btn btn-secondary btn-sm"
                >
                  <Edit2 size={14} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(exp.id)}
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

      {editingExp && (
        <div className="modal-overlay" role="dialog">
          <div className="modal-content animate-slide-up" style={{ padding: '28px', maxWidth: '700px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>
                {editingExp.id ? 'Edit Experience' : 'Add Experience Entry'}
              </h2>
              <button onClick={() => setEditingExp(null)} className="btn-icon">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Position / Role (English)</label>
                  <input
                    type="text"
                    value={editingExp.position}
                    onChange={(e) => setEditingExp({ ...editingExp, position: e.target.value })}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Position / Role (नेपाली)</label>
                  <input
                    type="text"
                    value={editingExp.positionNe || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, positionNe: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Organization (English)</label>
                  <input
                    type="text"
                    value={editingExp.organization}
                    onChange={(e) => setEditingExp({ ...editingExp, organization: e.target.value })}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Organization (नेपाली)</label>
                  <input
                    type="text"
                    value={editingExp.organizationNe || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, organizationNe: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Start Date</label>
                  <input
                    type="text"
                    value={editingExp.startDate}
                    onChange={(e) => setEditingExp({ ...editingExp, startDate: e.target.value })}
                    placeholder="e.g. 2023"
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">End Date</label>
                  <input
                    type="text"
                    value={editingExp.endDate || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, endDate: e.target.value })}
                    placeholder="Leave empty if present"
                    className="form-input"
                    disabled={editingExp.isCurrent}
                  />
                </div>
                <div className="form-group" style={{ justifyContent: 'center' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginTop: '24px' }}>
                    <input
                      type="checkbox"
                      checked={editingExp.isCurrent || false}
                      onChange={(e) => setEditingExp({ ...editingExp, isCurrent: e.target.checked })}
                      style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                    />
                    <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Current Role</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Key Responsibilities (one per line)</label>
                <textarea
                  rows="4"
                  value={editingExp.responsibilities || ''}
                  onChange={(e) => setEditingExp({ ...editingExp, responsibilities: e.target.value })}
                  placeholder="Direct enterprise software architecture..."
                  className="form-textarea"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Key Achievements (one per line)</label>
                <textarea
                  rows="3"
                  value={editingExp.achievements || ''}
                  onChange={(e) => setEditingExp({ ...editingExp, achievements: e.target.value })}
                  placeholder="Reduced API latency by 50%..."
                  className="form-textarea"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setEditingExp(null)} className="btn btn-secondary btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  <Save size={16} />
                  <span>Save Experience</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
