import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaUserPlus,
  FaUsers,
  FaClipboardList,
  FaClockRotateLeft,
} from "react-icons/fa6";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Register Visitor",
      icon: <FaUserPlus />,
      color: "primary",
      path: "/visitors",
    },
    {
      title: "Manage Employees",
      icon: <FaUsers />,
      color: "success",
      path: "/employees",
    },
    {
      title: "View Reports",
      icon: <FaClipboardList />,
      color: "warning",
      path: "/reports",
    },
    {
      title: "Visitor History",
      icon: <FaClockRotateLeft />,
      color: "dark",
      path: "/history",
    },
  ];

  return (
    <div className="dashboard-card-box">

      <div className="card-header-custom">

        <h5>Quick Actions</h5>

      </div>

      <div className="d-grid gap-3">

        {actions.map((action) => (

          <Button
            key={action.title}
            variant={action.color}
            className="py-3 d-flex align-items-center justify-content-center gap-2"
            onClick={() => navigate(action.path)}
          >
            {action.icon}

            {action.title}

          </Button>

        ))}

      </div>

    </div>
  );
};

export default QuickActions;