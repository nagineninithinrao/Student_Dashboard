import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IoLogoApple } from "react-icons/io5";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import logo from "../../assets/images/tituzent.avif";
import "../../Styles/Auth.css";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    dob: "",
    gender: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [showPwd, setShowPwd] = useState(false);
  const [showCPwd, setShowCPwd] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.terms) return setError("Accept Terms & Conditions");
    if (form.password !== form.confirmPassword)
      return setError("Passwords do not match");

    try {
      const res = await fetch(
        "https://student-dashboard-rihw.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();
      if (!res.ok) return setError(data.message);

      navigate("/login");
    } catch {
      setError("Server error");
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
            <h2>Create Account</h2>

            <form onSubmit={handleSignup}>
              <div className="row-2">
                <input
                  name="name"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                />
                <input
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="row-2">
                <input
                  type="date"
                  name="dob"
                  onChange={handleChange}
                  required
                />
                <select name="gender" onChange={handleChange} required>
                  <option value="">Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="row-2">
                <div className="password-wrapper">
                  <input
                    type={showPwd ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                  />
                  <span
                    className="eye-icon"
                    onClick={() => setShowPwd(!showPwd)}
                  >
                    {showPwd ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </span>
                </div>

                <div className="password-wrapper">
                  <input
                    type={showCPwd ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm"
                    onChange={handleChange}
                    required
                  />
                  <span
                    className="eye-icon"
                    onClick={() => setShowCPwd(!showCPwd)}
                  >
                    {showCPwd ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </span>
                </div>
              </div>

              <div className="terms-row">
                <input
                  type="checkbox"
                  id="terms"
                  onChange={(e) =>
                    setForm({ ...form, terms: e.target.checked })
                  }
                />
                <label htmlFor="terms">I agree to Terms & Conditions</label>
              </div>

              {error && <p className="error">{error}</p>}

              <button className="primary-btn">Sign Up</button>

              <div className="divider">OR</div>

              <button className="social-btn" disabled>
                <FcGoogle /> Sign up with Google
                <span className="coming-soon">Coming Soon</span>
              </button>

              <button className="social-btn" disabled>
                <IoLogoApple /> Sign up with Apple
                <span className="coming-soon">Coming Soon</span>
              </button>

              <p className="auth-footer">
                Already registered? <Link to="/login">Log In</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
