import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ChaptersSidebar.css';

const ChaptersSidebar = ({ currentCourse, activeChapter, setActiveChapter }) => {
  return (
    <div className="chapters-sidebar">
      <h3>{currentCourse.title}</h3>
      <div className="chapters-list">
        {currentCourse.chapters.map((chapter, chapterIndex) => {
          const isPremium = !chapter.isFree;
          
          return (
            <button
              key={chapter.title}
              className={`chapter-item ${activeChapter === chapterIndex ? "active" : ""} ${
                isPremium ? "premium" : ""
              }`}
              onClick={() => setActiveChapter(chapterIndex)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveChapter(chapterIndex);
                }
              }}
              aria-current={activeChapter === chapterIndex ? "true" : "false"}
              aria-label={`Chapter ${chapterIndex + 1}: ${chapter.title}${isPremium ? ' - Premium content' : ''}`}
              tabIndex={0}
            >
              <div className="chapter-header">
                <span className="chapter-icon">
                  {chapter.isFree ? "✅" : "🔒"}
                </span>
                <span className="chapter-title">
                  Chapter {chapterIndex + 1}: {chapter.title}
                </span>
              </div>
              {isPremium && (
                <span className="premium-badge">Premium</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

ChaptersSidebar.propTypes = {
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
  activeChapter: PropTypes.number.isRequired,
  setActiveChapter: PropTypes.func.isRequired
};

export default ChaptersSidebar;