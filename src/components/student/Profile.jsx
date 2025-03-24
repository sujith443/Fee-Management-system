import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner, Tab, Nav } from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faLock, faIdCard, faSchool, faEdit } from '@fortawesome/free-solid-svg-icons';

const StudentProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState(null);
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Mock student profile data
  const mockStudentData = {
    name: 'Ravi Kumar',
    rollNumber: 'SVIT20CS101',
    email: 'ravi.kumar@svit.edu.in',
    phone: '9876543210',
    branch: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    batchYear: '2020-2024',
    address: '123 Main Street, Hyderabad, Telangana, 500001',
    fatherName: 'Ramesh Kumar',
    motherName: 'Lakshmi Devi',
    guardianPhone: '9876543211',
    bloodGroup: 'O+',
    dob: '2002-05-15',
    admissionYear: '2020',
    hostelResident: 'No',
    busRoute: 'Route 7 - Hyderabad Central',
    scholarshipStatus: 'None',
    profileImage: '/assets/images/student-avatar.png'
  };
  
  useEffect(() => {
    // In a real app, this would be an API call to fetch student data
    setFormData({
      name: mockStudentData.name,
      email: mockStudentData.email,
      phone: mockStudentData.phone,
      address: mockStudentData.address,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSaveSuccess(false);
    
    // In a real app, this would be an API call to update the profile
    setTimeout(() => {
      setLoading(false);
      setSaveSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };
  
  const handlePasswordChange = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSaveSuccess(false);
    
    // Validate passwords
    if (formData.newPassword !== formData.confirmPassword) {
      setError('New password and confirmation do not match');
      setLoading(false);
      return;
    }
    
    if (formData.newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }
    
    // In a real app, this would be an API call to change the password
    setTimeout(() => {
      setLoading(false);
      setSaveSuccess(true);
      
      // Reset form fields
      setFormData(prevState => ({
        ...prevState,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      
      // Reset success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };
  
  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="fs-2 fw-bold">My Profile</h1>
          <p className="text-muted">View and manage your personal information</p>
        </Col>
      </Row>
      
      <Row>
        <Col lg={4} className="mb-4 mb-lg-0">
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body className="text-center p-4">
              <div className="mb-4">
                <img 
                  src={mockStudentData.profileImage} 
                  alt="Profile" 
                  className="rounded-circle img-thumbnail" 
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
              </div>
              
              <h5 className="fw-bold mb-1">{mockStudentData.name}</h5>
              <p className="text-muted mb-3">{mockStudentData.rollNumber}</p>
              
              <div className="d-flex justify-content-center mb-3">
                <Button variant="outline-primary" size="sm" className="me-2">
                  Change Photo
                </Button>
                <Button variant="outline-danger" size="sm">
                  Remove
                </Button>
              </div>
              
              <hr />
              
              <div className="text-start">
                <div className="mb-3">
                  <div className="d-flex">
                    <div className="text-muted me-2" style={{ width: '30px' }}>
                      <FontAwesomeIcon icon={faIdCard} />
                    </div>
                    <div>
                      <div className="small text-muted">Roll Number</div>
                      <div>{mockStudentData.rollNumber}</div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="d-flex">
                    <div className="text-muted me-2" style={{ width: '30px' }}>
                      <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    <div>
                      <div className="small text-muted">Email</div>
                      <div>{mockStudentData.email}</div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="d-flex">
                    <div className="text-muted me-2" style={{ width: '30px' }}>
                      <FontAwesomeIcon icon={faPhone} />
                    </div>
                    <div>
                      <div className="small text-muted">Phone</div>
                      <div>{mockStudentData.phone}</div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-0">
                  <div className="d-flex">
                    <div className="text-muted me-2" style={{ width: '30px' }}>
                      <FontAwesomeIcon icon={faSchool} />
                    </div>
                    <div>
                      <div className="small text-muted">Branch</div>
                      <div>{mockStudentData.branch}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
          
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-3">Academic Information</h5>
              
              <div className="mb-3 d-flex justify-content-between">
                <span className="text-muted">Semester</span>
                <span>{mockStudentData.semester}</span>
              </div>
              
              <div className="mb-3 d-flex justify-content-between">
                <span className="text-muted">Section</span>
                <span>{mockStudentData.section}</span>
              </div>
              
              <div className="mb-3 d-flex justify-content-between">
                <span className="text-muted">Batch</span>
                <span>{mockStudentData.batchYear}</span>
              </div>
              
              <div className="mb-3 d-flex justify-content-between">
                <span className="text-muted">Admission Year</span>
                <span>{mockStudentData.admissionYear}</span>
              </div>
              
              <div className="mb-3 d-flex justify-content-between">
                <span className="text-muted">Hostel Resident</span>
                <span>{mockStudentData.hostelResident}</span>
              </div>
              
              <div className="mb-0 d-flex justify-content-between">
                <span className="text-muted">Bus Route</span>
                <span>{mockStudentData.busRoute}</span>
              </div>
              
              {mockStudentData.scholarshipStatus !== 'None' && (
                <div className="mb-0 d-flex justify-content-between">
                  <span className="text-muted">Scholarship</span>
                  <span>{mockStudentData.scholarshipStatus}</span>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <Tab.Container defaultActiveKey="general">
                <Nav variant="tabs" className="mb-4">
                  <Nav.Item>
                    <Nav.Link eventKey="general">
                      <FontAwesomeIcon icon={faUser} className="me-2" />
                      General Information
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="security">
                      <FontAwesomeIcon icon={faLock} className="me-2" />
                      Password & Security
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                
                <Tab.Content>
                  <Tab.Pane eventKey="general">
                    {saveSuccess && (
                      <Alert variant="success" className="mb-4">
                        Profile information updated successfully!
                      </Alert>
                    )}
                    
                    <Form onSubmit={handleProfileUpdate}>
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group controlId="name">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                            />
                          </Form.Group>
                        </Col>
                        
                        <Col md={6}>
                          <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              disabled
                            />
                            <Form.Text className="text-muted">
                              Contact administration to change email
                            </Form.Text>
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group controlId="phone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                            />
                          </Form.Group>
                        </Col>
                        
                        <Col md={6}>
                          <Form.Group controlId="dob">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                              type="date"
                              name="dob"
                              value={mockStudentData.dob}
                              disabled
                            />
                            <Form.Text className="text-muted">
                              Cannot be changed
                            </Form.Text>
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Form.Group className="mb-3" controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                      
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group controlId="fatherName">
                            <Form.Label>Father's Name</Form.Label>
                            <Form.Control
                              type="text"
                              value={mockStudentData.fatherName}
                              disabled
                            />
                          </Form.Group>
                        </Col>
                        
                        <Col md={6}>
                          <Form.Group controlId="motherName">
                            <Form.Label>Mother's Name</Form.Label>
                            <Form.Control
                              type="text"
                              value={mockStudentData.motherName}
                              disabled
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group controlId="guardianPhone">
                            <Form.Label>Guardian's Phone</Form.Label>
                            <Form.Control
                              type="tel"
                              value={mockStudentData.guardianPhone}
                              disabled
                            />
                          </Form.Group>
                        </Col>
                        
                        <Col md={6}>
                          <Form.Group controlId="bloodGroup">
                            <Form.Label>Blood Group</Form.Label>
                            <Form.Control
                              type="text"
                              value={mockStudentData.bloodGroup}
                              disabled
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit" disabled={loading}>
                          {loading ? (
                            <>
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="me-2"
                              />
                              Saving...
                            </>
                          ) : (
                            <>
                              <FontAwesomeIcon icon={faEdit} className="me-2" />
                              Save Changes
                            </>
                          )}
                        </Button>
                      </div>
                    </Form>
                  </Tab.Pane>
                  
                  <Tab.Pane eventKey="security">
                    {saveSuccess && (
                      <Alert variant="success" className="mb-4">
                        Password changed successfully!
                      </Alert>
                    )}
                    
                    {error && (
                      <Alert variant="danger" className="mb-4">
                        {error}
                      </Alert>
                    )}
                    
                    <Form onSubmit={handlePasswordChange}>
                      <Form.Group className="mb-3" controlId="currentPassword">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-3" controlId="newPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          required
                        />
                        <Form.Text className="text-muted">
                          Password must be at least 8 characters long
                        </Form.Text>
                      </Form.Group>
                      
                      <Form.Group className="mb-4" controlId="confirmPassword">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                      
                      <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit" disabled={loading}>
                          {loading ? (
                            <>
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="me-2"
                              />
                              Changing Password...
                            </>
                          ) : (
                            'Change Password'
                          )}
                        </Button>
                      </div>
                    </Form>
                    
                    <hr className="my-4" />
                    
                    <div>
                      <h5 className="fw-bold mb-3">Login Activity</h5>
                      <p className="text-muted mb-2">Last login: March 19, 2025, 09:45 AM</p>
                      <p className="text-muted mb-0">IP Address: 192.168.1.1</p>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentProfile;