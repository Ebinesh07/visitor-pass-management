import { Modal, Button } from "react-bootstrap";

const ConfirmModal = ({
  show,
  title = "Confirm",
  message = "Are you sure?",
  confirmText = "Yes",
  cancelText = "Cancel",
  confirmVariant = "danger",
  onConfirm,
  onClose,
  loading = false,
}) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
    >
      <Modal.Header closeButton>

        <Modal.Title>
          {title}
        </Modal.Title>

      </Modal.Header>

      <Modal.Body>

        <p className="mb-0">
          {message}
        </p>

      </Modal.Body>

      <Modal.Footer>

        <Button
          variant="secondary"
          onClick={onClose}
        >
          {cancelText}
        </Button>

        <Button
          variant={confirmVariant}
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? "Please Wait..." : confirmText}
        </Button>

      </Modal.Footer>

    </Modal>
  );
};

export default ConfirmModal;