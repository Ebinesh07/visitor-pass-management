import { useEffect, useState } from "react";
import { Row, Col, Alert } from "react-bootstrap";

import { useAuth } from "../../context/AuthContext";

import dashboardService from "../../services/dashboardService";
import visitorService from "../../services/visitorService";

import Loader from "../../components/common/Loader";

import StatsCards from "../../components/dashboard/StatsCards";
import VisitorChart from "../../components/dashboard/VisitorChart";
import RecentVisitors from "../../components/dashboard/RecentVisitors";
import RecentActivity from "../../components/dashboard/RecentActivity";
import QuickActions from "../../components/dashboard/QuickActions";

const Dashboard = () => {
  const { user } = useAuth();

  const [dashboard, setDashboard] =
    useState({
      totalEmployees: 0,
      totalVisitors: 0,
      pendingVisitors: 0,
      approvedVisitors: 0,
      checkedInVisitors: 0,
      checkedOutVisitors: 0,
      rejectedVisitors: 0,
      cancelledVisitors: 0,
    });

  const [recentVisitors, setRecentVisitors] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const dashboardData =
        await dashboardService.getDashboard();

      setDashboard(
        dashboardData.dashboard
      );

      if (
        user?.role === "admin" ||
        user?.role === "receptionist"
      ) {
        const visitorData =
          await visitorService.getAllVisitors();

        setRecentVisitors(
          visitorData.visitors || []
        );
      }

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
      <Loader text="Loading Dashboard..." />
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        {error}
      </Alert>
    );
  }

  const welcomeMessage = () => {
    switch (user?.role) {

      case "admin":
        return "Administrator Dashboard";

      case "receptionist":
        return "Reception Dashboard";

      case "employee":
        return "Employee Dashboard";

      default:
        return "Dashboard";
    }
  };
    return (
    <div>

      <div className="page-title mb-4">

        <h2>{welcomeMessage()}</h2>

        <p className="text-muted mb-0">
          Welcome back,
          <strong>
            {" "}
            {user?.name || "User"}
          </strong>
          {" "}👋
        </p>

      </div>

      <StatsCards
        dashboard={dashboard}
        role={user?.role}
      />

      {(user?.role === "admin" ||
        user?.role === "receptionist") && (

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

      )}

      <Row className="g-4 mt-1">

        <Col xl={6}>

          <RecentActivity
            dashboard={dashboard}
            role={user?.role}
          />

        </Col>

        <Col xl={6}>

          <QuickActions
            role={user?.role}
          />

        </Col>

      </Row>

    </div>
  );
};

export default Dashboard;