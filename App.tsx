
import React, { useState } from 'react';
import { LanguageProvider } from './LanguageContext';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import CohortDetail from './components/CohortDetail';
import CourseArchitect from './components/CourseArchitect';
import TranslationOverlay from './components/TranslationOverlay';
import { View, Cohort } from './types';

function App() {
  const [view, setView] = useState<View>('landing');
  const [selectedCohort, setSelectedCohort] = useState<Cohort | null>(null);

  const handleSelectCohort = (cohort: Cohort) => {
    setSelectedCohort(cohort);
    setView('cohort-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setView('landing');
    setSelectedCohort(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#050505] selection:bg-blue-600/30 selection:text-white">
        <Navbar onLogoClick={handleBack} />

        <main className="transition-all duration-500">
          {view === 'landing' && (
            <LandingPage
              onSelectCohort={handleSelectCohort}
              onOpenArchitect={() => setView('course-architect')}
            />
          )}

          {view === 'cohort-detail' && selectedCohort && (
            <CohortDetail cohort={selectedCohort} onBack={handleBack} />
          )}

          {view === 'course-architect' && (
            <CourseArchitect onBack={handleBack} />
          )}
        </main>

        <TranslationOverlay />
      </div>
    </LanguageProvider>
  );
}

export default App;
