import { useEffect, useState } from "react";
import { Row, Col, Spinner, Alert } from "react-bootstrap";

import dashboardService from "../../services/dashboardService";
import visitorService from "../../services/visitorService";

import StatsCards from "../../components/dashboard/StatsCards";
import VisitorChart from "../../components/dashboard/VisitorChart";
import RecentVisitors from "../../components/dashboard/RecentVisitors";
import RecentActivity from "../../components/dashboard/RecentActivity";
import QuickActions from "../../components/dashboard/QuickActions";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({
    totalEmployees: 0,
    totalVisitors: 0,
    pendingVisitors: 0,
    approvedVisitors: 0,
    checkedInVisitors: 0,
    checkedOutVisitors: 0,
    rejectedVisitors: 0,
    cancelledVisitors: 0,
  });

  const [recentVisitors, setRecentVisitors] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const dashboardData =
        await dashboardService.getDashboard();

      const visitorData =
        await visitorService.getAllVisitors();

      setDashboard(dashboardData.dashboard);

      setRecentVisitors(visitorData.visitors);

      setError("");

    } catch (err) {

      setError(
        err.response?.data?.message ||
          "Failed to load dashboard."
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        {error}
      </Alert>
    );
  }

  return (
    <div>

      <div className="page-title mb-4">

        <h2>Dashboard</h2>

        <p className="text-muted mb-0">
          Welcome back, Admin 👋
        </p>

      </div>

      <StatsCards dashboard={dashboard} />

      <Row className="g-4 mt-1">

        <Col xl={8}>

          <RecentVisitors
            visitors={recentVisitors}
          />

        </Col>

        <Col xl={4}>

          <VisitorChart
            dashboard={dashboard}
          />

        </Col>

      </Row>

      <Row className="g-4 mt-1">

        <Col xl={6}>

          <RecentActivity
            dashboard={dashboard}
          />

        </Col>

        <Col xl={6}>

          <QuickActions />

        </Col>

      </Row>

    </div>
  );
};

export default Dashboard;