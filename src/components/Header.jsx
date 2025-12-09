import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import Module from './Module';
import Login from './Login';
import PremiumModal from '../components/premium-modal/Premium-Modal';
import '../styles/Header.css';

const Header = ({ 
  sessionTime,
  timerHistory,
  onTimerClick,
  onTimerKeyDown,
  searchTerm,
  onSearchChange,
  onSearchSubmit,
  onModuleClick,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [user, setUser] = useState(null);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const modalRef = useRef(null);

  // Handle login success
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    console.log('User logged in:', userData);
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    console.log('User logged out');
  };

  // Toggle Premium Modal
  const togglePremiumModal = () => {
    setIsPremiumModalOpen(!isPremiumModalOpen);
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      
      setIsScrolled(scrollTop > 50);
      
      if (scrollTop > lastScrollY && scrollTop > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      
      setLastScrollY(scrollTop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Modal focus for accessibility
  useEffect(() => {
    if (isPremiumModalOpen && modalRef.current) {
      modalRef.current.focus();
      // Lock body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isPremiumModalOpen]);

  // Format time function
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Logo interaction
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle modal overlay click (for closing modal)
  const handleModalOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      togglePremiumModal();
    }
  };

  // Handle modal escape key
  const handleModalEscape = (e) => {
    if (e.key === 'Escape') {
      togglePremiumModal();
    }
  };

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''} ${isHidden ? 'hidden' : ''}`}>
        <div className="nav-container">
          {/* Logo Section */}
          <div className="logo-section">
            <button 
              className="logo-button"
              onClick={handleLogoClick}
              onKeyDown={handleLogoKeyDown}
              aria-label="Scroll to top - LearnHub"
              tabIndex="0"
            >
              <span className="logo-icon">🎓</span>
              <span className="logo-text">LearnHub</span>
            </button>
            
            {/* Timer Display */}
            {sessionTime !== undefined && (
              <div className="timer-container">
                <button 
                  className={`timer-display-btn ${timerHistory?.length > 0 ? 'has-history' : ''}`}
                  onClick={onTimerClick}
                  onKeyDown={onTimerKeyDown}
                  aria-label={`Session timer: ${formatTime(sessionTime)}`}
                  tabIndex="0"
                >
                  <span className="timer-icon">⏱️</span>
                  <span className="timer-text">{formatTime(sessionTime)}</span>
                  {timerHistory?.length > 0 && (
                    <span className="history-badge">{timerHistory.length}</span>
                  )}
                </button>
              </div>
            )}
          </div>
          
          {/* Search Bar */}
          <div className="search-container">
            <SearchBar 
              searchTerm={searchTerm}
              onSearchChange={onSearchChange}
              onSearchSubmit={onSearchSubmit}
            />
          </div>
          
          {/* Navigation Actions */}
          <div className="actions-container">
            <button 
              className="premium-btn"
              onClick={togglePremiumModal}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  togglePremiumModal();
                }
              }}
              aria-label="Premium Features"
              tabIndex="0"
            >
              <span className="premium-icon">⭐</span>
              <span className="premium-text">Premium</span>
            </button>
            
            <Module onModuleClick={onModuleClick} />
            
            <Login 
              user={user}
              onLoginSuccess={handleLoginSuccess}
              onLogout={handleLogout}
            />
          </div>
        </div>
      </header>

      {/* Premium Modal */}
      {isPremiumModalOpen && (
        <div 
          className="modal-overlay"
          onClick={handleModalOverlayClick}
          role="presentation"
          aria-hidden={!isPremiumModalOpen}
        >
          <div 
            className="modal-content"
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="premium-modal-title"
            aria-describedby="premium-modal-description"
            tabIndex="-1"
            onKeyDown={handleModalEscape}
          >
            <PremiumModal onClose={togglePremiumModal} />
          </div>
        </div>
      )}
    </>
  );
};

// PropTypes validation
Header.propTypes = {
  sessionTime: PropTypes.number,
  timerHistory: PropTypes.array,
  onTimerClick: PropTypes.func,
  onTimerKeyDown: PropTypes.func,
  searchTerm: PropTypes.string,
  onSearchChange: PropTypes.func,
  onSearchSubmit: PropTypes.func,
  onModuleClick: PropTypes.func,
};

// Default props
Header.defaultProps = {
  sessionTime: 0,
  timerHistory: [],
  onTimerClick: () => {},
  onTimerKeyDown: () => {},
  searchTerm: '',
  onSearchChange: () => {},
  onSearchSubmit: () => {},
  onModuleClick: () => {},
};

export default Header;