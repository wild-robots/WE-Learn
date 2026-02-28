
import React, { useState } from 'react';
import { LanguageProvider } from './LanguageContext';
import { AuthProvider } from './AuthContext';
import Navbar from './components/Navbar';
import { StyleGuide } from './components/StyleGuide';
import LandingPage from './components/LandingPage';
import CohortDetail from './components/CohortDetail';
import CourseArchitect from './components/CourseArchitect';
import BubbleAgent from './components/BubbleAgent';
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

  const handleOpenArchitect = (context?: string) => {
    setArchitectContext(context);
    setView('course-architect');
  };

  return (
    <LanguageProvider>
      <AuthProvider>
        <div className="min-h-screen bg-[#F8FAFA] selection:bg-teal-100 selection:text-teal-900">
          <StyleGuide />

          <main className="transition-all duration-500">
            {view === 'landing' && (
              <LandingPage
                onSelectCohort={handleSelectCohort}
                onOpenArchitect={handleOpenArchitect}
                onOpenBubbleAgent={() => setView('bubble-agent')}
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

            {view === 'bubble-agent' && (
              <BubbleAgent onBack={handleBack} />
            )}

            {view === 'privacy' && <PrivacyPolicy onBack={handleBack} />}
            {view === 'terms' && <TermsOfService onBack={handleBack} />}
          </main>

          <Navbar onLogoClick={handleBack} />
          <TranslationOverlay />
        </div>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
