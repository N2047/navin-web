import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { Plus, Trash2, Edit2, Save, X, Cpu } from 'lucide-react';

export default function AdminSkills() {
  const { authFetch } = useAuth();
  const toast = useToast();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSkill, setEditingSkill] = useState(null);
  const [showCatModal, setShowCatModal] = useState(false);
  const [newCat, setNewCat] = useState({ name: '', nameNe: '', slug: '', order: 0 });

  const fetchSkills = () => {
    authFetch('/api/skills')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setCategories(d.categories || []);
      })
      .catch((e) => console.error('Skills fetch error:', e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCat.name.trim()) return;

    try {
      const res = await authFetch('/api/skills/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCat)
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Category created.');
        setShowCatModal(false);
        setNewCat({ name: '', nameNe: '', slug: '', order: 0 });
        fetchSkills();
      }
    } catch (e) {
      toast.error('Failed to create category.');
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Delete category and all its skills?')) return;
    try {
      await authFetch(`/api/skills/categories/${id}`, { method: 'DELETE' });
      toast.success('Category deleted.');
      fetchSkills();
    } catch (e) {
      toast.error('Failed to delete category.');
    }
  };

  const handleSaveSkill = async (e) => {
    e.preventDefault();
    const isNew = !editingSkill.id;
    const url = isNew ? '/api/skills' : `/api/skills/${editingSkill.id}`;
    const method = isNew ? 'POST' : 'PUT';

    try {
      const res = await authFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingSkill)
      });
      const data = await res.json();
      if (data.success) {
        toast.success(isNew ? 'Skill created.' : 'Skill updated.');
        setEditingSkill(null);
        fetchSkills();
      }
    } catch (e) {
      toast.error('Failed to save skill.');
    }
  };

  const handleDeleteSkill = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    try {
      await authFetch(`/api/skills/${id}`, { method: 'DELETE' });
      toast.success('Skill deleted.');
      fetchSkills();
    } catch (e) {
      toast.error('Failed to delete skill.');
    }
  };

  if (loading) return <div>Loading skills manager...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '1000px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '6px' }}>Skills & Competencies</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage technical categories, proficiency levels, and metrics.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setShowCatModal(true)} className="btn btn-secondary btn-sm">
            + New Category
          </button>
          <button
            onClick={() =>
              setEditingSkill({
                categoryId: categories[0]?.id || '',
                name: '',
                nameNe: '',
                level: 'Expert',
                percentage: 90,
                icon: 'Code',
                isFeatured: true
              })
            }
            className="btn btn-primary btn-sm"
          >
            <Plus size={16} />
            <span>Add New Skill</span>
          </button>
        </div>
      </div>

      {/* Categories & Skills list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {categories.map((cat) => (
          <div key={cat.id} className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                  {cat.name} {cat.nameNe && <span style={{ color: 'var(--text-muted)' }}>({cat.nameNe})</span>}
                </h2>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Slug: {cat.slug}</div>
              </div>
              <button
                onClick={() => handleDeleteCategory(cat.id)}
                className="btn-icon"
                style={{ color: '#ef4444' }}
                title="Delete Category"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
              {cat.skills?.map((skill) => (
                <div
                  key={skill.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    background: 'var(--bg-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{skill.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {skill.percentage}% • {skill.level} {skill.isFeatured && '★'}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => setEditingSkill(skill)}
                      className="btn-icon"
                      style={{ width: '30px', height: '30px' }}
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteSkill(skill.id)}
                      className="btn-icon"
                      style={{ width: '30px', height: '30px', color: '#ef4444' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Edit/Create Skill Modal */}
      {editingSkill && (
        <div className="modal-overlay" role="dialog">
          <div className="modal-content animate-slide-up" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>
                {editingSkill.id ? 'Edit Skill' : 'Create New Skill'}
              </h2>
              <button onClick={() => setEditingSkill(null)} className="btn-icon">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveSkill}>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  value={editingSkill.categoryId}
                  onChange={(e) => setEditingSkill({ ...editingSkill, categoryId: e.target.value })}
                  className="form-select"
                  required
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Skill Name (English)</label>
                  <input
                    type="text"
                    value={editingSkill.name}
                    onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Skill Name (नेपाली)</label>
                  <input
                    type="text"
                    value={editingSkill.nameNe || ''}
                    onChange={(e) => setEditingSkill({ ...editingSkill, nameNe: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Proficiency Level</label>
                  <select
                    value={editingSkill.level}
                    onChange={(e) => setEditingSkill({ ...editingSkill, level: e.target.value })}
                    className="form-select"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                    <option value="Native">Native</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Percentage ({editingSkill.percentage}%)</label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={editingSkill.percentage}
                    onChange={(e) => setEditingSkill({ ...editingSkill, percentage: Number(e.target.value) })}
                    style={{ width: '100%', accentColor: 'var(--primary)', height: '36px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <input
                  type="checkbox"
                  id="featured-skill-cb"
                  checked={editingSkill.isFeatured || false}
                  onChange={(e) => setEditingSkill({ ...editingSkill, isFeatured: e.target.checked })}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                />
                <label htmlFor="featured-skill-cb" style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                  Feature on Homepage
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setEditingSkill(null)} className="btn btn-secondary btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  <Save size={16} />
                  <span>Save Skill</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Category Modal */}
      {showCatModal && (
        <div className="modal-overlay" role="dialog">
          <div className="modal-content animate-slide-up" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Create Skill Category</h2>
              <button onClick={() => setShowCatModal(false)} className="btn-icon">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleCreateCategory}>
              <div className="form-group">
                <label className="form-label">Category Name (English)</label>
                <input
                  type="text"
                  value={newCat.name}
                  onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
                  required
                  placeholder="e.g. AI & Data Science"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Category Name (नेपाली)</label>
                <input
                  type="text"
                  value={newCat.nameNe}
                  onChange={(e) => setNewCat({ ...newCat, nameNe: e.target.value })}
                  placeholder="e.g. कृत्रिम बुद्धिमत्ता"
                  className="form-input"
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" onClick={() => setShowCatModal(false)} className="btn btn-secondary btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
