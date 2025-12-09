// Sidebar.jsx - Clean version
import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/Sidebar.css';
const Sidebar = ({ activeChapter, currentCourse }) => {
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAskAI = () => {
    if (!aiQuestion.trim()) return;
    
    setIsLoading(true);
    // Simulate AI response
    setTimeout(() => {
      setAiResponse(`AI response about "${currentCourse.chapters[activeChapter]?.title}": This is a simulated response. In a real app, this would connect to an AI API.`);
      setIsLoading(false);
    }, 1000);
  };

  const progress = currentCourse ? ((activeChapter + 1) / currentCourse.chapters.length) * 100 : 0;

  return (
    <div className="ai-sidebar">
      <h3>AI Assistant</h3>
      
      <div className="section">
        <h4>Ask AI</h4>
        <textarea
          placeholder="Ask about this chapter..."
          value={aiQuestion}
          onChange={(e) => setAiQuestion(e.target.value)}
          rows="3"
        />
        <button 
          onClick={handleAskAI}
          disabled={isLoading || !aiQuestion.trim()}
        >
          {isLoading ? 'Thinking...' : 'Ask AI'}
        </button>
      </div>

      <div className="section">
        <h4>AI Response</h4>
        <div className="response-box">
          {aiResponse || 'Ask a question to get started'}
        </div>
      </div>

      <div className="section">
        <h4>Progress</h4>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <p>Chapter {activeChapter + 1} of {currentCourse?.chapters.length}</p>
      </div>

      <div className="section">
        <h4>Feedback</h4>
        <textarea placeholder="Your feedback..." rows="2" />
        <button>Send Feedback</button>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  activeChapter: PropTypes.number.isRequired,
  currentCourse: PropTypes.shape({
    title: PropTypes.string.isRequired,
    chapters: PropTypes.array.isRequired
  }).isRequired
};

export default Sidebar;