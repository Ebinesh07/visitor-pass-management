import { useEffect, useMemo, useState } from "react";
import {
  Card,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";
import {
  FaRotate,
  FaFileExcel,
  FaFilePdf,
} from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";

import reportService from "../../services/reportService";

import Loader from "../../components/common/Loader";
import PageHeader from "../../components/common/PageHeader";
import SearchBar from "../../components/common/SearchBar";
import EmptyState from "../../components/common/EmptyState";

const Reports = () => {
  const [reports, setReports] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("All");

  const loadReports = async () => {
    try {
      setLoading(true);

      const data =
        await reportService.getAllVisitorsReport();

      setReports(data.visitors || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load reports."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const filteredReports = useMemo(() => {
    let result = reports;

    if (status !== "All") {
      result = result.filter(
        (item) =>
          item.status === status
      );
    }

    return result.filter((item) =>
      `
      ${item.visitorName}
      ${item.company}
      ${item.employee?.name}
      `
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [reports, search, status]);

  const totalVisitors =
    reports.length;

  const pending =
    reports.filter(
      (x) =>
        x.status === "Pending"
    ).length;

  const approved =
    reports.filter(
      (x) =>
        x.status === "Approved"
    ).length;

  const checkedIn =
    reports.filter(
      (x) =>
        x.status === "Checked-In"
    ).length;

  const checkedOut =
    reports.filter(
      (x) =>
        x.status === "Checked-Out"
    ).length;

  if (loading) {
    return (
      <Loader text="Loading Reports..." />
    );
  }

  return (
    <>
      <ToastContainer />

      <PageHeader
        title="Reports"
        subtitle="Visitor Analytics & Reports"
      />

      <Row className="g-4 mb-4">

        <Col lg={2} md={4}>
          <Card className="stats-card">
            <div className="stats-content">
              <span>Total</span>
              <h3>{totalVisitors}</h3>
            </div>
          </Card>
        </Col>

        <Col lg={2} md={4}>
          <Card className="stats-card">
            <div className="stats-content">
              <span>Pending</span>
              <h3>{pending}</h3>
            </div>
          </Card>
        </Col>

        <Col lg={2} md={4}>
          <Card className="stats-card">
            <div className="stats-content">
              <span>Approved</span>
              <h3>{approved}</h3>
            </div>
          </Card>
        </Col>

        <Col lg={2} md={4}>
          <Card className="stats-card">
            <div className="stats-content">
              <span>Checked-In</span>
              <h3>{checkedIn}</h3>
            </div>
          </Card>
        </Col>

        <Col lg={2} md={4}>
          <Card className="stats-card">
            <div className="stats-content">
              <span>Checked-Out</span>
              <h3>{checkedOut}</h3>
            </div>
          </Card>
        </Col>

      </Row>

      <Card className="border-0 shadow-sm">

        <Card.Body>

          <div className="d-flex flex-wrap justify-content-between gap-3 mb-4">

            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search Reports..."
            />

            <div className="d-flex gap-2">

              <Form.Select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value
                  )
                }
              >
                <option>
                  All
                </option>

                <option>
                  Pending
                </option>

                <option>
                  Approved
                </option>

                <option>
                  Rejected
                </option>

                <option>
                  Cancelled
                </option>

                <option>
                  Checked-In
                </option>

                <option>
                  Checked-Out
                </option>

              </Form.Select>

              <Button
                variant="outline-primary"
                onClick={loadReports}
              >
                <FaRotate />
              </Button>

              <Button
                variant="success"
              >
                <FaFileExcel />
              </Button>

              <Button
                variant="danger"
              >
                <FaFilePdf />
              </Button>

            </div>

          </div>

          {filteredReports.length ===
          0 ? (
            <EmptyState
              title="No Reports Found"
              description="There are no visitor reports available."
            />
          ) : (
            <div className="table-responsive">

  <table className="table report-table align-middle mb-0">

    <thead>

      <tr>

        <th>#</th>

        <th>Visitor</th>

        <th>Company</th>

        <th>Employee</th>

        <th>Visit Date</th>

        <th>Status</th>

      </tr>

    </thead>

    <tbody>

      {filteredReports.map(
        (report, index) => (

          <tr key={report._id}>

            <td>

              {index + 1}

            </td>

            <td>

              <div className="visitor-profile">

                <div className="visitor-avatar">

                  {report.visitorName
                    ?.charAt(0)
                    ?.toUpperCase()}

                </div>

                <div>

                  <h6>

                    {report.visitorName}

                  </h6>

                  <span>

                    {report.phone}

                  </span>

                </div>

              </div>

            </td>

            <td>

              {report.company}

            </td>

            <td>

              {report.employee?.name}

            </td>

            <td>

              {new Date(
                report.visitDate
              ).toLocaleDateString()}

            </td>

            <td>

              <span
                className={`badge bg-${
                  report.status ===
                  "Approved"
                    ? "success"
                    : report.status ===
                      "Pending"
                    ? "warning"
                    : report.status ===
                      "Rejected"
                    ? "danger"
                    : report.status ===
                      "Checked-In"
                    ? "primary"
                    : report.status ===
                      "Checked-Out"
                    ? "secondary"
                    : "dark"
                }`}
              >

                {report.status}

              </span>

            </td>

          </tr>

        )
      )}

    </tbody>

  </table>

</div>
          )}

        </Card.Body>

      </Card>

    </>
  );
};

export default Reports;