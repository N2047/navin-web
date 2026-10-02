import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import {
  LayoutDashboard,
  User,
  Cpu,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Award,
  BookOpen,
  Image as ImageIcon,
  Mail,
  FileText,
  Layers,
  Settings,
  LogOut,
  ExternalLink,
  Sun,
  Moon,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

export default function AdminLayout() {
  const { admin, isAuthenticated, logout, loading, authFetch } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [loading, isAuthenticated, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      authFetch('/api/contact?status=unread&limit=1')
        .then((r) => r.json())
        .then((d) => {
          if (d.success) setUnreadMessages(d.unreadCount || 0);
        })
        .catch(() => {});
    }
  }, [isAuthenticated, location.pathname]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>Loading administration portal...</div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const adminNav = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/profile', label: 'Profile & Hero', icon: User },
    { to: '/admin/skills', label: 'Skills & Tech', icon: Cpu },
    { to: '/admin/portfolio', label: 'Portfolio Works', icon: FolderGit2 },
    { to: '/admin/experience', label: 'Experience', icon: Briefcase },
    { to: '/admin/education', label: 'Education', icon: GraduationCap },
    { to: '/admin/achievements', label: 'Achievements', icon: Award },
    { to: '/admin/blog', label: 'Blog Posts', icon: BookOpen },
    { to: '/admin/gallery', label: 'Media Gallery', icon: ImageIcon },
    { to: '/admin/messages', label: 'Messages', icon: Mail, badge: unreadMessages },
    { to: '/admin/cv', label: 'CV Manager', icon: FileText },
    { to: '/admin/media', label: 'Media Library', icon: Layers },
    { to: '/admin/settings', label: 'Site Settings', icon: Settings }
  ];

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-main)' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '260px',
          background: 'var(--bg-surface)',
          borderRight: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 100,
          transform: sidebarOpen ? 'translateX(0)' : undefined,
          transition: 'transform 0.3s ease'
        }}
        className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}
      >
        {/* Brand */}
        <div
          style={{
            padding: '24px 20px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, var(--primary) 0%, #a855f7 100%)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800
              }}
            >
              A
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>Admin Center</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Navin Sharma Web</div>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="btn-icon admin-close-btn"
            style={{ width: '32px', height: '32px', display: 'none' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Links Navigation */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {adminNav.map((item) => {
            const active = isActive(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.9rem',
                  fontWeight: active ? 700 : 500,
                  color: active ? '#ffffff' : 'var(--text-secondary)',
                  background: active ? 'linear-gradient(135deg, var(--primary) 0%, #4338ca 100%)' : 'transparent',
                  textDecoration: 'none',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={18} />
                  <span>{item.label}</span>
                </div>
                {item.badge > 0 && (
                  <span
                    style={{
                      background: '#ef4444',
                      color: '#ffffff',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '2px 7px',
                      borderRadius: 'var(--radius-full)'
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div style={{ padding: '16px', borderTop: '1px solid var(--border-color)', background: 'var(--bg-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{admin?.name || 'Administrator'}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{admin?.email}</div>
            </div>
            <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>
              {admin?.role || 'Admin'}
            </span>
          </div>
          <button
            onClick={logout}
            className="btn btn-outline btn-sm"
            style={{ width: '100%', justifyContent: 'center', gap: '8px', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Wrapper */}
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column' }} className="admin-main-wrap">
        {/* Top Header */}
        <header
          style={{
            height: '70px',
            background: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px',
            position: 'sticky',
            top: 0,
            zIndex: 90
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={() => setSidebarOpen(true)}
              className="btn-icon admin-mobile-toggle"
              style={{ display: 'none' }}
              aria-label="Open sidebar"
            >
              <Menu size={18} />
            </button>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
              Content & Site Control Hub
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ gap: '6px' }}
            >
              <span>View Live Website</span>
              <ExternalLink size={14} />
            </Link>

            <button
              onClick={toggleTheme}
              className="btn-icon"
              title="Toggle theme"
              style={{ width: '38px', height: '38px' }}
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </div>
        </header>

        {/* Content View */}
        <main style={{ flex: 1, padding: '32px' }}>
          <Outlet />
        </main>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .admin-sidebar {
            transform: translateX(-100%);
          }
          .admin-sidebar.open {
            transform: translateX(0);
          }
          .admin-close-btn {
            display: flex !important;
          }
          .admin-main-wrap {
            margin-left: 0 !important;
          }
          .admin-mobile-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}
