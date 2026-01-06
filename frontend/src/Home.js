import { Link } from "react-router-dom";
import logo1 from "./tituzent.avif";
import "./Home.css";

function Home() {
  return (
    <div className="home-hero">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-left">
          <span className="college-name">Tituzent School of Learning</span>
        </div>

        <div className="nav-right">
          <Link to="/login" className="nav-btn login-btn">
            Login
          </Link>
          <Link to="/signup" className="nav-btn signup-btn">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero-content">
        <h1>Empowering Students for a Smarter Future</h1>
        <p>
          A modern institution focused on innovation, technology, and academic
          excellence to shape tomorrow’s leaders.
        </p>

        <div className="hero-buttons">
          <Link to="/login" className="primary-btn">
            Student Login
          </Link>
          <Link to="/signup" className="secondary-btn">
            New Student Signup
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
