import React, { useState, useEffect } from 'react';
import { FaHome, FaGlobe, FaQuestionCircle, FaMedal, FaCoins } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import InviteSheet from '../components/InviteSheet';
import './Ranking.css';

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

const Ranking = () => {
  const location = useLocation();
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

  // Top 10 users data
  const leaderboardData = [
    { id: 1, name: 'Heritage', avatar: '😀', shares: 100, points: 400, position: 1 },
    { id: 2, name: 'Tee Jay', avatar: '😁', shares: 68, points: 400, position: 2 },
    { id: 3, name: 'Chikaima', avatar: '😂', shares: 68, points: 400, position: 3 },
    { id: 4, name: 'Adoeze', avatar: '🤣', shares: 68, points: 400, position: 4 },
    { id: 5, name: 'Commy', avatar: '😃', shares: 68, points: 400, position: 5 },
    { id: 6, name: 'Confy', avatar: '😄', shares: 68, points: 400, position: 6 },
    { id: 7, name: 'Iamrex', avatar: '😅', shares: 68, points: 400, position: 7 },
    { id: 8, name: 'K.D', avatar: '😆', shares: 68, points: 400, position: 8 },
    { id: 9, name: 'GOAT', avatar: '😉', shares: 68, points: 400, position: 9 },
    { id: 10, name: 'Peace', avatar: '😊', shares: 68, points: 400, position: 10 }
  ];

  return (
    <div className="ranking-page">
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

      {/* Leaderboard Card */}
      <div className="leaderboard-card">
        <div className="leaderboard-content">
          <h2 className="leaderboard-title">Leaderboard</h2>
          <p className="leaderboard-subtitle">You rank more than 96% of users</p>

          <div className="leaderboard-user-row">
            <div className="leaderboard-user-left">
              <div className="leaderboard-user-avatar">
                {userData.avatar ? (
                  <img src={userData.avatar} alt="" className="user-pic" />
                ) : (
                  <div className="user-pic-placeholder">U</div>
                )}
              </div>
              <div className="leaderboard-user-info">
                <div className="leaderboard-user-name">{userData.username || 'User'}</div>
                <div className="leaderboard-user-stats-center">
                    <div style={{display: "flex", gap: "3px"}}>
                  <img src="/marzive-logo-purple.svg" alt="Marzive Logo" className="mp-icon" /> 400MP <span className="stats-separator">|</span> 68 share(s)
                    </div>
            <div className="leaderboard-user-points">
              <span className="points-value">15.6k</span>
              <span className="points-max">/2.6m</span>
            </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="leaderboard-decoration"></div>
      </div>

      {/* Global Leaderboard */}
      <div className="global-leaderboard">
        <h3 className="global-title">Global Leaderboard</h3>

        {/* Table Headers */}
        <div className="table-header">
          <div className="header-user">User</div>
          <div className="header-shares">Pool share</div>
          <div className="header-reward">Reward</div>
          <div className="header-position">POS</div>
        </div>

        {/* Table Body */}
        <div className="table-body">
          {leaderboardData.map((user) => (
            <div key={user.id} className="leaderboard-row">
              <div className="user-cell">
                <div className="rank-circle">{user.id}</div>
                <div className="lb-user-name">
                  {user.name}<span className="lb-user-avatar">{user.avatar}</span>
                </div>
              </div>
              <div className="shares-cell">{user.shares} share(s)</div>
              <div className="reward-cell">
                <img src="/marzive-logo-purple.svg" alt="Marzive Logo" className="mp-icon" />
                <span className="reward-points">{user.points}MP</span>
              </div>
              <div className="position-cell">
                {user.position <= 3 && (
                  <span className="trophy-icon">🏆</span>
                )}

                {user.position > 3 && (
                  <span className="position-number">{user.position}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <Link to="/" className="nav-item">
          <FaHome size={24} />
          <span className="nav-label">Home</span>
        </Link>
        <Link to="/network" className="nav-item">
          <FaGlobe size={24} />
          <span className="nav-label">Network</span>
        </Link>
        <Link to="/quest" className="nav-item">
          <FaQuestionCircle size={24} />
          <span className="nav-label">Quest</span>
        </Link>
        <Link to="/ranking" className="nav-item active">
          <FaMedal size={24} />
          <span className="nav-label">Ranking</span>
        </Link>
        <Link to="/token" className="nav-item">
          <FaCoins size={24} />
          <span className="nav-label">Token</span>
        </Link>
      </nav>

      {/* Bottom Home Indicator */}
      <div className="home-indicator"></div>

      {/* Invite Friends Sheet */}
      <InviteSheet
        isOpen={showInviteSheet}
        onClose={handleCloseInviteSheet}
        inviteLink="https://t.me/sui_bison_bot?start=6708435548"
      />
    </div>
  );
};

export default Ranking;
