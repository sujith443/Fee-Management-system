import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import { authService } from '../../services/authService';
import { validatePassword, passwordsMatch } from '../../utils/validators';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [tokenValid, setTokenValid] = useState(true);
  
  useEffect(() => {
    // Extract token from URL query parameters
    const queryParams = new URLSearchParams(location.search);
    const resetToken = queryParams.get('token');
    
    if (resetToken) {
      setToken(resetToken);
      verifyToken(resetToken);
    } else {
      setTokenValid(false);
      setError('Invalid or missing reset token');
    }
  }, [location.search]);
  
  const verifyToken = async (token) => {
    // In a real app, this would verify the token with the backend
    // For now, we'll assume it's valid
    setTokenValid(true);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset errors
    setError('');
    setPasswordError('');
    setConfirmError('');
    
    // Validate password
    const passwordResult = validatePassword(newPassword);
    if (!passwordResult.valid) {
      setPasswordError(passwordResult.message);
      return;
    }
    
    // Validate password match
    if (!passwordsMatch(newPassword, confirmPassword)) {
      setConfirmError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    
    try {
      // Call reset password API
      // In a real app, this would send the token and new password to the backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitted(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.message || 'Failed to reset password. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  if (!tokenValid) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="shadow-sm border-0">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <img 
                    src="/assets/images/logo.png" 
                    alt="SVIT College Logo" 
                    className="mb-3" 
                    style={{ maxHeight: '80px' }} 
                  />
                  <h2 className="fw-bold">Reset Password</h2>
                </div>
                
                <Alert variant="danger" className="mb-4">
                  <p className="mb-0">Invalid or expired password reset link.</p>
                </Alert>
                
                <p className="text-muted mb-4">
                  The password reset link you clicked is invalid or has expired. Please request a new password reset link.
                </p>
                
                <div className="d-grid">
                  <Button 
                    variant="primary" 
                    as={Link} 
                    to="/forgot-password"
                    className="py-2"
                  >
                    Request New Link
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
  
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <img 
                  src="/assets/images/logo.png" 
                  alt="SVIT College Logo" 
                  className="mb-3" 
                  style={{ maxHeight: '80px' }} 
                />
                <h2 className="fw-bold">Reset Password</h2>
                <p className="text-muted">Enter a new password for your account</p>
              </div>
              
              {error && (
                <Alert variant="danger" className="mb-4">
                  {error}
                </Alert>
              )}
              
              {submitted ? (
                <div>
                  <Alert variant="success" className="mb-4">
                    <div className="d-flex align-items-center">
                      <div className="rounded-circle bg-success bg-opacity-10 p-2 me-3">
                        <FontAwesomeIcon icon={faCheck} className="text-success" />
                      </div>
                      <div>
                        <h6 className="mb-0">Password Reset Successful</h6>
                        <p className="mb-0 small">Your password has been reset successfully.</p>
                      </div>
                    </div>
                  </Alert>
                  <p className="text-muted mb-4 small">
                    You will be redirected to the login page in a few seconds. If not redirected, please click the button below.
                  </p>
                  <div className="d-grid">
                    <Button 
                      variant="primary" 
                      as={Link} 
                      to="/login"
                      className="py-2"
                    >
                      Go to Login
                    </Button>
                  </div>
                </div>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="newPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      isInvalid={!!passwordError}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {passwordError}
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                      Password must be at least 8 characters long with at least one uppercase letter, one number, and one special character.
                    </Form.Text>
                  </Form.Group>
                  
                  <Form.Group className="mb-4" controlId="confirmPassword">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      isInvalid={!!confirmError}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {confirmError}
                    </Form.Control.Feedback>
                  </Form.Group>
                  
                  <div className="d-grid mb-4">
                    <Button 
                      variant="primary" 
                      type="submit" 
                      className="py-2"
                      disabled={loading}
                    >
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
                          Resetting Password...
                        </>
                      ) : (
                        'Reset Password'
                      )}
                    </Button>
                  </div>
                  
                  <div className="text-center">
                    <Link to="/login" className="text-decoration-none">
                      <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                      Back to Login
                    </Link>
                  </div>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;