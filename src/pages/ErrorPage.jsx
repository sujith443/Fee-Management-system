import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faArrowLeft, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const ErrorPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get error details from location state, if available
  const { errorCode, errorMessage } = location.state || {};
  
  const code = errorCode || '500';
  const message = errorMessage || 'Internal Server Error';
  
  return (
    <Container fluid className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light p-4">
      <Card className="border-0 shadow-sm text-center" style={{ maxWidth: '500px' }}>
        <Card.Body className="p-5">
          <div className="rounded-circle bg-danger bg-opacity-10 d-inline-flex justify-content-center align-items-center mb-4" style={{ width: '80px', height: '80px' }}>
            <FontAwesomeIcon icon={faExclamationTriangle} className="text-danger fs-2" />
          </div>
          
          <h1 className="display-1 fw-bold text-danger mb-2">{code}</h1>
          <h2 className="fw-bold mb-4">{message}</h2>
          
          <p className="text-muted mb-4">
            Something went wrong. We're working on fixing the issue. Please try again later or contact support if the problem persists.
          </p>
          
          <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
            <Button 
              as={Link} 
              to="/" 
              variant="primary"
              className="px-4 py-2"
            >
              <FontAwesomeIcon icon={faHome} className="me-2" />
              Back to Home
            </Button>
            
            <Button 
              onClick={() => navigate(-1)} 
              variant="outline-secondary"
              className="px-4 py-2"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
              Go Back
            </Button>
          </div>
        </Card.Body>
      </Card>
      
      <div className="mt-4 text-center">
        <p className="mb-0 text-muted small">
          Error Reference: {Date.now().toString(36).toUpperCase()}
        </p>
        <p className="mb-0 mt-2 small">
          <a href="mailto:support@svit.edu.in" className="text-decoration-none">
            Contact Support
          </a> | 
          <a href="tel:+919876543210" className="text-decoration-none ms-2">
            Helpline: +91 98765 43210
          </a>
        </p>
      </div>
    </Container>
  );
};

export default ErrorPage;