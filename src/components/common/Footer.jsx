import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white py-4 border-top">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <div className="d-flex align-items-center">
              <img 
                src="/assets/images/logo.png" 
                alt="SVIT Logo" 
                height="30" 
                className="me-2" 
              />
              <span className="text-muted">
                &copy; {currentYear} SVIT College, Andhra Pradesh. All rights reserved.
              </span>
            </div>
          </Col>
          
          <Col md={6}>
            <ul className="list-inline text-center text-md-end mb-0">
              <li className="list-inline-item">
                <Link to="/about" className="text-decoration-none text-muted">About</Link>
              </li>
              <li className="list-inline-item mx-3">
                <Link to="/contact" className="text-decoration-none text-muted">Contact</Link>
              </li>
              <li className="list-inline-item">
                <Link to="/privacy" className="text-decoration-none text-muted">Privacy Policy</Link>
              </li>
              <li className="list-inline-item mx-3">
                <Link to="/terms" className="text-decoration-none text-muted">Terms of Use</Link>
              </li>
              <li className="list-inline-item">
                <Link to="/help" className="text-decoration-none text-muted">Help</Link>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;