import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import {
  FaUserPlus,
  FaUsers,
  FaClipboardList,
  FaClockRotateLeft,
} from "react-icons/fa6";

const QuickActions = ({ role }) => {
  const navigate = useNavigate();

  let actions = [];

  // ======================
  // ADMIN
  // ======================

  if (role === "admin") {
    actions = [
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
        title: "Reports",
        icon: <FaClipboardList />,
        color: "warning",
        path: "/reports",
      },
      {
        title: "History",
        icon: <FaClockRotateLeft />,
        color: "dark",
        path: "/history",
      },
    ];
  }

  // ======================
  // RECEPTIONIST
  // ======================

  else if (
    role === "receptionist"
  ) {
    actions = [
      {
        title: "Register Visitor",
        icon: <FaUserPlus />,
        color: "primary",
        path: "/visitors",
      },
      {
        title: "Visitor History",
        icon: <FaClockRotateLeft />,
        color: "dark",
        path: "/history",
      },
    ];
  }

  // ======================
  // EMPLOYEE
  // ======================

  else {
    actions = [
      {
        title: "Visitor Requests",
        icon: <FaClipboardList />,
        color: "success",
        path: "/visitor-requests",
      },
    ];
  }

  return (
    <div className="card shadow-sm border-0">

      <div className="card-header-custom">

        <h5>
          Quick Actions
        </h5>

      </div>

      <div className="card-body">

        <div className="d-grid gap-3">
                    {actions.map((action) => (

            <Button
              key={action.title}
              variant={action.color}
              className="py-3 d-flex align-items-center justify-content-center gap-2"
              onClick={() =>
                navigate(action.path)
              }
            >

              {action.icon}

              <span>
                {action.title}
              </span>

            </Button>

          ))}

        </div>

      </div>

    </div>
  );
};

export default QuickActions;