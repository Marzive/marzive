import React, { useRef, useEffect, useState, useCallback } from 'react';
import { FaRegCopy } from 'react-icons/fa';
import './InviteSheet.css';

const InviteSheet = ({ isOpen, onClose, inviteLink }) => {
  const sheetRef = useRef(null);
  const backdropRef = useRef(null);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  // The link to share, defaulting to a placeholder if not provided
  const shareLink = inviteLink || 'https://t.me/sui_bison_bot?start=6708435548';

  // Touch event handlers for swipe down
  const handleTouchStart = useCallback((e) => {
    const touchY = e.touches[0].clientY;
    setStartY(touchY);
    setIsDragging(true);

    // Remove transition during dragging for fluid movement
    if (sheetRef.current) {
      sheetRef.current.style.transition = 'none';
    }
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;

    const currentY = e.touches[0].clientY;
    const diff = currentY - startY;

    // Only allow dragging downward
    if (diff > 0) {
      setCurrentY(diff);

      if (sheetRef.current) {
        // Move sheet down with touch in a 1:1 motion
        sheetRef.current.style.transform = `translateY(${diff}px)`;

        // Fade backdrop as we drag down
        if (backdropRef.current) {
          const opacity = Math.max(1 - (diff / 300), 0);
          backdropRef.current.style.opacity = opacity.toString();
        }
      }
    }
  }, [isDragging, startY]);

  const handleTouchEnd = useCallback((e) => {
    if (!isDragging) return;

    setIsDragging(false);

    // Add transition back for smooth-animation on release
    if (sheetRef.current) {
      sheetRef.current.style.transition = 'transform 0.3s cubic-bezier(0.33, 1, 0.68, 1)';
    }

    // If dragged more than 25% of the screen height, close
    if (currentY > window.innerHeight * 0.25) {
      onClose();
    } else {
      // Otherwise, snap back to open position
      if (sheetRef.current) {
        sheetRef.current.style.transform = 'translateY(0)';
      }
      if (backdropRef.current) {
        backdropRef.current.style.opacity = '1';
      }
    }

    setCurrentY(0);
  }, [isDragging, currentY, onClose]);

  // Add passive event listeners for better performance on mobile
  useEffect(() => {
    const sheet = sheetRef.current;

    if (!sheet) return;

    const handleTouchStartPassive = (e) => handleTouchStart(e);
    const handleTouchMovePassive = (e) => handleTouchMove(e);
    const handleTouchEndPassive = (e) => handleTouchEnd(e);

    if (isOpen) {
      // Use passive: true for better scroll performance
      sheet.addEventListener('touchstart', handleTouchStartPassive, { passive: true });
      sheet.addEventListener('touchmove', handleTouchMovePassive, { passive: true });
      sheet.addEventListener('touchend', handleTouchEndPassive, { passive: true });
    }

    return () => {
      sheet.removeEventListener('touchstart', handleTouchStartPassive);
      sheet.removeEventListener('touchmove', handleTouchMovePassive);
      sheet.removeEventListener('touchend', handleTouchEndPassive);
    };
  }, [isOpen, handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Handle click outside to close the sheet
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sheetRef.current && !sheetRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Handle keyboard events (ESC key to close)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Handle animation classes
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      if (sheetRef.current) {
        sheetRef.current.style.transition = 'transform 0.3s cubic-bezier(0.33, 1, 0.68, 1)';
        sheetRef.current.style.transform = 'translateY(0)';
      }

      if (backdropRef.current) {
        backdropRef.current.style.opacity = '1';
      }
    } else {
      if (sheetRef.current) {
        sheetRef.current.style.transition = 'transform 0.3s cubic-bezier(0.33, 1, 0.68, 1)';
        sheetRef.current.style.transform = 'translateY(100%)';
      }

      if (backdropRef.current) {
        backdropRef.current.style.opacity = '0';
      }

      // Delay removing overflow hidden to allow for animation
      setTimeout(() => {
        document.body.style.overflow = '';
      }, 300);
    }
  }, [isOpen]);

  // Auto-hide the success message
  useEffect(() => {
    if (showCopySuccess) {
      const timer = setTimeout(() => {
        setShowCopySuccess(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showCopySuccess]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink)
      .then(() => {
        setShowCopySuccess(true);
        console.log('Link copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <div className={`invite-sheet-container ${isOpen ? 'open' : ''}`}
         style={{ visibility: isOpen ? 'visible' : 'hidden' }}>
      <div
        ref={backdropRef}
        className="invite-backdrop"
        onClick={onClose}
        style={{
          transition: 'opacity 0.3s ease',
          opacity: '0'
        }}
      ></div>

      <div
        ref={sheetRef}
        className="invite-sheet"
        style={{
          transform: 'translateY(100%)'
        }}
      >
        <div className="sheet-indicator"></div>
        <p className="swipe-instruction">Swipe down to close</p>

        <h2 className="sheet-title">Share Marzive with friends</h2>

        <div className="invite-link-container">
          <p className="invite-link">{shareLink}</p>
          <button className="copy-button" onClick={copyToClipboard}>
            <FaRegCopy />
          </button>
        </div>

        {showCopySuccess && (
          <div className="copy-success-toast">Link copied to clipboard!</div>
        )}
      </div>
    </div>
  );
};

export default InviteSheet;
