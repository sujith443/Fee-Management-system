import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner, Alert, Tabs, Tab } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faPrint, faFilter, faChartBar, faFileAlt, faCalendarAlt, faBuilding, faUser, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { Chart } from 'react-chartjs-2';
import { adminService } from '../../services/adminService';

// Mock data for revenue by fee type
const mockRevenueByFeeType = {
  labels: ['Examination Fee', 'Bus Fee', 'Hostel Fee', 'Library Fee', 'Lab Fee'],
  data: [250000, 800000, 2500000, 100000, 350000]
};

// Mock data for revenue by branch
const mockRevenueByBranch = {
  labels: ['CSE', 'ECE', 'MECH', 'CIVIL', 'EEE'],
  data: [1500000, 1000000, 800000, 600000, 500000]
};

// Mock data for revenue by month
const mockRevenueByMonth = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  actual: [980000, 1050000, 1200000, 950000, 1100000, 1320000],
  target: [1000000, 1000000, 1000000, 1000000, 1000000, 1000000]
};

// Mock data for payment mode distribution
const mockPaymentModeDistribution = {
  labels: ['UPI', 'Card', 'Net Banking', 'Cash', 'DD'],
  data: [45, 25, 15, 10, 5]
};

// Mock data for reports list
const mockReports = [
  {
    id: 1,
    name: 'Collection Summary Report',
    description: 'Summary of all fee collections in the selected period',
    format: 'PDF, Excel',
    lastGenerated: '2025-03-15'
  },
  {
    id: 2,
    name: 'Student Payment Report',
    description: 'Detailed payment records for all students',
    format: 'PDF, Excel',
    lastGenerated: '2025-03-10'
  },
  {
    id: 3,
    name: 'Fee Structure Report',
    description: 'Current fee structures for all branches and semesters',
    format: 'PDF, Excel',
    lastGenerated: '2025-02-25'
  },
  {
    id: 4,
    name: 'Pending Fees Report',
    description: 'List of all pending fee payments by students',
    format: 'PDF, Excel',
    lastGenerated: '2025-03-18'
  },
  {
    id: 5,
    name: 'Overdue Payments Report',
    description: 'List of all overdue fee payments',
    format: 'PDF, Excel',
    lastGenerated: '2025-03-18'
  },
  {
    id: 6,
    name: 'Branch-wise Collection Report',
    description: 'Fee collection statistics by branch',
    format: 'PDF, Excel',
    lastGenerated: '2025-03-05'
  },
  {
    id: 7,
    name: 'Semester-wise Collection Report',
    description: 'Fee collection statistics by semester',
    format: 'PDF, Excel',
    lastGenerated: '2025-03-05'
  },
  {
    id: 8,
    name: 'Payment Mode Analysis Report',
    description: 'Analysis of different payment modes used by students',
    format: 'PDF, Excel',
    lastGenerated: '2025-03-01'
  }
];

