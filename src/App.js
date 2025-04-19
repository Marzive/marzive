import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import IntroScreen from './components/IntroScreen';
import Home from './pages/Home';
import BottomNav from './components/BottomNav';
import ChatInterface from './components/ChatInterface';
import NetworkPage from './pages/NetworkPage';
import Ranking from './pages/Ranking';
import './App.css';

// Placeholder components for other pages
const Quest = () => (
  <div className="page-container">
    <div className="page-content">Quest Page (Coming Soon)</div>
    <BottomNav />
  </div>
);

const Token = () => (
  <div className="page-container">
    <div className="page-content">Token Page (Coming Soon)</div>
    <BottomNav />
  </div>
);

// Check if current path should show bottom nav
const shouldShowBottomNav = (path) => {
  return path !== '/chat';
};

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
        <Route path="/network" element={<NetworkPage />} />
        <Route path="/quest" element={<Quest />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/token" element={<Token />} />
        <Route path="/chat" element={<ChatInterface />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
