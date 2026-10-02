import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { Lock, Mail, Eye, EyeOff, ArrowLeft, KeyRound, Shield } from 'lucide-react';

export default function AdminLogin() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password })
      });
      const data = await res.json();

      if (data.success && data.token) {
        login(data.token, data.admin);
        toast.success('Authenticated successfully. Welcome back!');
        navigate('/admin');
      } else {
        setErrorMsg(data.message || 'Invalid credentials.');
        toast.error(data.message || 'Invalid credentials.');
      }
    } catch (err) {
      setErrorMsg('Server connection failed. Please check backend.');
      toast.error('Server connection error.');
    } finally {
      setLoading(false);
    }
  };

  const handleUseDemo = () => {
    setIdentifier('admin@example.com');
    setPassword('Admin@12345');
    toast.info('Loaded demo administrator credentials.');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.12) 0%, var(--bg-main) 70%)'
      }}
    >
      <div
        className="glass-panel animate-slide-up"
        style={{
          maxWidth: '440px',
          width: '100%',
          padding: '36px',
          borderRadius: 'var(--radius-lg)'
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, var(--primary) 0%, #a855f7 100%)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              boxShadow: '0 8px 24px var(--primary-glow)'
            }}
          >
            <Shield size={28} />
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '6px' }}>
            Administrator Portal
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Sign in to manage personal content, portfolio, and settings.
          </p>
        </div>

        {errorMsg && (
          <div
            style={{
              padding: '12px 16px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#ef4444',
              fontSize: '0.875rem',
              marginBottom: '20px'
            }}
          >
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="login-identifier">
              Email or Username
            </label>
            <div style={{ position: 'relative' }}>
              <Mail
                size={18}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)'
                }}
              />
              <input
                type="text"
                id="login-identifier"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                placeholder="admin@example.com"
                className="form-input"
                style={{ paddingLeft: '38px' }}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label className="form-label" htmlFor="login-password">
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={18}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)'
                }}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                id="login-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="form-input"
                style={{ paddingLeft: '38px', paddingRight: '40px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', marginBottom: '16px' }}
          >
            <KeyRound size={18} />
            <span>{loading ? 'Authenticating...' : 'Sign In Securely'}</span>
          </button>

          {/* Demo Auto-fill Helper */}
          <button
            type="button"
            onClick={handleUseDemo}
            className="btn btn-secondary btn-sm"
            style={{ width: '100%', marginBottom: '24px', fontSize: '0.825rem' }}
          >
            Auto-fill Default Demo Credentials
          </button>
        </form>

        <div style={{ textAlign: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.875rem',
              color: 'var(--text-secondary)'
            }}
          >
            <ArrowLeft size={14} />
            <span>Return to Public Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
