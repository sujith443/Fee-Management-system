import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner, Badge } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCreditCard, faMoneyBillWave, faBuildingColumns, faQrcode } from '@fortawesome/free-solid-svg-icons';

// Mock data for a specific fee
const mockFeeDetails = {
  1: {
    id: 1,
    type: 'Examination Fee',
    semester: 3,
    amount: 2500,
    dueDate: '2025-04-15',
    status: 'pending',
    description: 'Mid-semester examination fee',
    lateCharge: 0,
    convenienceFee: 25
  },
  2: {
    id: 2,
    type: 'Bus Fee',
    semester: 3,
    amount: 8000,
    dueDate: '2025-04-10',
    status: 'pending',
    description: 'Transportation fee for April-June 2025',
    lateCharge: 0,
    convenienceFee: 80
  },
  3: {
    id: 3,
    type: 'Library Fee',
    semester: 3,
    amount: 1000,
    dueDate: '2025-03-30',
    status: 'overdue',
    description: 'Annual library access fee',
    lateCharge: 100,
    convenienceFee: 10
  },
  4: {
    id: 4,
    type: 'Lab Fee',
    semester: 3,
    amount: 3500,
    dueDate: '2025-05-20',
    status: 'pending',
    description: 'Computer lab usage fee',
    lateCharge: 0,
    convenienceFee: 35
  }
};

