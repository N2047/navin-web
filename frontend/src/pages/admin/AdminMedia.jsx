import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { Upload, Copy, Trash2, Check, File, Search, ExternalLink } from 'lucide-react';

export default function AdminMedia() {
  const { authFetch } = useAuth();
  const toast = useToast();

  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMedia = () => {
    authFetch('/api/media?limit=50')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setMediaList(d.media || []);
      })
      .catch((e) => console.error('Media fetch error:', e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      const res = await authFetch('/api/media/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Media files uploaded successfully!');
        fetchMedia();
      } else {
        toast.error(data.message || 'Upload failed.');
      }
    } catch (err) {
      toast.error('Network error during upload.');
    } finally {
      setUploading(false);
    }
  };

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success('File URL copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this file from library?')) return;
    try {
      await authFetch(`/api/media/${id}`, { method: 'DELETE' });
      toast.success('File removed.');
      fetchMedia();
    } catch (e) {
      toast.error('Failed to delete file.');
    }
  };

  const filtered = mediaList.filter(
    (m) =>
      !searchTerm ||
      m.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '1000px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '6px' }}>Central Media Library</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Upload, preview, copy URLs, and reuse images or documents.</p>
        </div>
        <button
          onClick={() => document.getElementById('media-upload-input').click()}
          className="btn btn-primary btn-sm"
          disabled={uploading}
        >
          <Upload size={16} />
          <span>{uploading ? 'Uploading...' : 'Upload Files'}</span>
        </button>
        <input
          type="file"
          id="media-upload-input"
          multiple
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
      </div>

      {/* Search Bar */}
      <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Search size={18} color="var(--text-muted)" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter media by filename..."
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text-primary)',
            fontSize: '0.95rem'
          }}
        />
      </div>

      {/* Media Grid */}
      {loading ? (
        <div>Loading media items...</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
          No media files uploaded yet.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
          {filtered.map((m) => {
            const isImage = m.mimeType.startsWith('image/');
            return (
              <div
                key={m.id}
                className="glass-card"
                style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
              >
                <div
                  style={{
                    height: '140px',
                    background: 'var(--bg-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}
                >
                  {isImage ? (
                    <img src={m.url} alt={m.originalName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <File size={42} color="var(--primary)" />
                  )}
                </div>

                <div style={{ padding: '12px' }}>
                  <div
                    style={{
                      fontSize: '0.825rem',
                      fontWeight: 600,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      marginBottom: '6px'
                    }}
                    title={m.originalName}
                  >
                    {m.originalName}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                    <button
                      onClick={() => handleCopy(m.url, m.id)}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '4px 8px', fontSize: '0.75rem', gap: '4px' }}
                      title="Copy URL"
                    >
                      {copiedId === m.id ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                      <span>{copiedId === m.id ? 'Copied' : 'Copy'}</span>
                    </button>

                    <button
                      onClick={() => handleDelete(m.id)}
                      style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                      title="Delete file"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
