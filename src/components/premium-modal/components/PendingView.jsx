import React from 'react';
import PropTypes from 'prop-types'; // Add this import
import '../styles/PendingView.css';

const PendingView = ({ department, bank, amount, transactionId }) => {
  // Provide default values to prevent undefined errors
  const departmentName = department?.name || 'Unknown Department';
  const bankName = bank?.name || 'Unknown Bank';
  const displayAmount = amount || '₹499';
  const displayTransactionId = transactionId || 'Not provided';

  return (
    <div className="pending-view">
      <div className="spinner-container">
        <div className="spinner" aria-label="Loading"></div>
      </div>
      
      <h3>Payment Verification in Progress</h3>
      <p>Your payment is being verified by our team. This usually takes less than 24 hours.</p>
      
      <div className="verification-details">
        <h4>Verification Details:</h4>
        <div className="detail-item">
          <span>Department:</span>
          <strong>{departmentName}</strong>
        </div>
        <div className="detail-item">
          <span>Payment Method:</span>
          <strong>{bankName}</strong>
        </div>
        <div className="detail-item">
          <span>Amount:</span>
          <strong>{displayAmount}</strong>
        </div>
        <div className="detail-item">
          <span>Transaction ID:</span>
          <code>{displayTransactionId}</code>
        </div>
      </div>
      
      <div className="whats-next">
        <h4>What happens next?</h4>
        <ol>
          <li>Our admin team reviews your payment proof</li>
          <li>Transaction ID is verified with the bank</li>
          <li>Upon successful verification, you'll get access</li>
          <li>You'll receive a confirmation email</li>
        </ol>
      </div>
    </div>
  );
};

// Add PropTypes validation
PendingView.propTypes = {
  department: PropTypes.shape({
    name: PropTypes.string,
    examCount: PropTypes.number,
    color: PropTypes.string,
    price: PropTypes.string
  }),
  bank: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    icon: PropTypes.string,
    color: PropTypes.string
  }),
  amount: PropTypes.string,
  transactionId: PropTypes.string
};

// Add default props
PendingView.defaultProps = {
  department: {
    name: 'Unknown Department',
    examCount: 0,
    color: '#3b82f6',
    price: '₹499'
  },
  bank: {
    name: 'Unknown Bank',
    id: 0,
    icon: '🏦',
    color: '#666666'
  },
  amount: '₹499',
  transactionId: ''
};

export default PendingView;