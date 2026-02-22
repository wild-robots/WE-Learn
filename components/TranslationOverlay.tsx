
import React from 'react';
import { useLanguage } from '../LanguageContext';

const TranslationOverlay: React.FC = () => {
  const { isTranslating, translationProgress, translationStatus, isRTL } = useLanguage();

  if (!isTranslating) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505]/95 backdrop-blur-md transition-opacity duration-500">
      <div className={`max-w-md w-full px-8 text-center ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="mb-8 relative h-16 w-16 mx-auto">
          <div className="absolute inset-0 rounded-full border-4 border-blue-600/20 border-t-blue-600 animate-spin"></div>
        </div>

        <h2 className="text-2xl font-bold mb-2 text-white tracking-tight">
          Nexus AI Translator
        </h2>
        <p className="text-white/60 mb-8 h-6">
          {translationStatus}
        </p>

        <div className="bg-[#420b24] border border-white/10 rounded-2xl shadow-2xl p-4 w-72 animate-in slide-in-from-bottom-2 duration-300">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-700 transition-all duration-300 ease-out"
            style={{ width: `${translationProgress}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-xs text-white/40 font-medium">
          <span>{translationProgress}% Complete</span>
          <span>~{Math.ceil((100 - translationProgress) / 25)}s remaining</span>
        </div>
      </div>
    </div>
  );
};

export default TranslationOverlay;
