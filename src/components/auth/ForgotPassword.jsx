import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { authService } from '../../services/authService';
import { isValidEmail } from '../../utils/validators';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset errors
    setError('');
    setEmailError('');
    
    // Validate email
    if (!email) {
      setEmailError('Email is required');
      return;
    }
    
    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    
    try {
      // Call reset password API
      const result = await authService.resetPassword(email);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Failed to process your request. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
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
                <h2 className="fw-bold">Forgot Password</h2>
                <p className="text-muted">Enter your email to reset your password</p>
              </div>
              
              {error && (
                <Alert variant="danger" className="mb-4">
                  {error}
                </Alert>
              )}
              
              {submitted ? (
                <div>
                  <Alert variant="success" className="mb-4">
                    <p className="mb-0">Password reset instructions have been sent to your email address.</p>
                  </Alert>
                  <p className="text-muted mb-4 small">
                    Please check your email inbox and follow the instructions to reset your password. 
                    If you don't receive an email within a few minutes, please check your spam folder.
                  </p>
                  <div className="d-grid">
                    <Button 
                      variant="primary" 
                      as={Link} 
                      to="/login"
                      className="py-2"
                    >
                      Return to Login
                    </Button>
                  </div>
                </div>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4" controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your registered email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      isInvalid={!!emailError}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {emailError}
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                      We'll send a password reset link to this email.
                    </Form.Text>
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
                          Sending Link...
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

export default ForgotPassword;