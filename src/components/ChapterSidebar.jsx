// components/ChapterSidebar.jsx
import PropTypes from 'prop-types';
import '../styles/ChapterSidebar.css';

const ChapterSidebar = ({ 
  chapters = [], 
  onChapterSelect = () => {}, 
  activeChapterId,
  currentCourse,
  onClose = () => {}
}) => {
  return (
    <div className="chapter-sidebar">
      <div className="chapter-sidebar-header">
        <h3>{currentCourse?.title || 'Chapters'}</h3>
        <button 
          className="close-chapter-sidebar"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          ✕
        </button>
      </div>
      
      <div className="chapters-list">
        {chapters.length === 0 ? (
          <p className="empty-message">No chapters available</p>
        ) : (
          chapters.map((chapter) => (
            <button
              key={chapter.id}
              className={`chapter-item ${activeChapterId === chapter.id ? 'active' : ''}`}
              onClick={() => onChapterSelect(chapter.id)}
              aria-current={activeChapterId === chapter.id ? 'page' : null}
            >
              <span className="chapter-number">
                {String(chapter.id + 1).padStart(2, '0')}
              </span>
              <span className="chapter-title">
                {chapter.title}
              </span>
              {chapter.isPremium && (
                <span className="premium-badge" aria-label="Premium content">
                  Premium
                </span>
              )}
            </button>
          ))
        )}
      </div>
      
      <div className="chapter-sidebar-footer">
        <div className="chapter-progress">
          <span className="progress-text">
            Chapter {activeChapterId + 1} of {chapters.length}
          </span>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((activeChapterId + 1) / chapters.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ChapterSidebar.propTypes = {
  chapters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      isPremium: PropTypes.bool
    })
  ),
  onChapterSelect: PropTypes.func,
  activeChapterId: PropTypes.number,
  currentCourse: PropTypes.shape({
    title: PropTypes.string.isRequired
  }),
  onClose: PropTypes.func
};

export default ChapterSidebar;