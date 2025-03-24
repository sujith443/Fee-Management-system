import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge, Tabs, Tab, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faDownload, faPrint, faSearch, faExclamationTriangle, faCheckCircle, faEye } from '@fortawesome/free-solid-svg-icons';
import Table from '../common/Table';
import { adminService } from '../../services/adminService';

// Mock data for payment transactions
const mockPayments = [
  {
    id: 'SVIT25032001',
    studentName: 'Ravi Kumar',
    rollNumber: 'SVIT20CS101',
    branch: 'CSE',
    semester: 3,
    feeType: 'Examination Fee',
    amount: 2500,
    date: '2025-03-20 09:45:23',
    mode: 'Online (UPI)',
    reference: 'UPI123456789',
    status: 'success'
  },
  {
    id: 'SVIT25031902',
    studentName: 'Priya Sharma',
    rollNumber: 'SVIT21ECE078',
    branch: 'ECE',
    semester: 2,
    feeType: 'Bus Fee',
    amount: 8000,
    date: '2025-03-19 14:23:10',
    mode: 'Online (Card)',
    reference: 'CARD654321',
    status: 'success'
  },
  {
    id: 'SVIT25031903',
    studentName: 'Mohammed Ali',
    rollNumber: 'SVIT22ME045',
    branch: 'MECH',
    semester: 1,
    feeType: 'Lab Fee',
    amount: 3500,
    date: '2025-03-19 11:05:47',
    mode: 'Cash',
    reference: 'CASH789012',
    status: 'success'
  },
  {
    id: 'SVIT25031804',
    studentName: 'Kiran Reddy',
    rollNumber: 'SVIT20CS087',
    branch: 'CSE',
    semester: 3,
    feeType: 'Library Fee',
    amount: 1000,
    date: '2025-03-18 15:30:22',
    mode: 'Online (Net Banking)',
    reference: 'NB345678',
    status: 'success'
  },
  {
    id: 'SVIT25031805',
    studentName: 'Anjali Patel',
    rollNumber: 'SVIT21CIVIL034',
    branch: 'CIVIL',
    semester: 2,
    feeType: 'Hostel Fee',
    amount: 25000,
    date: '2025-03-18 10:12:55',
    mode: 'DD',
    reference: 'DD567890',
    status: 'pending'
  },
  {
    id: 'SVIT25031806',
    studentName: 'Srinivas Kumar',
    rollNumber: 'SVIT22EEE076',
    branch: 'EEE',
    semester: 1,
    feeType: 'Examination Fee',
    amount: 2500,
    date: '2025-03-18 09:22:14',
    mode: 'Online (UPI)',
    reference: 'UPI654789',
    status: 'failed'
  },
  {
    id: 'SVIT25031707',
    studentName: 'Lakshmi Devi',
    rollNumber: 'SVIT20ECE045',
    branch: 'ECE',
    semester: 4,
    feeType: 'Lab Fee',
    amount: 4000,
    date: '2025-03-17 16:45:30',
    mode: 'Online (Card)',
    reference: 'CARD123789',
    status: 'success'
  },
  {
    id: 'SVIT25031708',
    studentName: 'Rajesh Singh',
    rollNumber: 'SVIT21ME034',
    branch: 'MECH',
    semester: 2,
    feeType: 'Bus Fee',
    amount: 8000,
    date: '2025-03-17 14:10:05',
    mode: 'Cash',
    reference: 'CASH234567',
    status: 'success'
  },
  {
    id: 'SVIT25031609',
    studentName: 'Priyanka Reddy',
    rollNumber: 'SVIT20CIVIL089',
    branch: 'CIVIL',
    semester: 3,
    feeType: 'Hostel Fee',
    amount: 25000,
    date: '2025-03-16 11:30:45',
    mode: 'DD',
    reference: 'DD890123',
    status: 'success'
  },
  {
    id: 'SVIT25031610',
    studentName: 'Suresh Kumar',
    rollNumber: 'SVIT22CS023',
    branch: 'CSE',
    semester: 1,
    feeType: 'Library Fee',
    amount: 1000,
    date: '2025-03-16 10:15:20',
    mode: 'Online (UPI)',
    reference: 'UPI901234',
    status: 'pending'
  }
];

// Mock data for fee types
const feeTypes = ['All', 'Examination Fee', 'Bus Fee', 'Hostel Fee', 'Library Fee', 'Lab Fee'];

