import React from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Volume2, Square } from 'lucide-react';

export default function TextToSpeechButton({ textToRead, label, size = 'normal' }) {
  const { speak, stopSpeaking, isSpeaking } = useAccessibility();
  const { t } = useLanguage();

  const handleToggle = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(textToRead);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`btn ${size === 'small' ? 'btn-sm' : ''} ${isSpeaking ? 'btn-secondary' : 'btn-outline'}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        borderColor: isSpeaking ? 'var(--primary)' : 'var(--border-color)',
        ...(isSpeaking && { color: 'var(--primary)', fontWeight: 700 })
      }}
      aria-label={isSpeaking ? t('stopListening') : (label || t('listenText'))}
      title={isSpeaking ? t('stopListening') : (label || t('listenText'))}
    >
      {isSpeaking ? (
        <>
          <Square size={16} fill="currentColor" />
          <span>{t('stopListening')}</span>
        </>
      ) : (
        <>
          <Volume2 size={16} />
          <span>{label || t('listenText')}</span>
        </>
      )}
    </button>
  );
}
