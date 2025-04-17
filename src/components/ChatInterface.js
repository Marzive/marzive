import React, { useRef, useEffect } from 'react';
import { FaChevronDown, FaPaperclip, FaMicrophone } from 'react-icons/fa';
import './ChatInterface.css';

const ChatInterface = () => {
  const suggestionsRef = useRef(null);

  // Enable horizontal scrolling with touch
  useEffect(() => {
    const handleWheel = (e) => {
      if (suggestionsRef.current && e.deltaY !== 0) {
        e.preventDefault();
        suggestionsRef.current.scrollLeft += e.deltaY;
      }
    };

    const suggestionsWrapper = suggestionsRef.current;
    if (suggestionsWrapper) {
      suggestionsWrapper.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (suggestionsWrapper) {
        suggestionsWrapper.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  // Sample suggestions
  const suggestions = [
    {
      title: "Create a Network",
      subtext: "Referring to form network"
    },
    {
      title: "Create an illustration",
      subtext: "For Web3"
    },
    {
      title: "Create NFT Art",
      subtext: "For collections"
    },
    {
      title: "Find Web3 Jobs",
      subtext: "Remote opportunities"
    },
    {
      title: "Learn about DeFi",
      subtext: "Decentralized finance"
    },
    {
      title: "Explore Metaverse",
      subtext: "Virtual worlds"
    }
  ];

  return (
    <div className="chat-interface">
      {/* Header */}
      <div className="chat-header">
        <div className="menu-button">
          <div className="menu-bars"></div>
        </div>
        <div className="chat-title">
          <span>Marzive Oracle</span>
          <FaChevronDown className="dropdown-icon" />
        </div>
        <div className="new-chat-btn">
          <span>+</span>
        </div>
      </div>

      {/* Chat Content */}
      <div className="chat-content">
        <div className="welcome-message">
          <h1>Welcome to the Marzive Oracle</h1>
          <div className="bot-avatar">
            <span>AI</span>
          </div>
        </div>

        <div className="chat-message">
          <div className="bot-avatar">
            <span>AI</span>
          </div>
          <div className="message-content">
            Hi there! I'm your AI assistant. I can help you with creating networks, illustrations, NFT art, and exploring the Web3 space. What would you like to know?
          </div>
        </div>

        {/* Suggestions Slider */}
        <div className="suggestions-container">
          <div className="suggestions-wrapper" ref={suggestionsRef}>
            {suggestions.map((suggestion, index) => (
              <div key={index} className="suggestion-item">
                <h3>{suggestion.title}</h3>
                <p>{suggestion.subtext}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Upgrade Section */}
        <div className="upgrade-section">
          <h2>Upgrade</h2>
          <p>You need Marzplus to continue this chat because there's an attachment. Upgrade now.</p>
          <div className="upgrade-buttons">
            <button className="new-chat-button">New chat</button>
            <button className="get-plus-button">Get Plus</button>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="chat-input-section">
        <button className="attachment-btn">
          <FaPaperclip />
        </button>
        <input type="text" placeholder="Message" className="chat-input" />
        <button className="voice-btn">
          <FaMicrophone />
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
