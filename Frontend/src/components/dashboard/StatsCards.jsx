import {
  FaUsers,
  FaUserClock,
  FaCircleCheck,
  FaRightToBracket,
  FaRightFromBracket,
  FaUserXmark,
  FaBan,
} from "react-icons/fa6";

const StatsCards = ({
  dashboard,
  role,
}) => {

  let stats = [];

  // ======================
  // ADMIN
  // ======================

  if (role === "admin") {

    stats = [
      {
        title: "Employees",
        value:
          dashboard.totalEmployees,
        color: "#2563EB",
        icon: <FaUsers />,
      },
      {
        title: "Visitors",
        value:
          dashboard.totalVisitors,
        color: "#14B8A6",
        icon: <FaUsers />,
      },
      {
        title: "Pending",
        value:
          dashboard.pendingVisitors,
        color: "#F59E0B",
        icon:
          <FaUserClock />,
      },
      {
        title: "Approved",
        value:
          dashboard.approvedVisitors,
        color: "#22C55E",
        icon:
          <FaCircleCheck />,
      },
      {
        title: "Checked In",
        value:
          dashboard.checkedInVisitors,
        color: "#8B5CF6",
        icon:
          <FaRightToBracket />,
      },
      {
        title: "Checked Out",
        value:
          dashboard.checkedOutVisitors,
        color: "#0EA5E9",
        icon:
          <FaRightFromBracket />,
      },
      {
        title: "Rejected",
        value:
          dashboard.rejectedVisitors,
        color: "#EF4444",
        icon:
          <FaUserXmark />,
      },
      {
        title: "Cancelled",
        value:
          dashboard.cancelledVisitors,
        color: "#6B7280",
        icon: <FaBan />,
      },
    ];

  }

  // ======================
  // RECEPTIONIST
  // ======================

  else if (
    role ===
    "receptionist"
  ) {

    stats = [
      {
        title:
          "Today's Visitors",
        value:
          dashboard.totalVisitors,
        color: "#2563EB",
        icon: <FaUsers />,
      },
      {
        title: "Pending",
        value:
          dashboard.pendingVisitors,
        color: "#F59E0B",
        icon:
          <FaUserClock />,
      },
      {
        title: "Checked In",
        value:
          dashboard.checkedInVisitors,
        color: "#8B5CF6",
        icon:
          <FaRightToBracket />,
      },
      {
        title: "Checked Out",
        value:
          dashboard.checkedOutVisitors,
        color: "#0EA5E9",
        icon:
          <FaRightFromBracket />,
      },
    ];

  }

  // ======================
  // EMPLOYEE
  // ======================

  else {

    stats = [
      {
        title:
          "Pending Requests",
        value:
          dashboard.pendingVisitors,
        color: "#F59E0B",
        icon:
          <FaUserClock />,
      },
      {
        title: "Approved",
        value:
          dashboard.approvedVisitors,
        color: "#22C55E",
        icon:
          <FaCircleCheck />,
      },
      {
        title: "Rejected",
        value:
          dashboard.rejectedVisitors,
        color: "#EF4444",
        icon:
          <FaUserXmark />,
      },
    ];

  }

  return (
    <div className="row g-4">
            {stats.map((item) => (

        <div
          className="col-xl-3 col-lg-4 col-md-6"
          key={item.title}
        >

          <div className="stats-card">

            <div
              className="stats-icon"
              style={{
                background: item.color,
              }}
            >
              {item.icon}
            </div>

            <div className="stats-content">

              <span>
                {item.title}
              </span>

              <h3>
                {item.value}
              </h3>

            </div>

          </div>

        </div>

      ))}
    </div>
  );
};

export default StatsCards;