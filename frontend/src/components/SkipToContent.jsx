import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function SkipToContent() {
  const { t } = useLanguage();
  return (
    <a href="#main-content" className="skip-to-content">
      {t('skipToContent')}
    </a>
  );
}
