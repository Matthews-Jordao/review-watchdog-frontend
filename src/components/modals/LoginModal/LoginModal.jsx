import React, { useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { authorize } from '../../../utils/auth';
import './LoginModal.css';

const LoginModal = ({ isOpen, onLogin, onRegister, onClose, isLoading = false }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setLoading(true);
    setGeneralError('');
    try {
      const response = await authorize(formData.email, formData.password);
      onLogin({
        name: 'Demo User',
        email: 'demo@test.com',
        avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=3B7CD0&color=fff'
      });
      resetForm();
    } catch (err) {
      setGeneralError(err.message || 'Invalid credentials. Use demo@test.com / password123');
    } finally {
      setLoading(false);
    }
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
      {generalError && (
        <div className="modal__error" style={{ marginBottom: 12, textAlign: 'center', width: '100%' }}>{generalError}</div>
      )}
      <button
        type="button"
        className="modal__submit"
        disabled={!isFormValid || loading}
        onClick={handleSubmit}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <button
        type="button"
        className="modal__redirect-btn"
        onClick={onRegister}
      >
        Don’t Have an Account? Sign Up
      </button>
    </div>
  );

  return (
    <ModalWithForm
      title="Sign in or Create an Account"
      name="login"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={e => e.preventDefault()} // Prevent default form submit
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
          placeholder="Email"
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
          placeholder="Password"
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

      {/* Error now shown in footerContent below buttons */}
    </ModalWithForm>
  );
};

export default LoginModal;