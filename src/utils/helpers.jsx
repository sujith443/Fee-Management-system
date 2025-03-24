// Helper functions for the application

/**
 * Format currency in Indian Rupees format
 * @param {number} amount - Amount to format
 * @returns {string} Formatted amount
 */
export const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) {
      return '₹0';
    }
    
    return '₹' + amount.toLocaleString('en-IN');
  };
  
  /**
   * Format date in user-friendly format
   * @param {string} dateString - Date string
   * @param {object} options - Date formatting options
   * @returns {string} Formatted date
   */
  export const formatDate = (dateString, options = {}) => {
    if (!dateString) {
      return '';
    }
    
    const defaultOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    };
    
    const dateOptions = { ...defaultOptions, ...options };
    
    try {
      return new Date(dateString).toLocaleDateString('en-IN', dateOptions);
    } catch (error) {
      console.error('Date formatting error:', error);
      return dateString;
    }
  };
  
  /**
   * Format date and time
   * @param {string} dateTimeString - Date-time string
   * @returns {string} Formatted date and time
   */
  export const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) {
      return '';
    }
    
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    
    try {
      return new Date(dateTimeString).toLocaleDateString('en-IN', options);
    } catch (error) {
      console.error('DateTime formatting error:', error);
      return dateTimeString;
    }
  };
  
  /**
   * Calculate days remaining or overdue
   * @param {string} dueDate - Due date string
   * @returns {number} Days remaining (positive) or overdue (negative)
   */
  export const getDaysRemaining = (dueDate) => {
    if (!dueDate) {
      return 0;
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };
  
  /**
   * Get status based on days remaining
   * @param {string} dueDate - Due date string
   * @returns {string} Status (overdue, due-soon, upcoming)
   */
  export const getStatusFromDueDate = (dueDate) => {
    const daysRemaining = getDaysRemaining(dueDate);
    
    if (daysRemaining < 0) {
      return 'overdue';
    }
    
    if (daysRemaining <= 5) {
      return 'due-soon';
    }
    
    return 'upcoming';
  };
  
  /**
   * Format credit card number with spaces
   * @param {string} value - Card number value
   * @returns {string} Formatted card number
   */
  export const formatCardNumber = (value) => {
    if (!value) {
      return '';
    }
    
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    }
    
    return value;
  };
  
  /**
   * Format card expiry date (MM/YY)
   * @param {string} value - Expiry value
   * @returns {string} Formatted expiry
   */
  export const formatExpiry = (value) => {
    if (!value) {
      return '';
    }
    
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return value;
  };
  
  /**
   * Truncate text with ellipsis
   * @param {string} text - Text to truncate
   * @param {number} length - Maximum length
   * @returns {string} Truncated text
   */
  export const truncateText = (text, length = 30) => {
    if (!text) {
      return '';
    }
    
    if (text.length <= length) {
      return text;
    }
    
    return text.substring(0, length) + '...';
  };
  
  /**
   * Calculate percentage
   * @param {number} value - Value
   * @param {number} total - Total
   * @returns {number} Percentage
   */
  export const calculatePercentage = (value, total) => {
    if (!value || !total) {
      return 0;
    }
    
    return Math.round((value / total) * 100);
  };
  
  /**
   * Format file size
   * @param {number} bytes - File size in bytes
   * @returns {string} Formatted file size
   */
  export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
  
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
  
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  /**
   * Generate a random ID
   * @param {string} prefix - ID prefix
   * @returns {string} Random ID
   */
  export const generateId = (prefix = 'ID') => {
    return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).substring(2, 7)}`.toUpperCase();
  };
  
  /**
   * Check if a date is in the past
   * @param {string} dateString - Date string
   * @returns {boolean} True if date is in the past
   */
  export const isDatePast = (dateString) => {
    if (!dateString) {
      return false;
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);
    
    return date < today;
  };
  
  /**
   * Convert month number to name
   * @param {number} month - Month number (1-12)
   * @returns {string} Month name
   */
  export const getMonthName = (month) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    return months[month - 1] || '';
  };
  
  /**
   * Get academic year based on month
   * @param {Date} date - Date object
   * @returns {string} Academic year (e.g., "2024-2025")
   */
  export const getAcademicYear = (date = new Date()) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // January is 0
    
    // Academic year starts in July
    if (month >= 7) {
      return `${year}-${year + 1}`;
    }
    
    return `${year - 1}-${year}`;
  };
  
  export default {
    formatCurrency,
    formatDate,
    formatDateTime,
    getDaysRemaining,
    getStatusFromDueDate,
    formatCardNumber,
    formatExpiry,
    truncateText,
    calculatePercentage,
    formatFileSize,
    generateId,
    isDatePast,
    getMonthName,
    getAcademicYear
  };