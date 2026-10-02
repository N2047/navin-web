import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { Plus, Trash2, Edit2, Save, X, Image as ImageIcon, Video, FolderPlus } from 'lucide-react';

export default function AdminGallery() {
  const { authFetch } = useAuth();
  const toast = useToast();

  const [albums, setAlbums] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlbumModal, setShowAlbumModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);

  const [newAlbum, setNewAlbum] = useState({ title: '', titleNe: '', description: '', coverImage: '' });
  const [newItem, setNewItem] = useState({ albumId: '', title: '', type: 'photo', mediaUrl: '', caption: '' });

  const fetchData = () => {
    Promise.all([
      authFetch('/api/gallery/albums').then((r) => r.json()),
      authFetch('/api/gallery/items').then((r) => r.json())
    ])
      .then(([aData, iData]) => {
        if (aData.success) setAlbums(aData.albums || []);
        if (iData.success) setItems(iData.items || []);
      })
      .catch((e) => console.error('Gallery error:', e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateAlbum = async (e) => {
    e.preventDefault();
    try {
      const res = await authFetch('/api/gallery/albums', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAlbum)
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Album created.');
        setShowAlbumModal(false);
        setNewAlbum({ title: '', titleNe: '', description: '', coverImage: '' });
        fetchData();
      }
    } catch (e) {
      toast.error('Failed to create album.');
    }
  };

  const handleCreateItem = async (e) => {
    e.preventDefault();
    try {
      const res = await authFetch('/api/gallery/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Media added to gallery.');
        setShowItemModal(false);
        setNewItem({ albumId: '', title: '', type: 'photo', mediaUrl: '', caption: '' });
        fetchData();
      }
    } catch (e) {
      toast.error('Failed to add media item.');
    }
  };

  const handleDeleteAlbum = async (id) => {
    if (!window.confirm('Delete album?')) return;
    try {
      await authFetch(`/api/gallery/albums/${id}`, { method: 'DELETE' });
      toast.success('Album deleted.');
      fetchData();
    } catch (e) {
      toast.error('Failed to delete album.');
    }
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm('Delete this media item?')) return;
    try {
      await authFetch(`/api/gallery/items/${id}`, { method: 'DELETE' });
      toast.success('Media item deleted.');
      fetchData();
    } catch (e) {
      toast.error('Failed to delete item.');
    }
  };

  if (loading) return <div>Loading gallery...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '1000px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '6px' }}>Media Gallery</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Organize photo and video albums from events and workshops.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setShowAlbumModal(true)} className="btn btn-secondary btn-sm">
            <FolderPlus size={16} />
            <span>New Album</span>
          </button>
          <button
            onClick={() => {
              setNewItem({ albumId: albums[0]?.id || '', title: '', type: 'photo', mediaUrl: '', caption: '' });
              setShowItemModal(true);
            }}
            className="btn btn-primary btn-sm"
          >
            <Plus size={16} />
            <span>Add Media Item</span>
          </button>
        </div>
      </div>

      {/* Albums Summary */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>Albums ({albums.length})</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {albums.map((alb) => (
            <div
              key={alb.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px',
                background: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{alb.title}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {alb._count?.items || 0} media items
                </div>
              </div>
              <button
                onClick={() => handleDeleteAlbum(alb.id)}
                className="btn-icon"
                style={{ color: '#ef4444', width: '30px', height: '30px' }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Media Items Grid */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>All Media Items ({items.length})</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
          {items.map((it) => (
            <div
              key={it.id}
              style={{
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <img
                src={it.thumbnailUrl || it.mediaUrl}
                alt={it.title}
                style={{ width: '100%', height: '130px', objectFit: 'cover' }}
              />
              <div style={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {it.title}
                </span>
                <button
                  onClick={() => handleDeleteItem(it.id)}
                  style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Album Modal */}
      {showAlbumModal && (
        <div className="modal-overlay" role="dialog">
          <div className="modal-content animate-slide-up" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Create Media Album</h2>
              <button onClick={() => setShowAlbumModal(false)} className="btn-icon"><X size={18} /></button>
            </div>
            <form onSubmit={handleCreateAlbum}>
              <div className="form-group">
                <label className="form-label">Album Title (English)</label>
                <input
                  type="text"
                  value={newAlbum.title}
                  onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Album Title (नेपाली)</label>
                <input
                  type="text"
                  value={newAlbum.titleNe}
                  onChange={(e) => setNewAlbum({ ...newAlbum, titleNe: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Cover Image URL</label>
                <input
                  type="text"
                  value={newAlbum.coverImage}
                  onChange={(e) => setNewAlbum({ ...newAlbum, coverImage: e.target.value })}
                  className="form-input"
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setShowAlbumModal(false)} className="btn btn-secondary btn-sm">Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm">Create Album</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Item Modal */}
      {showItemModal && (
        <div className="modal-overlay" role="dialog">
          <div className="modal-content animate-slide-up" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Add Media to Gallery</h2>
              <button onClick={() => setShowItemModal(false)} className="btn-icon"><X size={18} /></button>
            </div>
            <form onSubmit={handleCreateItem}>
              <div className="form-group">
                <label className="form-label">Album</label>
                <select
                  value={newItem.albumId}
                  onChange={(e) => setNewItem({ ...newItem, albumId: e.target.value })}
                  className="form-select"
                >
                  <option value="">No Album / General</option>
                  {albums.map((a) => (
                    <option key={a.id} value={a.id}>{a.title}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Title / Heading</label>
                <input
                  type="text"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  required
                  className="form-input"
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Media Type</label>
                  <select
                    value={newItem.type}
                    onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                    className="form-select"
                  >
                    <option value="photo">Photo</option>
                    <option value="video">Video</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Media File URL</label>
                  <input
                    type="text"
                    value={newItem.mediaUrl}
                    onChange={(e) => setNewItem({ ...newItem, mediaUrl: e.target.value })}
                    required
                    placeholder="/uploads/photo.jpg or https://..."
                    className="form-input"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Caption</label>
                <input
                  type="text"
                  value={newItem.caption}
                  onChange={(e) => setNewItem({ ...newItem, caption: e.target.value })}
                  className="form-input"
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setShowItemModal(false)} className="btn btn-secondary btn-sm">Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm">Save Media</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
