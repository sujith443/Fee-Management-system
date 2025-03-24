import React, { useState, useContext } from 'react';
import { Navbar, Container, Nav, NavDropdown, Button, Offcanvas, Badge } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBell, faUser, faSignOutAlt, faCog, faQuestionCircle, 
  faMoneyBillWave, faHistory, faFileInvoice, faHome,
  faUserGraduate, faChartBar, faUsers, faSchool
} from '@fortawesome/free-solid-svg-icons';

// Mock notifications
const mockNotifications = [
  {
    id: 1,
    title: 'Due Date Reminder',
    message: 'Examination fee due in 5 days',
    date: '10 minutes ago',
    read: false
  },
  {
    id: 2,
    title: 'Payment Successful',
    message: 'Your Bus fee payment was successful',
    date: '2 hours ago',
    read: true
  },
  {
    id: 3,
    title: 'Late Fee Notice',
    message: 'Library fee is overdue. Late charges applied.',
    date: '1 day ago',
    read: true
  }
];

const AppNavbar = () => {
  const { currentUser, userRole, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  const [showSidebar, setShowSidebar] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  
  const handleCloseSidebar = () => setShowSidebar(false);
  const handleShowSidebar = () => setShowSidebar(true);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const unreadNotifications = notifications.filter(n => !n.read).length;
  
  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };
  
  // Student navigation links
  const studentLinks = [
    { path: '/student/dashboard', icon: faHome, label: 'Dashboard' },
    { path: '/student/payment-history', icon: faHistory, label: 'Payment History' },
    { path: '/student/pending-payments', icon: faMoneyBillWave, label: 'Pending Payments' },
    { path: '/student/profile', icon: faUser, label: 'My Profile' }
  ];
  
  // Admin navigation links
  const adminLinks = [
    { path: '/admin/dashboard', icon: faChartBar, label: 'Dashboard' },
    { path: '/admin/students', icon: faUserGraduate, label: 'Students' },
    { path: '/admin/payment-tracking', icon: faMoneyBillWave, label: 'Payment Tracking' },
    { path: '/admin/fees-management', icon: faFileInvoice, label: 'Fees Management' },
    { path: '/admin/reports', icon: faChartBar, label: 'Reports' },
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
  const dashboardPath = userRole === 'admin' ? '/admin/dashboard' : '/student/dashboard';
  
  return (
    <>
      <Navbar bg="white" expand="lg" className="shadow-sm py-2 sticky-top">
        <Container fluid>
          <Navbar.Brand as={Link} to={dashboardPath} className="d-flex align-items-center">
            <img 
              src="/assets/images/logo.png" 
              alt="SVIT Logo" 
              height="40" 
              className="me-2" 
            />
            <div>
              <div className="fw-bold text-primary">SVIT College</div>
              <div className="small text-muted">Fee Payment Portal</div>
            </div>
          </Navbar.Brand>
          
          <div className="d-flex align-items-center">
            {currentUser && (
              <>
                <NavDropdown
                  title={
                    <div className="icon-button">
                      <FontAwesomeIcon icon={faBell} />
                      {unreadNotifications > 0 && (
                        <Badge 
                          bg="danger" 
                          pill 
                          className="position-absolute top-0 start-100 translate-middle"
                          style={{ fontSize: '0.6rem' }}
                        >
                          {unreadNotifications}
                        </Badge>
                      )}
                    </div>
                  }
                  id="notification-dropdown"
                  align="end"
                  className="me-3"
                >
                  <div className="px-3 py-2 d-flex justify-content-between align-items-center border-bottom">
                    <h6 className="mb-0">Notifications</h6>
                    <Button variant="link" className="p-0 text-decoration-none" onClick={markAllAsRead}>
                      Mark all as read
                    </Button>
                  </div>
                  
                  <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {notifications.length === 0 ? (
                      <NavDropdown.Item className="text-center text-muted py-3">
                        No notifications
                      </NavDropdown.Item>
                    ) : (
                      notifications.map(notification => (
                        <NavDropdown.Item 
                          key={notification.id} 
                          className={`border-bottom ${!notification.read ? 'bg-light' : ''}`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="d-flex">
                            <div className="me-3">
                              <div className={`notification-icon ${!notification.read ? 'text-primary' : 'text-muted'}`}>
                                <FontAwesomeIcon icon={faBell} />
                              </div>
                            </div>
                            <div>
                              <div className="fw-medium">{notification.title}</div>
                              <div className="small">{notification.message}</div>
                              <div className="text-muted small">{notification.date}</div>
                            </div>
                          </div>
                        </NavDropdown.Item>
                      ))
                    )}
                  </div>
                  
                  <NavDropdown.Item as={Link} to="/notifications" className="text-center border-top">
                    View All Notifications
                  </NavDropdown.Item>
                </NavDropdown>
                
                <NavDropdown 
                  title={
                    <div className="d-flex align-items-center">
                      <div className="rounded-circle bg-light p-1 me-2">
                        <FontAwesomeIcon icon={faUser} className="text-muted" />
                      </div>
                      <div className="d-none d-md-block">
                        <div className="small fw-medium">{currentUser.name}</div>
                        <div className="text-muted small text-capitalize">{userRole}</div>
                      </div>
                    </div>
                  }
                  id="user-dropdown"
                  align="end"
                >
                  <NavDropdown.Item as={Link} to={`/${userRole}/profile`}>
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                    My Profile
                  </NavDropdown.Item>
                  
                  <NavDropdown.Item as={Link} to="/settings">
                    <FontAwesomeIcon icon={faCog} className="me-2" />
                    Settings
                  </NavDropdown.Item>
                  
                  <NavDropdown.Item as={Link} to="/help">
                    <FontAwesomeIcon icon={faQuestionCircle} className="me-2" />
                    Help & Support
                  </NavDropdown.Item>
                  
                  <NavDropdown.Divider />
                  
                  <NavDropdown.Item onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
                
                <Button 
                  variant="link" 
                  className="d-lg-none ms-2 text-dark" 
                  onClick={handleShowSidebar}
                >
                  <i className="bi bi-list fs-4"></i>
                </Button>
              </>
            )}
          </div>
        </Container>
      </Navbar>
      
      {/* Mobile Sidebar */}
      <Offcanvas show={showSidebar} onHide={handleCloseSidebar} responsive="lg" placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>SVIT Fee Portal</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {navLinks.map((link, index) => (
              <Nav.Link 
                key={index}
                as={Link} 
                to={link.path}
                className={`py-2 ${isActive(link.path) ? 'active fw-medium' : ''}`}
                onClick={handleCloseSidebar}
              >
                <FontAwesomeIcon icon={link.icon} className="me-2" />
                {link.label}
              </Nav.Link>
            ))}
            
            <hr />
            
            <Nav.Link as={Link} to="/help" className="py-2" onClick={handleCloseSidebar}>
              <FontAwesomeIcon icon={faQuestionCircle} className="me-2" />
              Help & Support
            </Nav.Link>
            
            <Nav.Link onClick={handleLogout} className="py-2 text-danger">
              <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
              Logout
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default AppNavbar;