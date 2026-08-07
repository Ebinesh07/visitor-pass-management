import { useState } from "react";
import {
  NavLink,
  useNavigate,
} from "react-router-dom";

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
  const { user, logout } =
    useAuth();

  const navigate =
    useNavigate();

  const [mobileOpen, setMobileOpen] =
    useState(false);

  let menus = [];

  if (user?.role === "admin") {
    menus = [
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
        icon:
          <FaClockRotateLeft />,
      },
    ];
  }

  else if (
    user?.role ===
    "receptionist"
  ) {
    menus = [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <FaChartPie />,
      },
      {
        title: "Visitors",
        path: "/visitors",
        icon: <FaUserCheck />,
      },
      {
        title: "History",
        path: "/history",
        icon:
          <FaClockRotateLeft />,
      },
    ];
  }

  else if (
    user?.role ===
    "employee"
  ) {
    menus = [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <FaChartPie />,
      },
      {
        title:
          "Visitor Requests",
        path:
          "/visitor-requests",
        icon:
          <FaClipboardList />,
      },
    ];
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };
    return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-btn"
        onClick={() =>
          setMobileOpen(true)
        }
      >
        <FaBars />
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() =>
            setMobileOpen(false)
          }
        />
      )}

      {/* Sidebar */}
      <aside
        className={`sidebar ${
          mobileOpen
            ? "show-sidebar"
            : ""
        }`}
      >
        <div>

          {/* Logo */}
          <div className="sidebar-logo">

            <div className="logo-icon">
              <FaBuildingShield />
            </div>

            <div>
              <h4>
                VisitorPass
              </h4>

              <span>
                Management System
              </span>
            </div>

            <button
              className="close-sidebar"
              onClick={() =>
                setMobileOpen(false)
              }
            >
              <FaXmark />
            </button>

          </div>

          {/* Navigation */}
          <div className="sidebar-menu">

            {menus.map(
              (menu) => (
                <NavLink
                  key={menu.path}
                  to={menu.path}
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className={({
                    isActive,
                  }) =>
                    isActive
                      ? "sidebar-link active"
                      : "sidebar-link"
                  }
                >
                  {menu.icon}

                  <span>
                    {menu.title}
                  </span>
                </NavLink>
              )
            )}

          </div>

        </div>

        {/* Logout */}
        <button
          className="logout-button"
          onClick={
            handleLogout
          }
        >
          <FaArrowRightFromBracket />

          <span>
            Logout
          </span>
        </button>

      </aside>
    </>
  );
};

export default Sidebar;