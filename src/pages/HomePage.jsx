import React, { useContext, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Footer from '../components/common/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGraduationCap, 
  faMoneyBillWave, 
  faLaptop, 
  faChartLine, 
  faUserShield, 
  faSignInAlt,
  faInfoCircle,
  faEnvelope,
  faPhone,
  faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // If user is already logged in, redirect to appropriate dashboard
  useEffect(() => {
    if (currentUser) {
      const redirectPath = currentUser.role === 'admin' ? '/admin/dashboard' : '/student/dashboard';
      navigate(redirectPath);
    }
  }, [currentUser, navigate]);
  
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header/Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <Container>
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img 
              src="https://svitatp.ac.in/public/assets/admin/images/sitesetting/664263736b243_SVIT%20LOGO.png" 
              alt="SVIT Logo" 
              height="50" 
              className="me-2" 
            />
            <div>
              <div className="fw-bold text-primary">SVIT College</div>
              <div className="small text-muted">Fee Payment Portal</div>
            </div>
          </Link>
          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#features">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#howitworks">How It Works</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#faq">FAQ</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
              </li>
              <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                <Link 
                  to="/login" 
                  className="btn btn-primary d-flex align-items-center justify-content-center"
                >
                  <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </Container>
      </nav>
      
      {/* Hero Section */}
      <section className="py-0">
        <div className="position-relative overflow-hidden bg-primary" style={{ minHeight: "500px" }}>
          <Container className="position-relative" style={{ zIndex: 2 }}>
            <Row className="py-5 align-items-center min-vh-75">
              <Col lg={6} className="text-white py-5">
                <h1 className="display-4 fw-bold mb-4">Streamlined Fee Management for SVIT Students</h1>
                <p className="lead fw-normal mb-4 opacity-90">
                  Pay your fees online, track your payment history, and receive timely notifications - all in one secure platform.
                </p>
                <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
                  <Link to="/login" className="btn btn-light btn-lg fw-medium">
                    Pay Fees Now
                  </Link>
                  <a href="#features" className="btn btn-outline-light btn-lg">
                    Learn More
                  </a>
                </div>
              </Col>
              <Col lg={6} className="text-center mt-5 mt-lg-0 d-none d-lg-block">
                <img 
                  src="/assets/images/payment-illustration.svg" 
                  alt="Fee Payment Illustration" 
                  className="img-fluid" 
                  style={{ maxHeight: "400px" }}
                />
              </Col>
            </Row>
          </Container>
          <div 
            className="position-absolute top-0 start-0 w-100 h-100 bg-primary" 
            style={{ 
              opacity: 0.2,
              background: "url('/assets/images/college-campus.jpg') center center/cover no-repeat",
              zIndex: 1
            }}
          ></div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-0">
        <Container className="py-0">
          <Row className="g-0">
            <div className="col-12">
              <Card className="border-0 shadow-lg position-relative mt-n5" style={{ zIndex: 3 }}>
                <Card.Body className="p-0">
                  <Row className="g-0">
                    <Col md={4} className="p-4 p-md-5 border-end">
                      <h2 className="display-5 fw-bold text-primary mb-1">2500+</h2>
                      <p className="text-uppercase fw-semibold mb-2">Students</p>
                      <p className="text-muted mb-0">Using our platform to manage fee payments</p>
                    </Col>
                    <Col md={4} className="p-4 p-md-5 border-end">
                      <h2 className="display-5 fw-bold text-primary mb-1">₹7.5Cr+</h2>
                      <p className="text-uppercase fw-semibold mb-2">Fees Processed</p>
                      <p className="text-muted mb-0">Securely processed through our platform</p>
                    </Col>
                    <Col md={4} className="p-4 p-md-5">
                      <h2 className="display-5 fw-bold text-primary mb-1">100%</h2>
                      <p className="text-uppercase fw-semibold mb-2">Secure</p>
                      <p className="text-muted mb-0">With end-to-end encryption for all transactions</p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </div>
          </Row>
        </Container>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-5 mt-5">
        <Container>
          <div className="text-center mb-5">
            <h6 className="text-uppercase fw-semibold text-primary mb-2">Features</h6>
            <h2 className="display-5 fw-bold mb-3">Everything You Need</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
              Our fee payment portal offers a comprehensive set of features designed specifically for SVIT students and administrators.
            </p>
          </div>
          
          <Row className="g-4">
            <Col md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm hover-lift">
                <Card.Body className="p-4">
                  <div className="rounded-circle bg-primary bg-opacity-10 p-3 d-inline-flex mb-3">
                    <FontAwesomeIcon icon={faMoneyBillWave} className="text-primary fs-3" />
                  </div>
                  <h5 className="fw-bold mb-3">Online Payments</h5>
                  <p className="text-muted mb-0">
                    Pay your fees securely using multiple payment methods including UPI, credit/debit cards, and net banking.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm hover-lift">
                <Card.Body className="p-4">
                  <div className="rounded-circle bg-success bg-opacity-10 p-3 d-inline-flex mb-3">
                    <FontAwesomeIcon icon={faLaptop} className="text-success fs-3" />
                  </div>
                  <h5 className="fw-bold mb-3">Payment Tracking</h5>
                  <p className="text-muted mb-0">
                    View your complete payment history, download receipts, and track pending payments in real-time.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm hover-lift">
                <Card.Body className="p-4">
                  <div className="rounded-circle bg-info bg-opacity-10 p-3 d-inline-flex mb-3">
                    <FontAwesomeIcon icon={faChartLine} className="text-info fs-3" />
                  </div>
                  <h5 className="fw-bold mb-3">Payment Reminders</h5>
                  <p className="text-muted mb-0">
                    Receive timely notifications about upcoming due dates and never miss a payment deadline.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm hover-lift">
                <Card.Body className="p-4">
                  <div className="rounded-circle bg-warning bg-opacity-10 p-3 d-inline-flex mb-3">
                    <FontAwesomeIcon icon={faGraduationCap} className="text-warning fs-3" />
                  </div>
                  <h5 className="fw-bold mb-3">Student Dashboard</h5>
                  <p className="text-muted mb-0">
                    Access a personalized dashboard showing your fee status, payment history, and pending dues at a glance.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm hover-lift">
                <Card.Body className="p-4">
                  <div className="rounded-circle bg-danger bg-opacity-10 p-3 d-inline-flex mb-3">
                    <FontAwesomeIcon icon={faUserShield} className="text-danger fs-3" />
                  </div>
                  <h5 className="fw-bold mb-3">Secure Transactions</h5>
                  <p className="text-muted mb-0">
                    All payment transactions are secured with industry-standard encryption and robust security measures.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm hover-lift">
                <Card.Body className="p-4">
                  <div className="rounded-circle bg-primary bg-opacity-10 p-3 d-inline-flex mb-3">
                    <FontAwesomeIcon icon={faInfoCircle} className="text-primary fs-3" />
                  </div>
                  <h5 className="fw-bold mb-3">Instant Receipts</h5>
                  <p className="text-muted mb-0">
                    Generate and download digital receipts instantly after payment for your records and verification.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* How It Works Section */}
      <section id="howitworks" className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h6 className="text-uppercase fw-semibold text-primary mb-2">Process</h6>
            <h2 className="display-5 fw-bold mb-3">How It Works</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
              Three simple steps to complete your fee payments online without any hassle.
            </p>
          </div>
          
          <Row className="g-4 justify-content-center">
            <Col md={4}>
              <div className="text-center position-relative">
                <div className="step-connector d-none d-md-block"></div>
                <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '80px', height: '80px', fontSize: '32px' }}>
                  1
                </div>
                <h4 className="fw-bold mb-3">Login to Your Account</h4>
                <p className="text-muted mx-auto" style={{ maxWidth: "300px" }}>
                  Sign in securely using your student credentials provided by the college administration.
                </p>
              </div>
            </Col>
            
            <Col md={4}>
              <div className="text-center position-relative">
                <div className="step-connector d-none d-md-block"></div>
                <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '80px', height: '80px', fontSize: '32px' }}>
                  2
                </div>
                <h4 className="fw-bold mb-3">Select Fee to Pay</h4>
                <p className="text-muted mx-auto" style={{ maxWidth: "300px" }}>
                  Choose from your pending fees and select the ones you want to pay from your dashboard.
                </p>
              </div>
            </Col>
            
            <Col md={4}>
              <div className="text-center">
                <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '80px', height: '80px', fontSize: '32px' }}>
                  3
                </div>
                <h4 className="fw-bold mb-3">Complete Payment</h4>
                <p className="text-muted mx-auto" style={{ maxWidth: "300px" }}>
                  Choose your preferred payment method and securely complete the transaction online.
                </p>
              </div>
            </Col>
          </Row>
          
          <div className="text-center mt-5">
            <Link to="/login" className="btn btn-primary btn-lg">
              Get Started Now
            </Link>
          </div>
        </Container>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-5">
        <Container>
          <div className="text-center mb-5">
            <h6 className="text-uppercase fw-semibold text-primary mb-2">Testimonials</h6>
            <h2 className="display-5 fw-bold mb-3">What Students Say</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
              Feedback from SVIT students who use our fee payment portal.
            </p>
          </div>
          
          <Row>
            <Col lg={10} className="mx-auto">
              <Carousel 
                indicators={false} 
                controls={true} 
                className="testimonial-carousel"
                prevIcon={<span className="carousel-control-prev-icon rounded-circle bg-primary p-2" />}
                nextIcon={<span className="carousel-control-next-icon rounded-circle bg-primary p-2" />}
              >
                <Carousel.Item>
                  <Card className="border-0 shadow-sm">
                    <Card.Body className="p-5 text-center">
                      <div className="mb-4">
                        <span className="text-warning fs-3">★★★★★</span>
                      </div>
                      <p className="lead mb-4">
                        "The payment portal has made fee payments so much easier. I can pay my fees from home without standing in long queues. The receipt generation is instant, and I can access my payment history anytime."
                      </p>
                      <div className="d-flex flex-column align-items-center">
                        <div className="rounded-circle bg-light d-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px', overflow: 'hidden' }}>
                          <span className="fw-bold text-primary fs-1">R</span>
                        </div>
                        <h5 className="fw-bold mb-1">Rahul Sharma</h5>
                        <p className="text-muted mb-0">CSE, 3rd Year</p>
                      </div>
                    </Card.Body>
                  </Card>
                </Carousel.Item>
                
                <Carousel.Item>
                  <Card className="border-0 shadow-sm">
                    <Card.Body className="p-5 text-center">
                      <div className="mb-4">
                        <span className="text-warning fs-3">★★★★★</span>
                      </div>
                      <p className="lead mb-4">
                        "I love the reminder notifications. They help me keep track of upcoming fee deadlines, and I never miss a payment now. The interface is intuitive and easy to use even for someone not very tech-savvy."
                      </p>
                      <div className="d-flex flex-column align-items-center">
                        <div className="rounded-circle bg-light d-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px', overflow: 'hidden' }}>
                          <span className="fw-bold text-success fs-1">A</span>
                        </div>
                        <h5 className="fw-bold mb-1">Ananya Patel</h5>
                        <p className="text-muted mb-0">ECE, 2nd Year</p>
                      </div>
                    </Card.Body>
                  </Card>
                </Carousel.Item>
                
                <Carousel.Item>
                  <Card className="border-0 shadow-sm">
                    <Card.Body className="p-5 text-center">
                      <div className="mb-4">
                        <span className="text-warning fs-3">★★★★☆</span>
                      </div>
                      <p className="lead mb-4">
                        "The multiple payment options are really convenient. I can choose between UPI, net banking, or card payments based on what's available to me at the time. The dashboard gives a clear overview of all my fees."
                      </p>
                      <div className="d-flex flex-column align-items-center">
                        <div className="rounded-circle bg-light d-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px', overflow: 'hidden' }}>
                          <span className="fw-bold text-info fs-1">K</span>
                        </div>
                        <h5 className="fw-bold mb-1">Karthik Reddy</h5>
                        <p className="text-muted mb-0">MECH, 4th Year</p>
                      </div>
                    </Card.Body>
                  </Card>
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* FAQ Section */}
      <section id="faq" className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h6 className="text-uppercase fw-semibold text-primary mb-2">FAQ</h6>
            <h2 className="display-5 fw-bold mb-3">Frequently Asked Questions</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
              Find answers to commonly asked questions about our fee payment portal.
            </p>
          </div>
          
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="accordion shadow-sm" id="faqAccordion">
                <div className="accordion-item border mb-3">
                  <h2 className="accordion-header" id="heading1">
                    <button className="accordion-button fw-medium" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="true" aria-controls="collapse1">
                      How do I log in to the fee payment portal?
                    </button>
                  </h2>
                  <div id="collapse1" className="accordion-collapse collapse show" aria-labelledby="heading1" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      You can log in using your student ID and password provided by the college. If you've forgotten your password, you can use the "Forgot Password" option to reset it.
                    </div>
                  </div>
                </div>
                
                <div className="accordion-item border mb-3">
                  <h2 className="accordion-header" id="heading2">
                    <button className="accordion-button fw-medium collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2">
                      What payment methods are accepted?
                    </button>
                  </h2>
                  <div id="collapse2" className="accordion-collapse collapse" aria-labelledby="heading2" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      We accept various payment methods, including credit/debit cards, UPI, net banking, and wallet payments. You can also pay at the college counter if needed.
                    </div>
                  </div>
                </div>
                
                <div className="accordion-item border mb-3">
                  <h2 className="accordion-header" id="heading3">
                    <button className="accordion-button fw-medium collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3" aria-expanded="false" aria-controls="collapse3">
                      Is it safe to make payments online?
                    </button>
                  </h2>
                  <div id="collapse3" className="accordion-collapse collapse" aria-labelledby="heading3" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Yes, all transactions are secured with industry-standard encryption. We use trusted payment gateways that comply with the latest security standards to ensure your financial information remains secure.
                    </div>
                  </div>
                </div>
                
                <div className="accordion-item border mb-3">
                  <h2 className="accordion-header" id="heading4">
                    <button className="accordion-button fw-medium collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                      How do I get a receipt for my payment?
                    </button>
                  </h2>
                  <div id="collapse4" className="accordion-collapse collapse" aria-labelledby="heading4" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      A digital receipt is generated automatically after each successful payment. You can download or print it from your payment history at any time. Receipts are also sent to your registered email address.
                    </div>
                  </div>
                </div>
                
                <div className="accordion-item border">
                  <h2 className="accordion-header" id="heading5">
                    <button className="accordion-button fw-medium collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse5" aria-expanded="false" aria-controls="collapse5">
                      What should I do if my payment fails?
                    </button>
                  </h2>
                  <div id="collapse5" className="accordion-collapse collapse" aria-labelledby="heading5" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      If your payment fails, don't worry. The amount is usually refunded back to your account within 5-7 business days. You can check the status in your payment history. If you face any issues, please contact the accounts department.
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* CTA Section */}
      <section className="py-5 bg-primary text-white">
        <Container className="py-4">
          <Row className="align-items-center">
            <Col lg={8} className="mx-auto text-center">
              <h2 className="fw-bold mb-4">Ready to Simplify Your Fee Payments?</h2>
              <p className="lead mb-4">Join thousands of SVIT students who are already enjoying the convenience of our fee payment portal.</p>
              <Link to="/login" className="btn btn-light btn-lg fw-medium px-5">
                Get Started Now
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-5">
        <Container>
          <div className="text-center mb-5">
            <h6 className="text-uppercase fw-semibold text-primary mb-2">Contact</h6>
            <h2 className="display-5 fw-bold mb-3">Get In Touch</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
              Have questions or need assistance? Our support team is here to help you.
            </p>
          </div>
          
          <Row className="justify-content-center">
            <Col lg={10}>
              <Card className="border-0 shadow">
                <Card.Body className="p-0">
                  <Row className="g-0">
                    <Col lg={5} className="bg-primary text-white p-4 p-lg-5">
                      <h4 className="fw-bold mb-4">Contact Information</h4>
                      <p className="mb-5">Feel free to reach out to us with any questions or inquiries about the fee payment portal.</p>
                      
                      <div className="mb-4 d-flex align-items-center">
                        <div className="rounded-circle bg-white bg-opacity-20 p-2 me-3">
                          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-white" />
                        </div>
                        <div>
                          <p className="mb-0">SVIT College, NH-16,<br />
                          Andhra Pradesh, South India</p>
                        </div>
                      </div>
                      
                      <div className="mb-4 d-flex align-items-center">
                        <div className="rounded-circle bg-white bg-opacity-20 p-2 me-3">
                          <FontAwesomeIcon icon={faPhone} className="text-white" />
                        </div>
                        <div>
                          <p className="mb-0">+91 98765 43210</p>
                        </div>
                      </div>
                      
                      <div className="mb-4 d-flex align-items-center">
                        <div className="rounded-circle bg-white bg-opacity-20 p-2 me-3">
                          <FontAwesomeIcon icon={faEnvelope} className="text-white" />
                        </div>
                        <div>
                          <p className="mb-0">support@svit.edu.in</p>
                        </div>
                      </div>
                    </Col>
                    
                    <Col lg={7} className="p-4 p-lg-5">
                      <h4 className="fw-bold mb-4">Send us a message</h4>
                      <form>
                        <Row className="g-3">
                          <Col md={6}>
                            <div className="form-floating">
                              <input type="text" className="form-control" id="nameInput" placeholder="Your Name" />
                              <label htmlFor="nameInput">Your Name</label>
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="form-floating">
                              <input type="email" className="form-control" id="emailInput" placeholder="Email Address" />
                              <label htmlFor="emailInput">Email Address</label>
                            </div>
                          </Col>
                          <Col md={12}>
                            <div className="form-floating">
                              <input type="text" className="form-control" id="subjectInput" placeholder="Subject" />
                              <label htmlFor="subjectInput">Subject</label>
                            </div>
                          </Col>
                          <Col md={12}>
                            <div className="form-floating">
                              <textarea className="form-control" id="messageInput" placeholder="Your Message" style={{ height: "120px" }}></textarea>
                              <label htmlFor="messageInput">Your Message</label>
                            </div>
                          </Col>
                          <Col md={12}>
                            <button type="submit" className="btn btn-primary btn-lg w-100">
                              Send Message
                            </button>
                          </Col>
                        </Row>
                      </form>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;