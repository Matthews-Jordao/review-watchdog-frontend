import React, { useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { register } from '../../../utils/auth';
import './RegisterModal.css';

const RegisterModal = ({ isOpen, onRegister, onLogin, onClose, isLoading = false }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');

  const isFormValid = formData.username.trim() && formData.email.trim() && formData.password.trim();

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


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setLoading(true);
    setGeneralError('');
    try {
      await register(formData.username, formData.email, formData.password);
      onRegister({ username: formData.username, email: formData.email });
      resetForm();
    } catch (err) {
      setGeneralError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      username: '',
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
        type="submit" 
        className="modal__submit" 
        disabled={!isFormValid || loading}
      >
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>
      <button
        type="button"
        className="modal__redirect-btn"
        onClick={onLogin}
      >
        Already have an account? Sign In
      </button>
    </div>
  );

  return (
    <ModalWithForm
      title="Sign Up To Review Watchdog"
      name="register"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      footerContent={footerContent}
    >
      <div className="modal__input-group">
        <label className="modal__label" htmlFor="register-username">
          Username
        </label>
        <input
          className="modal__input"
          id="register-username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          placeholder="Value"
          required
        />
        {errors.username && <span className="modal__error">{errors.username}</span>}
      </div>

      <div className="modal__input-group">
        <label className="modal__label" htmlFor="register-email">
          Email
        </label>
        <input
          className="modal__input"
          id="register-email"
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
        <label className="modal__label" htmlFor="register-password">
          Password
        </label>
        <input
          className="modal__input"
          id="register-password"
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
          <span className="login-modal__checkbox-text">Keep Me Logged In</span>
        </label>
      </div>

      {generalError && (
        <div className="modal__error" style={{ marginBottom: 12 }}>{generalError}</div>
      )}
    </ModalWithForm>
  );
};

export default RegisterModal;