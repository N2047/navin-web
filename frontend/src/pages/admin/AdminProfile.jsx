import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { Save, Plus, Trash2, Globe, Sparkles } from 'lucide-react';
import { initialProfile, initialSocialLinks } from '../../data/initialData';

export default function AdminProfile() {
  const { authFetch } = useAuth();
  const toast = useToast();

  const [profile, setProfile] = useState(initialProfile);
  const [socialLinks, setSocialLinks] = useState(initialSocialLinks);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    authFetch('/api/profile')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          if (d.profile) setProfile(d.profile);
          if (d.socialLinks) setSocialLinks(d.socialLinks);
        }
      })
      .catch((e) => console.error('Profile fetch error:', e))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await authFetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Profile details updated successfully!');
      } else {
        toast.error(data.message || 'Failed to update profile.');
      }
    } catch (err) {
      toast.error('Network error saving profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleAddSocial = () => {
    setSocialLinks((prev) => [
      ...prev,
      { platform: 'New Platform', url: 'https://', icon: 'Globe', order: prev.length + 1, isVisible: true }
    ]);
  };

  const handleSocialChange = (idx, field, value) => {
    const updated = [...socialLinks];
    updated[idx][field] = value;
    setSocialLinks(updated);
  };

  const handleSaveSocial = async (link) => {
    try {
      const res = await authFetch('/api/profile/social-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(link)
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Saved ${link.platform} link.`);
      }
    } catch (e) {
      toast.error('Failed to save social link.');
    }
  };

  const handleDeleteSocial = async (id, idx) => {
    if (!id) {
      setSocialLinks(socialLinks.filter((_, i) => i !== idx));
      return;
    }
    if (!window.confirm('Are you sure you want to delete this social link?')) return;
    try {
      await authFetch(`/api/profile/social-links/${id}`, { method: 'DELETE' });
      setSocialLinks(socialLinks.filter((s) => s.id !== id));
      toast.success('Social link removed.');
    } catch (e) {
      toast.error('Error removing social link.');
    }
  };

  if (loading) {
    return <div style={{ color: 'var(--text-muted)', padding: '40px 0' }}>Loading profile settings...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '1000px' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '6px' }}>
          Profile & Identity Management
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Configure bilingual personal biography, hero headline, contact channels, and statistics.
        </p>
      </div>

      <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Basic Names & Titles */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px' }}>
            Primary Personal Details (Bilingual)
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label">Full Name (English)</label>
              <input
                type="text"
                name="fullName"
                value={profile.fullName || ''}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Full Name (नेपाली)</label>
              <input
                type="text"
                name="fullNameNe"
                value={profile.fullNameNe || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Professional Title (English)</label>
              <input
                type="text"
                name="professionalTitle"
                value={profile.professionalTitle || ''}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Professional Title (नेपाली)</label>
              <input
                type="text"
                name="professionalTitleNe"
                value={profile.professionalTitleNe || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label">Tagline (English)</label>
              <textarea
                name="tagline"
                rows="2"
                value={profile.tagline || ''}
                onChange={handleChange}
                className="form-textarea"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tagline (नेपाली)</label>
              <textarea
                name="taglineNe"
                rows="2"
                value={profile.taglineNe || ''}
                onChange={handleChange}
                className="form-textarea"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input
                type="text"
                name="phone"
                value={profile.phone || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Location (EN)</label>
              <input
                type="text"
                name="location"
                value={profile.location || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Location (नेपाली)</label>
              <input
                type="text"
                name="locationNe"
                value={profile.locationNe || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Profile Photo URL</label>
            <input
              type="text"
              name="profilePhoto"
              value={profile.profilePhoto || ''}
              onChange={handleChange}
              placeholder="/uploads/photo.jpg or https://..."
              className="form-input"
            />
          </div>
        </div>

        {/* Narrative & Biography */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px' }}>
            Detailed Biography & Career Narrative
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label">Detailed Biography (English)</label>
              <textarea
                name="detailedBio"
                rows="6"
                value={profile.detailedBio || ''}
                onChange={handleChange}
                className="form-textarea"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Detailed Biography (नेपाली)</label>
              <textarea
                name="detailedBioNe"
                rows="6"
                value={profile.detailedBioNe || ''}
                onChange={handleChange}
                className="form-textarea"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label">My Journey (English)</label>
              <textarea
                name="journey"
                rows="4"
                value={profile.journey || ''}
                onChange={handleChange}
                className="form-textarea"
              />
            </div>

            <div className="form-group">
              <label className="form-label">My Journey (नेपाली)</label>
              <textarea
                name="journeyNe"
                rows="4"
                value={profile.journeyNe || ''}
                onChange={handleChange}
                className="form-textarea"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label">Career Objective (English)</label>
              <textarea
                name="careerObjective"
                rows="3"
                value={profile.careerObjective || ''}
                onChange={handleChange}
                className="form-textarea"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Career Objective (नेपाली)</label>
              <textarea
                name="careerObjectiveNe"
                rows="3"
                value={profile.careerObjectiveNe || ''}
                onChange={handleChange}
                className="form-textarea"
              />
            </div>
          </div>
        </div>

        {/* Numeric Statistics Counter */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px' }}>
            Homepage Statistics Counters
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label">Projects Completed</label>
              <input
                type="number"
                name="projectsCompleted"
                value={profile.projectsCompleted || 0}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Years of Experience</label>
              <input
                type="number"
                name="yearsExperience"
                value={profile.yearsExperience || 0}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Trainings & Workshops</label>
              <input
                type="number"
                name="trainingsCount"
                value={profile.trainingsCount || 0}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Achievements & Honors</label>
              <input
                type="number"
                name="achievementsCount"
                value={profile.achievementsCount || 0}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="btn btn-primary btn-lg"
          style={{ alignSelf: 'flex-start' }}
        >
          <Save size={18} />
          <span>{saving ? 'Saving Changes...' : 'Save Profile Changes'}</span>
        </button>
      </form>

      {/* Social Links Sub-section */}
      <div className="glass-panel" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Social Media & Channels</h2>
          <button onClick={handleAddSocial} className="btn btn-secondary btn-sm">
            <Plus size={16} />
            <span>Add Channel</span>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {socialLinks.map((link, idx) => (
            <div
              key={link.id || idx}
              style={{
                display: 'grid',
                gridTemplateColumns: '150px 1fr 100px 90px 40px',
                gap: '12px',
                alignItems: 'center',
                padding: '12px',
                background: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              <input
                type="text"
                value={link.platform}
                onChange={(e) => handleSocialChange(idx, 'platform', e.target.value)}
                placeholder="Platform"
                className="form-input"
              />
              <input
                type="url"
                value={link.url}
                onChange={(e) => handleSocialChange(idx, 'url', e.target.value)}
                placeholder="https://..."
                className="form-input"
              />
              <button
                type="button"
                onClick={() => handleSaveSocial(link)}
                className="btn btn-primary btn-sm"
              >
                Save
              </button>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}>
                <input
                  type="checkbox"
                  checked={link.isVisible}
                  onChange={(e) => handleSocialChange(idx, 'isVisible', e.target.checked)}
                />
                Visible
              </label>
              <button
                type="button"
                onClick={() => handleDeleteSocial(link.id, idx)}
                style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
