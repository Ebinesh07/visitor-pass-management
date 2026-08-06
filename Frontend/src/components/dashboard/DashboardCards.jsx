import {
  FaUsers,
  FaUserClock,
  FaCircleCheck,
  FaRightToBracket,
  FaRightFromBracket,
} from "react-icons/fa6";

const DashboardCards = ({ dashboard }) => {
  const cards = [
    {
      title: "Total Visitors",
      value: dashboard.totalVisitors,
      icon: <FaUsers />,
      color: "#2563eb",
    },
    {
      title: "Pending",
      value: dashboard.pendingVisitors,
      icon: <FaUserClock />,
      color: "#f59e0b",
    },
    {
      title: "Approved",
      value: dashboard.approvedVisitors,
      icon: <FaCircleCheck />,
      color: "#22c55e",
    },
    {
      title: "Checked-In",
      value: dashboard.checkedInVisitors,
      icon: <FaRightToBracket />,
      color: "#8b5cf6",
    },
    {
      title: "Checked-Out",
      value: dashboard.checkedOutVisitors,
      icon: <FaRightFromBracket />,
      color: "#ef4444",
    },
  ];

  return (
    <div className="row g-4">

      {cards.map((card) => (

        <div
          className="col-xl col-lg-4 col-md-6"
          key={card.title}
        >

          <div className="dashboard-card">

            <div
              className="dashboard-icon"
              style={{
                background: card.color,
              }}
            >
              {card.icon}
            </div>

            <div>

              <h6>{card.title}</h6>

              <h2>{card.value}</h2>

            </div>

          </div>

        </div>

      ))}

    </div>
  );
};

export default DashboardCards;