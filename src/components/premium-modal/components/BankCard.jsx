import React from 'react';
import PropTypes from 'prop-types';

const BankCard = ({ bank, onSelect }) => {
  return (
    <button
      className="bank-card"
      onClick={() => onSelect(bank)}
      type="button"
      style={{ borderColor: bank.color }}
    >
      <div className="bank-header">
        <div className="bank-icon" style={{ color: bank.color }}>
          {bank.icon}
        </div>
        <div className="bank-info">
          <h4>{bank.name}</h4>
          <p>{bank.description}</p>
        </div>
      </div>
      
      <div className="bank-details">
        <div className="bank-account">
          <span className="account-label">Send to:</span>
          <span className="account-number">{bank.accountInfo}</span>
        </div>
        
        <div className="bank-steps">
          <h5>Payment Steps:</h5>
          <ol className="steps-list">
            {bank.steps.map((step, index) => (
              <li key={`${bank.id}-step-${index + 1}`}>{step}</li>
            ))}
          </ol>
        </div>
      </div>

      <div className="bank-action">
        <span className="select-bank-btn">Select & Pay</span>
      </div>
    </button>
  );
};

BankCard.propTypes = {
  bank: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default BankCard;