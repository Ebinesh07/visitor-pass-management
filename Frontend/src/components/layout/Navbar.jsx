import { useAuth } from "../../context/AuthContext";
import {
  FaBell,
  FaMagnifyingGlass,
  FaChevronDown,
} from "react-icons/fa6";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="top-navbar">

      <div className="navbar-search">

        <FaMagnifyingGlass />

        <input
          type="text"
          placeholder="Search..."
        />

      </div>

      <div className="navbar-right">

        <button className="notification-btn">

          <FaBell />

          <span className="notification-dot"></span>

        </button>

        <div className="profile-card">

          <div className="profile-avatar">

            {user?.name
              ? user.name.charAt(0).toUpperCase()
              : "A"}

          </div>

          <div className="profile-info">

            <h6>
              {user?.name || "Admin"}
            </h6>

            <span>
              {user?.role || "Administrator"}
            </span>

          </div>

          <FaChevronDown
            className="profile-arrow"
          />

        </div>

      </div>

    </header>
  );
};

export default Navbar;