import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import Module from './Module';
import Login from './Login'; // Import the Login component
import '../styles/Header.css';

const Header = ({ 
  sessionTime,
  timerHistory,
  onTimerClick,
  onTimerKeyDown,
  // Additional props for child components
  searchTerm,
  onSearchChange,
  onSearchSubmit,
  onModuleClick,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [user, setUser] = useState(null); // Add user state

  // Handle login success
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    console.log('User logged in:', userData);
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    console.log('User logged out');
    // You might want to clear tokens, cookies, etc. here
  };

  // Scroll effect only
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

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''} ${isHidden ? 'hidden' : ''}`}>
      <div className="nav-container">
        {/* Logo Section with Timer */}
        <div className="logo-section">
          <button 
            className="logo-button"
            onClick={handleLogoClick}
            onKeyDown={handleLogoKeyDown}
            aria-label="Scroll to top - LearnHub"
            tabIndex="0"
          >
            LearnHub
          </button>
          
          {/* Timer Display */}
          {sessionTime !== undefined && (
            <div className="timer-container">
              <button 
                className={`timer-display-btn ${timerHistory && timerHistory.length > 0 ? 'has-history' : ''}`}
                onClick={onTimerClick}
                onKeyDown={onTimerKeyDown}
                aria-label={`Session timer: ${formatTime(sessionTime)}`}
                tabIndex="0"
              >
                <span className="timer-icon">⏱️</span>
                <span className="timer-text">{formatTime(sessionTime)}</span>
                {timerHistory && timerHistory.length > 0 && (
                  <span className="history-badge">{timerHistory.length}</span>
                )}
              </button>
            </div>
          )}
        </div>
        
        {/* Search Bar */}
        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          onSearchSubmit={onSearchSubmit}
        />
        
        {/* Module Button */}
        <Module 
          onModuleClick={onModuleClick}
        />
        
        {/* Login Component - It will show either login button or user profile */}
        <Login 
          user={user}
          onLoginSuccess={handleLoginSuccess}
          onLogout={handleLogout}
        />
      </div>
    </header>
  );
};

// PropTypes validation (only for props that are actually used)
Header.propTypes = {
  // Timer props
  sessionTime: PropTypes.number,
  timerHistory: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      startTime: PropTypes.instanceOf(Date),
      endTime: PropTypes.instanceOf(Date),
      duration: PropTypes.number,
      date: PropTypes.string
    })
  ),
  onTimerClick: PropTypes.func,
  onTimerKeyDown: PropTypes.func,
  
  // SearchBar props
  searchTerm: PropTypes.string,
  onSearchChange: PropTypes.func,
  onSearchSubmit: PropTypes.func,
  
  // Module props
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