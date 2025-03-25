import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Form, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faMoneyBillWave, 
  faExclamationTriangle, 
  faChartBar, 
  faDownload, 
  faFilter, 
  faSearch 
} from '@fortawesome/free-solid-svg-icons';
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';
import { formatCurrency, formatDateTime } from '../utils/helpers';
import { adminService } from '../services/adminService';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

// Mock data for payment summary
const mockPaymentSummary = {
  totalCollected: 7250000,
  pendingAmount: 1850000,
  overdueAmount: 950000,
  totalStudents: 2500,
  paidStudents: 1875,
  pendingStudents: 625,
  overdueStudents: 320,
  collectionRate: 75
};

// Mock data for monthly trends
const mockMonthlyTrends = [
  { month: 'Jan', collected: 980000, target: 1200000 },
  { month: 'Feb', collected: 1150000, target: 1200000 },
  { month: 'Mar', collected: 1250000, target: 1200000 },
  { month: 'Apr', collected: 950000, target: 1200000 },
  { month: 'May', collected: 1100000, target: 1200000 },
  { month: 'Jun', collected: 1320000, target: 1200000 }
];

// Mock data for recent payments
const mockRecentPayments = [
  {
    id: 'SVIT25032001',
    studentName: 'Ravi Kumar',
    rollNumber: 'SVIT20CS101',
    feeType: 'Examination Fee',
    amount: 2500,
    date: '2025-03-20 09:45:23',
    mode: 'Online (UPI)',
    status: 'success'
  },
  {
    id: 'SVIT25031902',
    studentName: 'Priya Sharma',
    rollNumber: 'SVIT21ECE078',
    feeType: 'Bus Fee',
    amount: 8000,
    date: '2025-03-19 14:23:10',
    mode: 'Online (Card)',
    status: 'success'
  },
  {
    id: 'SVIT25031903',
    studentName: 'Mohammed Ali',
    rollNumber: 'SVIT22ME045',
    feeType: 'Lab Fee',
    amount: 3500,
    date: '2025-03-19 11:05:47',
    mode: 'Cash',
    status: 'success'
  },
  {
    id: 'SVIT25031904',
    studentName: 'Kiran Reddy',
    rollNumber: 'SVIT20CS087',
    feeType: 'Hostel Fee',
    amount: 25000,
    date: '2025-03-19 10:15:30',
    mode: 'Online (Net Banking)',
    status: 'success'
  },
  {
    id: 'SVIT25031905',
    studentName: 'Anjali Patel',
    rollNumber: 'SVIT21CIVIL034',
    feeType: 'Library Fee',
    amount: 1000,
    date: '2025-03-19 09:05:12',
    mode: 'Cash',
    status: 'pending'
  }
];

// Mock data for fee type distribution
const feeDistributionData = {
  labels: ['Tuition Fee', 'Hostel Fee', 'Bus Fee', 'Exam Fee', 'Library Fee', 'Lab Fee'],
  datasets: [
    {
      data: [45, 20, 15, 10, 5, 5],
      backgroundColor: [
        'rgba(75, 192, 192, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 99, 132, 0.7)'
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 99, 132, 1)'
      ],
      borderWidth: 1
    }
  ]
};

// Mock data for department wise collection
const departmentData = {
  labels: ['CSE', 'ECE', 'MECH', 'CIVIL', 'EEE'],
  datasets: [
    {
      label: 'Collection (in Lakhs)',
      data: [225, 180, 150, 120, 140],
      backgroundColor: [
        'rgba(54, 162, 235, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 99, 132, 0.7)'
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 99, 132, 1)'
      ],
      borderWidth: 1
    }
  ]
};

// Mock data for year wise payment status
const mockYearData = [
  { year: '1st Year', students: 625, amount: 4000000 },
  { year: '2nd Year', students: 600, amount: 3800000 },
  { year: '3rd Year', students: 580, amount: 3500000 },
  { year: '4th Year', students: 550, amount: 3200000 }
];

