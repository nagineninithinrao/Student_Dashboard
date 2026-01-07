import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/tituzent.avif";
import "./Forgot.css";
import "../../Styles/App.css";

function ForgotPassword() {
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setOtpSent(true);
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
              <h2 className="forgot-title">Forgot Password</h2>

              <form className="forgot-form" onSubmit={handleSubmit}>
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={otpSent}
                  required
                />

                <button
                  type="submit"
                  className="get-otp-btn"
                  disabled={otpSent}
                >
                  {otpSent ? "OTP Sent" : "Get OTP"}
                </button>

                {otpSent && (
                  <p className="otp-success">
                    ✅ Password Reset link sent to your email{" "}
                  </p>
                )}

                <div className="back-login">
                  <Link to="/login">← Back to Login</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
