import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Lightbox from '../components/Lightbox';
import { Image as ImageIcon, Video, Folder, Play } from 'lucide-react';

export default function GalleryPage() {
  const [albums, setAlbums] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState('all');
  const [loading, setLoading] = useState(true);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);

  const { getContent, isNepali } = useLanguage();

  useEffect(() => {
    Promise.all([
      fetch('/api/gallery/albums').then((r) => r.json()),
      fetch('/api/gallery/items').then((r) => r.json())
    ])
      .then(([albumsData, itemsData]) => {
        if (albumsData.success) setAlbums(albumsData.albums || []);
        if (itemsData.success) setItems(itemsData.items || []);
      })
      .catch((e) => console.error('Gallery fetch error:', e))
      .finally(() => setLoading(false));
  }, []);

  const filteredItems =
    selectedAlbum === 'all'
      ? items
      : items.filter((item) => item.albumId === selectedAlbum);

  const activeItem = activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  return (
    <div style={{ padding: '60px 0 100px 0' }}>
      <div className="container">
        {/* Header */}
        <div className="section-title-wrap">
          <div className="section-tag">
            <ImageIcon size={14} />
            <span>{isNepali ? 'ग्यालरी' : 'Media Gallery'}</span>
          </div>
          <h1 className="section-heading">{isNepali ? 'तस्बिर तथा भिडियो ग्यालरी' : 'Moments & Engagements'}</h1>
          <p className="section-subtitle">
            {isNepali
              ? 'प्रविधि सम्मेलन, कार्यशाला, अन्तरक्रिया तथा सामुदायिक गतिविधिको झलक।'
              : 'Snapshots from conferences, developer workshops, and social tech initiatives.'}
          </p>
        </div>

        {/* Album Filters */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '40px'
          }}
        >
          <button
            onClick={() => setSelectedAlbum('all')}
            className={`btn ${selectedAlbum === 'all' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          >
            {isNepali ? 'सबै सामग्रीहरू' : 'All Media'} ({items.length})
          </button>

          {albums.map((alb) => (
            <button
              key={alb.id}
              onClick={() => setSelectedAlbum(alb.id)}
              className={`btn ${selectedAlbum === alb.id ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            >
              {getContent(alb.title, alb.titleNe)} ({alb._count?.items || 0})
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
            Loading gallery items...
          </div>
        ) : filteredItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
            <p>{isNepali ? 'यस एल्बममा कुनै तस्बिर भेटिएन।' : 'No media items found in this album.'}</p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px'
            }}
          >
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                className="glass-card"
                style={{
                  padding: 0,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative'
                }}
                onClick={() => setActiveLightboxIndex(idx)}
              >
                <div style={{ height: '230px', width: '100%', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={item.thumbnailUrl || item.mediaUrl}
                    alt={getContent(item.title, item.titleNe)}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />

                  {item.type === 'video' && (
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0,0,0,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          background: 'rgba(99, 102, 241, 0.85)',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Play size={20} fill="#fff" />
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ padding: '16px 20px' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '6px' }}>
                    {getContent(item.title, item.titleNe)}
                  </h3>
                  {item.caption && (
                    <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {getContent(item.caption, item.captionNe)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Preview */}
      {activeItem && (
        <Lightbox
          image={activeItem.mediaUrl}
          title={getContent(activeItem.title, activeItem.titleNe)}
          onClose={() => setActiveLightboxIndex(null)}
          onPrev={() => setActiveLightboxIndex((idx) => Math.max(0, idx - 1))}
          onNext={() => setActiveLightboxIndex((idx) => Math.min(filteredItems.length - 1, idx + 1))}
          hasPrev={activeLightboxIndex > 0}
          hasNext={activeLightboxIndex < filteredItems.length - 1}
        />
      )}
    </div>
  );
}