const MakePayment = () => {
  const { feeId } = useParams();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [feeDetails, setFeeDetails] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [validated, setValidated] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  
  // Form data states
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  
  useEffect(() => {
    // In a real app, this would be an API call to fetch fee details
    const fee = mockFeeDetails[feeId];
    if (fee) {
      setFeeDetails(fee);
    } else {
      setError('Fee details not found');
    }
  }, [feeId]);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
    
    setValidated(true);
    setIsProcessing(true);
    setError('');
    
    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a mock transaction ID
      const mockTxnId = 'TXN' + Date.now().toString().substring(6);
      setTransactionId(mockTxnId);
      
      // Simulate successful payment
      setPaymentSuccessful(true);
    } catch (err) {
      setError('Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };
  
  // Card number formatter
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };
  
  // Card expiry formatter
  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return value;
  };
  
  if (paymentSuccessful) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-5 text-center">
                <div className="mb-4">
                  <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                    <i className="bi bi-check-lg fs-1"></i>
                  </div>
                </div>
                
                <h2 className="fw-bold text-success mb-3">Payment Successful!</h2>
                <p className="text-muted">
                  Your payment for {feeDetails?.type} has been successfully processed.
                </p>
                
                <div className="bg-light rounded p-4 my-4">
                  <Row className="mb-3">
                    <Col xs={6} className="text-start text-muted">Amount Paid:</Col>
                    <Col xs={6} className="text-end fw-bold">₹{(feeDetails?.amount + feeDetails?.convenienceFee + feeDetails?.lateCharge).toLocaleString('en-IN')}</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={6} className="text-start text-muted">Transaction ID:</Col>
                    <Col xs={6} className="text-end">{transactionId}</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={6} className="text-start text-muted">Payment Date:</Col>
                    <Col xs={6} className="text-end">{new Date().toLocaleDateString('en-IN')}</Col>
                  </Row>
                  <Row>
                    <Col xs={6} className="text-start text-muted">Payment Method:</Col>
                    <Col xs={6} className="text-end text-capitalize">{paymentMethod}</Col>
                  </Row>
                </div>
                
                <div className="d-grid gap-3">
                  <Button 
                    variant="outline-primary" 
                    as={Link}
                    to={`/student/receipt/${transactionId}`}
                    className="py-2"
                  >
                    View Receipt
                  </Button>
                  <Button 
                    variant="primary" 
                    as={Link}
                    to="/student/dashboard"
                    className="py-2"
                  >
                    Back to Dashboard
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
  
  if (!feeDetails) {
    return (
      <Container className="py-5 text-center">
        {error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </Container>
    );
  }
  
  return (
    <Container className="py-4">
      <Button 
        variant="link" 
        className="mb-4 text-decoration-none p-0"
        onClick={() => navigate(-1)}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
        Back
      </Button>
      
      <Row>
        <Col lg={8} className="mb-4 mb-lg-0">
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white py-3">
              <h5 className="mb-0 fw-bold">Choose Payment Method</h5>
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <div className="mb-4">
                  <div className="d-flex flex-wrap gap-3">
                    <Form.Check
                      type="radio"
                      name="paymentMethod"
                      id="upi"
                      className="payment-method-radio"
                    >
                      <Form.Check.Input 
                        type="radio" 
                        checked={paymentMethod === 'upi'} 
                        onChange={() => setPaymentMethod('upi')} 
                      />
                      <Form.Check.Label className="d-flex align-items-center">
                        <div className="rounded-circle bg-primary bg-opacity-10 p-2 me-2">
                          <FontAwesomeIcon icon={faQrcode} className="text-primary" />
                        </div>
                        UPI
                      </Form.Check.Label>
                    </Form.Check>
                    
                    <Form.Check
                      type="radio"
                      name="paymentMethod"
                      id="card"
                      className="payment-method-radio"
                    >
                      <Form.Check.Input 
                        type="radio" 
                        checked={paymentMethod === 'card'} 
                        onChange={() => setPaymentMethod('card')} 
                      />
                      <Form.Check.Label className="d-flex align-items-center">
                        <div className="rounded-circle bg-success bg-opacity-10 p-2 me-2">
                          <FontAwesomeIcon icon={faCreditCard} className="text-success" />
                        </div>
                        Credit/Debit Card
                      </Form.Check.Label>
                    </Form.Check>
                    
                    <Form.Check
                      type="radio"
                      name="paymentMethod"
                      id="netbanking"
                      className="payment-method-radio"
                    >
                      <Form.Check.Input 
                        type="radio" 
                        checked={paymentMethod === 'netbanking'} 
                        onChange={() => setPaymentMethod('netbanking')} 
                      />
                      <Form.Check.Label className="d-flex align-items-center">
                        <div className="rounded-circle bg-info bg-opacity-10 p-2 me-2">
                          <FontAwesomeIcon icon={faBuildingColumns} className="text-info" />
                        </div>
                        Net Banking
                      </Form.Check.Label>
                    </Form.Check>
                    
                    <Form.Check
                      type="radio"
                      name="paymentMethod"
                      id="cash"
                      className="payment-method-radio"
                    >
                      <Form.Check.Input 
                        type="radio" 
                        checked={paymentMethod === 'cash'} 
                        onChange={() => setPaymentMethod('cash')} 
                      />
                      <Form.Check.Label className="d-flex align-items-center">
                        <div className="rounded-circle bg-warning bg-opacity-10 p-2 me-2">
                          <FontAwesomeIcon icon={faMoneyBillWave} className="text-warning" />
                        </div>
                        Pay at Counter
                      </Form.Check.Label>
                    </Form.Check>
                  </div>
                </div>
                
                {paymentMethod === 'upi' && (
                  <div className="mb-4">
                    <Form.Group className="mb-3" controlId="upiId">
                      <Form.Label>UPI ID</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="name@upi"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid UPI ID
                      </Form.Control.Feedback>
                    </Form.Group>
                    
                    <div className="text-center my-4">
                      <p className="text-muted">Or scan the QR code to pay</p>
                      <div className="d-inline-block border p-3 mb-3">
                        <div className="bg-light" style={{ width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span className="text-muted">QR Code Placeholder</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {paymentMethod === 'card' && (
                  <div className="mb-4">
                    <Form.Group className="mb-3" controlId="cardNumber">
                      <Form.Label>Card Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        maxLength="19"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid card number
                      </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="cardName">
                      <Form.Label>Name on Card</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="John Doe"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide the name on card
                      </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="cardExpiry">
                          <Form.Label>Expiry Date</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                            maxLength="5"
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            Please provide expiry date
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="cardCvv">
                          <Form.Label>CVV</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="•••"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            maxLength="3"
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            Please provide CVV
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>
                )}
                
                {paymentMethod === 'netbanking' && (
                  <div className="mb-4">
                    <Form.Group className="mb-3" controlId="bankName">
                      <Form.Label>Select Bank</Form.Label>
                      <Form.Select
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        required
                      >
                        <option value="">Select your bank</option>
                        <option value="sbi">State Bank of India</option>
                        <option value="hdfc">HDFC Bank</option>
                        <option value="icici">ICICI Bank</option>
                        <option value="axis">Axis Bank</option>
                        <option value="kotak">Kotak Mahindra Bank</option>
                        <option value="pnb">Punjab National Bank</option>
                        <option value="bob">Bank of Baroda</option>
                        <option value="canara">Canara Bank</option>
                        <option value="idfc">IDFC First Bank</option>
                        <option value="other">Other Bank</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Please select your bank
                      </Form.Control.Feedback>
                    </Form.Group>
                    
                    <p className="text-muted small mb-0">
                      You'll be redirected to your bank's secure payment gateway to complete the transaction.
                    </p>
                  </div>
                )}
                
                {paymentMethod === 'cash' && (
                  <div className="mb-4">
                    <Alert variant="info">
                      <Alert.Heading className="fs-6">Cash Payment Instructions</Alert.Heading>
                      <p className="small mb-0">
                        Please visit the college accounts office with your student ID and payment reference number. Cash payments are accepted between 10:00 AM and 3:00 PM on working days.
                      </p>
                    </Alert>
                    
                    <p className="mb-0">
                      <strong>Your Payment Reference: </strong>
                      <Badge bg="primary">SVIT{feeDetails.id}{currentUser?.rollNumber?.slice(-4)}</Badge>
                    </p>
                  </div>
                )}
                
                <div className="d-grid mt-4">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="py-2"
                    disabled={isProcessing || paymentMethod === 'cash'}
                  >
                    {isProcessing ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Processing Payment...
                      </>
                    ) : (
                      paymentMethod === 'cash' ? 'Generate Payment Slip' : `Pay ₹${(feeDetails.amount + feeDetails.convenienceFee + feeDetails.lateCharge).toLocaleString('en-IN')}`
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white py-3">
              <h5 className="mb-0 fw-bold">Fee Details</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-4">
                <h6 className="fw-bold">{feeDetails.type}</h6>
                <p className="text-muted small mb-0">{feeDetails.description}</p>
              </div>
              
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Fee Amount</span>
                  <span>₹{feeDetails.amount.toLocaleString('en-IN')}</span>
                </div>
                
                {feeDetails.lateCharge > 0 && (
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Late Charge</span>
                    <span className="text-danger">₹{feeDetails.lateCharge.toLocaleString('en-IN')}</span>
                  </div>
                )}
                
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Convenience Fee</span>
                  <span>₹{feeDetails.convenienceFee.toLocaleString('en-IN')}</span>
                </div>
                
                <hr />
                
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total Amount</span>
                  <span>₹{(feeDetails.amount + feeDetails.convenienceFee + feeDetails.lateCharge).toLocaleString('en-IN')}</span>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Due Date</span>
                  <span className={feeDetails.status === 'overdue' ? 'text-danger' : ''}>
                    {formatDate(feeDetails.dueDate)}
                  </span>
                </div>
                
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Status</span>
                  <Badge bg={feeDetails.status === 'overdue' ? 'danger' : 'warning'} text={feeDetails.status === 'pending' ? 'dark' : undefined}>
                    {feeDetails.status.charAt(0).toUpperCase() + feeDetails.status.slice(1)}
                  </Badge>
                </div>
                
                <div className="d-flex justify-content-between mb-0">
                  <span className="text-muted">Semester</span>
                  <span>{feeDetails.semester}</span>
                </div>
              </div>
            </Card.Body>
          </Card>
          
          <Card className="border-0 shadow-sm mt-4">
            <Card.Body>
              <h6 className="fw-bold mb-3">Payment Information</h6>
              <p className="small text-muted mb-0">
                <i className="bi bi-info-circle me-2"></i>
                All online payments are processed securely. A convenience fee is charged for online payments to cover processing costs.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MakePayment;