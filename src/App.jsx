import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { AuthProvider, AuthContext } from './contexts/AuthContext';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import StudentPaymentHistoryPage from './pages/StudentPaymentPage';
import StudentPendingPaymentsPage from './pages/PendingPayments';
import StudentMakePaymentPage from './pages/StudentMakePayment';
import StudentReceiptPage from './pages/StudentRecieptPage';
import StudentProfilePage from './pages/StudentProfile';
import AdminDashboardPage from './pages/AdminDashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import ErrorPage from './pages/ErrorPage';

// Admin Components
import StudentList from './components/admin/StudentList';
import PaymentTracking from './components/admin/PaymentTracking';
import FeesManagement from './components/admin/FeesManagement';
import Reports from './components/admin/Reports';
import Settings from './components/admin/Settings';

// Auth Components
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';

// Layout Components
import StudentLayout from './layouts/StudentLayout';
import AdminLayout from './layouts/AdminLayout';
import "./app.css"
import 'bootstrap/dist/css/bootstrap.min.css';

// Protected Route Component
const ProtectedRoute = ({ children, role }) => {
  const { currentUser, userRole } = React.useContext(AuthContext);
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  if (role && role !== userRole) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* Student Routes */}
          <Route 
            path="/student" 
            element={
              <ProtectedRoute role="student">
                <StudentLayout />
              </ProtectedRoute>
            } 
          >
            <Route index element={<Navigate to="/student/dashboard" replace />} />
            <Route path="dashboard" element={<StudentDashboardPage />} />
            <Route path="payment-history" element={<StudentPaymentHistoryPage />} />
            <Route path="pending-payments" element={<StudentPendingPaymentsPage />} />
            <Route path="make-payment/:feeId" element={<StudentMakePaymentPage />} />
            <Route path="receipt/:paymentId" element={<StudentReceiptPage />} />
            <Route path="profile" element={<StudentProfilePage />} />
          </Route>
          
          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute role="admin">
                <AdminLayout />
              </ProtectedRoute>
            } 
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="students" element={<StudentList />} />
            <Route path="payment-tracking" element={<PaymentTracking />} />
            <Route path="fees-management" element={<FeesManagement />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          {/* Error Routes */}
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;