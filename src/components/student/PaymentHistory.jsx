import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Badge, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { studentService } from '../../services/studentService';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faFileInvoice, faSearch, faFilter, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import Table from '../common/Table';
import Loader from '../common/Loader';

const PaymentHistory = () => {
  const { currentUser } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        setLoading(true);
        const paymentHistoryData = await studentService.getPaymentHistory();
        setPayments(paymentHistoryData);
      } catch (err) {
        console.error('Error fetching payment history:', err);
        setError('Failed to load payment history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPaymentHistory();
  }, []);
  
  // Filter payments based on type, date range, and search term
  const filteredPayments = payments.filter(payment => {
    // Filter by fee type
    if (filter !== 'all' && payment.type !== filter) {
      return false;
    }
    
    // Filter by date range
    if (dateRange.startDate && new Date(payment.paidDate) < new Date(dateRange.startDate)) {
      return false;
    }
    if (dateRange.endDate && new Date(payment.paidDate) > new Date(dateRange.endDate)) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        payment.id.toLowerCase().includes(term) ||
        payment.type.toLowerCase().includes(term) ||
        payment.reference.toLowerCase().includes(term)
      );
    }
    
    return true;
  });
  
  // Get unique fee types for filter dropdown
  const feeTypes = ['all', ...new Set(payments.map(payment => payment.type))];
  
  // Calculate total amount paid
  const totalPaid = filteredPayments.reduce((total, payment) => total + payment.amount, 0);
  
  // Table columns
  const columns = [
    {
      field: 'id',
      header: 'Receipt ID',
      cellClassName: 'fw-medium'
    },
    {
      field: 'type',
      header: 'Fee Type'
    },
    {
      field: 'semester',
      header: 'Semester'
    },
    {
      field: 'amount',
      header: 'Amount',
      cell: (row) => formatCurrency(row.amount),
      cellClassName: 'fw-medium'
    },
    {
      field: 'paidDate',
      header: 'Payment Date',
      cell: (row) => formatDate(row.paidDate)
    },
    {
      field: 'paymentMode',
      header: 'Payment Mode'
    },
    {
      field: 'status',
      header: 'Status',
      cell: (row) => (
        <Badge bg={row.status === 'success' ? 'success' : 'danger'}>
          {row.status === 'success' ? 'Successful' : 'Failed'}
        </Badge>
      )
    },
    {
      field: 'actions',
      header: 'Actions',
      cell: (row) => (
        <Link to={`/student/receipt/${row.id}`} className="btn btn-sm btn-outline-primary">
          View Receipt
        </Link>
      )
    }
  ];
  
  // Handle reset filters
  const handleResetFilters = () => {
    setFilter('all');
    setDateRange({ startDate: '', endDate: '' });
    setSearchTerm('');
  };
  
  // Handle download history
  const handleDownloadHistory = () => {
    // In a real app, this would generate and download a PDF or CSV
    alert('Payment history download functionality would be implemented here');
  };
  
  if (loading) {
    return <Loader />;
  }
  
  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="fs-2 fw-bold">Payment History</h1>
          <p className="text-muted">View and download your payment records</p>
        </Col>
        <Col xs="auto">
          <Button 
            variant="outline-primary" 
            onClick={handleDownloadHistory}
            className="d-flex align-items-center"
          >
            <FontAwesomeIcon icon={faDownload} className="me-2" />
            Download History
          </Button>
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col md={4} lg={3} xl={2} className="mb-3 mb-md-0">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex flex-column">
              <h6 className="fw-bold mb-3">Summary</h6>
              
              <div className="mb-3">
                <div className="text-muted small">Total Payments</div>
                <div className="fs-5 fw-bold">{filteredPayments.length}</div>
              </div>
              
              <div className="mb-3">
                <div className="text-muted small">Total Amount Paid</div>
                <div className="fs-5 fw-bold text-primary">{formatCurrency(totalPaid)}</div>
              </div>
              
              <div className="mt-auto">
                <div className="text-muted small mb-1">Payment Status</div>
                <div className="bg-light rounded p-2">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="small">Successful</span>
                    <Badge bg="success">
                      {filteredPayments.filter(p => p.status === 'success').length}
                    </Badge>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="small">Failed</span>
                    <Badge bg="danger">
                      {filteredPayments.filter(p => p.status !== 'success').length}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={8} lg={9} xl={10}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white py-3">
              <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold">Payment Records</h5>
                
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
              
              <div className="mt-3 d-flex flex-wrap gap-3 align-items-center">
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faCalendarAlt} className="text-muted me-2" />
                  <span className="me-2">From:</span>
                  <Form.Control
                    type="date"
                    value={dateRange.startDate}
                    onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                    style={{ width: '160px' }}
                  />
                </div>
                
                <div className="d-flex align-items-center">
                  <span className="me-2">To:</span>
                  <Form.Control
                    type="date"
                    value={dateRange.endDate}
                    onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                    style={{ width: '160px' }}
                  />
                </div>
              </div>
            </Card.Header>
            
            <Card.Body className="p-0">
              <Table
                columns={columns}
                data={filteredPayments}
                emptyMessage="No payment records found"
                pagination
                searchable={false} // We're handling search separately
                hover
                responsive
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <div className="d-flex flex-column flex-md-row align-items-md-center">
                <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-md-4 mb-3 mb-md-0 align-self-start align-self-md-center">
                  <FontAwesomeIcon icon={faFileInvoice} className="text-primary fs-4" />
                </div>
                <div>
                  <h5 className="fw-bold mb-2">Need a Receipt for Tax Purposes?</h5>
                  <p className="text-muted mb-md-0">
                    You can download all your payment receipts from the payment history. 
                    If you need a consolidated receipt for tax purposes, please contact the accounts department.
                  </p>
                </div>
                <div className="ms-md-auto mt-3 mt-md-0">
                  <Button variant="outline-primary">
                    Contact Accounts
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentHistory;