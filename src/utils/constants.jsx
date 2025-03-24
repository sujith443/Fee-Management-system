// Application constants

// API endpoints (would point to actual API in a real app)
export const API = {
    BASE_URL: '/api',
    AUTH: {
      LOGIN: '/auth/login',
      LOGOUT: '/auth/logout',
      REGISTER: '/auth/register',
      RESET_PASSWORD: '/auth/reset-password',
      CHANGE_PASSWORD: '/auth/change-password'
    },
    STUDENT: {
      PROFILE: '/student/profile',
      PAYMENT_HISTORY: '/student/payments',
      PENDING_FEES: '/student/pending-fees',
      PAYMENT: '/student/make-payment',
      RECEIPT: '/student/receipt'
    },
    ADMIN: {
      DASHBOARD: '/admin/dashboard',
      STUDENTS: '/admin/students',
      PAYMENTS: '/admin/payments',
      FEES: '/admin/fees',
      REPORTS: '/admin/reports',
      REMINDERS: '/admin/reminders'
    }
  };
  
  // User roles
  export const ROLES = {
    ADMIN: 'admin',
    STUDENT: 'student'
  };
  
  // Payment status
  export const PAYMENT_STATUS = {
    SUCCESS: 'success',
    PENDING: 'pending',
    FAILED: 'failed'
  };
  
  // Fee status
  export const FEE_STATUS = {
    PAID: 'paid',
    PENDING: 'pending',
    OVERDUE: 'overdue',
    UPCOMING: 'upcoming'
  };
  
  // Payment methods
  export const PAYMENT_METHODS = {
    UPI: 'upi',
    CARD: 'card',
    NETBANKING: 'netbanking',
    CASH: 'cash',
    DD: 'dd'
  };
  
  // Fee types
  export const FEE_TYPES = {
    EXAM: 'Examination Fee',
    BUS: 'Bus Fee',
    HOSTEL: 'Hostel Fee',
    LIBRARY: 'Library Fee',
    LAB: 'Lab Fee'
  };
  
  // Academic branches
  export const BRANCHES = [
    'All',
    'CSE',
    'ECE',
    'MECH',
    'CIVIL',
    'EEE'
  ];
  
  // Semesters
  export const SEMESTERS = [
    'All',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '1-2',
    '3-8'
  ];
  
  // Date format options
  export const DATE_FORMATS = {
    SIMPLE: {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    },
    WITH_TIME: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    },
    MONTH_YEAR: {
      year: 'numeric',
      month: 'short'
    }
  };
  
  // Report types
  export const REPORT_TYPES = {
    COLLECTION_SUMMARY: 'collection_summary',
    STUDENT_PAYMENTS: 'student_payments',
    PENDING_FEES: 'pending_fees',
    OVERDUE_FEES: 'overdue_fees',
    FEE_STRUCTURES: 'fee_structures'
  };
  
  // Chart colors
  export const CHART_COLORS = {
    PRIMARY: 'rgba(67, 97, 238, 0.7)',
    PRIMARY_LIGHT: 'rgba(67, 97, 238, 0.3)',
    SUCCESS: 'rgba(29, 185, 84, 0.7)',
    SUCCESS_LIGHT: 'rgba(29, 185, 84, 0.3)',
    WARNING: 'rgba(255, 183, 3, 0.7)',
    WARNING_LIGHT: 'rgba(255, 183, 3, 0.3)',
    DANGER: 'rgba(230, 57, 70, 0.7)',
    DANGER_LIGHT: 'rgba(230, 57, 70, 0.3)',
    INFO: 'rgba(76, 201, 240, 0.7)',
    INFO_LIGHT: 'rgba(76, 201, 240, 0.3)',
    SECONDARY: 'rgba(108, 117, 125, 0.7)',
    SECONDARY_LIGHT: 'rgba(108, 117, 125, 0.3)'
  };
  
  export default {
    API,
    ROLES,
    PAYMENT_STATUS,
    FEE_STATUS,
    PAYMENT_METHODS,
    FEE_TYPES,
    BRANCHES,
    SEMESTERS,
    DATE_FORMATS,
    REPORT_TYPES,
    CHART_COLORS
  };