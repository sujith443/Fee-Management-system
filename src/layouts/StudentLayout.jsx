import React from 'react';
import { Outlet } from 'react-router-dom';
import AppNavbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import Footer from '../components/common/Footer';
import { Container, Row, Col } from 'react-bootstrap';

const StudentLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar />
      <div className="flex-grow-1">
        <Container fluid>
          <Row>
            <Col lg={2} className="p-0 d-none d-lg-block sidebar-container">
              <Sidebar />
            </Col>
            <Col lg={10} className="py-3 px-4">
              <Outlet />
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default StudentLayout;