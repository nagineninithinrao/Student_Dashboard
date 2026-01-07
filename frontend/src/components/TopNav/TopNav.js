import { useNavigate } from "react-router-dom";
import "./TopNav.css";

function TopNav({ user }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="topnav">
      <div className="logo">Tituzent</div>

      <ul className="nav-links">
        <li>Dashboard</li>
        <li>Teachers</li>
        <li>Attendance</li>
        <li>Courses</li>
      </ul>

      <div className="profile-menu">
        <span className="profile-email">{user?.email}</span>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default TopNav;
