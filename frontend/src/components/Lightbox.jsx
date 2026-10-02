import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';

export default function Lightbox({ image, title, onClose, onPrev, onNext, hasPrev, hasNext }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev && onPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext && onNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  if (!image) return null;

  return (
    <div
      className="modal-overlay animate-fade-in"
      onClick={onClose}
      style={{ zIndex: 20000, background: 'rgba(0, 0, 0, 0.92)' }}
      role="dialog"
      aria-modal="true"
    >
      <div
        style={{
          position: 'relative',
          maxWidth: '92vw',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 12px',
            color: '#ffffff',
            marginBottom: '10px'
          }}
        >
          <div style={{ fontSize: '1rem', fontWeight: 600, textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
            {title || ''}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <a
              href={image}
              download
              target="_blank"
              rel="noreferrer"
              className="btn-icon"
              style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none' }}
              title="Download full size"
            >
              <Download size={18} />
            </a>
            <button
              onClick={onClose}
              className="btn-icon"
              style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none' }}
              aria-label="Close lightbox"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Media Frame */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {hasPrev && (
            <button
              onClick={onPrev}
              style={{
                position: 'absolute',
                left: '-50px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.6)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '50%',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          <img
            src={image}
            alt={title || 'Enlarged preview'}
            style={{
              maxHeight: '80vh',
              maxWidth: '88vw',
              objectFit: 'contain',
              borderRadius: '8px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
            }}
          />

          {hasNext && (
            <button
              onClick={onNext}
              style={{
                position: 'absolute',
                right: '-50px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.6)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '50%',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
