import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { FileText, Upload, Download, Eye, ExternalLink, CheckCircle2 } from 'lucide-react';

export default function AdminCv() {
  const { authFetch } = useAuth();
  const toast = useToast();

  const [cvInfo, setCvInfo] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchCv = () => {
    authFetch('/api/cv/info')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setCvInfo(d.cv);
      })
      .catch((e) => console.error('CV info error:', e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCv();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please choose a PDF file.');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('cvFile', file);

    try {
      const res = await authFetch('/api/cv/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        toast.success('CV file uploaded and activated!');
        setFile(null);
        fetchCv();
      } else {
        toast.error(data.message || 'Upload failed.');
      }
    } catch (err) {
      toast.error('Network error during upload.');
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div>Loading CV manager...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '800px' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '6px' }}>Curriculum Vitae (CV) Manager</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Upload, preview, and track visitor downloads of your official CV.</p>
      </div>

      {/* Current CV Status */}
      <div className="glass-panel" style={{ padding: '28px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px' }}>Current Active CV Document</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'var(--primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)'
            }}
          >
            <FileText size={32} />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {cvInfo?.cvFileName || 'Navin_Sharma_CV.pdf'}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Total Visitor Downloads:{' '}
              <strong style={{ color: 'var(--accent)' }}>{cvInfo?.cvDownloadCount || 0} times</strong>
            </div>
          </div>

          {cvInfo?.cvUrl && (
            <a
              href={cvInfo.cvUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ gap: '6px' }}
            >
              <ExternalLink size={16} />
              <span>Preview PDF</span>
            </a>
          )}
        </div>

        {/* Upload New CV Box */}
        <form
          onSubmit={handleUpload}
          style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Replace CV Document</h3>
          <div
            style={{
              border: '2px dashed var(--border-color)',
              padding: '28px',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center',
              cursor: 'pointer',
              background: 'var(--bg-subtle)'
            }}
            onClick={() => document.getElementById('cv-file-input').click()}
          >
            <Upload size={32} color="var(--primary)" style={{ margin: '0 auto 10px auto' }} />
            <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '4px' }}>
              {file ? file.name : 'Click to select a new PDF file from your device'}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Max file size: 25MB (PDF only)
            </div>
            <input
              type="file"
              id="cv-file-input"
              accept=".pdf"
              style={{ display: 'none' }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <button
            type="submit"
            disabled={!file || uploading}
            className="btn btn-primary"
            style={{ alignSelf: 'flex-end', gap: '8px' }}
          >
            <Upload size={16} />
            <span>{uploading ? 'Uploading PDF...' : 'Upload & Set as Active CV'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
