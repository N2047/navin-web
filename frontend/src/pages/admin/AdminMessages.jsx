import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { Mail, Check, Trash2, Clock, Phone, User, MessageSquare, Send } from 'lucide-react';

export default function AdminMessages() {
  const { authFetch } = useAuth();
  const toast = useToast();

  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState(null);

  const fetchMessages = () => {
    const query = filter !== 'all' ? `?status=${filter}` : '';
    authFetch(`/api/contact${query}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setMessages(d.messages || []);
      })
      .catch((e) => console.error('Messages error:', e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMessages();
  }, [filter]);

  const handleToggleRead = async (msg) => {
    try {
      const res = await authFetch(`/api/contact/${msg.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: !msg.isRead })
      });
      const data = await res.json();
      if (data.success) {
        toast.success(msg.isRead ? 'Marked as unread.' : 'Marked as read.');
        fetchMessages();
        if (selectedMsg?.id === msg.id) setSelectedMsg({ ...selectedMsg, isRead: !msg.isRead });
      }
    } catch (e) {
      toast.error('Failed to update status.');
    }
  };

  const handleToggleReplied = async (msg) => {
    try {
      const res = await authFetch(`/api/contact/${msg.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isReplied: !msg.isReplied })
      });
      const data = await res.json();
      if (data.success) {
        toast.success(msg.isReplied ? 'Marked unreplied.' : 'Marked as replied.');
        fetchMessages();
        if (selectedMsg?.id === msg.id) setSelectedMsg({ ...selectedMsg, isReplied: !msg.isReplied });
      }
    } catch (e) {
      toast.error('Failed to update status.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await authFetch(`/api/contact/${id}`, { method: 'DELETE' });
      toast.success('Message deleted.');
      if (selectedMsg?.id === id) setSelectedMsg(null);
      fetchMessages();
    } catch (e) {
      toast.error('Failed to delete message.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '1000px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '6px' }}>Visitor Inquiries</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Messages and collaboration proposals received via the contact form.</p>
        </div>

        {/* Filter buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {['all', 'unread', 'read', 'replied'].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`btn ${filter === st ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            >
              {st.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selectedMsg ? '1fr 1fr' : '1fr', gap: '24px' }}>
        {/* Messages List */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          {loading ? (
            <div style={{ color: 'var(--text-muted)', padding: '20px' }}>Loading inquiries...</div>
          ) : messages.length === 0 ? (
            <div style={{ color: 'var(--text-muted)', padding: '20px' }}>No messages found.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {messages.map((m) => (
                <div
                  key={m.id}
                  onClick={() => {
                    setSelectedMsg(m);
                    if (!m.isRead) handleToggleRead(m);
                  }}
                  style={{
                    padding: '14px',
                    borderRadius: 'var(--radius-sm)',
                    background: selectedMsg?.id === m.id ? 'var(--primary-light)' : 'var(--bg-subtle)',
                    border: '1px solid var(--border-color)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: m.isRead ? 600 : 800, fontSize: '0.95rem' }}>
                      {m.name} {!m.isRead && <span style={{ color: '#ef4444' }}>●</span>}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {new Date(m.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--primary)' }}>
                    {m.subject}
                  </div>

                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {m.message}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Message Viewer */}
        {selectedMsg && (
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{selectedMsg.subject}</h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  From: {selectedMsg.name} &lt;{selectedMsg.email}&gt;
                </div>
                {selectedMsg.phone && (
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Phone: {selectedMsg.phone}
                  </div>
                )}
              </div>
              <button onClick={() => setSelectedMsg(null)} className="btn-icon">✕</button>
            </div>

            <div
              style={{
                flex: 1,
                padding: '16px',
                background: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-sm)',
                whiteSpace: 'pre-line',
                lineHeight: 1.6,
                fontSize: '0.95rem',
                marginBottom: '20px'
              }}
            >
              {selectedMsg.message}
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <button
                onClick={() => handleToggleReplied(selectedMsg)}
                className={`btn ${selectedMsg.isReplied ? 'btn-secondary' : 'btn-primary'} btn-sm`}
              >
                <Check size={16} />
                <span>{selectedMsg.isReplied ? 'Mark Unreplied' : 'Mark as Replied'}</span>
              </button>

              <a
                href={`mailto:${selectedMsg.email}?subject=Re: ${encodeURIComponent(selectedMsg.subject)}`}
                className="btn btn-secondary btn-sm"
              >
                <Send size={15} />
                <span>Reply by Email</span>
              </a>

              <button
                onClick={() => handleDelete(selectedMsg.id)}
                className="btn-icon"
                style={{ color: '#ef4444' }}
                title="Delete message"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
