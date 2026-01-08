import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { IoLogoApple } from "react-icons/io5";
import logo from "../../assets/images/tituzent.avif";
import "../../Styles/Auth.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(
        "https://student-dashboard-rihw.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();
      if (!res.ok) return setError(data.message);

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="auth-hero">
      <div className="auth-wrapper">
        <h1 className="auth-title">Tituzent School of Learning</h1>

        <div className="auth-grid">
          <div className="auth-logo">
            <img src={logo} alt="logo" />
          </div>

          <div className="auth-card">
            <h2>Welcome Back 👋</h2>

            <form onSubmit={handleLogin}>
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label>Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>

              {error && <p className="error">{error}</p>}

              <button className="primary-btn">Log In</button>

              <div className="divider">OR</div>

              <button className="social-btn" disabled>
                <FcGoogle /> Continue with Google
                <span className="coming-soon">Coming Soon</span>
              </button>

              <button className="social-btn" disabled>
                <IoLogoApple /> Continue with Apple
                <span className="coming-soon">Coming Soon</span>
              </button>

              <p className="auth-footer">
                Don’t have an account? <Link to="/signup">Sign up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
