import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const NotFoundPage = () => {
  return (
    <Container fluid className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light text-center p-4">
      <img 
        src="/assets/images/404.svg" 
        alt="Page Not Found" 
        style={{ maxWidth: '300px', width: '100%' }} 
        className="mb-4"
      />
      
      <h1 className="display-1 fw-bold text-primary mb-2">404</h1>
      <h2 className="fw-bold mb-3">Page Not Found</h2>
      
      <p className="text-muted mb-4">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      
      <div className="d-flex flex-column flex-sm-row gap-3">
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
          onClick={() => window.history.back()} 
          variant="outline-secondary"
          className="px-4 py-2"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
          Go Back
        </Button>
      </div>
      
      <div className="mt-5 text-muted">
        <p className="mb-0 small">
          Need help? Contact <a href="mailto:support@svit.edu.in" className="text-decoration-none">support@svit.edu.in</a>
        </p>
      </div>
    </Container>
  );
};

export default NotFoundPage;