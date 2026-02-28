
import React from 'react';
import { useLanguage } from '../LanguageContext';

const TranslationOverlay: React.FC = () => {
  const { isTranslating, translationProgress, translationStatus, isRTL } = useLanguage();

  if (!isTranslating) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm transition-opacity duration-500">
      <div className={`max-w-md w-full mx-4 bg-white rounded-2xl shadow-2xl border border-slate-200 px-8 py-10 text-center ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="mb-8 relative h-16 w-16 mx-auto">
          <div className="absolute inset-0 rounded-full border-4 border-teal-100 border-t-teal-600 animate-spin"></div>
        </div>

        <h2 className="text-2xl font-bold mb-2 text-slate-900 tracking-tight">
          Translating Interface
        </h2>
        <p className="text-slate-500 mb-8 h-6">
          {translationStatus}
        </p>

        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-teal-600 transition-all duration-300 ease-out rounded-full"
            style={{ width: `${translationProgress}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-xs text-slate-400 font-medium">
          <span>{translationProgress}% Complete</span>
          <span>~{Math.ceil((100 - translationProgress) / 25)}s remaining</span>
        </div>
      </div>
    </div>
  );
};

export default TranslationOverlay;
