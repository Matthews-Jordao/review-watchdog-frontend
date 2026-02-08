import React, { useState, useEffect } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import './EditAccountModal.css';

const EditAccountModal = ({ 
  isOpen, 
  onUpdateAccount, 
  onClose, 
  currentUser = {}, 
  isLoading = false 
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [errors, setErrors] = useState({});

  // Populate form with current user data when modal opens
  useEffect(() => {
    if (isOpen && currentUser) {
      setFormData({
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        email: currentUser.email || '',
      });
    }
  }, [isOpen, currentUser]);

  const isFormValid = 
    formData.firstName.trim() &&
    formData.lastName.trim() &&
    formData.email.trim();

  const hasChanges = 
    formData.firstName !== (currentUser.firstName || '') ||
    formData.lastName !== (currentUser.lastName || '') ||
    formData.email !== (currentUser.email || '');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    if (!isFormValid || !hasChanges) return;

    onUpdateAccount(formData);
  };

  const resetForm = () => {
    setFormData({
      firstName: currentUser.firstName || '',
      lastName: currentUser.lastName || '',
      email: currentUser.email || '',
    });
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <ModalWithForm
      title="Edit Account"
      name="edit-account"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? 'Updating...' : 'Update Account'}
      disabled={!isFormValid || !hasChanges || isLoading}
    >
      <div className="edit-account-modal__name-row">
        <div className="modal__input-group">
          <label className="modal__label" htmlFor="edit-firstName">
            First Name
          </label>
          <input
            className="modal__input"
            id="edit-firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First name"
            required
          />
          {errors.firstName && <span className="modal__error">{errors.firstName}</span>}
        </div>

        <div className="modal__input-group">
          <label className="modal__label" htmlFor="edit-lastName">
            Last Name
          </label>
          <input
            className="modal__input"
            id="edit-lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last name"
            required
          />
          {errors.lastName && <span className="modal__error">{errors.lastName}</span>}
        </div>
      </div>

      <div className="modal__input-group">
        <label className="modal__label" htmlFor="edit-email">
          Email Address
        </label>
        <input
          className="modal__input"
          id="edit-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </div>

      <div className="edit-account-modal__actions">
        <button
          type="button"
          className="edit-account-modal__cancel-btn"
          onClick={handleClose}
        >
          Cancel
        </button>
      </div>
    </ModalWithForm>
  );
};

export default EditAccountModal;