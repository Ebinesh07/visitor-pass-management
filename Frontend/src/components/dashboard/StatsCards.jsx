import {
  FaUsers,
  FaUserClock,
  FaCircleCheck,
  FaRightToBracket,
  FaRightFromBracket,
  FaUserXmark,
  FaBan,
} from "react-icons/fa6";

const StatsCards = ({ dashboard }) => {
  const stats = [
    {
      title: "Total Visitors",
      value: dashboard.totalVisitors,
      color: "#2563EB",
      icon: <FaUsers />,
    },
    {
      title: "Pending",
      value: dashboard.pendingVisitors,
      color: "#F59E0B",
      icon: <FaUserClock />,
    },
    {
      title: "Approved",
      value: dashboard.approvedVisitors,
      color: "#22C55E",
      icon: <FaCircleCheck />,
    },
    {
      title: "Checked In",
      value: dashboard.checkedInVisitors,
      color: "#8B5CF6",
      icon: <FaRightToBracket />,
    },
    {
      title: "Checked Out",
      value: dashboard.checkedOutVisitors,
      color: "#0EA5E9",
      icon: <FaRightFromBracket />,
    },
    {
      title: "Rejected",
      value: dashboard.rejectedVisitors,
      color: "#EF4444",
      icon: <FaUserXmark />,
    },
    {
      title: "Cancelled",
      value: dashboard.cancelledVisitors,
      color: "#6B7280",
      icon: <FaBan />,
    },
  ];

  return (
    <div className="row g-4">

      {stats.map((item) => (

        <div
          className="col-xl col-lg-3 col-md-4 col-sm-6"
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

              <span>{item.title}</span>

              <h3>{item.value}</h3>

            </div>

          </div>

        </div>

      ))}

    </div>
  );
};

export default StatsCards;