const Reports = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reportType, setReportType] = useState('');
  const [dateRange, setDateRange] = useState('thisMonth');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [branch, setBranch] = useState('All');
  const [semester, setSemester] = useState('All');
  const [feeType, setFeeType] = useState('All');
  const [format, setFormat] = useState('pdf');
  const [generating, setGenerating] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Set default dates
  useEffect(() => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    setEndDate(today.toISOString().split('T')[0]);
    setStartDate(firstDayOfMonth.toISOString().split('T')[0]);
  }, []);
  
  // Handle date range change
  const handleDateRangeChange = (e) => {
    const range = e.target.value;
    setDateRange(range);
    
    const today = new Date();
    let start = new Date();
    
    switch (range) {
      case 'today':
        start = new Date(today);
        break;
      case 'yesterday':
        start = new Date(today);
        start.setDate(today.getDate() - 1);
        break;
      case 'last7days':
        start = new Date(today);
        start.setDate(today.getDate() - 7);
        break;
      case 'thisMonth':
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case 'lastMonth':
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        setEndDate(lastDayOfLastMonth.toISOString().split('T')[0]);
        break;
      case 'thisYear':
        start = new Date(today.getFullYear(), 0, 1);
        break;
      case 'custom':
        // Don't change dates for custom range
        return;
      default:
        start = new Date(today.getFullYear(), today.getMonth(), 1);
    }
    
    setStartDate(start.toISOString().split('T')[0]);
    
    if (range !== 'lastMonth') {
      setEndDate(today.toISOString().split('T')[0]);
    }
  };
  
  // Generate report
  const handleGenerateReport = async () => {
    if (!reportType) {
      setError('Please select a report type');
      return;
    }
    
    setGenerating(true);
    setError(null);
    setSuccess(false);
    
    try {
      // In a real app, this would call an API to generate the report
      const result = await new Promise(resolve => {
        setTimeout(() => {
          resolve({
            success: true,
            message: 'Report generated successfully',
            downloadUrl: '#'
          });
        }, 2000);
      });
      
      setSuccess(true);
    } catch (error) {
      setError('Failed to generate report. Please try again.');
    } finally {
      setGenerating(false);
    }
  };
  
  // Format currency
  const formatCurrency = (amount) => {
    return '₹' + amount.toLocaleString('en-IN');
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };
  
  // Get chart data for revenue by fee type
  const getRevenueByFeeTypeData = () => {
    return {
      labels: mockRevenueByFeeType.labels,
      datasets: [
        {
          label: 'Revenue by Fee Type',
          data: mockRevenueByFeeType.data,
          backgroundColor: [
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 99, 132, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1
        }
      ]
    };
  };
  
  // Get chart data for revenue by branch
  const getRevenueByBranchData = () => {
    return {
      labels: mockRevenueByBranch.labels,
      datasets: [
        {
          label: 'Revenue by Branch',
          data: mockRevenueByBranch.data,
          backgroundColor: 'rgba(75, 192, 192, 0.7)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    };
  };
  
  // Get chart data for revenue by month
  const getRevenueByMonthData = () => {
    return {
      labels: mockRevenueByMonth.labels,
      datasets: [
        {
          label: 'Actual Revenue',
          data: mockRevenueByMonth.actual,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
          type: 'bar'
        },
        {
          label: 'Target Revenue',
          data: mockRevenueByMonth.target,
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
          borderDash: [5, 5],
          type: 'line',
          fill: false
        }
      ]
    };
  };
  
  // Get chart data for payment mode distribution
  const getPaymentModeDistributionData = () => {
    return {
      labels: mockPaymentModeDistribution.labels,
      datasets: [
        {
          label: 'Payment Mode Distribution',
          data: mockPaymentModeDistribution.data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1
        }
      ]
    };
  };
  
  // Get chart options
  const getChartOptions = (title, showLegend = true) => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          display: showLegend
        },
        title: {
          display: true,
          text: title,
          font: {
            size: 16
          }
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
    };
  };
  
  // Get doughnut chart options
  const getDoughnutOptions = (title) => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right'
        },
        title: {
          display: true,
          text: title,
          font: {
            size: 16
          }
        }
      },
      cutout: '60%'
    };
  };
  
  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="fs-2 fw-bold">Reports & Analytics</h1>
          <p className="text-muted">Generate and download various reports</p>
        </Col>
      </Row>
      
      <Tabs defaultActiveKey="reports" className="mb-4">
        <Tab eventKey="reports" title="Generate Reports">
          <Row>
            <Col>
              <Card className="border-0 shadow-sm mb-4">
                <Card.Header className="bg-white py-3">
                  <h5 className="mb-0 fw-bold">Report Generator</h5>
                </Card.Header>
                <Card.Body>
                  {error && <Alert variant="danger">{error}</Alert>}
                  {success && (
                    <Alert variant="success">
                      Report generated successfully! <a href="#" className="fw-bold">Click here to download</a>
                    </Alert>
                  )}
                  
                  <Row>
                    <Col md={6} lg={4} className="mb-3">
                      <Form.Group>
                        <Form.Label>Report Type</Form.Label>
                        <Form.Select
                          value={reportType}
                          onChange={(e) => setReportType(e.target.value)}
                        >
                          <option value="">Select Report Type</option>
                          {mockReports.map(report => (
                            <option key={report.id} value={report.id}>
                              {report.name}
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
                          onChange={handleDateRangeChange}
                        >
                          <option value="today">Today</option>
                          <option value="yesterday">Yesterday</option>
                          <option value="last7days">Last 7 Days</option>
                          <option value="thisMonth">This Month</option>
                          <option value="lastMonth">Last Month</option>
                          <option value="thisYear">This Year</option>
                          <option value="custom">Custom Range</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    
                    {dateRange === 'custom' && (
                      <>
                        <Col md={6} lg={2} className="mb-3">
                          <Form.Group>
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                              type="date"
                              value={startDate}
                              onChange={(e) => setStartDate(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                        
                        <Col md={6} lg={2} className="mb-3">
                          <Form.Group>
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                              type="date"
                              value={endDate}
                              onChange={(e) => setEndDate(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                      </>
                    )}
                    
                    <Col md={6} lg={3} xl={2} className="mb-3">
                      <Form.Group>
                        <Form.Label>Branch</Form.Label>
                        <Form.Select
                          value={branch}
                          onChange={(e) => setBranch(e.target.value)}
                        >
                          <option value="All">All Branches</option>
                          <option value="CSE">CSE</option>
                          <option value="ECE">ECE</option>
                          <option value="MECH">MECH</option>
                          <option value="CIVIL">CIVIL</option>
                          <option value="EEE">EEE</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    
                    <Col md={6} lg={3} xl={2} className="mb-3">
                      <Form.Group>
                        <Form.Label>Semester</Form.Label>
                        <Form.Select
                          value={semester}
                          onChange={(e) => setSemester(e.target.value)}
                        >
                          <option value="All">All Semesters</option>
                          <option value="1">Semester 1</option>
                          <option value="2">Semester 2</option>
                          <option value="3">Semester 3</option>
                          <option value="4">Semester 4</option>
                          <option value="5">Semester 5</option>
                          <option value="6">Semester 6</option>
                          <option value="7">Semester 7</option>
                          <option value="8">Semester 8</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    
                    <Col md={6} lg={3} xl={2} className="mb-3">
                      <Form.Group>
                        <Form.Label>Fee Type</Form.Label>
                        <Form.Select
                          value={feeType}
                          onChange={(e) => setFeeType(e.target.value)}
                        >
                          <option value="All">All Fee Types</option>
                          <option value="Examination Fee">Examination Fee</option>
                          <option value="Bus Fee">Bus Fee</option>
                          <option value="Hostel Fee">Hostel Fee</option>
                          <option value="Library Fee">Library Fee</option>
                          <option value="Lab Fee">Lab Fee</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    
                    <Col md={6} lg={3} xl={2} className="mb-3">
                      <Form.Group>
                        <Form.Label>Format</Form.Label>
                        <Form.Select
                          value={format}
                          onChange={(e) => setFormat(e.target.value)}
                        >
                          <option value="pdf">PDF</option>
                          <option value="excel">Excel</option>
                          <option value="csv">CSV</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <div className="d-flex justify-content-end mt-2">
                    <Button 
                      variant="primary" 
                      onClick={handleGenerateReport}
                      disabled={generating || !reportType}
                    >
                      {generating ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                          />
                          Generating...
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faDownload} className="me-2" />
                          Generate Report
                        </>
                      )}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
              
              <Card className="border-0 shadow-sm">
                <Card.Header className="bg-white py-3">
                  <h5 className="mb-0 fw-bold">Available Reports</h5>
                </Card.Header>
                <Card.Body className="p-0">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Report Name</th>
                          <th>Description</th>
                          <th>Available Formats</th>
                          <th>Last Generated</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockReports.map(report => (
                          <tr key={report.id}>
                            <td className="fw-medium">{report.name}</td>
                            <td>{report.description}</td>
                            <td>{report.format}</td>
                            <td>{formatDate(report.lastGenerated)}</td>
                            <td>
                              <Button variant="outline-primary" size="sm" className="me-2">
                                <FontAwesomeIcon icon={faDownload} className="me-1" /> Download
                              </Button>
                              <Button variant="outline-secondary" size="sm">
                                <FontAwesomeIcon icon={faPrint} className="me-1" /> Print
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>
        
        <Tab eventKey="analytics" title="Analytics Dashboard">
          <Row className="mb-4">
            <Col lg={6} xl={3} className="mb-4 mb-xl-0">
              <Card className="border-0 shadow-sm h-100">
                <Card.Body>
                  <h6 className="text-muted mb-3">Total Revenue (This Month)</h6>
                  <h2 className="fw-bold mb-0">{formatCurrency(4000000)}</h2>
                  <div className="mt-3 d-flex align-items-center">
                    <span className="text-success me-2">+15.2%</span>
                    <span className="text-muted small">vs Last Month</span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={6} xl={3} className="mb-4 mb-xl-0">
              <Card className="border-0 shadow-sm h-100">
                <Card.Body>
                  <h6 className="text-muted mb-3">Collection Rate</h6>
                  <h2 className="fw-bold mb-0">78.5%</h2>
                  <div className="mt-3 d-flex align-items-center">
                    <span className="text-success me-2">+5.3%</span>
                    <span className="text-muted small">vs Last Month</span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={6} xl={3} className="mb-4 mb-xl-0">
              <Card className="border-0 shadow-sm h-100">
                <Card.Body>
                  <h6 className="text-muted mb-3">Pending Fees</h6>
                  <h2 className="fw-bold mb-0">{formatCurrency(1200000)}</h2>
                  <div className="mt-3 d-flex align-items-center">
                    <span className="text-danger me-2">+2.1%</span>
                    <span className="text-muted small">vs Last Month</span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={6} xl={3} className="mb-4 mb-xl-0">
              <Card className="border-0 shadow-sm h-100">
                <Card.Body>
                  <h6 className="text-muted mb-3">Fee Collection Target</h6>
                  <h2 className="fw-bold mb-0">{formatCurrency(5200000)}</h2>
                  <div className="mt-3 d-flex align-items-center">
                    <span className="text-muted small">77% of target achieved</span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          <Row className="mb-4">
            <Col lg={8}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 fw-bold">Monthly Revenue Trends</h5>
                  <Form.Select style={{ width: '150px' }}>
                    <option>Last 6 Months</option>
                    <option>This Year</option>
                    <option>Last Year</option>
                  </Form.Select>
                </Card.Header>
                <Card.Body>
                  <div style={{ height: '300px' }}>
                    <Chart 
                      type="bar" 
                      data={getRevenueByMonthData()} 
                      options={getChartOptions('Monthly Revenue Analysis')}
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={4}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Header className="bg-white py-3">
                  <h5 className="mb-0 fw-bold">Payment Mode Distribution</h5>
                </Card.Header>
                <Card.Body>
                  <div style={{ height: '300px' }}>
                    <Chart 
                      type="doughnut" 
                      data={getPaymentModeDistributionData()} 
                      options={getDoughnutOptions('Payment Methods (%)')}
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          <Row>
            <Col lg={6}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Header className="bg-white py-3">
                  <h5 className="mb-0 fw-bold">Revenue by Fee Type</h5>
                </Card.Header>
                <Card.Body>
                  <div style={{ height: '300px' }}>
                    <Chart 
                      type="pie" 
                      data={getRevenueByFeeTypeData()} 
                      options={getDoughnutOptions('Fee Type Distribution')}
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={6}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Header className="bg-white py-3">
                  <h5 className="mb-0 fw-bold">Revenue by Branch</h5>
                </Card.Header>
                <Card.Body>
                  <div style={{ height: '300px' }}>
                    <Chart 
                      type="bar" 
                      data={getRevenueByBranchData()} 
                      options={getChartOptions('Branch-wise Revenue', false)}
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Reports;