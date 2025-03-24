import React, { useState, useEffect, useContext, useRef } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner, Badge } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faDownload, faPrint, faEnvelope, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Mock payment receipt data
const mockReceipts = {
  'SVIT25011501': {
    id: 'SVIT25011501',
    studentName: 'Ravi Kumar',
    rollNumber: 'SVIT20CS101',
    feeType: 'Examination Fee',
    semester: 2,
    amount: 2500,
    convenienceFee: 25,
    lateCharge: 0,
    totalAmount: 2525,
    paidDate: '2025-01-15 09:30:22',
    academicYear: '2024-2025',
    paymentMode: 'Online (UPI)',
    transactionId: 'UPI123456789',
    paymentStatus: 'success'
  },
  'SVIT25011002': {
    id: 'SVIT25011002',
    studentName: 'Ravi Kumar',
    rollNumber: 'SVIT20CS101',
    feeType: 'Bus Fee',
    semester: 2,
    amount: 8000,
    convenienceFee: 80,
    lateCharge: 0,
    totalAmount: 8080,
    paidDate: '2025-01-10 14:45:11',
    academicYear: '2024-2025',
    paymentMode: 'Online (Net Banking)',
    transactionId: 'NB987654321',
    paymentStatus: 'success'
  },
  'SVIT24122803': {
    id: 'SVIT24122803',
    studentName: 'Ravi Kumar',
    rollNumber: 'SVIT20CS101',
    feeType: 'Hostel Fee',
    semester: 2,
    amount: 25000,
    convenienceFee: 0,
    lateCharge: 0,
    totalAmount: 25000,
    paidDate: '2024-12-28 11:20:45',
    academicYear: '2024-2025',
    paymentMode: 'DD',
    transactionId: 'DD123456',
    paymentStatus: 'success'
  }
};

