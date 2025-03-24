import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './contexts/AuthContext';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import ErrorPage from './pages/ErrorPage';

// Student Components
import PaymentHistory from './components/student/PaymentHistory';
import PendingPayments from './components/student/PendingPayments';
import MakePayment from './components/student/MakePayment';
import PaymentReceipt from './components/student/PaymentReceipt';
import StudentProfile from './components/student/Profile';

// Admin Components
import StudentList from './components/admin/StudentList';
import PaymentTracking from './components/admin/PaymentTracking';
import FeesManagement from './components/admin/FeesManagement';
import Reports from './components/admin/Reports';
import Settings from './components/admin/Settings';

// Auth Components
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';

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
        <Container fluid className="p-0">
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
                  <StudentDashboardPage />
                </ProtectedRoute>
              } 
            >
              <Route path="dashboard" element={<StudentDashboardPage />} />
              <Route path="payment-history" element={<PaymentHistory />} />
              <Route path="pending-payments" element={<PendingPayments />} />
              <Route path="make-payment/:feeId" element={<MakePayment />} />
              <Route path="receipt/:paymentId" element={<PaymentReceipt />} />
              <Route path="profile" element={<StudentProfile />} />
            </Route>
            
            {/* Admin Routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboardPage />
                </ProtectedRoute>
              } 
            >
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
        </Container>
      </AuthProvider>
    </Router>
  );
}

export default App;