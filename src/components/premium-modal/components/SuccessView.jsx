import React from 'react';
import PropTypes from 'prop-types';
import '../styles/SuccessView.css';

const SuccessView = ({ department, bank, amount }) => {
  return (
    <div className="success-section">
      <div className="success-icon">✅</div>
      <h2>Payment Verified Successfully!</h2>
      <p>Your payment of <strong>{amount}</strong> has been verified. You now have premium access.</p>
      
      <div className="payment-receipt">
        <div className="receipt-card">
          <h4>Payment Receipt</h4>
          <div className="receipt-details">
            <div className="receipt-item">
              <span>Department</span>
              <span>{department?.name}</span>  {/* Optional chaining */}
            </div>
            <div className="receipt-item">
              <span>Bank</span>
              <span>{bank?.name}</span>  {/* Optional chaining */}
            </div>
            <div className="receipt-item">
              <span>Amount Paid</span>
              <span>{amount}</span>
            </div>
            <div className="receipt-item">
              <span>Status</span>
              <span className="status-approved">APPROVED</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="success-details">
        <div className="success-card">
          <h3>🎉 What's Next?</h3>
          <ul className="success-steps">
            <li>📚 Access all question banks immediately</li>
            <li>📝 Download study materials</li>
            <li>🎯 Take unlimited practice tests</li>
            <li>📱 Access on all your devices</li>
          </ul>
        </div>
      </div>
      
      <div className="success-actions">
        <button className="primary-payment-btn">
          Start Learning Now
        </button>
      </div>
    </div>
  );
};

SuccessView.propTypes = {
  department: PropTypes.object,
  bank: PropTypes.object,
  amount: PropTypes.string.isRequired
};

SuccessView.defaultProps = {
  department: null,
  bank: null
};

export default SuccessView;