import React, { useContext } from 'react';
import { Nav, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, faMoneyBillWave, faHistory, faFileInvoice, faUser,
  faChartBar, faUserGraduate, faCog, faQuestionCircle, faSignOutAlt,
  faSchool, faExclamationTriangle, faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const { userRole, logout } = useContext(AuthContext);
  const location = useLocation();
  
  // Student navigation links
  const studentLinks = [
    { path: '/student/dashboard', icon: faHome, label: 'Dashboard' },
    { path: '/student/payment-history', icon: faHistory, label: 'Payment History' },
    { path: '/student/pending-payments', icon: faMoneyBillWave, label: 'Pending Payments' },
    { path: '/student/calendar', icon: faCalendarAlt, label: 'Payment Calendar' },
    { path: '/student/profile', icon: faUser, label: 'My Profile' }
  ];
  
  // Admin navigation links
  const adminLinks = [
    { path: '/admin/dashboard', icon: faChartBar, label: 'Dashboard' },
    { path: '/admin/students', icon: faUserGraduate, label: 'Students' },
    { path: '/admin/payment-tracking', icon: faMoneyBillWave, label: 'Payment Tracking' },
    { path: '/admin/fees-management', icon: faFileInvoice, label: 'Fees Management' },
    { path: '/admin/reports', icon: faChartBar, label: 'Reports & Analytics' },
    { path: '/admin/reminders', icon: faExclamationTriangle, label: 'Payment Reminders' },
    { path: '/admin/settings', icon: faCog, label: 'Settings' }
  ];
  
  const isActive = (path) => {
    if (path === '/student/dashboard' || path === '/admin/dashboard') {
      return location.pathname === path || location.pathname === path.replace('/dashboard', '');
    }
    return location.pathname === path;
  };
  
  // Get appropriate links based on user role
  const navLinks = userRole === 'admin' ? adminLinks : studentLinks;
  
  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };
  
  return (
    <div className="sidebar bg-white shadow-sm h-100 d-flex flex-column">
      <div className="p-3 border-bottom">
        <div className="d-flex align-items-center justify-content-center mb-3">
          <img 
            src="/assets/images/logo.png" 
            alt="SVIT Logo" 
            height="50" 
            className="me-2" 
          />
          <div>
            <div className="fw-bold text-primary">SVIT College</div>
            <div className="small text-muted">Fee Payment Portal</div>
          </div>
        </div>
      </div>
      
      <Nav className="flex-column p-3 flex-grow-1">
        {navLinks.map((link, index) => (
          <Nav.Link 
            key={index}
            as={Link} 
            to={link.path}
            className={`py-2 px-3 rounded mb-1 ${isActive(link.path) ? 'active bg-primary text-white' : 'text-dark'}`}
          >
            <FontAwesomeIcon icon={link.icon} className={`me-2 ${isActive(link.path) ? 'text-white' : 'text-muted'}`} />
            {link.label}
          </Nav.Link>
        ))}
        
        <hr className="my-3" />
        
        <Nav.Link as={Link} to="/help" className="py-2 px-3 rounded mb-1 text-dark">
          <FontAwesomeIcon icon={faQuestionCircle} className="me-2 text-muted" />
          Help & Support
        </Nav.Link>
      </Nav>
      
      <div className="p-3 border-top mt-auto">
        <Button 
          variant="outline-danger" 
          className="w-100" 
          onClick={handleLogout}
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;