import React from 'react';
import PropTypes from 'prop-types';

const FeaturesSection = ({ features }) => {
  // Add safety check - ensure features is an array
  const safeFeatures = Array.isArray(features) ? features : [];

  return (
    <div className="features-section">
      <h3>✨ Premium Features</h3>
      
      {safeFeatures.length === 0 ? (
        <p className="no-features">No features available at the moment.</p>
      ) : (
        <div className="features-grid">
          {safeFeatures.map((feature) => {
            // Create a unique key using feature properties
            const uniqueKey = `feature-${feature.title?.replaceAll(/\s+/g, '-').toLowerCase() || feature.icon || Math.random().toString(36).substr(2, 9)}`;
            
            return (
              <div key={uniqueKey} className="feature-card">
                <div className="feature-icon">
                  {feature.icon || '✅'}
                </div>
                <h4>{feature.title || 'Premium Feature'}</h4>
                <p>{feature.description || 'No description available'}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Define PropTypes with safety
FeaturesSection.propTypes = {
  features: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Add id prop
      title: PropTypes.string,
      description: PropTypes.string,
      icon: PropTypes.string
    })
  )
};

// Provide default props with unique IDs
FeaturesSection.defaultProps = {
  features: [
    {
      id: 'feature-1',
      title: 'Unlimited Exams',
      description: 'Access all premium exams and question banks',
      icon: '📝'
    },
    {
      id: 'feature-2',
      title: 'Video Solutions',
      description: 'Step-by-step video explanations for every question',
      icon: '🎥'
    },
    {
      id: 'feature-3',
      title: 'Progress Tracking',
      description: 'Track your performance with detailed analytics',
      icon: '📊'
    },
    {
      id: 'feature-4',
      title: '24/7 Support',
      description: 'Get help from experts whenever you need it',
      icon: '🛟'
    }
  ]
};

export default FeaturesSection;