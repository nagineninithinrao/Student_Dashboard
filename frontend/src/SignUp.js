import { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IoLogoApple } from "react-icons/io5";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import logo1 from "./tituzent.avif";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true);

  return (
    <div id="hero">
      <div className="page-wrapper">
        <h1 id="school-Name">Tituzent School of Learning</h1>

        <div id="grid-container">
          <div id="grid-container1">
            <img src={logo1} id="image" alt="Tituzent Logo" />
          </div>

          <div id="grid-container2">
            <div id="loginform" className="signup-compact">
              <h2 className="title">Create Account</h2>
              <p className="subtitle">Register to get started</p>

              <form>
                <label>Full Name</label>
                <input type="text" placeholder="Enter full name" />

                <label>Email Address</label>
                <input type="email" placeholder="Enter email address" />

                <div className="row-2">
                  <div>
                    <label>Date of Birth</label>
                    <input type="date" />
                  </div>

                  <div>
                    <label>Gender</label>
                    <select className="select-field">
                      <option value="">Select gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <label>Password</label>
                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
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

                <label>Confirm Password</label>
                <div className="password-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                  />
                  <span
                    className="eye-icon"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </span>
                </div>

                <div className="terms">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                  />
                  <label>I agree to Terms & Conditions</label>
                </div>

                <button type="submit" id="login">
                  Sign Up
                </button>

                <div className="divider">OR</div>

                <div className="social-compact">
                  <button type="button" className="social google">
                    <FcGoogle /> Google
                  </button>
                  <button type="button" className="social apple">
                    <IoLogoApple /> Apple
                  </button>
                </div>

                <p className="signup-text">
                  Already registered? <Link to="/">Log In</Link>
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
