import React from 'react';
import PropTypes from 'prop-types';

const InlineVideo = ({ video, onPlay, isCompleted }) => {
  return (
    <div className={`inline-video-card ${isCompleted ? 'completed' : ''}`}>
      <div className="inline-video-thumbnail">
        <button
          className="inline-video-play-btn"
          onClick={() => onPlay(video)}
          aria-label={`Play video: ${video.title}`}
        >
          <span className="play-icon">▶</span>
        </button>
        {isCompleted && (
          <div className="inline-completed-badge" aria-label="Video completed">
            ✓
          </div>
        )}
      </div>
      <div className="inline-video-info">
        <h4 className="inline-video-title">{video.title}</h4>
        <p className="inline-video-duration">{video.duration}</p>
        <p className="inline-video-description">{video.description}</p>
      </div>
    </div>
  );
};

InlineVideo.propTypes = {
  video: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    duration: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string.isRequired
  }).isRequired,
  onPlay: PropTypes.func.isRequired,
  isCompleted: PropTypes.bool
};

InlineVideo.defaultProps = {
  isCompleted: false
};

export default InlineVideo;