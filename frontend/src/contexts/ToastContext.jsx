import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast = {
    success: (msg, dur) => addToast(msg, 'success', dur),
    error: (msg, dur) => addToast(msg, 'error', dur),
    info: (msg, dur) => addToast(msg, 'info', dur),
    warning: (msg, dur) => addToast(msg, 'warning', dur)
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {/* Floating Toast Notification Container */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          maxWidth: '420px',
          width: 'calc(100% - 48px)',
          pointerEvents: 'none'
        }}
      >
        {toasts.map(t => {
          let bg = 'var(--bg-surface)';
          let borderColor = 'var(--border-color)';
          let icon = <Info size={20} color="var(--primary)" />;

          if (t.type === 'success') {
            borderColor = 'rgba(16, 185, 129, 0.5)';
            icon = <CheckCircle2 size={20} color="#10b981" />;
          } else if (t.type === 'error') {
            borderColor = 'rgba(239, 68, 68, 0.5)';
            icon = <AlertCircle size={20} color="#ef4444" />;
          } else if (t.type === 'warning') {
            borderColor = 'rgba(245, 158, 11, 0.5)';
            icon = <AlertTriangle size={20} color="#f59e0b" />;
          }

          return (
            <div
              key={t.id}
              className="animate-slide-up"
              style={{
                pointerEvents: 'auto',
                background: bg,
                border: `1px solid ${borderColor}`,
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.35)',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: 'var(--text-primary)',
                fontSize: '0.925rem',
                backdropFilter: 'blur(10px)'
              }}
            >
              {icon}
              <div style={{ flex: 1 }}>{t.message}</div>
              <button
                onClick={() => removeToast(t.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '2px'
                }}
                aria-label="Dismiss toast notification"
              >
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
