// components/ChapterContent.jsx - Fixed version
import PropTypes from 'prop-types';
import '../styles/ChapterContent.css';

const ChapterLayout = ({ 
  chapters = [], 
  onChapterSelect = () => {}, 
  activeChapterId,
  children
}) => {
  const currentChapter = chapters[activeChapterId];
  
  return (
    <div className="chapter-layout">
      {/* Main content */}
      <main className="content-area">
        <div className="content-body">
          {children || (
            currentChapter ? (
              <div className="chapter-content">
                <div className="content-text">
                  {typeof currentChapter.content === 'string' 
                    ? currentChapter.content.split('\n').map((line) => (
                      // Using content hash for key instead of array index
                      <p key={`${currentChapter.id}-${line.slice(0, 20).replaceAll(/\s/g, '-')}`}>
                        {line}
                      </p>
                    ))
                    : currentChapter.content
                  }
                </div>
              </div>
            ) : (
              <div className="no-content">
                <p>Select a chapter to view content</p>
              </div>
            )
          )}
          
          {/* Navigation buttons */}
          <div className="chapter-navigation">
            <button
              className="nav-btn prev"
              onClick={() => onChapterSelect(Math.max(0, activeChapterId - 1))}
              disabled={activeChapterId === 0}
              aria-label="Previous chapter"
            >
              ← Previous Chapter
            </button>
            <button
              className="nav-btn next"
              onClick={() => onChapterSelect(Math.min(chapters.length - 1, activeChapterId + 1))}
              disabled={activeChapterId === chapters.length - 1}
              aria-label="Next chapter"
            >
              Next Chapter →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

ChapterLayout.propTypes = {
  chapters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      isPremium: PropTypes.bool
    })
  ).isRequired,
  onChapterSelect: PropTypes.func.isRequired,
  activeChapterId: PropTypes.number.isRequired,
  children: PropTypes.node
};

export default ChapterLayout;