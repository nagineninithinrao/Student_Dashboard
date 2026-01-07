import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/tituzent.avif";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="app-header">
      <div className="header-left" onClick={() => navigate("/dashboard")}>
        <img src={logo} alt="Tituzent" className="logo" />
        <span className="school-name">Tituzent School of Learning</span>
      </div>
      <nav className="header-nav">
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/students")}>Students</button>
        <button disabled>Teachers</button>
        <button disabled>Attendance</button>
      </nav>

      <div className="header-right">
        <div
          className="profile"
          onClick={() => setShowProfileMenu(!showProfileMenu)}
        >
          <span className="profile-email">{user?.email}</span>
          <span className="profile-arrow">▾</span>
        </div>

        {showProfileMenu && (
          <div className="profile-dropdown">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