// Function to get status badge
const getStatusBadge = (status) => {
  switch(status) {
    case 'success':
      return <Badge bg="success">Successful</Badge>;
    case 'pending':
      return <Badge bg="warning" text="dark">Pending</Badge>;
    case 'failed':
      return <Badge bg="danger">Failed</Badge>;
    default:
      return <Badge bg="secondary">Unknown</Badge>;
  }
};

const AdminDashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [dateRange, setDateRange] = useState('thisMonth');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Chart data for monthly trends
  const monthlyTrendsData = {
    labels: mockMonthlyTrends.map(item => item.month),
    datasets: [
      {
        label: 'Collected',
        data: mockMonthlyTrends.map(item => item.collected),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 2
      },
      {
        label: 'Target',
        data: mockMonthlyTrends.map(item => item.target),
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgb(255, 159, 64)',
        borderWidth: 2,
        borderDash: [5, 5]
      }
    ]
  };

  useEffect(() => {
    // In a real app, this would fetch data from an API
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Fetch data using adminService
        // const summary = await adminService.getDashboardSummary();
        // const trends = await adminService.getMonthlyTrends(dateRange);
        // const payments = await adminService.getRecentPayments(5);
        
        // For now, we're using mock data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [dateRange]);
  
  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="fs-2 fw-bold">Admin Dashboard</h1>
          <p className="text-muted">
            Welcome back, {currentUser?.name || 'Admin'} | Today: {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </Col>
        <Col xs="auto">
          <Button variant="outline-primary" className="me-2">
            <FontAwesomeIcon icon={faDownload} className="me-2" />
            Export Report
          </Button>
          <Button variant="primary">
            Refresh Data
          </Button>
        </Col>
      </Row>
      
      <Row className="g-3 mb-4">
        <Col md={6} xl={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h6 className="text-muted mb-1">Total Collected</h6>
                  <h3 className="fw-bold mb-0">{formatCurrency(mockPaymentSummary.totalCollected)}</h3>
                </div>
                <div className="rounded-circle bg-primary bg-opacity-10 p-3">
                  <FontAwesomeIcon icon={faMoneyBillWave} className="text-primary fs-4" />
                </div>
              </div>
              <p className="text-success mb-0">
                <span className="fw-bold">+{mockPaymentSummary.collectionRate}%</span> collection rate
              </p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} xl={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h6 className="text-muted mb-1">Pending Amount</h6>
                  <h3 className="fw-bold mb-0">{formatCurrency(mockPaymentSummary.pendingAmount)}</h3>
                </div>
                <div className="rounded-circle bg-warning bg-opacity-10 p-3">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="text-warning fs-4" />
                </div>
              </div>
              <p className="text-muted mb-0">
                From <span className="fw-bold">{mockPaymentSummary.pendingStudents}</span> students
              </p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} xl={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h6 className="text-muted mb-1">Overdue Amount</h6>
                  <h3 className="fw-bold mb-0">{formatCurrency(mockPaymentSummary.overdueAmount)}</h3>
                </div>
                <div className="rounded-circle bg-danger bg-opacity-10 p-3">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="text-danger fs-4" />
                </div>
              </div>
              <p className="text-danger mb-0">
                From <span className="fw-bold">{mockPaymentSummary.overdueStudents}</span> students
              </p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} xl={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h6 className="text-muted mb-1">Total Students</h6>
                  <h3 className="fw-bold mb-0">{mockPaymentSummary.totalStudents}</h3>
                </div>
                <div className="rounded-circle bg-info bg-opacity-10 p-3">
                  <FontAwesomeIcon icon={faUsers} className="text-info fs-4" />
                </div>
              </div>
              
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 me-3">
                  <ProgressBar>
                    <ProgressBar variant="success" now={75} key={1} />
                    <ProgressBar variant="warning" now={17} key={2} />
                    <ProgressBar variant="danger" now={8} key={3} />
                  </ProgressBar>
                </div>
                <small className="text-muted">75% Paid</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col lg={8} className="mb-4 mb-lg-0">
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
              <h5 className="mb-0 fw-bold">Monthly Collection Trends</h5>
              <Form.Select 
                className="w-auto" 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="thisMonth">This Month</option>
                <option value="lastMonth">Last Month</option>
                <option value="lastThreeMonths">Last 3 Months</option>
                <option value="lastSixMonths">Last 6 Months</option>
                <option value="thisYear">This Year</option>
              </Form.Select>
            </Card.Header>
            <Card.Body>
              <div style={{ height: '300px' }}>
                <Chart type="bar" data={monthlyTrendsData} options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: false
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        callback: function(value) {
                          return '₹' + (value / 1000) + 'K';
                        }
                      }
                    }
                  }
                }} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white py-3">
              <h5 className="mb-0 fw-bold">Fee Type Distribution</h5>
            </Card.Header>
            <Card.Body>
              <div style={{ height: '300px' }}>
                <Chart type="doughnut" data={feeDistributionData} options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                    }
                  },
                  cutout: '60%'
                }} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white py-3">
              <Row className="align-items-center">
                <Col>
                  <h5 className="mb-0 fw-bold">Recent Payments</h5>
                </Col>
                <Col xs="auto">
                  <div className="d-flex gap-2">
                    <Form.Control
                      placeholder="Search student or receipt"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-auto"
                    />
                    <Form.Select 
                      className="w-auto" 
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <option value="all">All Payments</option>
                      <option value="success">Successful</option>
                      <option value="pending">Pending</option>
                      <option value="failed">Failed</option>
                    </Form.Select>
                  </div>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table hover className="align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Receipt ID</th>
                      <th>Student Name</th>
                      <th>Roll Number</th>
                      <th>Fee Type</th>
                      <th>Amount</th>
                      <th>Date & Time</th>
                      <th>Payment Mode</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockRecentPayments.map(payment => (
                      <tr key={payment.id}>
                        <td className="fw-medium">{payment.id}</td>
                        <td>{payment.studentName}</td>
                        <td>{payment.rollNumber}</td>
                        <td>{payment.feeType}</td>
                        <td>{formatCurrency(payment.amount)}</td>
                        <td>{formatDateTime(payment.date)}</td>
                        <td>{payment.mode}</td>
                        <td>{getStatusBadge(payment.status)}</td>
                        <td>
                          <Link to={`/admin/payment/${payment.id}`} className="btn btn-sm btn-outline-primary">
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
            <Card.Footer className="bg-white d-flex justify-content-between align-items-center">
              <p className="mb-0 text-muted">Showing {mockRecentPayments.length} of 245 payments</p>
              <Button variant="link" as={Link} to="/admin/payment-tracking" className="text-decoration-none">
                View All Payments
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col lg={7} className="mb-4 mb-lg-0">
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white py-3">
              <h5 className="mb-0 fw-bold">Department-wise Collection</h5>
            </Card.Header>
            <Card.Body>
              <div style={{ height: '300px' }}>
                <Chart type="bar" data={departmentData} options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  indexAxis: 'y',
                  plugins: {
                    legend: {
                      display: false
                    }
                  },
                  scales: {
                    x: {
                      beginAtZero: true,
                      ticks: {
                        callback: function(value) {
                          return '₹' + (value / 100000) + 'L';
                        }
                      }
                    }
                  }
                }} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={5}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white py-3">
              <h5 className="mb-0 fw-bold">Year-wise Student Payment Status</h5>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <Table className="align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Year</th>
                      <th>Students</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockYearData.map((item, index) => (
                      <tr key={index}>
                        <td>{item.year}</td>
                        <td>{item.students}</td>
                        <td>{formatCurrency(item.amount)}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <ProgressBar 
                              className="flex-grow-1 me-2" 
                              style={{ height: '8px' }}
                              variant={index % 2 === 0 ? "success" : "info"}
                              now={70 + index * 5} 
                            />
                            <span className="text-muted small">{70 + index * 5}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <div className="text-center mt-3">
                <Button variant="outline-primary" size="sm" as={Link} to="/admin/reports">
                  View Detailed Reports
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;