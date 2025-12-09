// components/FixedToggle.jsx - Updated with dynamic class
import PropTypes from 'prop-types';
import '../styles/FixedToggle.css';

const FixedToggle = ({ isOpen, onClick }) => {
  return (
    <button 
      className={`fixed-toggle ${isOpen ? 'open' : ''}`}
      onClick={onClick}
      aria-label={isOpen ? "Hide sidebar" : "Show sidebar"}
      title={isOpen ? "Hide Chapters" : "Show Chapters"}
    >
      <span className="toggle-icon">
        <span></span>
        <span></span>
        <span></span>
      </span>
    </button>
  );
};

FixedToggle.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default FixedToggle;