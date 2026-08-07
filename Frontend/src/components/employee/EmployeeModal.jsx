import { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
} from "react-bootstrap";

const initialState = {
  employeeId: "",
  name: "",
  email: "",
  phone: "",
  department: "",
  designation: "",
};

const EmployeeModal = ({
  show,
  handleClose,
  handleSubmit,
  loading,
  selectedEmployee,
}) => {
  const [formData, setFormData] =
    useState(initialState);

  useEffect(() => {
    if (selectedEmployee) {
      setFormData({
        employeeId:
          selectedEmployee.employeeId || "",
        name:
          selectedEmployee.name || "",
        email:
          selectedEmployee.email || "",
        phone:
          selectedEmployee.phone || "",
        department:
          selectedEmployee.department || "",
        designation:
          selectedEmployee.designation || "",
      });
    } else {
      setFormData(initialState);
    }
  }, [selectedEmployee, show]);

  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
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
      <Form onSubmit={submitHandler}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedEmployee
              ? "Update Employee"
              : "Add Employee"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>
                  Employee ID
                </Form.Label>

                <Form.Control
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={changeHandler}
                  placeholder="EMP001"
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>
                  Full Name
                </Form.Label>

                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={changeHandler}
                  placeholder="Employee Name"
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>
                  Email Address
                </Form.Label>

                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={changeHandler}
                  placeholder="employee@email.com"
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>
                  Phone Number
                </Form.Label>

                <Form.Control
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={changeHandler}
                  placeholder="9876543210"
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>
                  Department
                </Form.Label>

                <Form.Control
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={changeHandler}
                  placeholder="IT"
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>
                  Designation
                </Form.Label>

                <Form.Control
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={changeHandler}
                  placeholder="Software Engineer"
                  required
                />
              </Form.Group>
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
              ? "Saving..."
              : selectedEmployee
              ? "Update Employee"
              : "Add Employee"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EmployeeModal;