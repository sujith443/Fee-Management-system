import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Card, Button, Badge, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { studentService } from '../../services/studentService';
import { formatCurrency, formatDate, getDaysRemaining } from '../../utils/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMoneyBillWave, 
  faHistory, 
  faExclamationTriangle, 
  faCalendarAlt, 
  faFileInvoice,
  faArrowRight 
} from '@fortawesome/free-solid-svg-icons';
import Loader from '../common/Loader';

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [pendingFees, setPendingFees] = useState([]);
  const [recentPayments, setRecentPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch pending fees and recent payments
        const [pendingFeesData, paymentHistoryData] = await Promise.all([
          studentService.getPendingFees(),
          studentService.getPaymentHistory()
        ]);
        
        setPendingFees(pendingFeesData);
        setRecentPayments(paymentHistoryData.slice(0, 3)); // Get only 3 most recent payments
        
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  // Get due status badge
  const getDueStatusBadge = (dueDate) => {
    const daysRemaining = getDaysRemaining(dueDate);
    
    if (daysRemaining < 0) {
      return <Badge bg="danger">Overdue by {Math.abs(daysRemaining)} days</Badge>;
    }
    
    if (daysRemaining <= 5) {
      return <Badge bg="warning" text="dark">Due in {daysRemaining} days</Badge>;
    }
    
    return <Badge bg="info">Due in {daysRemaining} days</Badge>;
  };
  
  if (loading) {
    return <Loader />;
  }
  
  return (
    <div className="py-4">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Student Dashboard</h1>
        <p className="mb-0">Welcome back, {currentUser?.name}</p>
      </div>
      
      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}
      
      {/* Quick Actions */}
      <Row className="g-4 mb-4">
        <Col md={6} xl={3}>
          <Card className="border-0 shadow-sm h-100 dashboard-card">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                <FontAwesomeIcon icon={faMoneyBillWave} className="text-primary fs-4" />
              </div>
              <div>
                <h6 className="mb-1">Make Payment</h6>
                <p className="text-muted small mb-0">Pay your pending fees</p>
              </div>
            </Card.Body>
            <Card.Footer className="bg-white border-0">
              <Link to="/student/pending-payments" className="btn btn-sm btn-primary w-100">
                Pay Now
              </Link>
            </Card.Footer>
          </Card>
        </Col>
        
        <Col md={6} xl={3}>
          <Card className="border-0 shadow-sm h-100 dashboard-card">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle bg-success bg-opacity-10 p-3 me-3">
                <FontAwesomeIcon icon={faHistory} className="text-success fs-4" />
              </div>
              <div>
                <h6 className="mb-1">Payment History</h6>
                <p className="text-muted small mb-0">View your payment records</p>
              </div>
            </Card.Body>
            <Card.Footer className="bg-white border-0">
              <Link to="/student/payment-history" className="btn btn-sm btn-outline-success w-100">
                View History
              </Link>
            </Card.Footer>
          </Card>
        </Col>
        
        <Col md={6} xl={3}>
          <Card className="border-0 shadow-sm h-100 dashboard-card">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle bg-info bg-opacity-10 p-3 me-3">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-info fs-4" />
              </div>
              <div>
                <h6 className="mb-1">Payment Calendar</h6>
                <p className="text-muted small mb-0">Upcoming payment dates</p>
              </div>
            </Card.Body>
            <Card.Footer className="bg-white border-0">
              <Link to="/student/calendar" className="btn btn-sm btn-outline-info w-100">
                View Calendar
              </Link>
            </Card.Footer>
          </Card>
        </Col>
        
        <Col md={6} xl={3}>
          <Card className="border-0 shadow-sm h-100 dashboard-card">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle bg-warning bg-opacity-10 p-3 me-3">
                <FontAwesomeIcon icon={faFileInvoice} className="text-warning fs-4" />
              </div>
              <div>
                <h6 className="mb-1">Fee Structure</h6>
                <p className="text-muted small mb-0">View course fee details</p>
              </div>
            </Card.Body>
            <Card.Footer className="bg-white border-0">
              <Button variant="outline-warning" size="sm" className="w-100">
                View Details
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col lg={7} className="mb-4 mb-lg-0">
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white py-3">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold">Pending Payments</h5>
                <Link to="/student/pending-payments" className="btn btn-sm btn-link text-decoration-none">
                  View All
                </Link>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              {pendingFees.length === 0 ? (
                <div className="text-center py-5">
                  <img 
                    src="/assets/images/no-pending.svg" 
                    alt="No Pending Payments" 
                    style={{ height: '120px', opacity: '0.5' }} 
                    className="mb-3"
                  />
                  <h6 className="text-muted">No pending payments</h6>
                  <p className="text-muted small mb-0">All your fees are paid. Great job!</p>
                </div>
              ) : (
                <div className="list-group list-group-flush">
                  {pendingFees.map((fee) => (
                    <div key={fee.id} className="list-group-item p-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">{fee.type}</h6>
                          <p className="text-muted small mb-0">{fee.description}</p>
                        </div>
                        <div className="text-end">
                          <div className="fw-bold mb-1">{formatCurrency(fee.amount)}</div>
                          <div>{getDueStatusBadge(fee.dueDate)}</div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <div className="small text-muted">
                          Due Date: {formatDate(fee.dueDate)}
                        </div>
                        <Link 
                          to={`/student/make-payment/${fee.id}`} 
                          className="btn btn-sm btn-primary"
                        >
                          Pay Now
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={5}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white py-3">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold">Recent Payments</h5>
                <Link to="/student/payment-history" className="btn btn-sm btn-link text-decoration-none">
                  View All
                </Link>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              {recentPayments.length === 0 ? (
                <div className="text-center py-5">
                  <img 
                    src="/assets/images/no-payments.svg" 
                    alt="No Payment History" 
                    style={{ height: '120px', opacity: '0.5' }} 
                    className="mb-3"
                  />
                  <h6 className="text-muted">No payment history</h6>
                  <p className="text-muted small mb-0">You haven't made any payments yet</p>
                </div>
              ) : (
                <div className="list-group list-group-flush">
                  {recentPayments.map((payment) => (
                    <div key={payment.id} className="list-group-item p-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">{payment.type}</h6>
                          <div className="text-muted small">Receipt: {payment.id}</div>
                        </div>
                        <div className="text-end">
                          <div className="fw-bold mb-1">{formatCurrency(payment.amount)}</div>
                          <Badge bg="success">Paid</Badge>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <div className="small text-muted">
                          Paid on: {formatDate(payment.paidDate)}
                        </div>
                        <Link 
                          to={`/student/receipt/${payment.id}`} 
                          className="btn btn-sm btn-outline-primary"
                        >
                          View Receipt
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between">
                <div className="mb-3 mb-md-0">
                  <h5 className="fw-bold mb-2">Need Assistance?</h5>
                  <p className="text-muted mb-0">
                    If you have any questions about fees or payments, our support team is here to help.
                  </p>
                </div>
                <div className="d-flex gap-2">
                  <Button variant="outline-primary">
                    Contact Support
                  </Button>
                  <Button variant="primary">
                    Help Center
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;