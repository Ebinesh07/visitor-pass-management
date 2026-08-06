import {
  FaUserPlus,
  FaCircleCheck,
  FaCircleXmark,
  FaRightToBracket,
  FaRightFromBracket,
} from "react-icons/fa6";

const RecentActivity = ({ dashboard }) => {
  const activities = [
    {
      title: "New Visitor Registered",
      description: `${dashboard.pendingVisitors} Pending Visitor(s)`,
      icon: <FaUserPlus />,
      color: "#2563EB",
    },
    {
      title: "Visitors Approved",
      description: `${dashboard.approvedVisitors} Approved`,
      icon: <FaCircleCheck />,
      color: "#22C55E",
    },
    {
      title: "Visitors Rejected",
      description: `${dashboard.rejectedVisitors} Rejected`,
      icon: <FaCircleXmark />,
      color: "#EF4444",
    },
    {
      title: "Checked-In",
      description: `${dashboard.checkedInVisitors} Visitor(s)`,
      icon: <FaRightToBracket />,
      color: "#8B5CF6",
    },
    {
      title: "Checked-Out",
      description: `${dashboard.checkedOutVisitors} Visitor(s)`,
      icon: <FaRightFromBracket />,
      color: "#0EA5E9",
    },
  ];

  return (
    <div className="dashboard-card-box">

      <div className="card-header-custom">

        <h5>Recent Activity</h5>

      </div>

      <div className="activity-list">

        {activities.map((activity, index) => (

          <div
            className="activity-item"
            key={index}
          >

            <div
              className="activity-icon"
              style={{
                background: activity.color,
              }}
            >
              {activity.icon}
            </div>

            <div className="activity-content">

              <h6>{activity.title}</h6>

              <span>{activity.description}</span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default RecentActivity;