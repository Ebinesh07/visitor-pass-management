import { Table, Badge } from "react-bootstrap";

const badgeColor = (status) => {
  switch (status) {
    case "Approved":
      return "success";
    case "Pending":
      return "warning";
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

const RecentVisitors = ({ visitors = [] }) => {
  return (
    <div className="dashboard-card-box">

      <div className="card-header-custom">

        <h5>Recent Visitors</h5>

        <span>{visitors.length} Records</span>

      </div>

      <div className="table-responsive">

        <Table hover className="align-middle mb-0">

          <thead>

            <tr>

              <th>Visitor</th>

              <th>Company</th>

              <th>Employee</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {visitors.length > 0 ? (

              visitors.slice(0, 5).map((visitor) => (

                <tr key={visitor._id}>

                  <td>

                    <div className="fw-semibold">
                      {visitor.visitorName}
                    </div>

                    <small className="text-muted">
                      {visitor.phone}
                    </small>

                  </td>

                  <td>{visitor.company}</td>

                  <td>{visitor.employee?.name}</td>

                  <td>

                    <Badge bg={badgeColor(visitor.status)}>
                      {visitor.status}
                    </Badge>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="4"
                  className="text-center py-5 text-muted"
                >
                  No Visitors Found
                </td>

              </tr>

            )}

          </tbody>

        </Table>

      </div>

    </div>
  );
};

export default RecentVisitors;