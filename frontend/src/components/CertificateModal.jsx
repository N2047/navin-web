import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { X, Download, FileText, ExternalLink } from 'lucide-react';

export default function CertificateModal({ item, onClose }) {
  const { getContent, isNepali } = useLanguage();

  if (!item) return null;

  const title = getContent(item.title || item.degree, item.titleNe || item.degreeNe);
  const org = getContent(item.organization || item.institution, item.organizationNe || item.institutionNe);
  const certUrl = item.certificateUrl;

  const isPdf = certUrl?.toLowerCase().endsWith('.pdf');

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-content animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '720px', padding: '24px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{title}</h3>
            <div style={{ fontSize: '0.9rem', color: 'var(--primary)' }}>{org}</div>
          </div>
          <button
            onClick={onClose}
            className="btn-icon"
            style={{ width: '36px', height: '36px' }}
            aria-label="Close certificate modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Certificate Display */}
        <div
          style={{
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '20px',
            minHeight: '260px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
            overflow: 'hidden'
          }}
        >
          {certUrl && !isPdf ? (
            <img
              src={certUrl}
              alt={title}
              style={{ maxHeight: '420px', maxWidth: '100%', objectFit: 'contain', borderRadius: '8px' }}
            />
          ) : (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <FileText size={64} color="var(--primary)" style={{ marginBottom: '14px', opacity: 0.8 }} />
              <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '8px' }}>
                {isNepali ? 'डिजिटल प्रमाण-पत्र (PDF)' : 'Verified Digital Credential (PDF)'}
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto' }}>
                {isNepali
                  ? 'यो प्रमाण-पत्र सुरक्षित ढाँचामा उपलब्ध छ। नयाँ विन्डोमा खोल्न वा डाउनलोड गर्न तलको बटन थिच्नुहोस्।'
                  : 'This verified official credential document is ready for viewing in a new tab or direct download.'}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          {certUrl && (
            <a
              href={certUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-secondary btn-sm"
            >
              <ExternalLink size={16} />
              <span>{isNepali ? 'नयाँ ट्याबमा खोल्नुहोस्' : 'Open in New Tab'}</span>
            </a>
          )}
          {certUrl && (
            <a
              href={certUrl}
              download
              className="btn btn-primary btn-sm"
            >
              <Download size={16} />
              <span>{isNepali ? 'डाउनलोड गर्नुहोस्' : 'Download File'}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
