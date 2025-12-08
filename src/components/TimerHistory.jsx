import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '../styles/TimerHistory.css';
const TimerHistory = ({ timerHistory, onClose, onClearHistory }) => {
  const modalRef = useRef(null);

  // Focus management and escape key handler
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Focus the modal when it opens
    if (modalRef.current) {
      modalRef.current.focus();
    }

    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTimeRange = (start, end) => {
    return `${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  const calculateStats = () => {
    if (timerHistory.length === 0) return null;
    
    const today = new Date().toISOString().split('T')[0];
    const todaySessions = timerHistory.filter(session => session.date === today);
    const todayTotal = todaySessions.reduce((total, session) => total + session.duration, 0);
    
    const totalSessions = timerHistory.length;
    const averageSession = Math.round(timerHistory.reduce((total, session) => total + session.duration, 0) / totalSessions);
    
    return {
      todayTotal,
      totalSessions,
      averageSession
    };
  };

  // Handle clear history key down
  const handleClearHistoryKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClearHistory();
    }
  };

  const stats = calculateStats();

  return (
    <div 
      className="timer-history-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="timer-history-title"
      ref={modalRef}
      tabIndex={-1}
    >
      {/* Overlay as a proper button for accessibility */}
      <button
        className="timer-history-overlay"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClose();
          }
        }}
        aria-label="Close modal"
        tabIndex={0}
      />
      
      <div className="timer-history-content">
        <div className="timer-history-header">
          <h3 id="timer-history-title">Study Session History</h3>
          <button 
            className="close-button" 
            onClick={onClose}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClose();
              }
            }}
            aria-label="Close history"
            tabIndex={0}
          >
            ✕
          </button>
        </div>
        
        {/* Statistics */}
        {stats && (
          <div className="history-stats">
            <div className="stat-item">
              <span className="stat-label">Today:</span>
              <span className="stat-value">{formatTime(stats.todayTotal)}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Sessions:</span>
              <span className="stat-value">{stats.totalSessions}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Average:</span>
              <span className="stat-value">{formatTime(stats.averageSession)}</span>
            </div>
          </div>
        )}
        
        <div className="timer-history-body">
          {timerHistory.length === 0 ? (
            <div className="no-sessions">
              <div className="empty-icon" aria-hidden="true">📊</div>
              <p>No study sessions recorded yet</p>
              <small>Start the timer to begin tracking</small>
            </div>
          ) : (
            <div className="sessions-list">
              {timerHistory.map((session) => (
                <div key={session.id} className="session-item">
                  <div className="session-date">
                    {formatDate(session.date)}
                  </div>
                  <div className="session-time">
                    {formatTimeRange(new Date(session.startTime), new Date(session.endTime))}
                  </div>
                  <div className="session-duration">
                    {formatTime(session.duration)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {timerHistory.length > 0 && (
          <div className="timer-history-footer">
            <button 
              className="clear-history-btn"
              onClick={onClearHistory}
              onKeyDown={handleClearHistoryKeyDown}
              tabIndex={0}
            >
              Clear History
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

TimerHistory.propTypes = {
  timerHistory: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onClearHistory: PropTypes.func.isRequired
};

export default TimerHistory;