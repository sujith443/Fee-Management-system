import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Badge, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { studentService } from '../../services/studentService';
import { formatCurrency, formatDate, getDaysRemaining } from '../../utils/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faExclamationTriangle, 
  faCalendarAlt, 
  faSearch, 
  faFilter,
  faInfoCircle,
  faMoneyBillWave,
  faClock
} from '@fortawesome/free-solid-svg-icons';
import Loader from '../common/Loader';

const PendingPayments = () => {
  const { currentUser } = useContext(AuthContext);
  const [pendingFees, setPendingFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const fetchPendingFees = async () => {
      try {
        setLoading(true);
        const pendingFeesData = await studentService.getPendingFees();
        setPendingFees(pendingFeesData);
      } catch (err) {
        console.error('Error fetching pending fees:', err);
        setError('Failed to load pending fees. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPendingFees();
  }, []);
  
  // Filter fees based on type, status, and search term
  const filteredFees = pendingFees.filter(fee => {
    // Filter by fee type
    if (filter !== 'all' && fee.type !== filter) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        fee.type.toLowerCase().includes(term) ||
        fee.description.toLowerCase().includes(term)
      );
    }
    
    return true;
  });
  
  // Get unique fee types for filter dropdown
  const feeTypes = ['all', ...new Set(pendingFees.map(fee => fee.type))];
  
  // Calculate total amount due
  const totalDue = filteredFees.reduce((total, fee) => total + fee.amount + fee.lateCharge, 0);
  
  // Get daysRemaining label
  const getDueLabel = (dueDate) => {
    const daysRemaining = getDaysRemaining(dueDate);
    
    if (daysRemaining < 0) {
      return <span className="text-danger">Overdue by {Math.abs(daysRemaining)} days</span>;
    }
    
    if (daysRemaining <= 5) {
      return <span className="text-warning">Due in {daysRemaining} days</span>;
    }
    
    return <span className="text-info">Due in {daysRemaining} days</span>;
  };
  
  // Get due status badge
  const getDueStatusBadge = (dueDate) => {
    const daysRemaining = getDaysRemaining(dueDate);
    
    if (daysRemaining < 0) {
      return <Badge bg="danger">Overdue</Badge>;
    }
    
    if (daysRemaining <= 5) {
      return <Badge bg="warning" text="dark">Due Soon</Badge>;
    }
    
    return <Badge bg="info">Upcoming</Badge>;
  };
  
  // Group fees by status
  const overdueCount = pendingFees.filter(fee => getDaysRemaining(fee.dueDate) < 0).length;
  const dueSoonCount = pendingFees.filter(fee => {
    const days = getDaysRemaining(fee.dueDate);
    return days >= 0 && days <= 5;
  }).length;
  const upcomingCount = pendingFees.filter(fee => getDaysRemaining(fee.dueDate) > 5).length;
  
  // Handle reset filters
  const handleResetFilters = () => {
    setFilter('all');
    setSearchTerm('');
  };
  
  if (loading) {
    return <Loader />;
  }
  
  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="fs-2 fw-bold">Pending Payments</h1>
          <p className="text-muted">View and pay your pending fees</p>
        </Col>
      </Row>
      
      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}
      
      <Row className="g-4 mb-4">
        <Col md={4}>
          <Card className={`border-0 shadow-sm h-100 ${overdueCount > 0 ? 'border-danger border-start border-5' : ''}`}>
            <Card.Body className="d-flex">
              <div className={`rounded-circle ${overdueCount > 0 ? 'bg-danger' : 'bg-light'} p-3 me-3 align-self-center`}>
                <FontAwesomeIcon icon={faExclamationTriangle} className={overdueCount > 0 ? 'text-white' : 'text-muted'} />
              </div>
              <div>
                <h6 className="mb-1">Overdue Payments</h6>
                <h4 className="fw-bold mb-0">{overdueCount}</h4>
                {overdueCount > 0 && (
                  <p className="text-danger small mb-0">
                    Immediate attention required
                  </p>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className={`border-0 shadow-sm h-100 ${dueSoonCount > 0 ? 'border-warning border-start border-5' : ''}`}>
            <Card.Body className="d-flex">
              <div className={`rounded-circle ${dueSoonCount > 0 ? 'bg-warning' : 'bg-light'} p-3 me-3 align-self-center`}>
                <FontAwesomeIcon icon={faClock} className={dueSoonCount > 0 ? 'text-white' : 'text-muted'} />
              </div>
              <div>
                <h6 className="mb-1">Due Soon</h6>
                <h4 className="fw-bold mb-0">{dueSoonCount}</h4>
                {dueSoonCount > 0 && (
                  <p className="text-warning small mb-0">
                    Due within 5 days
                  </p>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex">
              <div className="rounded-circle bg-light p-3 me-3 align-self-center">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-muted" />
              </div>
              <div>
                <h6 className="mb-1">Upcoming</h6>
                <h4 className="fw-bold mb-0">{upcomingCount}</h4>
                <p className="text-muted small mb-0">
                  Due after 5 days
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Card className="border-0 shadow-sm mb-4">
        <Card.Header className="bg-white py-3">
          <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center">
            <h5 className="mb-0 fw-bold">Fees Due</h5>
            
            <div className="d-flex flex-wrap gap-2">
              <div className="position-relative">
                <Form.Control
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pe-4"
                />
                <FontAwesomeIcon 
                  icon={faSearch} 
                  className="position-absolute top-50 end-0 translate-middle-y me-2 text-muted" 
                  style={{ pointerEvents: 'none' }}
                />
              </div>
              
              <Form.Select 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-auto"
              >
                <option value="all">All Fee Types</option>
                {feeTypes.filter(type => type !== 'all').map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </Form.Select>
              
              <Button 
                variant="outline-secondary"
                onClick={handleResetFilters}
                className="d-flex align-items-center"
              >
                <FontAwesomeIcon icon={faFilter} className="me-2" />
                Reset
              </Button>
            </div>
          </div>
        </Card.Header>
        
        <Card.Body className="p-0">
          {filteredFees.length === 0 ? (
            <div className="text-center py-5">
              <img 
                src="/assets/images/no-pending.svg" 
                alt="No Pending Payments" 
                style={{ height: '150px', opacity: '0.5' }} 
                className="mb-3"
              />
              <h5 className="fw-bold">No pending payments found</h5>
              <p className="text-muted mb-0">
                {filter !== 'all' || searchTerm 
                  ? 'Try changing your filters or search term' 
                  : 'All your fees are paid. Great job!'}
              </p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Fee Type</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFees.map(fee => (
                    <tr key={fee.id}>
                      <td className="fw-medium">{fee.type}</td>
                      <td>{fee.description}</td>
                      <td>
                        <div className="fw-medium">{formatCurrency(fee.amount)}</div>
                        {fee.lateCharge > 0 && (
                          <small className="text-danger d-block">
                            + {formatCurrency(fee.lateCharge)} (Late Charge)
                          </small>
                        )}
                      </td>
                      <td>
                        <div>{formatDate(fee.dueDate)}</div>
                        <small className="text-muted">{getDueLabel(fee.dueDate)}</small>
                      </td>
                      <td>{getDueStatusBadge(fee.dueDate)}</td>
                      <td>
                        <Link 
                          to={`/student/make-payment/${fee.id}`} 
                          className="btn btn-primary btn-sm"
                        >
                          Pay Now
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="table-light fw-bold">
                  <tr>
                    <td colSpan="2">Total</td>
                    <td>{formatCurrency(totalDue)}</td>
                    <td colSpan="3"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </Card.Body>
      </Card>
      
      <Row className="mb-4">
        <Col>
          <Card className="border-0 shadow-sm bg-primary bg-opacity-10">
            <Card.Body className="p-4">
              <div className="d-flex flex-column flex-md-row align-items-md-center">
                <div className="rounded-circle bg-primary p-3 me-md-4 mb-3 mb-md-0 align-self-start align-self-md-center">
                  <FontAwesomeIcon icon={faInfoCircle} className="text-white fs-4" />
                </div>
                <div>
                  <h5 className="fw-bold mb-2">Important Information</h5>
                  <p className="mb-md-0">
                    Late payment fees will be charged for overdue payments. If you are facing financial difficulties, 
                    please contact the accounts department for assistance.
                  </p>
                </div>
                <div className="ms-md-auto mt-3 mt-md-0">
                  <Button variant="primary">Contact Accounts</Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col md={6} className="mb-4 mb-md-0">
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white py-3">
              <h5 className="mb-0 fw-bold">Payment Methods</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-3 pb-3 border-bottom">
                <div className="d-flex align-items-center mb-2">
                  <FontAwesomeIcon icon={faMoneyBillWave} className="text-success me-2" />
                  <h6 className="mb-0">Online Payment</h6>
                </div>
                <p className="text-muted small mb-0">
                  Pay directly through the portal using Credit/Debit Card, UPI, or Net Banking.
                </p>
              </div>
              
              <div className="mb-3 pb-3 border-bottom">
                <div className="d-flex align-items-center mb-2">
                  <FontAwesomeIcon icon={faMoneyBillWave} className="text-warning me-2" />
                  <h6 className="mb-0">Bank Transfer</h6>
                </div>
                <p className="text-muted small mb-0">
                  Transfer funds directly to the college bank account and submit the transaction reference.
                </p>
              </div>
              
              <div>
                <div className="d-flex align-items-center mb-2">
                  <FontAwesomeIcon icon={faMoneyBillWave} className="text-info me-2" />
                  <h6 className="mb-0">In-Person Payment</h6>
                </div>
                <p className="text-muted small mb-0">
                  Visit the accounts department to pay by cash, cheque, or demand draft.
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white py-3">
              <h5 className="mb-0 fw-bold">Payment FAQs</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <h6 className="mb-2">What happens if I miss the due date?</h6>
                <p className="text-muted small mb-0">
                  Late payment charges will be applied as per the fee policy. Continued non-payment may result in
                  restrictions on accessing certain college facilities.
                </p>
              </div>
              
              <div className="mb-3">
                <h6 className="mb-2">Can I pay in installments?</h6>
                <p className="text-muted small mb-0">
                  Yes, the college offers installment options for certain fees. Please contact the accounts department
                  to discuss available options.
                </p>
              </div>
              
              <div>
                <h6 className="mb-2">I've paid but the status hasn't updated?</h6>
                <p className="text-muted small mb-0">
                  It can take up to 48 hours for payment status to update. If it's been longer, please contact
                  the accounts department with your payment reference.
                </p>
              </div>
            </Card.Body>
            <Card.Footer className="bg-white">
              <Button variant="link" className="text-decoration-none p-0">
                View All FAQs
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PendingPayments;