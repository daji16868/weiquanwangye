// Validation utility functions for the whistleblowing platform

/**
 * Validates a report form submission
 * @param {Object} formData - The form data to validate
 * @param {Object} reportForm - Translation strings for error messages
 * @returns {Object} - Object containing validation errors (if any)
 */
export const validateReportForm = (formData, reportForm) => {
  const errors = {};

  // Basic validation for required fields
  if (!formData.type) {
    errors.type = reportForm.validationRequired;
  }

  if (!formData.description || formData.description.length < 10) {
    errors.description = reportForm.validationDescription;
  }

  // If contact method is provided, validate the contact value
  if (formData.contactMethod === 'email' && formData.contactValue) {
    if (!isValidEmail(formData.contactValue)) {
      errors.contactValue = reportForm.validationEmail;
    }
  }

  if (formData.contactMethod === 'phone' && formData.contactValue) {
    if (!isValidPhone(formData.contactValue)) {
      errors.contactValue = reportForm.validationPhone;
    }
  }

  // File validation could be added here
  // For example, check file sizes, types, etc.

  return errors;
};

/**
 * Validates an email address
 * @param {string} email - The email address to validate
 * @returns {boolean} - True if the email is valid, false otherwise
 */
export const isValidEmail = (email) => {
  // Basic email validation regex pattern
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailPattern.test(email);
};

/**
 * Validates a phone number
 * @param {string} phone - The phone number to validate
 * @returns {boolean} - True if the phone number is valid, false otherwise
 */
export const isValidPhone = (phone) => {
  // Simple phone validation - allows different formats but requires minimum length
  // In a real application, you might want to use a library like libphonenumber-js for proper validation
  const strippedPhone = phone.replace(/[\s()\-+]/g, '');
  return strippedPhone.length >= 8 && /^[0-9]+$/.test(strippedPhone);
};

/**
 * Sanitizes user input to prevent XSS attacks
 * @param {string} input - The user input to sanitize
 * @returns {string} - Sanitized string
 */
export const sanitizeInput = (input) => {
  if (!input) return '';
  
  // Basic sanitization - replace HTML special characters
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};