import React from 'react';
import PropTypes from 'prop-types';

const FileUploader = ({ onFileSelect, file, uploadProgress, onPreview }) => {
  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (!validTypes.includes(selectedFile.type)) {
        alert('Please select a valid file (JPG, PNG, or PDF)');
        return;
      }
      
      if (selectedFile.size > maxSize) {
        alert('File size must be less than 5MB');
        return;
      }
      
      onFileSelect(selectedFile);
    }
  };

  return (
    <div className="file-uploader">
      <div className="screenshot-button-container">
        <button
          type="button"
          className="screenshot-btn"
          onClick={() => document.getElementById('receiptFile').click()}
        >
          <span className="btn-icon">📸</span>
          <span className="btn-text">Take Screenshot or Upload</span>
          <span className="btn-subtext">Click to capture or select file</span>
        </button>

        <input
          id="receiptFile"
          type="file"
          accept=".jpg,.jpeg,.png,.pdf,image/*"
          capture="environment"
          onChange={handleFileSelect}
          className="file-input-hidden"
        />
      </div>

      {file && (
        <div className="file-preview-section">
          <div className="preview-header">
            <h6>Uploaded Screenshot:</h6>
            <button 
              type="button"
              className="change-file-btn"
              onClick={() => document.getElementById('receiptFile').click()}
            >
              Change
            </button>
          </div>
          
          <div className="file-preview">
            <div className="preview-content">
              {file.type.startsWith('image/') ? (
                <div className="image-preview">
                  <img 
                    src={URL.createObjectURL(file)} 
                    alt="Receipt preview" 
                    className="preview-image"
                  />
                  <div className="preview-overlay">
                    <button
                      type="button"
                      className="view-image-btn"
                      onClick={onPreview}
                    >
                      <span className="preview-icon">👁️</span>
                      <span>View Full Size</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="file-info">
                  <span className="file-icon">📄</span>
                  <div className="file-details">
                    <span className="file-name">{file.name}</span>
                    <span className="file-size">
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            <button 
              type="button"
              className="remove-file-btn"
              onClick={() => onFileSelect(null)}
            >
              Remove File
            </button>
          </div>
        </div>
      )}

      {uploadProgress > 0 && (
        <div className="upload-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <span className="progress-text">
            {uploadProgress === 100 ? 'Processing...' : `${uploadProgress}% Uploaded`}
          </span>
        </div>
      )}
    </div>
  );
};

FileUploader.propTypes = {
  onFileSelect: PropTypes.func.isRequired,
  file: PropTypes.object,
  uploadProgress: PropTypes.number,
  onPreview: PropTypes.func,
};

export default FileUploader;