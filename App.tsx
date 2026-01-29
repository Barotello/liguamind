
import React, { useState, useEffect, createContext } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import SpeakingCoach from './components/SpeakingCoach';
import WritingAssistant from './components/WritingAssistant';
import ReadingModule from './components/ReadingModule';
import ListeningModule from './components/ListeningModule';
import Profile from './components/Profile';
import VocabMaster from './components/VocabMaster';
import Analytics from './components/Analytics';
import MockTestEnvironment from './components/MockTestEnvironment';
import Community from './components/Community';
import StudyPlan from './components/StudyPlan';
import Pricing from './components/Pricing';
import PaymentMethod from './components/PaymentMethod';
import PaymentSuccess from './components/PaymentSuccess';
import { Language } from './types';
import { translations } from './translations';

// Simple context for language management
export const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
}>({
  language: Language.EN,
  setLanguage: () => {},
  t: translations.en
});

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'dark';
  });

  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('language') as Language) || Language.EN;
  });

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <Router>
        <Layout theme={theme} toggleTheme={toggleTheme}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/community" element={<Community />} />
            <Route path="/mock-test" element={<MockTestEnvironment />} />
            <Route path="/speaking" element={<SpeakingCoach />} />
            <Route path="/writing" element={<WritingAssistant />} />
            <Route path="/reading" element={<ReadingModule />} />
            <Route path="/listening" element={<ListeningModule />} />
            <Route path="/vocab" element={<VocabMaster />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/study-plan" element={<StudyPlan />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/checkout" element={<PaymentMethod />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
          </Routes>
        </Layout>
      </Router>
    </LanguageContext.Provider>
  );
};

export default App;
