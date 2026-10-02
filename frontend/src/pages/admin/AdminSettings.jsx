import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { Save, Settings, Shield, Bot, Globe } from 'lucide-react';

export default function AdminSettings() {
  const { authFetch } = useAuth();
  const toast = useToast();

  const [settings, setSettings] = useState({
    site_title: '',
    site_title_ne: '',
    meta_description: '',
    meta_description_ne: '',
    meta_keywords: '',
    contact_email: '',
    contact_phone: '',
    contact_location: '',
    maintenance_mode: 'false',
    enable_ai_chatbot: 'true',
    chatbot_system_prompt: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    authFetch('/api/settings')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          const map = {};
          d.settings.forEach((s) => {
            map[s.key] = s.value;
          });
          setSettings((prev) => ({ ...prev, ...map }));
        }
      })
      .catch((e) => console.error('Settings error:', e))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await authFetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings })
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Site configurations saved successfully!');
      } else {
        toast.error('Failed to save settings.');
      }
    } catch (err) {
      toast.error('Network error saving settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading settings...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '880px' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '6px' }}>Site Configuration & SEO</h1>
        <p style={{ color: 'var(--text-secondary)' }}>SEO metadata, contact preferences, and AI Assistant directives.</p>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* SEO Meta */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Globe size={20} color="var(--primary)" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>SEO & Meta Properties</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Site Title (English)</label>
              <input
                type="text"
                name="site_title"
                value={settings.site_title || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Site Title (नेपाली)</label>
              <input
                type="text"
                name="site_title_ne"
                value={settings.site_title_ne || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Meta Description (English)</label>
            <textarea
              name="meta_description"
              rows="2"
              value={settings.meta_description || ''}
              onChange={handleChange}
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Meta Description (नेपाली)</label>
            <textarea
              name="meta_description_ne"
              rows="2"
              value={settings.meta_description_ne || ''}
              onChange={handleChange}
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Meta Keywords</label>
            <input
              type="text"
              name="meta_keywords"
              value={settings.meta_keywords || ''}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>

        {/* AI Assistant Directives */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Bot size={20} color="var(--accent)" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>"Ask About Me" AI Assistant Directives</h2>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.enable_ai_chatbot === 'true'}
                onChange={(e) =>
                  setSettings({ ...settings, enable_ai_chatbot: e.target.checked ? 'true' : 'false' })
                }
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
              />
              <span style={{ fontWeight: 600 }}>Enable Floating AI Assistant on Public Website</span>
            </label>
          </div>

          <div className="form-group">
            <label className="form-label">Custom AI System Prompt / Persona Guidelines</label>
            <textarea
              name="chatbot_system_prompt"
              rows="4"
              value={settings.chatbot_system_prompt || ''}
              onChange={handleChange}
              className="form-textarea"
            />
          </div>
        </div>

        {/* Maintenance Mode */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Shield size={20} color="#f59e0b" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>System State</h2>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.maintenance_mode === 'true'}
              onChange={(e) =>
                setSettings({ ...settings, maintenance_mode: e.target.checked ? 'true' : 'false' })
              }
              style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
            />
            <span style={{ fontWeight: 600 }}>Enable Maintenance Mode Banner</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="btn btn-primary btn-lg"
          style={{ alignSelf: 'flex-start' }}
        >
          <Save size={18} />
          <span>{saving ? 'Saving...' : 'Save Configuration'}</span>
        </button>
      </form>
    </div>
  );
}
