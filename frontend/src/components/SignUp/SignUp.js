import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IoLogoApple } from "react-icons/io5";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import logo from "../../assets/images/tituzent.avif";
import "../../Styles/App.css";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!termsAccepted) {
      setError("You must accept Terms & Conditions");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "https://student-dashboard-rihw.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            dob,
            gender,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      navigate("/login");
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div id="hero">
      <div className="page-wrapper">
        <h1 id="school-Name">Tituzent School of Learning</h1>

        <div id="grid-container">
          <div id="grid-container1">
            <img src={logo} id="image" alt="Tituzent Logo" />
          </div>

          <div id="grid-container2">
            <div id="loginform">
              <h2 className="title">Create Account</h2>
              <p className="subtitle">Register to get started</p>

              <form onSubmit={handleSignup}>
                <div className="row-2">
                  <div>
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter full name"
                      required
                    />
                  </div>

                  <div>
                    <label>Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                </div>
                <div className="row-2">
                  <div>
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label>Gender</label>
                    <select
                      className="select-field"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      required
                    >
                      <option value="">Select gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="row-2">
                  <div>
                    <label>Password</label>
                    <div className="password-wrapper">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                      />
                      <span
                        className="eye-icon"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <AiOutlineEyeInvisible />
                        ) : (
                          <AiOutlineEye />
                        )}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label>Confirm Password</label>
                    <div className="password-wrapper">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm password"
                        required
                      />
                      <span
                        className="eye-icon"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <AiOutlineEyeInvisible />
                        ) : (
                          <AiOutlineEye />
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="terms">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                  />
                  <label>I agree to Terms & Conditions</label>
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit" id="login">
                  Sign Up
                </button>
                <div className="divider">OR</div>{" "}
                <div className="social-compact">
                  {" "}
                  <button type="button" className="social google">
                    {" "}
                    <FcGoogle /> Google{" "}
                  </button>{" "}
                  <button type="button" className="social apple">
                    {" "}
                    <IoLogoApple /> Apple{" "}
                  </button>{" "}
                </div>
                <p className="signup-text">
                  Already registered? <Link to="/login">Log In</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
