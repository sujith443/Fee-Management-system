import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Form,
  Modal,
  Alert,
  Spinner,
  Badge,
  Tabs,
  Tab,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrashAlt,
  faCheckCircle,
  faTimes,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";

// Mock data for fee structures
const mockFeeStructures = [
  {
    id: 1,
    type: "Examination Fee",
    branch: "All",
    semester: "All",
    amount: 2500,
    dueDate: "2025-04-15",
    description: "Mid-semester examination fee",
    isActive: true,
    lateCharge: 100,
    createdOn: "2025-02-15",
  },
  {
    id: 2,
    type: "Bus Fee",
    branch: "All",
    semester: "All",
    amount: 8000,
    dueDate: "2025-04-10",
    description: "Transportation fee for April-June 2025",
    isActive: true,
    lateCharge: 200,
    createdOn: "2025-02-15",
  },
  {
    id: 3,
    type: "Library Fee",
    branch: "All",
    semester: "All",
    amount: 1000,
    dueDate: "2025-03-30",
    description: "Annual library access fee",
    isActive: true,
    lateCharge: 50,
    createdOn: "2025-02-15",
  },
  {
    id: 4,
    type: "Lab Fee",
    branch: "CSE",
    semester: "3-8",
    amount: 3500,
    dueDate: "2025-05-20",
    description: "Computer lab usage fee",
    isActive: true,
    lateCharge: 100,
    createdOn: "2025-02-15",
  },
  {
    id: 5,
    type: "Lab Fee",
    branch: "ECE",
    semester: "3-8",
    amount: 4000,
    dueDate: "2025-05-20",
    description: "Electronics lab usage fee",
    isActive: true,
    lateCharge: 100,
    createdOn: "2025-02-15",
  },
  {
    id: 6,
    type: "Lab Fee",
    branch: "MECH",
    semester: "3-8",
    amount: 4500,
    dueDate: "2025-05-20",
    description: "Mechanical workshop fee",
    isActive: true,
    lateCharge: 100,
    createdOn: "2025-02-15",
  },
  {
    id: 7,
    type: "Hostel Fee",
    branch: "All",
    semester: "All",
    amount: 25000,
    dueDate: "2025-04-05",
    description: "Hostel accommodation fee",
    isActive: true,
    lateCharge: 500,
    createdOn: "2025-02-15",
  },
];

// Available branches
const branches = ["All", "CSE", "ECE", "MECH", "CIVIL", "EEE"];

// Available semesters
const semesters = ["All", "1", "2", "3", "4", "5", "6", "7", "8", "1-2", "3-8"];

