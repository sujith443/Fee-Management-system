import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge, Alert, Modal, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { adminService } from '../../services/adminService';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faFilter, 
  faUserGraduate, 
  faFileExport,
  faUserPlus,
  faEnvelope,
  faEdit,
  faTrashAlt,
  faEye,
  faCheck,
  faTimes,
  faFileUpload,
  faSortAmountDown,
  faSortAmountUp
} from '@fortawesome/free-solid-svg-icons';
import Table from '../common/Table';
import Loader from '../common/Loader';
import { BRANCHES } from '../../utils/constants';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    branch: '',
    semester: '',
    status: '',
    search: ''
  });
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showSendReminder, setShowSendReminder] = useState(false);
  const [reminderMessage, setReminderMessage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [bulkAction, setBulkAction] = useState('');
  
  // New student form data
  const [newStudentData, setNewStudentData] = useState({
    name: '',
    rollNumber: '',
    branch: 'CSE',
    semester: 1,
    email: '',
    phone: '',
    address: '',
    gender: 'Male',
    dateOfBirth: '',
    guardianName: '',
    guardianPhone: ''
  });
  
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const data = await adminService.getStudents(filters);
        
        // Apply sorting
        const sortedData = [...data].sort((a, b) => {
          const aValue = a[sortField];
          const bValue = b[sortField];
          
          if (sortDirection === 'asc') {
            return aValue > bValue ? 1 : -1;
          } else {
            return aValue < bValue ? 1 : -1;
          }
        });
        
        setStudents(sortedData);
      } catch (err) {
        console.error('Error fetching students:', err);
        setError('Failed to load students. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchStudents();
  }, [filters, sortField, sortDirection]);
  
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleResetFilters = () => {
    setFilters({
      branch: '',
      semester: '',
      status: '',
      search: ''
    });
  };
  
  const handleSelectionChange = (selectedIds) => {
    setSelectedStudents(selectedIds);
  };
  
  const handleSendReminders = () => {
    setReminderMessage(`Dear Student,\n\nThis is a reminder that you have pending fee payments. Please log in to the student portal and complete your payment at your earliest convenience.\n\nRegards,\nSVIT College Accounts Department`);
    setShowSendReminder(true);
  };
  
  const handleConfirmSendReminders = async () => {
    try {
      setLoading(true);
      
      // In a real app, this would send reminders to the selected students
      await adminService.sendReminders(selectedStudents, reminderMessage);
      
      setShowSendReminder(false);
      setReminderMessage('');
      setSelectedStudents([]);
      
      // Show success message (in a real app, this would use a proper notification system)
      alert(`Reminders sent to ${selectedStudents.length} students successfully`);
    } catch (err) {
      console.error('Error sending reminders:', err);
      setError('Failed to send reminders. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteStudent = (student) => {
    setStudentToDelete(student);
    setShowDeleteModal(true);
  };
  
  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      
      // In a real app, this would call an API to delete the student
      // Mock deletion by removing from the state
      setStudents(prev => prev.filter(s => s.id !== studentToDelete.id));
      
      setShowDeleteModal(false);
      setStudentToDelete(null);
      
      // Show success message
      alert(`Student ${studentToDelete.name} deleted successfully`);
    } catch (err) {
      console.error('Error deleting student:', err);
      setError('Failed to delete student. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const handleBulkAction = async () => {
    if (!bulkAction || selectedStudents.length === 0) return;
    
    try {
      setLoading(true);
      
      switch (bulkAction) {
        case 'reminder':
          handleSendReminders();
          break;
        case 'export':
          // In a real app, this would export selected student data
          alert(`Exported data for ${selectedStudents.length} students`);
          break;
        case 'delete':
          if (window.confirm(`Are you sure you want to delete ${selectedStudents.length} students? This action cannot be undone.`)) {
            // In a real app, this would call an API to delete multiple students
            setStudents(prev => prev.filter(s => !selectedStudents.includes(s.id)));
            setSelectedStudents([]);
            alert(`${selectedStudents.length} students deleted successfully`);
          }
          break;
        default:
          break;
      }
    } catch (err) {
      console.error('Error processing bulk action:', err);
      setError('Failed to process bulk action. Please try again.');
    } finally {
      setLoading(false);
      setBulkAction('');
    }
  };
  
  const handleNewStudentChange = (e) => {
    const { name, value } = e.target;
    setNewStudentData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      // In a real app, this would call an API to add a new student
      const newStudent = {
        id: Date.now(),
        ...newStudentData,
        totalFees: 35000,
        paidFees: 0,
        pendingFees: 35000,
        lastPaymentDate: null
      };
      
      setStudents(prev => [...prev, newStudent]);
      setShowAddStudentModal(false);
      setNewStudentData({
        name: '',
        rollNumber: '',
        branch: 'CSE',
        semester: 1,
        email: '',
        phone: '',
        address: '',
        gender: 'Male',
        dateOfBirth: '',
        guardianName: '',
        guardianPhone: ''
      });
      
      // Show success message
      alert(`Student ${newStudent.name} added successfully`);
    } catch (err) {
      console.error('Error adding student:', err);
      setError('Failed to add student. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleFileUpload = (e) => {
    e.preventDefault();
    // In a real app, this would process the uploaded file
    alert('File uploaded successfully. Student data will be processed.');
    setShowUploadModal(false);
  };
  
  // Generate table columns
  const columns = [
    {
      field: 'name',
      header: (
        <div className="d-flex align-items-center" onClick={() => handleSort('name')}>
          Student Name
          <span className="ms-2">
            {sortField === 'name' ? (
              sortDirection === 'asc' ? (
                <FontAwesomeIcon icon={faSortAmountUp} size="sm" />
              ) : (
                <FontAwesomeIcon icon={faSortAmountDown} size="sm" />
              )
            ) : null}
          </span>
        </div>
      ),
      cell: (row) => (
        <div className="d-flex align-items-center">
          <div className="avatar-circle me-2 bg-primary bg-opacity-10 text-primary">
            {row.name.charAt(0)}
          </div>
          <div>
            <div className="fw-medium">{row.name}</div>
            <div className="small text-muted">{row.rollNumber}</div>
          </div>
        </div>
      ),
      sortable: true
    },
    {
      field: 'branch',
      header: (
        <div className="d-flex align-items-center" onClick={() => handleSort('branch')}>
          Branch
          <span className="ms-2">
            {sortField === 'branch' ? (
              sortDirection === 'asc' ? (
                <FontAwesomeIcon icon={faSortAmountUp} size="sm" />
              ) : (
                <FontAwesomeIcon icon={faSortAmountDown} size="sm" />
              )
            ) : null}
          </span>
        </div>
      ),
      sortable: true
    },
    {
      field: 'semester',
      header: (
        <div className="d-flex align-items-center" onClick={() => handleSort('semester')}>
          Semester
          <span className="ms-2">
            {sortField === 'semester' ? (
              sortDirection === 'asc' ? (
                <FontAwesomeIcon icon={faSortAmountUp} size="sm" />
              ) : (
                <FontAwesomeIcon icon={faSortAmountDown} size="sm" />
              )
            ) : null}
          </span>
        </div>
      ),
      sortable: true
    },
    {
      field: 'email',
      header: 'Contact',
      cell: (row) => (
        <div>
          <div className="small">{row.email}</div>
          <div className="small text-muted">{row.phone}</div>
        </div>
      )
    },
    {
      field: 'totalFees',
      header: 'Fee Status',
      cell: (row) => (
        <div>
          <div className="d-flex justify-content-between">
            <span className="small">Paid:</span>
            <span className="text-success small">{formatCurrency(row.paidFees)}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span className="small">Pending:</span>
            <span className={`${row.pendingFees > 0 ? 'text-danger' : 'text-muted'} small`}>
              {formatCurrency(row.pendingFees)}
            </span>
          </div>
          <div className="progress mt-1" style={{ height: '4px' }}>
            <div 
              className="progress-bar bg-success" 
              style={{ width: `${(row.paidFees / row.totalFees) * 100}%` }}
            ></div>
          </div>
        </div>
      )
    },
    {
      field: 'lastPaymentDate',
      header: 'Last Payment',
      cell: (row) => row.lastPaymentDate ? formatDate(row.lastPaymentDate) : '-'
    },
    {
      field: 'status',
      header: 'Status',
      cell: (row) => (
        row.pendingFees > 0 
          ? <Badge bg="warning" text="dark">Dues Pending</Badge>
          : <Badge bg="success">Fully Paid</Badge>
      )
    },
    {
      field: 'actions',
      header: 'Actions',
      cell: (row) => (
        <div className="d-flex gap-1">
          <Button 
            variant="outline-primary" 
            size="sm" 
            as={Link} 
            to={`/admin/students/${row.id}`}
            title="View Details"
          >
            <FontAwesomeIcon icon={faEye} />
          </Button>
          <Button 
            variant="outline-info" 
            size="sm"
            title="Edit"
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button 
            variant="outline-danger" 
            size="sm"
            onClick={() => handleDeleteStudent(row)}
            title="Delete"
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </Button>
        </div>
      )
    }
  ];
  
  if (loading && !students.length) {
    return <Loader />;
  }
  
  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="fs-2 fw-bold">Student Management</h1>
          <p className="text-muted">View and manage student information and fee status</p>
        </Col>
        <Col xs="auto" className="d-flex gap-2">
          <Button 
            variant="outline-primary"
            className="d-flex align-items-center"
            onClick={() => setShowUploadModal(true)}
          >
            <FontAwesomeIcon icon={faFileUpload} className="me-2" />
            Upload Data
          </Button>
          <Button 
            variant="outline-primary"
            className="d-flex align-items-center"
          >
            <FontAwesomeIcon icon={faFileExport} className="me-2" />
            Export
          </Button>
          <Button 
            variant="primary"
            className="d-flex align-items-center"
            onClick={() => setShowAddStudentModal(true)}
          >
            <FontAwesomeIcon icon={faUserPlus} className="me-2" />
            Add Student
          </Button>
        </Col>
      </Row>
      
      {error && (
        <Alert variant="danger" className="mb-4" dismissible onClose={() => setError(null)}>
          <Alert.Heading>Error</Alert.Heading>
          <p className="mb-0">{error}</p>
        </Alert>
      )}
      
      <Card className="border-0 shadow-sm mb-4">
        <Card.Header className="bg-white py-3">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faUserGraduate} className="text-primary fs-4 me-2" />
              <h5 className="mb-0 fw-bold">Student List</h5>
              <Badge bg="info" className="ms-2">
                {students.length} Students
              </Badge>
            </div>
            
            <div className="d-flex gap-2">
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Search students..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
                <Button variant="outline-secondary">
                  <FontAwesomeIcon icon={faSearch} />
                </Button>
              </InputGroup>
              
              <Button 
                variant={showFilterPanel ? "primary" : "outline-secondary"}
                onClick={() => setShowFilterPanel(!showFilterPanel)}
              >
                <FontAwesomeIcon icon={faFilter} />
              </Button>
            </div>
          </div>
          
          {showFilterPanel && (
            <div className="mt-3 p-3 border rounded bg-light">
              <Row className="g-3">
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Branch</Form.Label>
                    <Form.Select 
                      value={filters.branch}
                      onChange={(e) => handleFilterChange('branch', e.target.value)}
                    >
                      <option value="">All Branches</option>
                      {BRANCHES.filter(branch => branch !== 'All').map((branch, index) => (
                        <option key={index} value={branch}>{branch}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Semester</Form.Label>
                    <Form.Select 
                      value={filters.semester}
                      onChange={(e) => handleFilterChange('semester', e.target.value)}
                    >
                      <option value="">All Semesters</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
                        <option key={semester} value={semester.toString()}>{semester}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Fee Status</Form.Label>
                    <Form.Select 
                      value={filters.status}
                      onChange={(e) => handleFilterChange('status', e.target.value)}
                    >
                      <option value="">All Status</option>
                      <option value="pending">Dues Pending</option>
                      <option value="paid">Fully Paid</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                
                <Col md={3} className="d-flex align-items-end">
                  <Button 
                    variant="secondary"
                    onClick={handleResetFilters}
                    className="w-100"
                  >
                    Reset Filters
                  </Button>
                </Col>
              </Row>
            </div>
          )}
        </Card.Header>
        
        <Card.Body className="p-0">
          <Table
            columns={columns}
            data={students}
            emptyMessage={
              <div className="text-center py-5">
                <FontAwesomeIcon icon={faUserGraduate} className="text-muted mb-3" style={{ fontSize: '3rem' }} />
                <h5>No students found</h5>
                <p className="text-muted">Try changing your search or filter criteria</p>
              </div>
            }
            pagination
            searchable={false} // We're handling search separately
            hover
            responsive
            selectable
            onSelectionChange={handleSelectionChange}
            rowKey="id"
          />
        </Card.Body>
        
        {selectedStudents.length > 0 && (
          <Card.Footer className="bg-white p-3">
            <div className="d-flex flex-wrap justify-content-between align-items-center">
              <div>
                <span className="me-2">{selectedStudents.length} students selected</span>
                <Button 
                  variant="link" 
                  className="p-0 text-decoration-none"
                  onClick={() => setSelectedStudents([])}
                >
                  Clear selection
                </Button>
              </div>
              <div className="d-flex gap-2 mt-2 mt-md-0">
                <Form.Select 
                  value={bulkAction}
                  onChange={(e) => setBulkAction(e.target.value)}
                  style={{ width: 'auto' }}
                >
                  <option value="">Bulk Actions</option>
                  <option value="reminder">Send Fee Reminder</option>
                  <option value="export">Export Selected</option>
                  <option value="delete">Delete Selected</option>
                </Form.Select>
                <Button 
                  variant="primary"
                  onClick={handleBulkAction}
                  disabled={!bulkAction || selectedStudents.length === 0}
                >
                  Apply
                </Button>
              </div>
            </div>
          </Card.Footer>
        )}
      </Card>
      
      <Row>
        <Col lg={4} className="mb-4 mb-lg-0">
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white py-3">
              <h5 className="mb-0 fw-bold">Payment Summary</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Total Students</span>
                  <span className="fw-medium">{students.length}</span>
                </div>
                
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Fully Paid</span>
                  <span className="text-success fw-medium">
                    {students.filter(s => s.pendingFees === 0).length}
                  </span>
                </div>
                
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Dues Pending</span>
                  <span className="text-danger fw-medium">
                    {students.filter(s => s.pendingFees > 0).length}
                  </span>
                </div>
              </div>
              
              <hr className="my-3" />
              
              <div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Total Fee Amount</span>
                  <span className="fw-medium">
                    {formatCurrency(students.reduce((total, student) => total + student.totalFees, 0))}
                  </span>
                </div>
                
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Amount Collected</span>
                  <span className="text-success fw-medium">
                    {formatCurrency(students.reduce((total, student) => total + student.paidFees, 0))}
                  </span>
                </div>
                
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Amount Pending</span>
                  <span className="text-danger fw-medium">
                    {formatCurrency(students.reduce((total, student) => total + student.pendingFees, 0))}
                  </span>
                </div>
                
                <div className="progress mt-3" style={{ height: '8px' }}>
                  <div 
                    className="progress-bar bg-success" 
                    style={{ 
                      width: `${(students.reduce((total, student) => total + student.paidFees, 0) / 
                        students.reduce((total, student) => total + student.totalFees, 0)) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white py-3">
              <h5 className="mb-0 fw-bold">Quick Actions</h5>
            </Card.Header>
            <Card.Body>
              <Row className="g-3">
                <Col md={6} xl={4}>
                  <Card className="bg-light border-0 h-100">
                    <Card.Body className="p-3">
                      <h6 className="fw-bold mb-2">Send Mass Notification</h6>
                      <p className="text-muted small mb-3">
                        Send fee payment reminders to all students with pending dues.
                      </p>
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={handleSendReminders}
                        disabled={students.filter(s => s.pendingFees > 0).length === 0}
                      >
                        Send Notification
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={6} xl={4}>
                  <Card className="bg-light border-0 h-100">
                    <Card.Body className="p-3">
                      <h6 className="fw-bold mb-2">Generate Fee Report</h6>
                      <p className="text-muted small mb-3">
                        Generate a detailed report of all student fee payments.
                      </p>
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        as={Link}
                        to="/admin/reports"
                      >
                        Generate Report
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={6} xl={4}>
                  <Card className="bg-light border-0 h-100">
                    <Card.Body className="p-3">
                      <h6 className="fw-bold mb-2">Manage Fee Structure</h6>
                      <p className="text-muted small mb-3">
                        Update or modify the fee structure for different semesters.
                      </p>
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        as={Link}
                        to="/admin/fees-management"
                      >
                        Manage Fees
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Send Reminder Modal */}
      <Modal 
        show={showSendReminder} 
        onHide={() => setShowSendReminder(false)}
        backdrop="static"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <FontAwesomeIcon icon={faEnvelope} className="me-2 text-primary" />
            Send Fee Payment Reminder
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            You are about to send a payment reminder to <strong>{selectedStudents.length}</strong> selected students.
          </p>
          
          <Form.Group className="mb-3">
            <Form.Label>Reminder Message</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={6}
              value={reminderMessage}
              onChange={(e) => setReminderMessage(e.target.value)}
              placeholder="Enter your reminder message here..."
            />
            <Form.Text className="text-muted">
              This message will be sent to the selected students via email and SMS.
            </Form.Text>
          </Form.Group>
          
          <Form.Group>
            <Form.Check 
              type="checkbox" 
              id="sendEmail" 
              label="Send via Email" 
              defaultChecked 
            />
            <Form.Check 
              type="checkbox" 
              id="sendSMS" 
              label="Send via SMS" 
              defaultChecked 
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSendReminder(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleConfirmSendReminders}
            disabled={!reminderMessage.trim()}
          >
            <FontAwesomeIcon icon={faEnvelope} className="me-2" />
            Send Reminders
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Delete Confirmation Modal */}
      <Modal 
        show={showDeleteModal} 
        onHide={() => setShowDeleteModal(false)}
        backdrop="static"
      >
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-4">
            <FontAwesomeIcon icon={faTrashAlt} className="text-danger" style={{ fontSize: '3rem' }} />
          </div>
          <p>
            Are you sure you want to delete the student <strong>{studentToDelete?.name}</strong> ({studentToDelete?.rollNumber})?
          </p>
          <Alert variant="danger">
            <Alert.Heading className="h6">Warning!</Alert.Heading>
            <p className="mb-0">
              This action cannot be undone. All student data, including payment history, will be permanently removed.
            </p>
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            <FontAwesomeIcon icon={faTimes} className="me-2" />
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={handleConfirmDelete}
          >
            <FontAwesomeIcon icon={faTrashAlt} className="me-2" />
            Delete Student
          </Button>
        </Modal.Footer>
      </Modal>
      </Container>)}

   export default StudentList   