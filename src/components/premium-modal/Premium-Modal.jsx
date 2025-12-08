import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Premium-Modal.css';
import PremiumHeader from './components/PremiumHeader';
import PaymentInfo from './components/PaymentInfoSection';
import DepartmentSelection from './components/DepartmentSelection';
import FeaturesSection from './components/FeaturesSection';
import PremiumFooter from './components/PremiumFooter';
import PendingView from './components/PendingView';
import SuccessView from './components/SuccessView';
import Submitproof from './components/SubmitProof';
import BankSelection from './components/BankSelection';

const PremiumModal = ({onClose}) => {
  // State to manage which view to show
  const [currentView, setCurrentView] = useState('main'); // 'main', 'bankSelection', 'submitProof', 'pending', 'success'
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);
  const [transactionId, setTransactionId] = useState('');
  const [submissionData, setSubmissionData] = useState(null); // Store submission data

  // Handle department selection
  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department);
    setCurrentView('bankSelection');
  };

  // Handle bank selection
  const handleBankSelect = (bank) => {
    setSelectedBank(bank);
    setCurrentView('submitProof');
  };

  // Handle proof submission - IMMEDIATELY show PendingView
  const handleProofSubmit = (paymentData) => {
    console.log('✅ Payment submitted, showing PendingView:', paymentData);
    
    // Store the submission data
    setSubmissionData(paymentData);
    
    // IMMEDIATELY switch to pending view
    setCurrentView('pending');
    
    // Simulate API call/verification (optional - can be handled elsewhere)
    setTimeout(() => {
      setCurrentView('success');
    }, 5000); // 5 seconds for demo
  };

  // Handle back navigation
  const handleBack = () => {
    if (currentView === 'bankSelection') {
      setCurrentView('main');
      setSelectedDepartment(null);
    } else if (currentView === 'submitProof') {
      setCurrentView('bankSelection');
      setSelectedBank(null);
    } else if (currentView === 'pending' || currentView === 'success') {
      setCurrentView('main');
      setSelectedDepartment(null);
      setSelectedBank(null);
      setTransactionId('');
      setSubmissionData(null);
    }
  };

  // Get display data - use submissionData if available, otherwise use state
  const getDisplayData = () => {
    if (submissionData) {
      return {
        department: { name: submissionData.department },
        bank: { name: submissionData.bank },
        amount: submissionData.amount,
        transactionId: submissionData.transactionId
      };
    }
    
    return {
      department: selectedDepartment,
      bank: selectedBank,
      amount: '₹499',
      transactionId: transactionId
    };
  };

  // Render different views based on currentView state
  const renderView = () => {
    const displayData = getDisplayData();
    
    switch (currentView) {
      case 'bankSelection':
        return (
          <>
            <PremiumHeader 
              title="Select Payment Method"
              showBackButton={true}
              onBack={handleBack}
            />
            <BankSelection 
              onBankSelect={handleBankSelect}
              amount="₹499"
            />
            <PremiumFooter />
          </>
        );

      case 'submitProof':
        return (
          <>
            <PremiumHeader 
              title="Submit Payment Proof"
              showBackButton={true}
              onBack={handleBack}
            />
            <Submitproof 
              department={selectedDepartment}
              bank={selectedBank}
              amount="₹499"
              transactionId={transactionId}
              onTransactionIdChange={setTransactionId}
              onSubmit={handleProofSubmit} // This triggers PendingView
            />
            <PremiumFooter />
          </>
        );

      case 'pending':
        return (
          <>
            <PremiumHeader 
              title="Payment Verification"
              showBackButton={true}
              onBack={handleBack}
            />
            <PendingView 
              department={displayData.department}
              bank={displayData.bank}
              amount={displayData.amount}
              transactionId={displayData.transactionId}
            />
            <PremiumFooter />
          </>
        );

      case 'success':
        return (
          <>
            <PremiumHeader 
              title="Payment Successful!"
              showBackButton={true}
              onBack={handleBack}
            />
            <SuccessView 
              department={displayData.department}
              bank={displayData.bank}
              amount={displayData.amount}
              transactionId={displayData.transactionId}
            />
            <PremiumFooter />
          </>
        );

      default: // 'main' view
        return (
          <>
            <PremiumHeader 
              title="Unlock All Department Exams"
              description="Get lifetime access to premium question banks and exclusive features"
            />
            <PaymentInfo 
              amount="₹499"
              type="One-time payment"
              description="Unlock all department exams with a single payment. No recurring fees."
            />
            <DepartmentSelection 
              onDepartmentSelect={handleDepartmentSelect}
            />
            <FeaturesSection />
            <PremiumFooter />
          </>
        );
    }
  };

  return (
    <div className="premium-overlay">
      <div className="premium-modal">
        <button 
          className="close-button" 
          onClick={() => {
            console.log('✅ MODAL: Close button clicked');
            onClose();
          }}
        >
          ×
        </button>        
        <div className="modal-content-wrapper">
          {renderView()}
        </div>
      </div>
    </div>
  );
};

PremiumModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default PremiumModal;