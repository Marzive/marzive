import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaGlobe, FaSearch, FaTrophy, FaGem } from 'react-icons/fa';
import './BottomNav.css';

const navItems = [
  { icon: FaHome, label: 'Home', path: '/' },
  { icon: FaGlobe, label: 'Network', path: '/network' },
  { icon: FaSearch, label: 'Search', path: '/search' },
  { icon: FaTrophy, label: 'Rewards', path: '/rewards' },
  { icon: FaGem, label: 'Assets', path: '/assets' }
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="bottom-nav">
      {navItems.map((item, index) => {
        const isActive = item.path === location.pathname;
        return (
          <Link
            key={index}
            to={item.path}
            className={`nav-item ${isActive ? 'active' : ''}`}
          >
            <item.icon size={24} />
            {isActive && <span className="nav-label">{item.label}</span>}
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
