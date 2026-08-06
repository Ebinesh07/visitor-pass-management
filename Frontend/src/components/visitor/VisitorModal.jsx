import { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
} from "react-bootstrap";

const VisitorModal = ({
  show,
  handleClose,
  handleSubmit,
  employees,
  loading,
}) => {
  const [formData, setFormData] = useState({
    visitorName: "",
    phone: "",
    email: "",
    company: "",
    purpose: "",
    employee: "",
    visitDate: "",
    expectedArrivalTime: "",
  });

  useEffect(() => {
    if (!show) {
      setFormData({
        visitorName: "",
        phone: "",
        email: "",
        company: "",
        purpose: "",
        employee: "",
        visitDate: "",
        expectedArrivalTime: "",
      });
    }
  }, [show]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size="lg"
    >
      <Form onSubmit={submitForm}>

        <Modal.Header closeButton>

          <Modal.Title>
            Register Visitor
          </Modal.Title>

        </Modal.Header>

        <Modal.Body>

          <Row>

            <Col md={6} className="mb-3">

              <Form.Label>
                Visitor Name
              </Form.Label>

              <Form.Control
                type="text"
                name="visitorName"
                value={formData.visitorName}
                onChange={handleChange}
                required
              />

            </Col>

            <Col md={6} className="mb-3">

              <Form.Label>
                Phone
              </Form.Label>

              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />

            </Col>

            <Col md={6} className="mb-3">

              <Form.Label>
                Email
              </Form.Label>

              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </Col>

            <Col md={6} className="mb-3">

              <Form.Label>
                Company
              </Form.Label>

              <Form.Control
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
              />

            </Col>

            <Col md={6} className="mb-3">

              <Form.Label>
                Purpose
              </Form.Label>

              <Form.Control
                type="text"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                required
              />

            </Col>

            <Col md={6} className="mb-3">

              <Form.Label>
                Employee
              </Form.Label>

              <Form.Select
                name="employee"
                value={formData.employee}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Employee
                </option>

                {employees.map((employee) => (
                  <option
                    key={employee._id}
                    value={employee._id}
                  >
                    {employee.name}
                  </option>
                ))}

              </Form.Select>

            </Col>

            <Col md={6} className="mb-3">

              <Form.Label>
                Visit Date
              </Form.Label>

              <Form.Control
                type="date"
                name="visitDate"
                value={formData.visitDate}
                onChange={handleChange}
                required
              />

            </Col>

            <Col md={6}>

              <Form.Label>
                Expected Arrival Time
              </Form.Label>

              <Form.Control
                type="text"
                name="expectedArrivalTime"
                placeholder="10:30 AM"
                value={formData.expectedArrivalTime}
                onChange={handleChange}
                required
              />

            </Col>

          </Row>

        </Modal.Body>

        <Modal.Footer>

          <Button
            variant="secondary"
            onClick={handleClose}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
          >
            {loading
              ? "Please Wait..."
              : "Register Visitor"}
          </Button>

        </Modal.Footer>

      </Form>
    </Modal>
  );
};

export default VisitorModal;