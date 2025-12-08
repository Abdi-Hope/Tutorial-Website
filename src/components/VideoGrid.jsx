import React from 'react';
import PropTypes from 'prop-types';
import InlineVideo from './InlineVideo';

const VideoGrid = ({ videos, onVideoPlay, completedVideos }) => {
  if (!videos || videos.length === 0) return null;

  return (
    <section className="videos-section" aria-labelledby="videos-heading">
      <h2 id="videos-heading">Chapter Videos</h2>
      <div className="videos-grid">
        {videos.map((video) => (
          <div key={video.id} className="video-card">
            <InlineVideo
              video={video}
              onPlay={onVideoPlay}
              isCompleted={completedVideos.has(video.id)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

VideoGrid.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      duration: PropTypes.string,
      description: PropTypes.string,
      url: PropTypes.string.isRequired
    })
  ),
  onVideoPlay: PropTypes.func.isRequired,
  completedVideos: PropTypes.instanceOf(Set)
};

VideoGrid.defaultProps = {
  videos: [],
  completedVideos: new Set()
};

export default VideoGrid;