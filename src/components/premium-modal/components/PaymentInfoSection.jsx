import React from 'react';

const PaymentInfoSection = () => {
  return (
    <div className="payment-info-section"
    >
      <div className="payment-badge">
        <span className="payment-icon">💰</span>
        <div className="payment-info">
          <div className="payment-amount">100 ETB</div>
          <div className="payment-type">Per Department</div>
        </div>
      </div>
      <div className="payment-description">
        <p>Manual approval process: Submit payment proof for admin verification</p>
      </div>
    </div>
  );
};

export default PaymentInfoSection;