const PaymentReceipt = () => {
  const { paymentId } = useParams();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const receiptRef = useRef(null);
  
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      const receiptData = mockReceipts[paymentId];
      
      if (receiptData) {
        setReceipt(receiptData);
      } else {
        setError('Receipt not found');
      }
      
      setLoading(false);
    }, 800);
  }, [paymentId]);
  
  // Format date
  const formatDate = (dateTimeString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateTimeString).toLocaleDateString('en-IN', options);
  };
  
  // Format simple date
  const formatSimpleDate = (dateTimeString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    };
    return new Date(dateTimeString).toLocaleDateString('en-IN', options);
  };
  
  // Format currency
  const formatCurrency = (amount) => {
    return '₹' + amount.toLocaleString('en-IN');
  };
  
  // Get status badge
  const getStatusBadge = (status) => {
    switch(status) {
      case 'success':
        return <Badge bg="success">Successful</Badge>;
      case 'pending':
        return <Badge bg="warning" text="dark">Pending</Badge>;
      case 'failed':
        return <Badge bg="danger">Failed</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };
  
  // Handle download receipt as PDF
  const handleDownloadPDF = () => {
    if (receiptRef.current) {
      html2canvas(receiptRef.current, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save(`SVIT_Receipt_${receipt.id}.pdf`);
      });
    }
  };
  
  // Handle print receipt
  const handlePrintReceipt = () => {
    window.print();
  };
  
  // Handle email receipt
  const handleEmailReceipt = () => {
    // In a real app, this would call an API to send the receipt by email
    alert(`Receipt will be sent to your registered email address: ${currentUser.email}`);
  };
  
  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
        <Button 
          variant="link" 
          className="text-decoration-none"
          onClick={() => navigate(-1)}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
          Go Back
        </Button>
      </Container>
    );
  }
  
  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button 
          variant="link" 
          className="text-decoration-none p-0"
          onClick={() => navigate(-1)}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
          Back
        </Button>
        
        <div className="d-flex gap-2">
          <Button 
            variant="outline-primary" 
            onClick={handleDownloadPDF}
          >
            <FontAwesomeIcon icon={faDownload} className="me-2" />
            Download
          </Button>
          
          <Button 
            variant="outline-secondary" 
            onClick={handlePrintReceipt}
          >
            <FontAwesomeIcon icon={faPrint} className="me-2" />
            Print
          </Button>
          
          <Button 
            variant="outline-success" 
            onClick={handleEmailReceipt}
          >
            <FontAwesomeIcon icon={faEnvelope} className="me-2" />
            Email
          </Button>
        </div>
      </div>
      
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="border-0 shadow-sm" ref={receiptRef}>
            <Card.Body className="p-4 p-md-5">
              <div className="text-center mb-4 receipt-header">
                <img 
                  src="/assets/images/logo.png" 
                  alt="SVIT Logo" 
                  height="80" 
                  className="mb-3" 
                />
                <h2 className="fw-bold text-primary mb-0">SVIT College</h2>
                <p className="mb-0">Andhra Pradesh, South India</p>
                <p className="text-muted small">
                  Email: info@svit.edu.in | Phone: +91 98765 43210
                </p>
                <div className="border-bottom mt-3 mb-4"></div>
                <h4 className="fw-bold">Payment Receipt</h4>
                <div className="d-inline-block bg-success bg-opacity-10 text-success rounded px-3 py-1 mt-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
                  Payment Successful
                </div>
              </div>
              
              <Row className="mb-4">
                <Col md={6} className="mb-3 mb-md-0">
                  <Card className="border-0 bg-light">
                    <Card.Body className="p-3">
                      <h6 className="fw-bold mb-3">Student Information</h6>
                      <div className="mb-2">
                        <span className="text-muted">Name:</span>
                        <span className="float-end fw-medium">{receipt.studentName}</span>
                      </div>
                      <div className="mb-2">
                        <span className="text-muted">Roll Number:</span>
                        <span className="float-end fw-medium">{receipt.rollNumber}</span>
                      </div>
                      <div className="mb-2">
                        <span className="text-muted">Semester:</span>
                        <span className="float-end">{receipt.semester}</span>
                      </div>
                      <div className="mb-0">
                        <span className="text-muted">Academic Year:</span>
                        <span className="float-end">{receipt.academicYear}</span>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={6}>
                  <Card className="border-0 bg-light">
                    <Card.Body className="p-3">
                      <h6 className="fw-bold mb-3">Payment Information</h6>
                      <div className="mb-2">
                        <span className="text-muted">Receipt No:</span>
                        <span className="float-end fw-medium">{receipt.id}</span>
                      </div>
                      <div className="mb-2">
                        <span className="text-muted">Date & Time:</span>
                        <span className="float-end">{formatDate(receipt.paidDate)}</span>
                      </div>
                      <div className="mb-2">
                        <span className="text-muted">Payment Mode:</span>
                        <span className="float-end">{receipt.paymentMode}</span>
                      </div>
                      <div className="mb-0">
                        <span className="text-muted">Transaction ID:</span>
                        <span className="float-end">{receipt.transactionId}</span>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              
              <h6 className="fw-bold mb-3">Payment Details</h6>
              <div className="table-responsive mb-4">
                <table className="table table-bordered">
                  <thead className="table-light">
                    <tr>
                      <th>Description</th>
                      <th className="text-end">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{receipt.feeType}</td>
                      <td className="text-end">{formatCurrency(receipt.amount)}</td>
                    </tr>
                    {receipt.lateCharge > 0 && (
                      <tr>
                        <td>Late Charge</td>
                        <td className="text-end">{formatCurrency(receipt.lateCharge)}</td>
                      </tr>
                    )}
                    {receipt.convenienceFee > 0 && (
                      <tr>
                        <td>Convenience Fee</td>
                        <td className="text-end">{formatCurrency(receipt.convenienceFee)}</td>
                      </tr>
                    )}
                    <tr className="table-light fw-bold">
                      <td>Total Amount</td>
                      <td className="text-end">{formatCurrency(receipt.totalAmount)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="border-top pt-4 mt-4">
                <div className="row">
                  <div className="col-md-8">
                    <p className="mb-1 small">
                      <strong>Note:</strong> This is an electronically generated receipt and does not require a signature.
                    </p>
                    <p className="mb-0 small text-muted">
                      For any queries related to this payment, please contact the accounts department.
                    </p>
                  </div>
                  <div className="col-md-4 text-end">
                    <div className="fw-bold mb-1">SVIT College</div>
                    <div className="mb-0 small text-muted">Accounts Department</div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
          
          <div className="text-center mt-4">
            <Link to="/student/payment-history" className="btn btn-link text-decoration-none">
              View All Payments
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentReceipt;