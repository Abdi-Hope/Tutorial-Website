import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ChapterContent.css';

const ChapterContent = ({ currentChapter, currentCourse, activeChapter }) => {
  return (
    <div className="chapter-content">
      <div className="content-header">
        <h2>{currentChapter.title}</h2>
        <div className="chapter-meta">
          <span className="course-name">{currentCourse.title}</span>
          <span className="chapter-number">Chapter {activeChapter + 1} of {currentCourse.chapters.length}</span>
        </div>
      </div>
      
      <div className="content-body">
        <div className="content-text">
          {currentChapter.content.split('\n').map((line, index) => {
            const lineKey = `${line.substring(0, 20)}-${index}`;
            
            return (
              <p key={lineKey}>
                {line}
              </p>
            );
          })}
        </div>
        
        {!currentChapter.isFree && (
          <div className="premium-overlay">
            <div className="premium-message">
              <h3>🔒 Premium Content</h3>
              <p>This chapter is available only for premium members. Upgrade to access all content and features.</p>
              <button className="upgrade-btn-large">Upgrade to Premium</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

ChapterContent.propTypes = {
  currentChapter: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    isFree: PropTypes.bool.isRequired
  }).isRequired,
  currentCourse: PropTypes.shape({
    title: PropTypes.string.isRequired,
    chapters: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        isFree: PropTypes.bool.isRequired
      })
    ).isRequired
  }).isRequired,
  activeChapter: PropTypes.number.isRequired
};

export default ChapterContent;