const FeesManagement = () => {
  const [feeStructures, setFeeStructures] = useState([]);
  const [filteredFeeStructures, setFilteredFeeStructures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [filterType, setFilterType] = useState("All");
  const [filterBranch, setFilterBranch] = useState("All");
  const [filterSemester, setFilterSemester] = useState("All");
  const [filterActive, setFilterActive] = useState("All");

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentFee, setCurrentFee] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    type: "",
    branch: "All",
    semester: "All",
    amount: "",
    dueDate: "",
    description: "",
    isActive: true,
    lateCharge: "",
  });

  // Get unique fee types
  const feeTypes = [
    "All",
    ...new Set(mockFeeStructures.map((fee) => fee.type)),
  ];

  // Add fee handler
  const handleAddFee = () => {
    setFormData({
      type: "",
      branch: "All",
      semester: "All",
      amount: "",
      dueDate: "",
      description: "",
      isActive: true,
      lateCharge: "",
    });
    setShowAddModal(true);
  };

  // Format currency function
  const formatCurrency = (amount) => {
    return "₹" + amount.toLocaleString("en-IN");
  };
  // Format date function
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN");
  };

  // Confirm delete handler
  const confirmDelete = () => {
    const updatedFeeStructures = feeStructures.filter(
      (fee) => fee.id !== currentFee.id
    );
    setFeeStructures(updatedFeeStructures);
    setShowDeleteModal(false);
  };

  // Add submit handler
  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newFee = {
      id: Date.now(),
      ...formData,
      createdOn: new Date().toISOString().split("T")[0],
    };
    setFeeStructures([...feeStructures, newFee]);
    setShowAddModal(false);
  };

  // Edit submit handler
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedFeeStructures = feeStructures.map((fee) =>
      fee.id === currentFee.id ? { ...fee, ...formData } : fee
    );
    setFeeStructures(updatedFeeStructures);
    setShowEditModal(false);
  };

  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setFeeStructures(mockFeeStructures);
      setFilteredFeeStructures(mockFeeStructures);
      setLoading(false);
    }, 1000); // Added a timeout value here

    // Apply filters
    let filtered = [...feeStructures]; // Define filtered variable here

    if (filterType !== "All") {
      filtered = filtered.filter((fee) => fee.type === filterType);
    }

    if (filterBranch !== "All") {
      filtered = filtered.filter(
        (fee) => fee.branch === filterBranch || fee.branch === "All"
      );
    }

    if (filterSemester !== "All") {
      filtered = filtered.filter(
        (fee) => fee.semester === filterSemester || fee.semester === "All"
      );
    }

    if (filterActive !== "All") {
      const isActive = filterActive === "Active";
      filtered = filtered.filter((fee) => fee.isActive === isActive);
    }

    setFilteredFeeStructures(filtered);
  }, [feeStructures, filterType, filterBranch, filterSemester, filterActive]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
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

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="fs-2 fw-bold">Fee Management</h1>
          <p className="text-muted">
            Manage fee structures, amounts, and due dates
          </p>
        </Col>
        <Col xs="auto">
          <Button variant="primary" onClick={handleAddFee}>
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            Add New Fee
          </Button>
        </Col>
      </Row>

      {error && (
        <Row className="mb-4">
          <Col>
            <Alert variant="danger">{error}</Alert>
          </Col>
        </Row>
      )}

      <Row className="mb-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white py-3">
              <Row className="align-items-center">
                <Col>
                  <h5 className="mb-0 fw-bold">Fee Structures</h5>
                </Col>
                <Col xs="auto">
                  <div className="d-flex gap-2">
                    <Form.Select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="w-auto"
                    >
                      {feeTypes.map((type, index) => (
                        <option key={index} value={type}>
                          {type === "All" ? "All Fee Types" : type}
                        </option>
                      ))}
                    </Form.Select>

                    <Form.Select
                      value={filterBranch}
                      onChange={(e) => setFilterBranch(e.target.value)}
                      className="w-auto"
                    >
                      {branches.map((branch, index) => (
                        <option key={index} value={branch}>
                          {branch === "All" ? "All Branches" : branch}
                        </option>
                      ))}
                    </Form.Select>

                    <Form.Select
                      value={filterSemester}
                      onChange={(e) => setFilterSemester(e.target.value)}
                      className="w-auto"
                    >
                      {semesters.map((semester, index) => (
                        <option key={index} value={semester}>
                          {semester === "All"
                            ? "All Semesters"
                            : `Semester ${semester}`}
                        </option>
                      ))}
                    </Form.Select>

                    <Form.Select
                      value={filterActive}
                      onChange={(e) => setFilterActive(e.target.value)}
                      className="w-auto"
                    >
                      <option value="All">All Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </Form.Select>
                  </div>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table hover className="align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Fee Type</th>
                      <th>Branch</th>
                      <th>Semester</th>
                      <th>Amount</th>
                      <th>Due Date</th>
                      <th>Late Charge</th>
                      <th>Status</th>
                      <th>Created On</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFeeStructures.length === 0 ? (
                      <tr>
                        <td colSpan="9" className="text-center py-4">
                          No fee structures found
                        </td>
                      </tr>
                    ) : (
                      filteredFeeStructures.map((fee) => (
                        <tr key={fee.id}>
                          <td>
                            <div className="fw-medium">{fee.type}</div>
                            <small className="text-muted">
                              {fee.description}
                            </small>
                          </td>
                          <td>{fee.branch}</td>
                          <td>{fee.semester}</td>
                          <td className="fw-medium">
                            {formatCurrency(fee.amount)}
                          </td>
                          <td>{formatDate(fee.dueDate)}</td>
                          <td>{formatCurrency(fee.lateCharge)}</td>
                          <td>
                            {fee.isActive ? (
                              <Badge bg="success">Active</Badge>
                            ) : (
                              <Badge bg="secondary">Inactive</Badge>
                            )}
                          </td>
                          <td>{formatDate(fee.createdOn)}</td>
                          <td>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="me-2"
                              onClick={() => handleEditFee(fee)}
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDeleteFee(fee)}
                            >
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Add Fee Modal */}
      <Modal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        backdrop="static"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Fee</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddSubmit}>
          <Modal.Body>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="feeType">
                  <Form.Label>Fee Type</Form.Label>
                  <Form.Control
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="feeAmount">
                  <Form.Label>Amount (₹)</Form.Label>
                  <Form.Control
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="feeBranch">
                  <Form.Label>Branch</Form.Label>
                  <Form.Select
                    name="branch"
                    value={formData.branch}
                    onChange={handleInputChange}
                  >
                    {branches.map((branch, index) => (
                      <option key={index} value={branch}>
                        {branch}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="feeSemester">
                  <Form.Label>Semester</Form.Label>
                  <Form.Select
                    name="semester"
                    value={formData.semester}
                    onChange={handleInputChange}
                  >
                    {semesters.map((semester, index) => (
                      <option key={index} value={semester}>
                        {semester}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="feeDueDate">
                  <Form.Label>Due Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="feeLateCharge">
                  <Form.Label>Late Charge (₹)</Form.Label>
                  <Form.Control
                    type="number"
                    name="lateCharge"
                    value={formData.lateCharge}
                    onChange={handleInputChange}
                    min="0"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="feeDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={2}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="feeActive">
              <Form.Check
                type="checkbox"
                label="Active"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Add Fee
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Edit Fee Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        backdrop="static"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Fee Structure</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEditSubmit}>
          <Modal.Body>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="editFeeType">
                  <Form.Label>Fee Type</Form.Label>
                  <Form.Control
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="editFeeAmount">
                  <Form.Label>Amount (₹)</Form.Label>
                  <Form.Control
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="editFeeBranch">
                  <Form.Label>Branch</Form.Label>
                  <Form.Select
                    name="branch"
                    value={formData.branch}
                    onChange={handleInputChange}
                  >
                    {branches.map((branch, index) => (
                      <option key={index} value={branch}>
                        {branch}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="editFeeSemester">
                  <Form.Label>Semester</Form.Label>
                  <Form.Select
                    name="semester"
                    value={formData.semester}
                    onChange={handleInputChange}
                  >
                    {semesters.map((semester, index) => (
                      <option key={index} value={semester}>
                        {semester}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="editFeeDueDate">
                  <Form.Label>Due Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="editFeeLateCharge">
                  <Form.Label>Late Charge (₹)</Form.Label>
                  <Form.Control
                    type="number"
                    name="lateCharge"
                    value={formData.lateCharge}
                    onChange={handleInputChange}
                    min="0"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="editFeeDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={2}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="editFeeActive">
              <Form.Check
                type="checkbox"
                label="Active"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete the fee structure for{" "}
            <strong>{currentFee?.type}</strong>?
          </p>
          <p className="text-danger mb-0">This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default FeesManagement;
