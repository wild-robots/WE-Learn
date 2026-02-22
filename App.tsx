
import React, { useState } from 'react';
import { LanguageProvider } from './LanguageContext';
import { AuthProvider } from './AuthContext';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import CohortDetail from './components/CohortDetail';
import CourseArchitect from './components/CourseArchitect';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import TranslationOverlay from './components/TranslationOverlay';
import { View, Cohort } from './types';

function App() {
  const [view, setView] = useState<View>('landing');
  const [selectedCohort, setSelectedCohort] = useState<Cohort | null>(null);
  const [architectContext, setArchitectContext] = useState<string | undefined>(undefined);

  const handleSelectCohort = (cohort: Cohort) => {
    setSelectedCohort(cohort);
    setView('cohort-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setView('landing');
    setSelectedCohort(null);
    setArchitectContext(undefined);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fix #3: Accept optional context from Hero chatbot
  const handleOpenArchitect = (context?: string) => {
    setArchitectContext(context);
    setView('course-architect');
  };

  return (
    <LanguageProvider>
      <AuthProvider>
        <div className="min-h-screen bg-[#420b24] selection:bg-blue-600/30 selection:text-white">
          <Navbar onLogoClick={handleBack} />

          <main className="transition-all duration-500">
            {view === 'landing' && (
              <LandingPage
                onSelectCohort={handleSelectCohort}
                onOpenArchitect={handleOpenArchitect}
                onNavigate={(view) => {
                  setView(view);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {view === 'cohort-detail' && selectedCohort && (
              <CohortDetail cohort={selectedCohort} onBack={handleBack} />
            )}

            {view === 'course-architect' && (
              <CourseArchitect onBack={handleBack} initialContext={architectContext} />
            )}

            {view === 'privacy' && <PrivacyPolicy onBack={handleBack} />}
            {view === 'terms' && <TermsOfService onBack={handleBack} />}
          </main>

          <TranslationOverlay />
        </div>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
