import React from 'react';
import PropTypes from 'prop-types';
import '../styles/PremiumHeader.css';

const PremiumHeader = ({ 
  title, 
  description, 
  showBackButton = false, 
  onBack 
}) => {
  return (
    <div className="premium-header">
      {showBackButton && (
        <button className="back-button" onClick={() => onBack?.()}>  {/* Optional chaining */}
          ← Back
        </button>
      )}
      <div className="premium-badge">
        <span className="premium-star">⭐</span>PREMIUM ACCESS
        
      </div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
};

PremiumHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  showBackButton: PropTypes.bool,
  onBack: PropTypes.func
};

PremiumHeader.defaultProps = {
  description: '',
  showBackButton: false,
  onBack: () => {}
};

export default PremiumHeader;