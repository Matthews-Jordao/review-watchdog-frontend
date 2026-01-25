import React, { useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { register } from '../../../utils/auth';
import './RegisterModal.css';

const RegisterModal = ({ isOpen, onRegister, onLogin, onClose, isLoading = false }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    onLogin(formData);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setLoading(true);
    setGeneralError('');
    try {
      // For demo, use a placeholder name or add a name field to the form
      const name = formData.name || 'New User';
      await register(name, formData.email, formData.password);
      onRegister({ email: formData.email });
      resetForm();
    } catch (err) {
      setGeneralError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
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
    <div className="register-modal__buttons">
      <button 
        type="button" 
        className="modal__submit register-modal__register-btn" 
        disabled={!isFormValid || loading}
        onClick={handleRegister}
      >
        {loading ? 'Creating...' : 'Register'}
      </button>
      <button
        type="button"
        className="modal__submit register-modal__signin-btn"
        disabled={!isFormValid || loading}
        onClick={handleSubmit}
      >
        {loading ? 'Signing in...' : 'Sign in'}
      </button>
    </div>
  );

  return (
    <ModalWithForm
      title="Sign in or Create an Account"
      name="register"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={() => {}} // Handled by individual buttons
      footerContent={footerContent}
    >
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

      <div className="register-modal__checkbox-group">
        <label className="register-modal__checkbox-label">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            className="register-modal__checkbox"
          />
          <span className="register-modal__checkbox-text">
            <div className="register-modal__label-text">Label</div>
            <div className="register-modal__description-text">Description</div>
          </span>
        </label>
      </div>

      {generalError && (
        <div className="modal__error" style={{ marginBottom: 12 }}>{generalError}</div>
      )}
    </ModalWithForm>
  );
};

export default RegisterModal;