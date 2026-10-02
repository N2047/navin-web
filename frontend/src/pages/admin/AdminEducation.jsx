import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { Plus, Trash2, Edit2, Save, X, GraduationCap } from 'lucide-react';

export default function AdminEducation() {
  const { authFetch } = useAuth();
  const toast = useToast();

  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEdu, setEditingEdu] = useState(null);

  const fetchEducation = () => {
    authFetch('/api/education')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setEducations(d.educations || []);
      })
      .catch((e) => console.error('Education error:', e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const isNew = !editingEdu.id;
    const url = isNew ? '/api/education' : `/api/education/${editingEdu.id}`;
    const method = isNew ? 'POST' : 'PUT';

    try {
      const res = await authFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingEdu)
      });
      const data = await res.json();
      if (data.success) {
        toast.success(isNew ? 'Education added.' : 'Education updated.');
        setEditingEdu(null);
        fetchEducation();
      }
    } catch (e) {
      toast.error('Failed to save education.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this education credential?')) return;
    try {
      await authFetch(`/api/education/${id}`, { method: 'DELETE' });
      toast.success('Education deleted.');
      fetchEducation();
    } catch (e) {
      toast.error('Failed to delete education.');
    }
  };

  if (loading) return <div>Loading education...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '1000px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '6px' }}>Academic Credentials</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage university degrees, colleges, and certificates.</p>
        </div>
        <button
          onClick={() =>
            setEditingEdu({
              institution: '',
              institutionNe: '',
              degree: 'Bachelor of Science (B.Sc.)',
              degreeNe: '',
              fieldOfStudy: 'Computer Science',
              fieldOfStudyNe: '',
              startYear: '2020',
              endYear: '2024',
              description: '',
              certificateUrl: ''
            })
          }
          className="btn btn-primary btn-sm"
        >
          <Plus size={16} />
          <span>Add Credential</span>
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {educations.map((edu) => (
            <div
              key={edu.id}
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
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
                  {edu.degree} in {edu.fieldOfStudy}
                </h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>
                  {edu.institution} • {edu.startYear} — {edu.endYear || 'Present'}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => setEditingEdu(edu)} className="btn btn-secondary btn-sm">
                  <Edit2 size={14} />
                  <span>Edit</span>
                </button>
                <button onClick={() => handleDelete(edu.id)} className="btn-icon" style={{ color: '#ef4444' }}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editingEdu && (
        <div className="modal-overlay" role="dialog">
          <div className="modal-content animate-slide-up" style={{ padding: '28px', maxWidth: '680px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>
                {editingEdu.id ? 'Edit Education' : 'Add Education Record'}
              </h2>
              <button onClick={() => setEditingEdu(null)} className="btn-icon">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Degree (English)</label>
                  <input
                    type="text"
                    value={editingEdu.degree}
                    onChange={(e) => setEditingEdu({ ...editingEdu, degree: e.target.value })}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Degree (नेपाली)</label>
                  <input
                    type="text"
                    value={editingEdu.degreeNe || ''}
                    onChange={(e) => setEditingEdu({ ...editingEdu, degreeNe: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Field of Study (English)</label>
                  <input
                    type="text"
                    value={editingEdu.fieldOfStudy}
                    onChange={(e) => setEditingEdu({ ...editingEdu, fieldOfStudy: e.target.value })}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Field of Study (नेपाली)</label>
                  <input
                    type="text"
                    value={editingEdu.fieldOfStudyNe || ''}
                    onChange={(e) => setEditingEdu({ ...editingEdu, fieldOfStudyNe: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Institution (English)</label>
                  <input
                    type="text"
                    value={editingEdu.institution}
                    onChange={(e) => setEditingEdu({ ...editingEdu, institution: e.target.value })}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Institution (नेपाली)</label>
                  <input
                    type="text"
                    value={editingEdu.institutionNe || ''}
                    onChange={(e) => setEditingEdu({ ...editingEdu, institutionNe: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Start Year</label>
                  <input
                    type="text"
                    value={editingEdu.startYear}
                    onChange={(e) => setEditingEdu({ ...editingEdu, startYear: e.target.value })}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">End Year</label>
                  <input
                    type="text"
                    value={editingEdu.endYear || ''}
                    onChange={(e) => setEditingEdu({ ...editingEdu, endYear: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Certificate URL (PDF or Image)</label>
                <input
                  type="text"
                  value={editingEdu.certificateUrl || ''}
                  onChange={(e) => setEditingEdu({ ...editingEdu, certificateUrl: e.target.value })}
                  placeholder="/uploads/degree.pdf or https://..."
                  className="form-input"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setEditingEdu(null)} className="btn btn-secondary btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  <Save size={16} />
                  <span>Save Record</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
