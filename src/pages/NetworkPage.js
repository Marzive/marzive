import React, { useEffect, useState } from 'react';
import { FaHome, FaGlobe, FaQuestionCircle, FaMedal, FaCoins } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import './NetworkPage.css';
import ChatIcon from '../components/ChatIcon';
import InviteSheet from '../components/InviteSheet';
import BottomNav from '../components/BottomNav';

const NetworkPage = () => {
//   const location = useLocation();
  const [userData, setUserData] = useState({
    username: 'User',
    avatar: null
  });
  const [showInviteSheet, setShowInviteSheet] = useState(false);

  useEffect(() => {
    // Get user data from Telegram WebApp
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe) {
      const telegramUser = window.Telegram.WebApp.initDataUnsafe.user;
      if (telegramUser) {
        setUserData({
          username: telegramUser.username || `${telegramUser.first_name || ''} ${telegramUser.last_name || ''}`.trim() || 'User',
          avatar: telegramUser.photo_url || null
        });
      }
    }
  }, []);

  const handleOpenInviteSheet = () => {
    setShowInviteSheet(true);
  };

  const handleCloseInviteSheet = () => {
    setShowInviteSheet(false);
  };

  return (
    <div className="network-page">


      {/* Header */}
      <header className="header">
        <div className="user-info">
          {userData.avatar ? (
            <img src={userData.avatar} alt="" className="avatar" />
          ) : (
            <div className="avatar-placeholder">
              {userData.username.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="username">{userData.username}</span>
        </div>
        <div className="header-actions">
          <ChatIcon />
          <button className="invite-btn" onClick={handleOpenInviteSheet}>Invite Friends</button>
        </div>
      </header>

      {/* Stats Title */}
      <h2 className="stats-title">Stats</h2>

      {/* Stats Cards */}
      <div className="stats-container">
        {/* Rank Card */}
        <div className="stat-card">
          <div className="stat-icon rank-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 15l-5-5 5-5 5 5-5 5z" fill="currentColor" />
            </svg>
          </div>
          <div className="stat-label">Rank</div>
          <div className="stat-value">No rank</div>
        </div>

        {/* Referred By Card */}
        <div className="stat-card">
          <div className="stat-icon referred-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" fill="currentColor" />
              <path d="M12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor" />
            </svg>
          </div>
          <div className="stat-label">Referred by</div>
          <div className="stat-value">Vice</div>
        </div>

        {/* Network Stats Grid */}
        <div className="network-grid">
          {/* Total Network */}
          <div className="grid-card">
            <div className="stat-icon network-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" fill="currentColor" />
                <path d="M12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor" />
              </svg>
            </div>
            <div className="stat-label">Total Network</div>
            <div className="stat-amount">0</div>
            <div className="stat-mp" style={{color: 'transparent'}}>4,256 MP</div>
          </div>

          {/* Team Volume */}
          <div className="grid-card">
            <div className="stat-icon volume-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M4 19h4l10-10-4-4L4 15v4z" fill="currentColor" />
                <path d="M16.5 3.5a2.121 2.121 0 013 3L18 8l-4-4 1.5-1.5z" fill="currentColor" />
              </svg>
            </div>
            <div className="stat-label">Total Team Volume</div>
            <div className="stat-amount">$15,413</div>
            <div className="stat-mp">4,256 MP</div>
          </div>
        </div>

        {/* Earnings Card */}
        <div className="stat-card earnings-card">
            <div style={{display: "flex", gap: "3px", alignItems: "center"}}>
          <div className="stat-icon earnings-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20 7h-1V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-1h1a2 2 0 002-2v-4a2 2 0 00-2-2zm-3 9H5V6h12v10zm3-3h-1V9h1v4z" fill="currentColor" />
            </svg>
          </div>
          <div className="stat-label">Available referral earnings</div>
            </div>
          <div className="stat-amount">$15,413</div>
          <div className="stat-mp">4,256 MP</div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />

       {/* Invite Friends Sheet */}
       <InviteSheet
        isOpen={showInviteSheet}
        onClose={handleCloseInviteSheet}
        inviteLink="https://t.me/sui_bison_bot?start=6708435548"
      />
    </div>
  );
};

export default NetworkPage;
