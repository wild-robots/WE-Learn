
import React from 'react';
import { useLanguage } from '../LanguageContext';

const Stats: React.FC = () => {
  const { t } = useLanguage();

  const metrics = [
    { label: t('stat_completion'), value: "6-12x", sub: "Higher completion vs MOOCs" },
    { label: t('stat_response'), value: "<24hrs", sub: "To cohort placement" },
    { label: t('stat_ai'), value: "24/7", sub: "AI expert support" },
    { label: t('stat_guarantee'), value: "100%", sub: "Curated content" }
  ];

  return (
    <div className="py-24 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {metrics.map((m, i) => (
            <div key={i} className="text-center group">
              <div className="text-4xl md:text-5xl font-bold text-white mb-3 group-hover:text-blue-500 transition-colors">
                {m.value}
              </div>
              <div className="text-sm font-medium text-white/80 mb-1">
                {m.label}
              </div>
              <div className="text-[10px] text-white/30 uppercase tracking-widest font-bold">
                {m.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
