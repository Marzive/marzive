import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import IntroScreen from './components/IntroScreen';
import Home from './pages/Home';
import BottomNav from './components/BottomNav';
import './App.css';

// Placeholder components for other pages
const Network = () => (
  <div className="page-container">
    <div className="page-content">Network Page (Coming Soon)</div>
    <BottomNav />
  </div>
);

const Search = () => (
  <div className="page-container">
    <div className="page-content">Search Page (Coming Soon)</div>
    <BottomNav />
  </div>
);

const Rewards = () => (
  <div className="page-container">
    <div className="page-content">Rewards Page (Coming Soon)</div>
    <BottomNav />
  </div>
);

const Assets = () => (
  <div className="page-container">
    <div className="page-content">Assets Page (Coming Soon)</div>
    <BottomNav />
  </div>
);

function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Initialize Telegram Mini App
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();

    // Check if it's the first visit
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    if (hasSeenIntro) {
      setShowIntro(false);
    }
  }, []);

  const handleIntroComplete = () => {
    localStorage.setItem('hasSeenIntro', 'true');
    setShowIntro(false);
  };

  if (showIntro) {
    return <IntroScreen onComplete={handleIntroComplete} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/network" element={<Network />} />
        <Route path="/search" element={<Search />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
