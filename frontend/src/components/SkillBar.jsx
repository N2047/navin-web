import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Server,
  Layout,
  Database,
  Cloud,
  Code,
  Cpu,
  Terminal,
  Layers,
  Mic,
  Eye,
  Volume2,
  Smartphone,
  CheckCircle,
  Users,
  Globe,
  Award
} from 'lucide-react';

const iconMap = {
  Server,
  Layout,
  Database,
  Cloud,
  Code,
  Cpu,
  Terminal,
  Layers,
  Mic,
  Eye,
  Volume2,
  Smartphone,
  CheckCircle,
  Users,
  Globe,
  Award
};

export default function SkillBar({ skill }) {
  const { getContent } = useLanguage();
  const IconComponent = iconMap[skill.icon] || Code;
  const name = getContent(skill.name, skill.nameNe);

  return (
    <div
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 20px',
        boxShadow: 'var(--shadow-sm)',
        transition: 'transform 0.2s ease, border-color 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--primary)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-color)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '10px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'var(--primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)'
            }}
          >
            <IconComponent size={18} />
          </div>
          <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
            {name}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--bg-subtle)',
              color: 'var(--text-secondary)'
            }}
          >
            {skill.level}
          </span>
          <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--primary)' }}>
            {skill.percentage}%
          </span>
        </div>
      </div>

      {/* Progress Track */}
      <div
        style={{
          width: '100%',
          height: '8px',
          borderRadius: '4px',
          background: 'var(--bg-subtle)',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${skill.percentage}%`,
            borderRadius: '4px',
            background: 'linear-gradient(90deg, var(--primary) 0%, #a855f7 100%)',
            transition: 'width 1s ease-in-out'
          }}
        />
      </div>
    </div>
  );
}