// Mock data for branches
const branches = ['All', 'CSE', 'ECE', 'MECH', 'CIVIL', 'EEE'];

// Mock data for payment modes
const paymentModes = ['All', 'Online (UPI)', 'Online (Card)', 'Online (Net Banking)', 'Cash', 'DD'];

// Mock data for payment statuses
const paymentStatuses = ['All', 'success', 'pending', 'failed'];

const PaymentTracking = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [filterBranch, setFilterBranch] = useState('All');
  const [filterFeeType, setFilterFeeType] = useState('All');
  const [filterPaymentMode, setFilterPaymentMode] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [dateRange, setDateRange] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Stats
  const [stats, setStats] = useState({
    totalAmount: 0,
    successfulPayments: 0,
    pendingPayments: 0,
    failedPayments: 0
  });
  
  // Fetch payments
  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setPayments(mockPayments);
          setFilteredPayments(mockPayments);
          setLoading(false);
        }, 800);
      } catch (error) {
        setError('Failed to fetch payment data. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchPayments();
  }, []);
  
  // Apply filters
  useEffect(() => {
    let filtered = [...payments];
    
    // Filter by branch
    if (filterBranch !== 'All') {
      filtered = filtered.filter(payment => payment.branch === filterBranch);
    }
    
    // Filter by fee type
    if (filterFeeType !== 'All') {
      filtered = filtered.filter(payment => payment.feeType === filterFeeType);
    }
    
    // Filter by payment mode
    if (filterPaymentMode !== 'All') {
      filtered = filtered.filter(payment => payment.mode === filterPaymentMode);
    }
    
    // Filter by status
    if (filterStatus !== 'All') {
      filtered = filtered.filter(payment => payment.status === filterStatus);
    }
    
    // Filter by date range
    if (dateRange !== 'all') {
      const now = new Date();
      let startDate;
      
      switch (dateRange) {
        case 'today':
          startDate = new Date(now.setHours(0, 0, 0, 0));
          break;
        case 'yesterday':
          startDate = new Date(now.setDate(now.getDate() - 1));
          startDate.setHours(0, 0, 0, 0);
          break;
        case 'last7days':
          startDate = new Date(now.setDate(now.getDate() - 7));
          break;
        case 'thisMonth':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case 'lastMonth':
          startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
          break;
        default:
          startDate = null;
      }
      
      if (startDate) {
        filtered = filtered.filter(payment => new Date(payment.date) >= startDate);
      }
    }
    
    // Search functionality
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(payment => 
        payment.id.toLowerCase().includes(term) ||
        payment.studentName.toLowerCase().includes(term) ||
        payment.rollNumber.toLowerCase().includes(term) ||
        payment.reference.toLowerCase().includes(term)
      );
    }
    
    setFilteredPayments(filtered);
    
    // Calculate stats
    const totalAmount = filtered.reduce((sum, payment) => {
      if (payment.status === 'success') {
        return sum + payment.amount;
      }
      return sum;
    }, 0);
    
    const successfulPayments = filtered.filter(payment => payment.status === 'success').length;
    const pendingPayments = filtered.filter(payment => payment.status === 'pending').length;
    const failedPayments = filtered.filter(payment => payment.status === 'failed').length;
    
    setStats({
      totalAmount,
      successfulPayments,
      pendingPayments,
      failedPayments
    });
  }, [payments, filterBranch, filterFeeType, filterPaymentMode, filterStatus, dateRange, searchTerm]);
  
  // Reset filters
  const resetFilters = () => {
    setFilterBranch('All');
    setFilterFeeType('All');
    setFilterPaymentMode('All');
    setFilterStatus('All');
    setDateRange('all');
    setSearchTerm('');
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };
  
  // Format currency
  const formatCurrency = (amount) => {
    return '₹' + amount.toLocaleString('en-IN');
  };
  
  // Get status badge
  const getStatusBadge = (status) => {
    switch(status) {
      case 'success':
        return <Badge bg="success">Success</Badge>;
      case 'pending':
        return <Badge bg="warning" text="dark">Pending</Badge>;
      case 'failed':
        return <Badge bg="danger">Failed</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };
  
  // Table columns
  const columns = [
    {
      field: 'id',
      header: 'Receipt ID',
      sortable: true
    },
    {
      field: 'studentName',
      header: 'Student Name',
      sortable: true,
      cell: (row) => (
        <div>
          <div className="fw-medium">{row.studentName}</div>
          <small className="text-muted">{row.rollNumber}</small>
        </div>
      )
    },
    {
      field: 'branch',
      header: 'Branch',
      sortable: true
    },
    {
      field: 'feeType',
      header: 'Fee Type',
      sortable: true
    },
    {
      field: 'amount',
      header: 'Amount',
      sortable: true,
      cell: (row) => formatCurrency(row.amount)
    },
    {
      field: 'date',
      header: 'Date & Time',
      sortable: true,
      cell: (row) => formatDate(row.date)
    },
    {
      field: 'mode',
      header: 'Payment Mode',
      sortable: true
    },
    {
      field: 'reference',
      header: 'Reference',
      sortable: true
    },
    {
      field: 'status',
      header: 'Status',
      sortable: true,
      cell: (row) => getStatusBadge(row.status)
    },
    {
      field: 'actions',
      header: 'Actions',
      sortable: false,
      cell: (row) => (
        <Link to={`/admin/payment/${row.id}`} className="btn btn-sm btn-outline-primary">
          <FontAwesomeIcon icon={faEye} className="me-1" /> View
        </Link>
      )
    }
  ];
  
  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }
  
  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="fs-2 fw-bold">Payment Tracking</h1>
          <p className="text-muted">Monitor and manage all student fee payments</p>
        </Col>
        <Col xs="auto">
          <Button variant="outline-primary" className="me-2">
            <FontAwesomeIcon icon={faDownload} className="me-2" />
            Export Report
          </Button>
          <Button variant="outline-secondary">
            <FontAwesomeIcon icon={faPrint} className="me-2" />
            Print
          </Button>
        </Col>
      </Row>
      
      {error && (
        <Row className="mb-4">
          <Col>
            <Alert variant="danger">{error}</Alert>
          </Col>
        </Row>
      )}
      
      <Row className="mb-4">
        <Col md={6} lg={3} className="mb-3 mb-lg-0">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex flex-column">
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle bg-success bg-opacity-10 p-3 me-3">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-success fs-4" />
                </div>
                <div>
                  <h6 className="text-muted mb-0">Successful Payments</h6>
                  <h3 className="fw-bold mb-0">{stats.successfulPayments}</h3>
                </div>
              </div>
              <div className="mt-auto">
                <h5 className="text-success fw-bold mb-0">
                  {formatCurrency(stats.totalAmount)}
                </h5>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={3} className="mb-3 mb-lg-0">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex flex-column">
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle bg-warning bg-opacity-10 p-3 me-3">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="text-warning fs-4" />
                </div>
                <div>
                  <h6 className="text-muted mb-0">Pending Payments</h6>
                  <h3 className="fw-bold mb-0">{stats.pendingPayments}</h3>
                </div>
              </div>
              <div className="mt-auto">
                <Button 
                  as={Link}
                  to="/admin/payment-tracking?status=pending"
                  variant="outline-warning" 
                  size="sm" 
                  className="w-100"
                >
                  View Pending
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={3} className="mb-3 mb-lg-0">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex flex-column">
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle bg-danger bg-opacity-10 p-3 me-3">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="text-danger fs-4" />
                </div>
                <div>
                  <h6 className="text-muted mb-0">Failed Payments</h6>
                  <h3 className="fw-bold mb-0">{stats.failedPayments}</h3>
                </div>
              </div>
              <div className="mt-auto">
                <Button 
                  as={Link}
                  to="/admin/payment-tracking?status=failed"
                  variant="outline-danger" 
                  size="sm" 
                  className="w-100"
                >
                  View Failed
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex flex-column">
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                  <FontAwesomeIcon icon={faFilter} className="text-primary fs-4" />
                </div>
                <div>
                  <h6 className="text-muted mb-0">Current Search</h6>
                  <h3 className="fw-bold mb-0">{filteredPayments.length}</h3>
                </div>
              </div>
              <div className="mt-auto">
                <Button 
                  variant="outline-primary" 
                  size="sm" 
                  className="w-100"
                  onClick={resetFilters}
                >
                  Reset Filters
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white py-3">
              <h5 className="mb-0 fw-bold">Payment Filters</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6} lg={3} className="mb-3">
                  <Form.Group>
                    <Form.Label>Branch</Form.Label>
                    <Form.Select
                      value={filterBranch}
                      onChange={(e) => setFilterBranch(e.target.value)}
                    >
                      {branches.map((branch) => (
                        <option key={branch} value={branch}>{branch}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                
                <Col md={6} lg={3} className="mb-3">
                  <Form.Group>
                    <Form.Label>Fee Type</Form.Label>
                    <Form.Select
                      value={filterFeeType}
                      onChange={(e) => setFilterFeeType(e.target.value)}
                    >
                      {feeTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                
                <Col md={6} lg={3} className="mb-3">
                  <Form.Group>
                    <Form.Label>Payment Mode</Form.Label>
                    <Form.Select
                      value={filterPaymentMode}
                      onChange={(e) => setFilterPaymentMode(e.target.value)}
                    >
                      {paymentModes.map((mode) => (
                        <option key={mode} value={mode}>{mode}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                
                <Col md={6} lg={3} className="mb-3">
                  <Form.Group>
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      {paymentStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status === 'All' ? 'All' : 
                           status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                
                <Col md={6} lg={3} className="mb-3">
                  <Form.Group>
                    <Form.Label>Date Range</Form.Label>
                    <Form.Select
                      value={dateRange}
                      onChange={(e) => setDateRange(e.target.value)}
                    >
                      <option value="all">All Time</option>
                      <option value="today">Today</option>
                      <option value="yesterday">Yesterday</option>
                      <option value="last7days">Last 7 Days</option>
                      <option value="thisMonth">This Month</option>
                      <option value="lastMonth">Last Month</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                
                <Col md={6} lg={3} className="mb-3">
                  <Form.Group>
                    <Form.Label>Search</Form.Label>
                    <div className="d-flex">
                      <Form.Control
                        type="text"
                        placeholder="Receipt ID, Name, Roll No"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <Button variant="outline-primary" className="ms-2">
                        <FontAwesomeIcon icon={faSearch} />
                      </Button>
                    </div>
                  </Form.Group>
                </Col>
                
                <Col md={12} className="mt-2 d-flex justify-content-end">
                  <Button 
                    variant="outline-secondary" 
                    className="me-2"
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </Button>
                  <Button variant="primary">
                    Apply Filters
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white py-3">
              <h5 className="mb-0 fw-bold">Payment Transactions</h5>
            </Card.Header>
            <Card.Body className="p-0">
              <Tabs defaultActiveKey="all" className="px-3 pt-3">
                <Tab eventKey="all" title="All Payments">
                  <Table
                    columns={columns}
                    data={filteredPayments}
                    pagination={true}
                    searchable={false}
                    responsive={true}
                    emptyMessage="No payment transactions found"
                  />
                </Tab>
                <Tab eventKey="success" title="Successful">
                  <Table
                    columns={columns}
                    data={filteredPayments.filter(p => p.status === 'success')}
                    pagination={true}
                    searchable={false}
                    responsive={true}
                    emptyMessage="No successful payment transactions found"
                  />
                </Tab>
                <Tab eventKey="pending" title="Pending">
                  <Table
                    columns={columns}
                    data={filteredPayments.filter(p => p.status === 'pending')}
                    pagination={true}
                    searchable={false}
                    responsive={true}
                    emptyMessage="No pending payment transactions found"
                  />
                </Tab>
                <Tab eventKey="failed" title="Failed">
                  <Table
                    columns={columns}
                    data={filteredPayments.filter(p => p.status === 'failed')}
                    pagination={true}
                    searchable={false}
                    responsive={true}
                    emptyMessage="No failed payment transactions found"
                  />
                </Tab>
              </Tabs>
            </Card.Body>
            <Card.Footer className="bg-white py-3">
              <div className="d-flex justify-content-between align-items-center">
                <div className="text-muted small">
                  Showing {filteredPayments.length} of {payments.length} payments
                </div>
                <div>
                  <Button variant="outline-primary" size="sm" className="me-2">
                    <FontAwesomeIcon icon={faDownload} className="me-2" />
                    Export CSV
                  </Button>
                  <Button variant="outline-secondary" size="sm">
                    <FontAwesomeIcon icon={faPrint} className="me-2" />
                    Print
                  </Button>
                </div>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentTracking;