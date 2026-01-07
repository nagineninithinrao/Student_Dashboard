import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/tituzent.avif";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [showProfile, setShowProfile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="app-header">
      <div className="header-left" onClick={() => navigate("/dashboard")}>
        <img src={logo} alt="logo" className="logo" />
        <span className="school-name">Tituzent School of Learning</span>
      </div>

      <nav className="header-nav">
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/students")}>Students</button>
        <button disabled>Teachers</button>
        <button disabled>Attendance</button>
      </nav>

      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <div className="header-right">
        <div className="profile" onClick={() => setShowProfile(!showProfile)}>
          {user?.email}
          <span className="profile-arrow">▼</span>
        </div>

        {showProfile && (
          <div className="profile-dropdown">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>

      {menuOpen && (
        <div className="mobile-nav">
          <button onClick={() => navigate("/dashboard")}>Dashboard</button>
          <button onClick={() => navigate("/students")}>Students</button>
          <button disabled>Teachers</button>
          <button disabled>Attendance</button>
        </div>
      )}
    </header>
  );
}

export default Header;
