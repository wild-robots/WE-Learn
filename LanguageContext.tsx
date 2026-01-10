
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Language, LanguageContextType, TranslationSet } from './types';
import { translations } from './translations';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('nexus_lang');
    return (saved as Language) || 'EN';
  });
  const [isTranslating, setIsTranslating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');

  const isRTL = language === 'HE' || language === 'AR';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language.toLowerCase();
    document.body.className = isRTL ? 'font-heebo' : 'font-inter';
  }, [language, isRTL]);

  const setLanguage = async (newLang: Language) => {
    if (newLang === language) return;

    setIsTranslating(true);
    setProgress(0);
    setStatus('Extracting content...');
    
    // Simulate AI Translation Steps
    await new Promise(r => setTimeout(r, 800));
    setProgress(30);
    setStatus('AI Analyzing context...');
    
    await new Promise(r => setTimeout(r, 1000));
    setProgress(60);
    setStatus('Applying localized styles & fonts...');
    
    await new Promise(r => setTimeout(r, 800));
    setProgress(90);
    setStatus('Finalizing translation...');
    
    await new Promise(r => setTimeout(r, 400));
    
    setLanguageState(newLang);
    localStorage.setItem('nexus_lang', newLang);
    
    setProgress(100);
    setTimeout(() => setIsTranslating(false), 500);
  };

  const t = (key: keyof TranslationSet): string => {
    return translations[language][key] || translations['EN'][key];
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      isTranslating, 
      t, 
      isRTL,
      translationProgress: progress,
      translationStatus: status
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
