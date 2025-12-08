import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/SubmitProof.css';

const SubmitProof = ({ 
  department, 
  bank, 
  amount, 
  transactionId, 
  onTransactionIdChange, 
  onSubmit 
}) => {
  const [screenshot, setScreenshot] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setScreenshot(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadAreaClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleUploadAreaKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleUploadAreaClick();
    }
  };

  const handleChangeImage = (e) => {
    e.stopPropagation();
    setScreenshot(null);
    setPreview(null);
  };

  const handleSubmit = async () => {
    if (!transactionId?.trim()) {
      alert('Please enter Transaction ID');
      return;
    }
    if (!screenshot) {
      alert('Please upload payment screenshot');
      return;
    }
    
    // Set loading state
    setIsSubmitting(true);
    
    // Prepare data for admin
    const paymentData = {
      department: department?.name,
      bank: bank?.name,
      amount,
      transactionId,
      screenshot,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };
    
    console.log('📤 Submitting payment proof:', paymentData);
    
    // Simulate API call (optional - you can remove this)
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Call parent onSubmit which will switch to PendingView
    onSubmit(paymentData);
    
    // Reset loading state (though component will unmount)
    setIsSubmitting(false);
  };

  return (
    <div className="submit-proof">
      <div className="payment-details-card">
        <h4>Payment Details</h4>
        <div className="details-grid">
          <div className="detail-item">
            <span className="label">Department:</span>
            <span className="value">{department?.name || 'N/A'}</span>
          </div>
          <div className="detail-item">
            <span className="label">Payment Method:</span>
            <span className="value">{bank?.name || 'N/A'}</span>
          </div>
          <div className="detail-item">
            <span className="label">Amount:</span>
            <span className="value amount">{amount}</span>
          </div>
          <div className="detail-item">
            <span className="label">Status:</span>
            <span className="value pending">Ready for Submission</span>
          </div>
        </div>
      </div>

      <div className="proof-section">
        <div className="input-group">
          <label htmlFor="transactionId">Transaction ID / Reference Number *</label>
          <input
            type="text"
            id="transactionId"
            placeholder="Enter transaction ID from your payment"
            value={transactionId}
            onChange={(e) => onTransactionIdChange(e.target.value)}
            required
            disabled={isSubmitting}
          />
          <small className="hint">Find this in your payment confirmation message</small>
        </div>

        <div className="upload-section">
          <label htmlFor="fileInput">Payment Screenshot / Proof *</label>
          <div 
            className={`upload-area ${isSubmitting ? 'disabled' : ''}`}
            onClick={isSubmitting ? undefined : handleUploadAreaClick}
            onKeyDown={isSubmitting ? undefined : handleUploadAreaKeyDown}
            role="button"
            tabIndex={isSubmitting ? -1 : 0}
            aria-label={isSubmitting ? "Upload disabled" : "Upload payment screenshot"}
            aria-disabled={isSubmitting}
          >
            {preview ? (
              <div className="preview-container">
                <img src={preview} alt="Payment proof preview" className="screenshot-preview" />
                {!isSubmitting && (
                  <button 
                    className="change-btn"
                    onClick={handleChangeImage}
                    type="button"
                    aria-label="Change image"
                    disabled={isSubmitting}
                  >
                    Change Image
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="upload-icon" aria-hidden="true">📤</div>
                <p>{isSubmitting ? 'Submitting...' : 'Click to upload payment screenshot'}</p>
                <small>Supported: JPG, PNG (Max 5MB)</small>
              </>
            )}
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleFileUpload}
              hidden
              disabled={isSubmitting}
              aria-label="Payment screenshot upload"
            />
          </div>
        </div>

        <div className="instructions">
          <h5>📸 How to take a good screenshot:</h5>
          <ul>
            <li>Capture the entire payment confirmation screen</li>
            <li>Make sure transaction ID is visible</li>
            <li>Include date and time in the screenshot</li>
            <li>Blur any sensitive personal information</li>
          </ul>
        </div>

        <button 
          className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
          onClick={handleSubmit}
          type="button"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner-small"></span>Submitting ...
              
            </>
          ) : (
            'Submit for Verification'
          )}
        </button>

        <div className="verification-note">
          <p>✅ Our team will verify your payment within 24 hours</p>
          <p>📧 You'll receive a confirmation once verified</p>
        </div>
      </div>
    </div>
  );
};

SubmitProof.propTypes = {
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
  transactionId: PropTypes.string,
  onTransactionIdChange: PropTypes.func,
  onSubmit: PropTypes.func
};

SubmitProof.defaultProps = {
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
  transactionId: '',
  onTransactionIdChange: () => {},
  onSubmit: () => {}
};

export default SubmitProof;