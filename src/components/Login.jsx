import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/Login.css';

const Login = ({ user, onLoginSuccess, onLogout }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State to control modal visibility

  // Open/close modal functions
  const openLoginModal = () => {
    setIsOpen(true);
  };

  const closeLoginModal = () => {
    setIsOpen(false);
    setErrors({});
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  // If user is logged in, show logout button
  if (user?.isLoggedIn) {
    return (
      <div className="user-profile">
        <div className="user-info">
          <span className="user-name">{user.name}</span>
          <button onClick={onLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    );
  }

  // If modal is not open, show login button
  if (!isOpen) {
    return (
      <button onClick={openLoginModal} className="login-button-header">
        Login / Sign Up
      </button>
    );
  }

  // Original login form logic (unchanged, but now uses closeLoginModal)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would typically make an API call to your backend
      console.log(isLogin ? 'Logging in:' : 'Signing up:', formData);
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      
      // Call success callback and close modal
      if (onLoginSuccess) {
        onLoginSuccess({
          name: isLogin ? 'Demo User' : formData.name,
          email: formData.email,
          isLoggedIn: true
        });
      }
      
      closeLoginModal();
      
      // Show success message
      alert(`${isLogin ? 'Login' : 'Sign up'} successful!`);
      
    } catch (error) {
      console.error('Authentication error:', error);
      setErrors({ submit: 'Authentication failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  const handleDemoLogin = () => {
    setFormData({
      name: 'Demo User',
      email: 'demo@example.com',
      password: 'demo123',
      confirmPassword: 'demo123'
    });
  };

  const getButtonText = () => {
    if (isLoading) {
      return <span className="loading-spinner">Processing...</span>;
    }
    return isLogin ? 'Sign In' : 'Create Account';
  };

  // Login modal JSX
  return (
    <div className="login-overlay">
      <div className="login-container">
        <button 
          className="close-button" 
          onClick={closeLoginModal}
          aria-label="Close login"
        >
          ×
        </button>

        <div className="login-header">
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{isLogin ? 'Sign in to your account' : 'Join us today'}</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form" noValidate>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={errors.name ? 'error' : ''}
                placeholder="Enter your full name"
                disabled={isLoading}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email"
              disabled={isLoading}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={errors.password ? 'error' : ''}
              placeholder="Enter your password"
              disabled={isLoading}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={errors.confirmPassword ? 'error' : ''}
                placeholder="Confirm your password"
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>
          )}

          {isLogin && (
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#forgot-password" className="forgot-password">
                Forgot password?
              </a>
            </div>
          )}

          {errors.submit && (
            <div className="error-message submit-error">{errors.submit}</div>
          )}

          <button 
            type="submit" 
            className="submit-button"
            disabled={isLoading}
          >
            {getButtonText()}
          </button>

          <button 
            type="button" 
            className="demo-button"
            onClick={handleDemoLogin}
            disabled={isLoading}
          >
            Try Demo Credentials
          </button>
        </form>

        <div className="login-footer">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              type="button" 
              className="toggle-mode"
              onClick={toggleMode}
              disabled={isLoading}
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        <div className="social-login">
          <div className="divider">
            <span>Or continue with</span>
          </div>
          <div className="social-buttons">
            <button type="button" className="social-button google" disabled={isLoading}>
              Google
            </button>
            <button type="button" className="social-button facebook" disabled={isLoading}>
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    isLoggedIn: PropTypes.bool
  }),
  onLoginSuccess: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired
};

Login.defaultProps = {
  user: null
};

export default Login;