import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Login from '../components/auth/Login';
import Footer from '../components/common/Footer';

const LoginPage = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <div className="flex-grow-1 d-flex align-items-center py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={6} lg={5}>
              <Card className="shadow-sm border-0">
                <Card.Body className="p-4">
                  <Login />
                </Card.Body>
              </Card>
              
              <div className="text-center mt-4">
                <small className="text-muted">
                  © {new Date().getFullYear()} SVIT College, Andhra Pradesh. All rights reserved.
                </small>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      
      <Footer />
    </div>
  );
};

export default LoginPage;