import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/Sidebar.css';

const Sidebar = ({ activeChapter, currentCourse }) => {
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [isFeedbackSent, setIsFeedbackSent] = useState(false);

  const handleAskAI = async () => {
    if (!aiQuestion.trim()) return;

    setIsAiTyping(true);
    setAiResponse('');

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        `Based on Chapter ${activeChapter + 1} "${currentCourse.chapters[activeChapter]?.title}", the key concept you're asking about is covered in detail. The main points are...`,
        `Great question! In this chapter, we focus on ${currentCourse.chapters[activeChapter]?.title}. The answer relates to...`,
        `I'd be happy to explain! This chapter discusses ${currentCourse.chapters[activeChapter]?.title}. To answer your question...`
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setAiResponse(randomResponse);
      setIsAiTyping(false);
    }, 2000);
  };

  const handleSendFeedback = () => {
    if (!feedback.trim()) return;

    console.log('Feedback sent:', { feedback, rating });
    setIsFeedbackSent(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsFeedbackSent(false);
      setFeedback('');
      setRating(0);
    }, 3000);
  };

  const handleStarClick = (starCount) => {
    setRating(starCount);
  };

  const progressPercentage = ((activeChapter + 1) / currentCourse.chapters.length) * 100;

  return (
    <div className="div3 sidebar">
      <h3>AI Study Assistant</h3>
      <div className="sidebar-items">
        {/* AI Search Section */}
        <div className={`sidebar-item ai-search ${isAiTyping ? 'loading' : ''}`}>
          <h4>🔍 Ask AI Assistant</h4>
          <div className="search-area">
            <textarea 
              placeholder="Ask any question about the course content..."
              rows="3"
              className="question-input"
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleAskAI()}
            />
            <button 
              className="ask-ai-btn"
              onClick={handleAskAI}
              disabled={isAiTyping || !aiQuestion.trim()}
            >
              {isAiTyping ? 'Thinking...' : 'Ask AI'}
            </button>
          </div>
        </div>

            {/* AI Response Section */}
        <div className={`sidebar-item ai-response ${isAiTyping ? 'typing' : ''}`}>
          <h4>🤖 AI Response</h4>
          <div className="response-area">
            {(() => {
              if (aiResponse) {
                return (
                  <div style={{ fontSize: '0.75rem', lineHeight: '1.4', color: '#374151' }}>
                    {aiResponse}
                  </div>
                );
              } else if (isAiTyping) {
                return (
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', textAlign: 'center' }}>
                    AI is thinking...
                  </div>
                );
              } else {
                return (
                  <div className="response-placeholder">
                    <p>Ask a question to get an AI-powered explanation</p>
                  </div>
                );
              }
            })()}
          </div>
        </div>

        {/* Progress Section */}
        <div className="sidebar-item progress">
          <h4>📊 Your Progress</h4>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{width: `${progressPercentage}%`}}
            ></div>
          </div>
          <p>{activeChapter + 1} of {currentCourse.chapters.length} chapters completed</p>
          <div style={{ 
            fontSize: '0.7rem', 
            color: '#6b7280', 
            textAlign: 'center',
            marginTop: '0.25rem'
          }}>
            {Math.round(progressPercentage)}% complete
          </div>
        </div>

        {/* Feedback Section */}
        <div className={`sidebar-item feedback ${isFeedbackSent ? 'success' : ''}`}>
          <h4>💬 Feedback & Support</h4>
          <div className="feedback-area">
            <textarea 
              placeholder="Share your feedback, report issues, or suggest improvements..."
              rows="3"
              className="feedback-input"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              disabled={isFeedbackSent}
            />
            <div className="feedback-actions">
              <button 
                className="feedback-btn"
                onClick={handleSendFeedback}
                disabled={isFeedbackSent || !feedback.trim()}
              >
                {isFeedbackSent ? '✓ Sent!' : 'Send Feedback'}
              </button>
              <div className="rating">
                <span>Rate this chapter:</span>
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star}
                      className={`star-btn ${rating >= star ? 'active' : ''}`}
                      onClick={() => handleStarClick(star)}
                      disabled={isFeedbackSent}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  activeChapter: PropTypes.number.isRequired,
  currentCourse: PropTypes.shape({
    title: PropTypes.string.isRequired,
    chapters: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        isFree: PropTypes.bool.isRequired
      })
    ).isRequired
  }).isRequired
};

export default Sidebar;