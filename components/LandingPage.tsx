
import React, { useState } from 'react';
import Hero from './Hero';
import CohortCard from './CohortCard';
import { Cohort } from '../types';
import { useLanguage } from '../LanguageContext';
import { ChevronRight, Sparkles, ChevronRight as ChevronRightIcon } from 'lucide-react';

interface Props {
  onSelectCohort: (cohort: Cohort) => void;
  onOpenArchitect: () => void;
}

type TabType = 'open' | 'existing' | 'topics' | 'personal';

const LandingPage: React.FC<Props> = ({ onSelectCohort, onOpenArchitect }) => {
  const { t, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('open');

  const activeCohorts: Cohort[] = [
    {
      id: '1',
      title: 'Product Management Foundations',
      category: 'Product Management',
      description: 'Strategy, Roadmaps & Stakeholder Management fundamentals for modern teams.',
      tutor: 'Alex Rivers',
      members: 8,
      maxMembers: 12,
      duration: '3-4 hrs/week',
      successRate: '92%',
      schedule: 'Mon & Wed 19:00-20:30 IST',
      startDate: 'Jan 22',
      progress: 35,
      level: 'Beginner'
    },
    {
      id: '2',
      title: 'UX Design Mastery',
      category: 'UX Design',
      description: 'User-Centered Design & Prototyping techniques used by world-class studios.',
      tutor: 'Sarah Chen',
      members: 10,
      maxMembers: 15,
      duration: '4-5 hrs/week',
      successRate: '88%',
      schedule: 'Tue & Thu 20:00-21:30 IST',
      startDate: 'Jan 20',
      progress: 45,
      level: 'Intermediate'
    },
    {
      id: '3',
      title: 'User Research Fundamentals',
      category: 'User Research',
      description: 'Interviews, Testing & Data Analysis to drive product decisions.',
      tutor: 'Marco Rossi',
      members: 12,
      maxMembers: 12,
      duration: '5-6 hrs/week',
      successRate: '95%',
      schedule: 'Sun & Wed 18:00-19:30 IST',
      startDate: 'Jan 18',
      progress: 60,
      level: 'Beginner'
    }
  ];

  const existingGroups: Cohort[] = [
    {
      id: 'ex-1',
      title: 'Advanced AI Systems',
      category: 'Artificial Intelligence',
      description: 'Building scalable LLM applications and agentic workflows.',
      tutor: 'Dr. Emily Watson',
      members: 15,
      maxMembers: 15,
      duration: '6-8 hrs/week',
      successRate: '98%',
      schedule: 'Fri 18:00-21:00 IST',
      startDate: 'Dec 10',
      progress: 85,
      level: 'Advanced'
    }
  ];

  const tabs: { id: TabType; label: string }[] = [
    { id: 'open', label: 'Open Cohorts' },
    { id: 'existing', label: 'Existing Groups' },
    { id: 'topics', label: 'Topics' },
    { id: 'personal', label: 'Personal Space' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'open':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {activeCohorts.map(cohort => (
              <CohortCard key={cohort.id} cohort={cohort} onClick={() => onSelectCohort(cohort)} />
            ))}
          </div>
        );
      case 'existing':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {existingGroups.map(cohort => (
              <CohortCard key={cohort.id} cohort={cohort} onClick={() => onSelectCohort(cohort)} />
            ))}
          </div>
        );
      case 'topics':
        return (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {['Product', 'Design', 'Engineering', 'Marketing', 'Sales', 'Strategy'].map(topic => (
              <div key={topic} className="glass p-8 rounded-2xl flex flex-col items-center justify-center text-center hover:border-white/20 transition-all cursor-pointer group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="font-bold text-white">{topic}</h3>
              </div>
            ))}
          </div>
        );
      case 'personal':
        return (
          <div className="glass p-12 rounded-3xl border border-white/5 text-center animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Sparkles className="w-12 h-12 text-white/20 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Your Personal Workspace</h3>
            <p className="text-white/40 mb-8 max-w-sm mx-auto">Sign in to track your current cohorts, certifications, and peer network.</p>
            <button className="px-12 py-4 bg-white text-black font-bold rounded-2xl hover:bg-white/90 transition-all">Sign In</button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#050505]">
      <Hero onOpenArchitect={onOpenArchitect} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-32">
        <div className="flex flex-col gap-8 items-start relative">

          {/* Main Feed Content */}
          <div className="w-full transition-all duration-500 ease-in-out">
            {/* High-Fidelity Tab Bar */}
            <div className="flex items-center gap-1 p-1 bg-white/[0.03] border border-white/5 rounded-2xl mb-12 w-fit max-w-full overflow-x-auto scrollbar-none">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 text-sm font-bold transition-all rounded-xl relative whitespace-nowrap ${activeTab === tab.id ? 'text-white bg-white/5 shadow-lg' : 'text-white/40 hover:text-white/60'
                    }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Content Feed */}
            {renderContent()}

            <div className="mt-16 text-center">
              <button className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl glass text-white text-sm font-bold hover:bg-white/10 transition-all border border-white/5 shadow-xl">
                Explore More Cohorts
                <ChevronRightIcon className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-32 px-4 relative overflow-hidden bg-[#050505]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-blue-600/5 blur-[120px] rounded-full -z-10"></div>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            {t('cta_title')}
          </h2>
          <p className="text-xl text-white/60 mb-12">
            {t('cta_subtitle')}
          </p>
          <button className="px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-2xl hover:opacity-90 transition-all shadow-2xl shadow-blue-900/40 text-lg group">
            <span className="flex items-center gap-3">
              {t('cta_btn')}
              <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180' : ''}`} />
            </span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="text-sm font-bold text-white/40">WE Learn © 2025</span>
          </div>

          <div className="flex gap-8 text-xs font-medium text-white/40">
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Help</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
