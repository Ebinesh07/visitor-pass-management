import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ApprovalModal = ({
  show,
  handleClose,
  handleSubmit,
  title = "Approve Visitor",
  buttonText = "Approve",
  buttonVariant = "success",
  loading = false,
}) => {
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    if (show) {
      setRemarks("");
    }
  }, [show]);

  const submitHandler = (e) => {
    e.preventDefault();
    handleSubmit(remarks);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
    >
      <Form onSubmit={submitHandler}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group>
            <Form.Label>
              Remarks
            </Form.Label>

            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Enter remarks..."
              value={remarks}
              onChange={(e) =>
                setRemarks(e.target.value)
              }
            />

            <Form.Text className="text-muted">
              Remarks are optional but recommended.
            </Form.Text>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant={buttonVariant}
            disabled={loading}
          >
            {loading
              ? "Please Wait..."
              : buttonText}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ApprovalModal;