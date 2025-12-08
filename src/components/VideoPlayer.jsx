import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const VideoPlayer = ({ video, onClose, onComplete }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    const videoElement = videoRef.current;
    
    const updateTime = () => setCurrentTime(videoElement.currentTime);
    const updateDuration = () => setDuration(videoElement.duration);
    const handleVideoEnd = () => {
      setIsPlaying(false);
      if (onComplete) onComplete();
    };
    
    videoElement.addEventListener('timeupdate', updateTime);
    videoElement.addEventListener('loadedmetadata', updateDuration);
    videoElement.addEventListener('ended', handleVideoEnd);
    
    return () => {
      videoElement.removeEventListener('timeupdate', updateTime);
      videoElement.removeEventListener('loadedmetadata', updateDuration);
      videoElement.removeEventListener('ended', handleVideoEnd);
    };
  }, [onComplete]);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (e) => {
    const newTime = Number.parseFloat(e.target.value);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handlePlaybackRateChange = (rate) => {
    videoRef.current.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="video-player-modal">
      <div className="video-player-container">
        <div className="video-player-header">
          <h3>{video.title}</h3>
          <button 
            className="close-video-btn"
            onClick={onClose}
            aria-label="Close video player"
          >
            ×
          </button>
        </div>
        
        <div className="video-wrapper">
          <video
            ref={videoRef}
            controls={false}
            className="custom-video-player"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src={video.url} type="video/mp4" />
            <track
              kind="captions"
              srcLang="en"
              src=""
              label="No captions available"
            />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="video-controls">
          <div className="control-group">
            <button 
              className="control-btn"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? '⏸️' : '▶️'}
            </button>
            
            <div className="time-display">
              <span>{formatTime(currentTime)}</span>
              <span>/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="progress-container">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="progress-bar"
              aria-label="Video progress"
            />
          </div>

          <div className="control-group">
            <select 
              value={playbackRate}
              onChange={(e) => handlePlaybackRateChange(Number.parseFloat(e.target.value))}
              className="playback-rate-select"
              aria-label="Playback speed"
            >
              <option value="0.5">0.5x</option>
              <option value="0.75">0.75x</option>
              <option value="1">1x</option>
              <option value="1.25">1.25x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2x</option>
            </select>
            
            <button 
              className="control-btn"
              onClick={() => videoRef.current.requestFullscreen()}
              aria-label="Enter fullscreen"
            >
              ⛶
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

VideoPlayer.propTypes = {
  video: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onComplete: PropTypes.func
};

export default VideoPlayer;