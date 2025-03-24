// Form validation utility functions

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if email format is valid
 */
export const isValidEmail = (email) => {
    if (!email) return false;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };
  
  /**
   * Validate phone number format (Indian)
   * @param {string} phone - Phone number to validate
   * @returns {boolean} True if phone format is valid
   */
  export const isValidPhone = (phone) => {
    if (!phone) return false;
    const regex = /^[6-9]\d{9}$/;
    return regex.test(phone);
  };
  
  /**
   * Validate password strength
   * @param {string} password - Password to validate
   * @returns {object} Validation result with status and message
   */
  export const validatePassword = (password) => {
    if (!password) {
      return {
        valid: false,
        message: 'Password is required'
      };
    }
    
    if (password.length < 8) {
      return {
        valid: false,
        message: 'Password must be at least 8 characters long'
      };
    }
    
    // Check for at least one number
    if (!/\d/.test(password)) {
      return {
        valid: false,
        message: 'Password must contain at least one number'
      };
    }
    
    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return {
        valid: false,
        message: 'Password must contain at least one uppercase letter'
      };
    }
    
    // Check for at least one special character
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      return {
        valid: false,
        message: 'Password must contain at least one special character'
      };
    }
    
    return {
      valid: true,
      message: 'Password is strong'
    };
  };
  
  /**
   * Validate if passwords match
   * @param {string} password - Password
   * @param {string} confirmPassword - Confirm password
   * @returns {boolean} True if passwords match
   */
  export const passwordsMatch = (password, confirmPassword) => {
    return password === confirmPassword;
  };
  
  /**
   * Validate roll number format
   * @param {string} rollNumber - Roll number to validate
   * @returns {boolean} True if roll number format is valid
   */
  export const isValidRollNumber = (rollNumber) => {
    if (!rollNumber) return false;
    // Example: SVIT20CS101
    const regex = /^SVIT\d{2}[A-Z]{2,5}\d{3}$/;
    return regex.test(rollNumber);
  };
  
  /**
   * Validate amount (non-negative number)
   * @param {number|string} amount - Amount to validate
   * @returns {boolean} True if amount is valid
   */
  export const isValidAmount = (amount) => {
    if (amount === null || amount === undefined || amount === '') return false;
    const numAmount = Number(amount);
    return !isNaN(numAmount) && numAmount >= 0;
  };
  
  /**
   * Validate date (not in the past)
   * @param {string} dateString - Date string to validate
   * @returns {boolean} True if date is not in the past
   */
  export const isValidFutureDate = (dateString) => {
    if (!dateString) return false;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);
    
    return date >= today;
  };
  
  /**
   * Validate card number (Luhn algorithm)
   * @param {string} cardNumber - Card number to validate
   * @returns {boolean} True if card number is valid
   */
  export const isValidCardNumber = (cardNumber) => {
    if (!cardNumber) return false;
    
    // Remove spaces and non-digit characters
    const cc = cardNumber.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (cc.length < 13 || cc.length > 19) return false;
    
    // Luhn algorithm
    let sum = 0;
    let shouldDouble = false;
    
    // Loop through values starting from the rightmost digit
    for (let i = cc.length - 1; i >= 0; i--) {
      let digit = parseInt(cc.charAt(i));
      
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    
    return (sum % 10) === 0;
  };
  
  /**
   * Validate card expiry date
   * @param {string} expiryDate - Expiry date in MM/YY format
   * @returns {boolean} True if expiry date is valid and not expired
   */
  export const isValidCardExpiry = (expiryDate) => {
    if (!expiryDate) return false;
    
    // Check format
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!regex.test(expiryDate)) return false;
    
    const [month, year] = expiryDate.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits
    const currentMonth = currentDate.getMonth() + 1; // January is 0
    
    const expMonth = parseInt(month, 10);
    const expYear = parseInt(year, 10);
    
    // Check if card is expired
    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      return false;
    }
    
    return true;
  };
  
  /**
   * Validate CVV
   * @param {string} cvv - CVV to validate
   * @returns {boolean} True if CVV is valid
   */
  export const isValidCVV = (cvv) => {
    if (!cvv) return false;
    
    // Remove spaces and non-digit characters
    const cleanCVV = cvv.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    // CVV is usually 3 digits, some cards use 4 digits
    return /^\d{3,4}$/.test(cleanCVV);
  };
  
  /**
   * Validate UPI ID
   * @param {string} upiId - UPI ID to validate
   * @returns {boolean} True if UPI ID format is valid
   */
  export const isValidUpiId = (upiId) => {
    if (!upiId) return false;
    
    // UPI ID format: username@provider
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/;
    return regex.test(upiId);
  };
  
  export default {
    isValidEmail,
    isValidPhone,
    validatePassword,
    passwordsMatch,
    isValidRollNumber,
    isValidAmount,
    isValidFutureDate,
    isValidCardNumber,
    isValidCardExpiry,
    isValidCVV,
    isValidUpiId
  };