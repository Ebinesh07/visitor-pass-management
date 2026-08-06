import { Table, Button, Badge } from "react-bootstrap";
import {
  FaUser,
  FaCircleCheck,
  FaCircleXmark,
  FaRightToBracket,
  FaRightFromBracket,
  FaBan,
} from "react-icons/fa6";

const getStatus = (status) => {
  switch (status) {
    case "Pending":
      return "warning";

    case "Approved":
      return "success";

    case "Rejected":
      return "danger";

    case "Checked-In":
      return "primary";

    case "Checked-Out":
      return "secondary";

    case "Cancelled":
      return "dark";

    default:
      return "light";
  }
};

const VisitorTable = ({
  visitors,
  onApprove,
  onReject,
  onCheckIn,
  onCheckOut,
  onCancel,
}) => {
  return (
    <div className="table-responsive">

      <Table hover className="visitor-table align-middle mb-0">

        <thead>

          <tr>

            <th>#</th>

            <th>Visitor</th>

            <th>Company</th>

            <th>Employee</th>

            <th>Date</th>

            <th>Status</th>

            <th className="text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {visitors.map((visitor, index) => (

            <tr key={visitor._id}>

              <td>{index + 1}</td>

              <td>

                <div className="visitor-profile">

                  <div className="visitor-avatar">

                    <FaUser />

                  </div>

                  <div>

                    <h6>

                      {visitor.visitorName}

                    </h6>

                    <span>

                      {visitor.phone}

                    </span>

                  </div>

                </div>

              </td>

              <td>

                {visitor.company}

              </td>

              <td>

                {visitor.employee?.name}

              </td>

              <td>

                {new Date(
                  visitor.visitDate
                ).toLocaleDateString()}

              </td>

              <td>

                <Badge bg={getStatus(visitor.status)}>

                  {visitor.status}

                </Badge>

              </td>

              <td>

                <div className="visitor-actions">

                  {visitor.status === "Pending" && (
                    <>
                      <Button
                        size="sm"
                        variant="success"
                        onClick={() =>
                          onApprove(visitor)
                        }
                      >
                        <FaCircleCheck />
                      </Button>

                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() =>
                          onReject(visitor)
                        }
                      >
                        <FaCircleXmark />
                      </Button>

                      <Button
                        size="sm"
                        variant="dark"
                        onClick={() =>
                          onCancel(visitor)
                        }
                      >
                        <FaBan />
                      </Button>
                    </>
                  )}

                  {visitor.status ===
                    "Approved" && (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() =>
                        onCheckIn(visitor)
                      }
                    >
                      <FaRightToBracket />
                    </Button>
                  )}

                  {visitor.status ===
                    "Checked-In" && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() =>
                        onCheckOut(visitor)
                      }
                    >
                      <FaRightFromBracket />
                    </Button>
                  )}

                  {(visitor.status ===
                    "Rejected" ||
                    visitor.status ===
                      "Cancelled" ||
                    visitor.status ===
                      "Checked-Out") && (
                    <span className="text-muted fw-semibold">
                      Completed
                    </span>
                  )}

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </Table>

    </div>
  );
};

export default VisitorTable;