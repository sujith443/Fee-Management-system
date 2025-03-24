import React, { useState, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Tab, Nav, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faBell, 
  faLock, 
  faExclamationTriangle, 
  faUserCog,
  faBuilding,
  faWrench,
  faUsers,
  faDatabase,
  faServer,
  faShieldAlt,
  faSave,
  faUndo,
  faToggleOn,
  faToggleOff
} from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '../../contexts/ThemeContext';

const Settings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  
  // Email notification settings
  const [emailSettings, setEmailSettings] = useState({
    paymentReceipts: true,
    paymentReminders: true,
    feeUpdates: true,
    systemNotifications: false
  });
  
  // SMS notification settings
  const [smsSettings, setSmsSettings] = useState({
    paymentReceipts: false,
    paymentReminders: true,
    feeUpdates: false
  });
  
  // Fee settings
  const [feeSettings, setFeeSettings] = useState({
    allowPartialPayment: true,
    autoApplyLateCharge: true,
    lateChargePercentage: 5,
    lateChargeGraceDays: 5,
    feeRoundingMethod: 'none'
  });
  
  // System settings
  const [systemSettings, setSystemSettings] = useState({
    sessionTimeout: 30,
    defaultLandingPage: 'dashboard',
    dataRetentionPeriod: 36,
    allowMultipleLogins: false,
    enableAuditLog: true
  });
  
  const handleEmailSettingChange = (setting) => {
    setEmailSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };
  
  const handleSmsSettingChange = (setting) => {
    setSmsSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };
  
  const handleFeeSettingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFeeSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSystemSettingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSystemSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSaveSettings = () => {
    // In a real app, this would call an API to save the settings
    setSaveSuccess(true);
    
    // Hide the success message after 3 seconds
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };
  
  const handleResetSettings = () => {
    // In a real app, this would reset to default settings
    
    // For now, just show a confirmation
    if (window.confirm('Are you sure you want to reset all settings to default values?')) {
      // Reset logic would go here
      alert('Settings have been reset to default values');
    }
  };
  
  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="fs-2 fw-bold">Settings</h1>
          <p className="text-muted">Configure system preferences and notification settings</p>
        </Col>
      </Row>
      
      {saveSuccess && (
        <Alert variant="success" className="mb-4">
          <div className="d-flex align-items-center">
            <div className="me-3">
              <FontAwesomeIcon icon={faSave} className="text-success" />
            </div>
            <div>
              <Alert.Heading className="fs-5 mb-1">Settings Saved Successfully</Alert.Heading>
              <p className="mb-0">Your settings have been updated and will take effect immediately.</p>
            </div>
          </div>
        </Alert>
      )}
      
      <Row>
        <Col lg={3} className="mb-4 mb-lg-0">
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white py-3">
              <h5 className="mb-0 fw-bold">Settings</h5>
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item 
                action 
                active={activeTab === 'general'}
                onClick={() => setActiveTab('general')}
                className="d-flex align-items-center py-3"
              >
                <FontAwesomeIcon icon={faWrench} className="me-3" />
                General Settings
              </ListGroup.Item>
              <ListGroup.Item 
                action 
                active={activeTab === 'notifications'}
                onClick={() => setActiveTab('notifications')}
                className="d-flex align-items-center py-3"
              >
                <FontAwesomeIcon icon={faBell} className="me-3" />
                Notifications
              </ListGroup.Item>
              <ListGroup.Item 
                action 
                active={activeTab === 'fees'}
                onClick={() => setActiveTab('fees')}
                className="d-flex align-items-center py-3"
              >
                <FontAwesomeIcon icon={faBuilding} className="me-3" />
                Fee Settings
              </ListGroup.Item>
              <ListGroup.Item 
                action 
                active={activeTab === 'users'}
                onClick={() => setActiveTab('users')}
                className="d-flex align-items-center py-3"
              >
                <FontAwesomeIcon icon={faUsers} className="me-3" />
                User Management
              </ListGroup.Item>
              <ListGroup.Item 
                action 
                active={activeTab === 'security'}
                onClick={() => setActiveTab('security')}
                className="d-flex align-items-center py-3"
              >
                <FontAwesomeIcon icon={faShieldAlt} className="me-3" />
                Security
              </ListGroup.Item>
              <ListGroup.Item 
                action 
                active={activeTab === 'backups'}
                onClick={() => setActiveTab('backups')}
                className="d-flex align-items-center py-3"
              >
                <FontAwesomeIcon icon={faDatabase} className="me-3" />
                Backup & Restore
              </ListGroup.Item>
              <ListGroup.Item 
                action 
                active={activeTab === 'system'}
                onClick={() => setActiveTab('system')}
                className="d-flex align-items-center py-3"
              >
                <FontAwesomeIcon icon={faServer} className="me-3" />
                System
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        
        <Col lg={9}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white py-3">
              <h5 className="mb-0 fw-bold">
                {activeTab === 'general' && 'General Settings'}
                {activeTab === 'notifications' && 'Notification Settings'}
                {activeTab === 'fees' && 'Fee Configuration'}
                {activeTab === 'users' && 'User Management'}
                {activeTab === 'security' && 'Security Settings'}
                {activeTab === 'backups' && 'Backup & Restore'}
                {activeTab === 'system' && 'System Settings'}
              </h5>
            </Card.Header>
            <Card.Body>
              {activeTab === 'general' && (
                <div>
                  <Form>
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-medium">Application Theme</Form.Label>
                      <div className="d-flex align-items-center">
                        <Button 
                          variant={theme === 'light' ? 'primary' : 'outline-primary'}
                          className="me-3"
                          onClick={() => theme !== 'light' && toggleTheme()}
                        >
                          Light Mode
                        </Button>
                        <Button 
                          variant={theme === 'dark' ? 'primary' : 'outline-primary'}
                          onClick={() => theme !== 'dark' && toggleTheme()}
                        >
                          Dark Mode
                        </Button>
                      </div>
                    </Form.Group>
                    
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-medium">Language</Form.Label>
                      <Form.Select>
                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                        <option value="te">Telugu</option>
                        <option value="ta">Tamil</option>
                      </Form.Select>
                      <Form.Text className="text-muted">
                        This will change the language for the entire application.
                      </Form.Text>
                    </Form.Group>
                    
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-medium">Date Format</Form.Label>
                      <Form.Select>
                        <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                        <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                        <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                      </Form.Select>
                    </Form.Group>
                    
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-medium">Currency Format</Form.Label>
                      <Form.Select>
                        <option value="en-IN">Indian Rupee (₹)</option>
                        <option value="en-US">US Dollar ($)</option>
                        <option value="en-GB">British Pound (£)</option>
                        <option value="en-EU">Euro (€)</option>
                      </Form.Select>
                    </Form.Group>
                    
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-medium">Display Settings</Form.Label>
                      <Form.Check 
                        type="switch"
                        id="showPagination"
                        label="Show pagination in tables"
                        defaultChecked
                        className="mb-2"
                      />
                      <Form.Check 
                        type="switch"
                        id="enableAnimations"
                        label="Enable animations"
                        defaultChecked
                        className="mb-2"
                      />
                      <Form.Check 
                        type="switch"
                        id="showHelpTips"
                        label="Show help tips"
                        defaultChecked
                        className="mb-2"
                      />
                      <Form.Check 
                        type="switch"
                        id="compactView"
                        label="Use compact view"
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-medium">Default Page Size</Form.Label>
                      <Form.Select>
                        <option value="10">10 items per page</option>
                        <option value="25">25 items per page</option>
                        <option value="50">50 items per page</option>
                        <option value="100">100 items per page</option>
                      </Form.Select>
                      <Form.Text className="text-muted">
                        This will set the default number of items displayed in tables.
                      </Form.Text>
                    </Form.Group>
                  </Form>
                </div>
              )}
              
              {activeTab === 'notifications' && (
                <div>
                  <h6 className="mb-3 fw-bold">Email Notifications</h6>
                  <div className="border rounded p-3 mb-4">
                    <Form.Group className="mb-3">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <Form.Label className="fw-medium mb-0">Payment Receipts</Form.Label>
                          <p className="text-muted small mb-0">Send receipt email after successful payment</p>
                        </div>
                        <Form.Check 
                          type="switch"
                          id="emailPaymentReceipts"
                          checked={emailSettings.paymentReceipts}
                          onChange={() => handleEmailSettingChange('paymentReceipts')}
                        />
                      </div>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <Form.Label className="fw-medium mb-0">Payment Reminders</Form.Label>
                          <p className="text-muted small mb-0">Send reminder emails for upcoming and overdue payments</p>
                        </div>
                        <Form.Check 
                          type="switch"
                          id="emailPaymentReminders"
                          checked={emailSettings.paymentReminders}
                          onChange={() => handleEmailSettingChange('paymentReminders')}
                        />
                      </div>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <Form.Label className="fw-medium mb-0">Fee Updates</Form.Label>
                          <p className="text-muted small mb-0">Send email when new fees are added or existing fees are updated</p>
                        </div>
                        <Form.Check 
                          type="switch"
                          id="emailFeeUpdates"
                          checked={emailSettings.feeUpdates}
                          onChange={() => handleEmailSettingChange('feeUpdates')}
                        />
                      </div>
                    </Form.Group>
                    
                    <Form.Group className="mb-0">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <Form.Label className="fw-medium mb-0">System Notifications</Form.Label>
                          <p className="text-muted small mb-0">Send email for system updates and maintenance</p>
                        </div>
                        <Form.Check 
                          type="switch"
                          id="emailSystemNotifications"
                          checked={emailSettings.systemNotifications}
                          onChange={() => handleEmailSettingChange('systemNotifications')}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  
                  <h6 className="mb-3 fw-bold">SMS Notifications</h6>
                  <div className="border rounded p-3 mb-4">
                    <Form.Group className="mb-3">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <Form.Label className="fw-medium mb-0">Payment Receipts</Form.Label>
                          <p className="text-muted small mb-0">Send SMS receipt after successful payment</p>
                        </div>
                        <Form.Check 
                          type="switch"
                          id="smsPaymentReceipts"
                          checked={smsSettings.paymentReceipts}
                          onChange={() => handleSmsSettingChange('paymentReceipts')}
                        />
                      </div>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <Form.Label className="fw-medium mb-0">Payment Reminders</Form.Label>
                          <p className="text-muted small mb-0">Send SMS reminders for upcoming and overdue payments</p>
                        </div>
                        <Form.Check 
                          type="switch"
                          id="smsPaymentReminders"
                          checked={smsSettings.paymentReminders}
                          onChange={() => handleSmsSettingChange('paymentReminders')}
                        />
                      </div>
                    </Form.Group>
                    
                    <Form.Group className="mb-0">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <Form.Label className="fw-medium mb-0">Fee Updates</Form.Label>
                          <p className="text-muted small mb-0">Send SMS when new fees are added or existing fees are updated</p>
                        </div>
                        <Form.Check 
                          type="switch"
                          id="smsFeeUpdates"
                          checked={smsSettings.feeUpdates}
                          onChange={() => handleSmsSettingChange('feeUpdates')}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  
                  <h6 className="mb-3 fw-bold">Email Templates</h6>
                  <div className="border rounded p-3">
                    <p className="text-muted small">
                      Customize email templates used for various notifications.
                    </p>
                    <div className="list-group">
                      <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        Payment Receipt Template
                        <FontAwesomeIcon icon={faEdit} />
                      </a>
                      <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        Payment Reminder Template
                        <FontAwesomeIcon icon={faEdit} />
                      </a>
                      <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        Fee Update Template
                        <FontAwesomeIcon icon={faEdit} />
                      </a>
                      <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        System Notification Template
                        <FontAwesomeIcon icon={faEdit} />
                      </a>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'fees' && (
                <div>
                  <Form>
                    <Row className="mb-4">
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-medium">Allow Partial Payment</Form.Label>
                          <Form.Check 
                            type="switch"
                            id="allowPartialPayment"
                            name="allowPartialPayment"
                            checked={feeSettings.allowPartialPayment}
                            onChange={handleFeeSettingChange}
                          />
                          <Form.Text className="text-muted">
                            Enable students to pay fees in installments.
                          </Form.Text>
                        </Form.Group>
                      </Col>
                      
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-medium">Auto Apply Late Charge</Form.Label>
                          <Form.Check 
                            type="switch"
                            id="autoApplyLateCharge"
                            name="autoApplyLateCharge"
                            checked={feeSettings.autoApplyLateCharge}
                            onChange={handleFeeSettingChange}
                          />
                          <Form.Text className="text-muted">
                            Automatically apply late charges for overdue payments.
                          </Form.Text>
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Row className="mb-4">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-medium">Late Charge Percentage</Form.Label>
                          <Form.Control
                            type="number"
                            min="0"
                            max="100"
                            name="lateChargePercentage"
                            value={feeSettings.lateChargePercentage}
                            onChange={handleFeeSettingChange}
                            disabled={!feeSettings.autoApplyLateCharge}
                          />
                          <Form.Text className="text-muted">
                            Percentage of fee amount to charge as late fee.
                          </Form.Text>
                        </Form.Group>
                      </Col>
                      
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-medium">Grace Period (Days)</Form.Label>
                          <Form.Control
                            type="number"
                            min="0"
                            name="lateChargeGraceDays"
                            value={feeSettings.lateChargeGraceDays}
                            onChange={handleFeeSettingChange}
                            disabled={!feeSettings.autoApplyLateCharge}
                          />
                          <Form.Text className="text-muted">
                            Number of days after due date before late charge applies.
                          </Form.Text>
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Row className="mb-4">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-medium">Fee Rounding Method</Form.Label>
                          <Form.Select
                            name="feeRoundingMethod"
                            value={feeSettings.feeRoundingMethod}
                            onChange={handleFeeSettingChange}
                          >
                            <option value="none">No Rounding</option>
                            <option value="nearest">Round to Nearest Rupee</option>
                            <option value="up">Round Up</option>
                            <option value="down">Round Down</option>
                          </Form.Select>
                          <Form.Text className="text-muted">
                            How to round fee amounts in calculations.
                          </Form.Text>
                        </Form.Group>
                      </Col>
                      
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-medium">Payment Gateway</Form.Label>
                          <Form.Select>
                            <option value="razorpay">Razorpay</option>
                            <option value="paytm">Paytm</option>
                            <option value="phonepe">PhonePe</option>
                            <option value="multiple">Multiple Gateways</option>
                          </Form.Select>
                          <Form.Text className="text-muted">
                            Select the payment gateway for online payments.
                          </Form.Text>
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <h6 className="fw-bold mb-3">Payment Rules</h6>
                    <div className="border rounded p-3 mb-4">
                      <Form.Group className="mb-3">
                        <Form.Check
                          type="checkbox"
                          id="resolveOldestFirst"
                          label="Resolve oldest payments first"
                          defaultChecked
                        />
                        <Form.Text className="text-muted">
                          Apply payments to oldest outstanding fees first.
                        </Form.Text>
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Check
                          type="checkbox"
                          id="includeLateFees"
                          label="Include late fees in total amount due"
                          defaultChecked
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-0">
                        <Form.Check
                          type="checkbox"
                          id="allowOverpayment"
                          label="Allow overpayment"
                        />
                        <Form.Text className="text-muted">
                          Allow payments that exceed the amount due.
                        </Form.Text>
                      </Form.Group>
                    </div>
                  </Form>
                </div>
              )}
              
              {activeTab === 'system' && (
                <div>
                  <Form>
                    <Row className="mb-4">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-medium">Session Timeout (minutes)</Form.Label>
                          <Form.Control
                            type="number"
                            min="5"
                            name="sessionTimeout"
                            value={systemSettings.sessionTimeout}
                            onChange={handleSystemSettingChange}
                          />
                          <Form.Text className="text-muted">
                            Inactive time before user is automatically logged out.
                          </Form.Text>
                        </Form.Group>
                      </Col>
                      
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-medium">Default Landing Page</Form.Label>
                          <Form.Select
                            name="defaultLandingPage"
                            value={systemSettings.defaultLandingPage}
                            onChange={handleSystemSettingChange}
                          >
                            <option value="dashboard">Dashboard</option>
                            <option value="students">Students</option>
                            <option value="payments">Payments</option>
                            <option value="fees">Fees Management</option>
                          </Form.Select>
                          <Form.Text className="text-muted">
                            Page to display after admin login.
                          </Form.Text>
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Row className="mb-4">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-medium">Data Retention Period (months)</Form.Label>
                          <Form.Control
                            type="number"
                            min="1"
                            name="dataRetentionPeriod"
                            value={systemSettings.dataRetentionPeriod}
                            onChange={handleSystemSettingChange}
                          />
                          <Form.Text className="text-muted">
                            How long to keep payment records before archiving.
                          </Form.Text>
                        </Form.Group>
                      </Col>
                      
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-medium">Allow Multiple Logins</Form.Label>
                          <Form.Check 
                            type="switch"
                            id="allowMultipleLogins"
                            name="allowMultipleLogins"
                            checked={systemSettings.allowMultipleLogins}
                            onChange={handleSystemSettingChange}
                          />
                          <Form.Text className="text-muted">
                            Allow users to be logged in from multiple devices simultaneously.
                          </Form.Text>
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Row className="mb-4">
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-medium">Enable Audit Log</Form.Label>
                          <Form.Check 
                            type="switch"
                            id="enableAuditLog"
                            name="enableAuditLog"
                            checked={systemSettings.enableAuditLog}
                            onChange={handleSystemSettingChange}
                          />
                          <Form.Text className="text-muted">
                            Log all system changes and user actions.
                          </Form.Text>
                        </Form.Group>
                      </Col>
                      
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-medium">Maintenance Mode</Form.Label>
                          <Form.Check 
                            type="switch"
                            id="maintenanceMode"
                            label="Enable maintenance mode"
                          />
                          <Form.Text className="text-muted">
                            Temporarily disable access for all non-admin users.
                          </Form.Text>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                </div>
              )}
              
              {/* Placeholder content for other tabs */}
              {activeTab === 'users' && (
                <div className="text-center py-5">
                  <FontAwesomeIcon icon={faUserCog} className="text-primary mb-3" style={{ fontSize: '3rem' }} />
                  <h5 className="fw-bold">User Management</h5>
                  <p className="text-muted">User management features will be implemented here.</p>
                </div>
              )}
              
              {activeTab === 'security' && (
                <div className="text-center py-5">
                  <FontAwesomeIcon icon={faShieldAlt} className="text-primary mb-3" style={{ fontSize: '3rem' }} />
                  <h5 className="fw-bold">Security Settings</h5>
                  <p className="text-muted">Security settings and configuration will be implemented here.</p>
                </div>
              )}
              
              {activeTab === 'backups' && (
                <div className="text-center py-5">
                  <FontAwesomeIcon icon={faDatabase} className="text-primary mb-3" style={{ fontSize: '3rem' }} />
                  <h5 className="fw-bold">Backup & Restore</h5>
                  <p className="text-muted">Database backup and restore features will be implemented here.</p>
                </div>
              )}
            </Card.Body>
            <Card.Footer className="bg-white py-3">
              <div className="d-flex justify-content-between">
                <Button 
                  variant="outline-secondary"
                  onClick={handleResetSettings}
                >
                  <FontAwesomeIcon icon={faUndo} className="me-2" />
                  Reset to Default
                </Button>
                <Button 
                  variant="primary"
                  onClick={handleSaveSettings}
                >
                  <FontAwesomeIcon icon={faSave} className="me-2" />
                  Save Settings
                </Button>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;