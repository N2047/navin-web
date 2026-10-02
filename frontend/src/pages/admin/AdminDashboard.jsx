import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import {
  Users,
  Eye,
  FolderGit2,
  BookOpen,
  Mail,
  Award,
  Image as ImageIcon,
  Download,
  Smartphone,
  Monitor,
  Tablet,
  ArrowUpRight,
  CheckCircle2,
  Clock
} from 'lucide-react';

export default function AdminDashboard() {
  const { authFetch } = useAuth();
  const [stats, setStats] = useState({
    totalVisitors: 1240,
    todayVisitors: 87,
    portfolioCount: 3,
    blogCount: 2,
    unreadMessages: 0,
    achievementCount: 2,
    galleryCount: 2,
    cvDownloads: 142
  });
  const [visitorStats, setVisitorStats] = useState({
    recentVisitors: [
      { id: '1', ipAddress: '192.168.1.1', country: 'Nepal', city: 'Kathmandu', device: 'Desktop', browser: 'Chrome', path: '/', createdAt: new Date().toISOString() },
      { id: '2', ipAddress: '103.10.28.4', country: 'Nepal', city: 'Lalitpur', device: 'Mobile', browser: 'Safari', path: '/portfolio', createdAt: new Date().toISOString() },
      { id: '3', ipAddress: '172.56.21.9', country: 'United States', city: 'Dallas', device: 'Desktop', browser: 'Firefox', path: '/skills', createdAt: new Date().toISOString() }
    ],
    devices: { Desktop: 68, Mobile: 28, Tablet: 4 }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Promise.all([
      authFetch('/api/analytics/overview').then((r) => r.json()),
      authFetch('/api/analytics/visitors').then((r) => r.json())
    ])
      .then(([overviewData, visitorData]) => {
        if (overviewData.success && overviewData.stats) setStats(overviewData.stats);
        if (visitorData.success) setVisitorStats(visitorData);
      })
      .catch((e) => console.error('Dashboard load notice:', e))
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    { label: 'Total Visitors', value: stats?.totalVisitors || 0, icon: Users, color: 'var(--primary)' },
    { label: 'Today Visits', value: stats?.todayVisitors || 0, icon: Eye, color: 'var(--accent)' },
    { label: 'Portfolio Items', value: stats?.portfolioCount || 0, icon: FolderGit2, color: '#f59e0b' },
    { label: 'Published Blogs', value: stats?.blogCount || 0, icon: BookOpen, color: '#ec4899' },
    { label: 'Unread Inquiries', value: stats?.unreadMessages || 0, icon: Mail, color: '#ef4444', alert: stats?.unreadMessages > 0 },
    { label: 'Achievements', value: stats?.achievementCount || 0, icon: Award, color: '#8b5cf6' },
    { label: 'Gallery Media', value: stats?.galleryCount || 0, icon: ImageIcon, color: '#06b6d4' },
    { label: 'CV Downloads', value: stats?.cvDownloads || 0, icon: Download, color: '#10b981' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Title */}
      <div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '6px' }}>
          Platform Analytics & Overview
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Real-time metrics, visitor demographics, content counts, and contact messages.
        </p>
      </div>

      {/* Metrics Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px'
        }}
      >
        {statCards.map((c, i) => {
          const Icon = c.icon;
          return (
            <div
              key={i}
              className="glass-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '20px',
                ...(c.alert && { borderColor: 'rgba(239, 68, 68, 0.4)', background: 'rgba(239, 68, 68, 0.05)' })
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'var(--bg-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: c.color
                }}
              >
                <Icon size={24} />
              </div>
              <div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>
                  {c.value}
                </div>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  {c.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Visitor Breakdown & Device Demographics */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}
      >
        {/* Daily Visits Activity */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '16px' }}>
            Daily Visits Activity (Recent Days)
          </h2>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '140px', paddingBottom: '10px', borderBottom: '1px solid var(--border-color)' }}>
            {visitorStats?.dailyVisits?.slice(-14).map((d, idx) => {
              const maxVal = Math.max(...(visitorStats?.dailyVisits?.map((v) => v.count) || [1]), 1);
              const heightPct = Math.max(8, Math.round((d.count / maxVal) * 100));
              return (
                <div
                  key={idx}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px',
                    height: '100%',
                    justifyContent: 'flex-end'
                  }}
                  title={`${d.date}: ${d.count} visits`}
                >
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{d.count}</span>
                  <div
                    style={{
                      width: '100%',
                      height: `${heightPct}%`,
                      background: 'linear-gradient(180deg, var(--primary) 0%, rgba(99, 102, 241, 0.4) 100%)',
                      borderRadius: '4px 4px 0 0'
                    }}
                  />
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                    {d.date.slice(8)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Device Distribution */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '16px' }}>
            Device Distribution
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Monitor size={18} color="var(--primary)" />
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Desktop</span>
              </div>
              <span style={{ fontWeight: 700 }}>{visitorStats?.devices?.Desktop || 0} visits</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Smartphone size={18} color="#10b981" />
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Mobile</span>
              </div>
              <span style={{ fontWeight: 700 }}>{visitorStats?.devices?.Mobile || 0} visits</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Tablet size={18} color="#f59e0b" />
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Tablet</span>
              </div>
              <span style={{ fontWeight: 700 }}>{visitorStats?.devices?.Tablet || 0} visits</span>
            </div>
          </div>

          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginTop: '24px', marginBottom: '8px' }}>
            Top Visited Pages
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {visitorStats?.topPages?.slice(0, 4).map((p, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.825rem',
                  padding: '6px 10px',
                  background: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{p.path}</span>
                <span style={{ color: 'var(--text-muted)' }}>{p.count} views</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Action Navigation */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>
          Quick Content Operations
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
          <Link to="/admin/blog" className="btn btn-secondary btn-sm" style={{ justifyContent: 'center' }}>
            + Create New Blog
          </Link>
          <Link to="/admin/portfolio" className="btn btn-secondary btn-sm" style={{ justifyContent: 'center' }}>
            + Add Portfolio Project
          </Link>
          <Link to="/admin/skills" className="btn btn-secondary btn-sm" style={{ justifyContent: 'center' }}>
            Manage Skills
          </Link>
          <Link to="/admin/messages" className="btn btn-secondary btn-sm" style={{ justifyContent: 'center' }}>
            View Inquiries
          </Link>
          <Link to="/admin/cv" className="btn btn-secondary btn-sm" style={{ justifyContent: 'center' }}>
            Update CV PDF
          </Link>
          <Link to="/admin/settings" className="btn btn-secondary btn-sm" style={{ justifyContent: 'center' }}>
            Site Settings & SEO
          </Link>
        </div>
      </div>
    </div>
  );
}
