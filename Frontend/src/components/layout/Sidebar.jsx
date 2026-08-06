import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaChartPie,
  FaUsers,
  FaUserCheck,
  FaClipboardList,
  FaClockRotateLeft,
  FaArrowRightFromBracket,
  FaBars,
  FaXmark,
  FaBuildingShield,
} from "react-icons/fa6";

import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();

  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  const menus = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <FaChartPie />,
    },
    {
      title: "Employees",
      path: "/employees",
      icon: <FaUsers />,
    },
    {
      title: "Visitors",
      path: "/visitors",
      icon: <FaUserCheck />,
    },
    {
      title: "Reports",
      path: "/reports",
      icon: <FaClipboardList />,
    },
    {
      title: "History",
      path: "/history",
      icon: <FaClockRotateLeft />,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileOpen(true)}
      >
        <FaBars />
      </button>

      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`sidebar ${
          mobileOpen ? "show-sidebar" : ""
        }`}
      >
        <div>

          <div className="sidebar-logo">

            <div className="logo-icon">

              <FaBuildingShield />

            </div>

            <div>

              <h4>VisitorPass</h4>

              <span>Management System</span>

            </div>

            <button
              className="close-sidebar"
              onClick={() => setMobileOpen(false)}
            >
              <FaXmark />
            </button>

          </div>

          <div className="sidebar-menu">

            {menus.map((menu) => (

              <NavLink
                key={menu.path}
                to={menu.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "sidebar-link active"
                    : "sidebar-link"
                }
              >
                {menu.icon}

                <span>{menu.title}</span>

              </NavLink>

            ))}

          </div>

        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          <FaArrowRightFromBracket />

          Logout
        </button>

      </aside>
    </>
  );
};

export default Sidebar;