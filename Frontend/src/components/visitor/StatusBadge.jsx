import { Badge } from "react-bootstrap";

const StatusBadge = ({ status }) => {
  let bg = "secondary";

  switch (status) {
    case "Pending":
      bg = "warning";
      break;

    case "Approved":
      bg = "success";
      break;

    case "Rejected":
      bg = "danger";
      break;

    case "Checked-In":
      bg = "primary";
      break;

    case "Checked-Out":
      bg = "secondary";
      break;

    case "Cancelled":
      bg = "dark";
      break;

    default:
      bg = "light";
  }

  return <Badge bg={bg}>{status}</Badge>;
};

export default StatusBadge;