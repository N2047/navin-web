import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('navin_web_font_size') || 'normal';
  });

  const [contrast, setContrast] = useState(() => {
    return localStorage.getItem('navin_web_contrast') || 'normal';
  });

  const [reducedMotion, setReducedMotion] = useState(() => {
    return localStorage.getItem('navin_web_reduced_motion') === 'true';
  });

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState(1);

  // Apply Font Size
  useEffect(() => {
    localStorage.setItem('navin_web_font_size', fontSize);
    document.documentElement.setAttribute('data-font-size', fontSize);
  }, [fontSize]);

  // Apply Contrast
  useEffect(() => {
    localStorage.setItem('navin_web_contrast', contrast);
    document.documentElement.setAttribute('data-contrast', contrast);
  }, [contrast]);

  // Apply Reduced Motion
  useEffect(() => {
    localStorage.setItem('navin_web_reduced_motion', String(reducedMotion));
    document.documentElement.setAttribute('data-reduced-motion', String(reducedMotion));
  }, [reducedMotion]);

  // Web Speech API Text-to-Speech Implementation
  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const speak = useCallback((text, targetLang = 'auto') => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-Speech is not supported in this browser.');
      return;
    }

    stopSpeaking();

    if (!text || text.trim().length === 0) return;

    // Clean markdown/html formatting from text
    const cleanText = text
      .replace(/<[^>]*>?/gm, '')
      .replace(/[*#_`~[\]()]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = speechRate;

    // Detect language: check if text has Devanagari characters
    const hasDevanagari = /[\u0900-\u097F]/.test(cleanText);
    const langCode = targetLang !== 'auto' ? targetLang : (hasDevanagari ? 'ne-NP' : 'en-US');
    utterance.lang = langCode;

    // Try finding matching voice
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      if (hasDevanagari) {
        const neVoice = voices.find(v => v.lang.startsWith('ne') || v.lang.startsWith('hi'));
        if (neVoice) utterance.voice = neVoice;
      } else {
        const enVoice = voices.find(v => v.lang.startsWith('en'));
        if (enVoice) utterance.voice = enVoice;
      }
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [speechRate, stopSpeaking]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        setFontSize,
        contrast,
        setContrast,
        reducedMotion,
        setReducedMotion,
        speak,
        stopSpeaking,
        isSpeaking,
        speechRate,
        setSpeechRate
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);
