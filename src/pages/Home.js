import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import InviteSheet from '../components/InviteSheet';
import './Home.css';

const ChatIcon = () => (
  <Link to="/chat" className="chat-icon-link">
    <div className="chat-icon">
      <div className="chat-icon-dots">
        <div className="chat-dot"></div>
        <div className="chat-dot"></div>
      </div>
    </div>
  </Link>
);

const Home = () => {
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
    <div className="home-container">
      <div className="header">
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
      </div>

      <div className="wallet-cards">
        <div className="wallet-card">
          <div className="card-header">MARZIVE Point</div>
          <div className="amount">$15.413</div>
          <div className="details">
            <span>4.256 MP</span>
            <span className="roi">NET ROI <span className="positive">+4%</span></span>
          </div>
        </div>

        <div className="wallet-card">
          <div className="card-header">MARZIVE Cash</div>
          <div className="amount">$15.413</div>
          <div className="details">
            <span>4.256 MZC</span>
          </div>
        </div>
      </div>

      <div className="notifications-section">
        <h2>Notifications</h2>
        {[1, 2, 3, 4].map((_, index) => (
          <div key={index} className="notification-item">
            <div className="notification-icon">🔔</div>
            <div className="notification-content">
              <h3>New Task Update</h3>
              <p>Stay ahead with the latest updates on your tasks. Click to view and take action now!</p>
            </div>
            <button className="open-btn">Open</button>
          </div>
        ))}
      </div>

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

export default Home;
