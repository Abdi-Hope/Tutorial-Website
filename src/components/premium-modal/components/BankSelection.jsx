import React from 'react';
import PropTypes from 'prop-types'; // ADD THIS IMPORT
import '../styles/BankSelection.css';

const BankSelection = ({ onBankSelect, amount }) => {
  const banks = [
    { id: 1, name: 'Khalti', icon: '🏦', color: '#5B2C90' },
    { id: 2, name: 'esewa', icon: '💰', color: '#2D5B2C' },
    { id: 3, name: 'IME Pay', icon: '💳', color: '#0066CC' },
    { id: 4, name: 'Bank Transfer', icon: '🏛️', color: '#333333' },
    { id: 5, name: 'Connect IPS', icon: '🔗', color: '#FF6B00' },
    { id: 6, name: 'Other', icon: '📱', color: '#666666' },
  ];

  const handleBankClick = (bank) => {
    if (onBankSelect) {
      onBankSelect(bank);
    }
  };

  const handleKeyDown = (e, bank) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleBankClick(bank);
    }
  };

  return (
    <div className="bank-selection">
      <div className="payment-summary">
        <h4>Payment Summary</h4>
        <div className="summary-details">
          <div className="summary-row">
            <span>Amount to Pay:</span>
            <span className="amount">{amount}</span>
          </div>
          <div className="summary-row">
            <span>Payment Type:</span>
            <span>One-time payment</span>
          </div>
        </div>
      </div>

      <div className="banks-grid">
        {banks.map((bank) => (
          <div
            key={bank.id}
            className="bank-card"
            onClick={() => handleBankClick(bank)}
            onKeyDown={(e) => handleKeyDown(e, bank)}
            role="button"
            tabIndex={0}
            aria-label={`Select ${bank.name} as payment method`}
            style={{ borderLeftColor: bank.color }}
          >
            <div className="bank-icon">{bank.icon}</div>
            <div className="bank-name">{bank.name}</div>
            <div className="bank-select" aria-hidden="true">→</div>
          </div>
        ))}
      </div>

      <div className="payment-instructions">
        <h4>📝 Payment Instructions:</h4>
        <ol>
          <li>Select your preferred payment method</li>
          <li>Complete the transaction in your banking app</li>
          <li>Take a screenshot of the payment confirmation</li>
          <li>Upload the screenshot in the next step</li>
          <li>Our team will verify within 24 hours</li>
        </ol>
      </div>
    </div>
  );
};

// ADD PROP TYPES VALIDATION
BankSelection.propTypes = {
  onBankSelect: PropTypes.func.isRequired,
  amount: PropTypes.string
};

// ADD DEFAULT PROPS (optional)
BankSelection.defaultProps = {
  amount: '₹499'
};

export default BankSelection;