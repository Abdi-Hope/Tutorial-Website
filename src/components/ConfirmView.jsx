import React from 'react';
import PropTypes from 'prop-types';
import PremiumHeader from './premium-modal/PremiumHeader';

const ConfirmView = ({ department, onConfirm, onBack }) => {
  return (
    <div className="view-section">
      <PremiumHeader
        title="Confirm Your Purchase"
        description="Review your selected exam category and proceed to payment"
        showBackButton={true}
        onBack={onBack}
      />

      <div className="confirmation-section">
        <div className="selected-department">
          <div 
            className="department-color-large" 
            style={{ backgroundColor: department.color }}
          ></div>
          <div className="department-details">
            <h3>{department.name}</h3>
            <div className="department-stats">
              <span className="stat">
                <strong>{department.exams}</strong> exams
              </span>
              <span className="stat">
                <strong>{department.courses.length}</strong> courses
              </span>
            </div>
            <div className="courses-list">
              <h4>Courses Included:</h4>
              <div className="courses-grid">
                {department.courses.map((course) => (
                  <span key={course.id} className="course-item">{course.name}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="payment-summary">
          <div className="payment-breakdown">
            <div className="payment-item">
              <span>{department.name} Exam Access</span>
              <span>100 ETB</span>
            </div>
            <div className="payment-total">
              <span>Total</span>
              <span className="total-amount">100 ETB</span>
            </div>
          </div>
        </div>

        <div className="payment-actions">
          <button 
            className="primary-payment-btn"
            onClick={onConfirm}
            type="button"
          >
            <span className="btn-icon">💰</span>
            Pay 100 ETB - Unlock {department.name}
          </button>
          
          <button 
            className="secondary-payment-btn"
            onClick={onBack}
            type="button"
          >
            Choose Different Category
          </button>
        </div>
      </div>
    </div>
  );
};

ConfirmView.propTypes = {
  department: PropTypes.object.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default ConfirmView;