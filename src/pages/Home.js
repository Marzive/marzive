import React, { useEffect, useState } from 'react';
import BottomNav from '../components/BottomNav';
import './Home.css';

const Home = () => {
  const [userData, setUserData] = useState({
    username: 'User',
    avatar: null
  });

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
        <button className="invite-btn">Invite Friends</button>
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
    </div>
  );
};

export default Home;
