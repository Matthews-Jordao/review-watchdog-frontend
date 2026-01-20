import React, { useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import './LoginModal.css';

const LoginModal = ({ isOpen, onLogin, onRegister, onClose, isLoading = false }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({});

  const isFormValid = formData.email.trim() && formData.password.trim();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    onLogin(formData);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    onRegister(formData);
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      acceptTerms: false,
    });
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const footerContent = (
    <div className="login-modal__buttons">
      <button 
        type="button" 
        className="modal__submit login-modal__register-btn" 
        disabled={!isFormValid || isLoading}
        onClick={handleRegister}
      >
        {isLoading ? 'Creating...' : 'Register'}
      </button>
      <button
        type="button"
        className="modal__submit login-modal__signin-btn"
        disabled={!isFormValid || isLoading}
        onClick={handleSubmit}
      >
        {isLoading ? 'Signing in...' : 'Sign in'}
      </button>
    </div>
  );

  return (
    <ModalWithForm
      title="Sign in or Create an Account"
      name="login"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={() => {}} // Handled by individual buttons
      footerContent={footerContent}
    >
      <div className="modal__input-group">
        <label className="modal__label" htmlFor="login-email">
          Email
        </label>
        <input
          className="modal__input"
          id="login-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Value"
          required
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </div>

      <div className="modal__input-group">
        <label className="modal__label" htmlFor="login-password">
          Password
        </label>
        <input
          className="modal__input"
          id="login-password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Value"
          required
        />
        {errors.password && <span className="modal__error">{errors.password}</span>}
      </div>

      <div className="login-modal__checkbox-group">
        <label className="login-modal__checkbox-label">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            className="login-modal__checkbox"
          />
          <span className="login-modal__checkbox-text">
            <div className="login-modal__label-text">Label</div>
            <div className="login-modal__description-text">Description</div>
          </span>
        </label>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;