import { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IoLogoApple } from "react-icons/io5";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import logo1 from "./tituzent.avif";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div id="hero">
      <h1 id="school-Name">Tituzent School of Learning</h1>

      <div id="grid-container">
        <div id="grid-container1">
          <img src={logo1} id="image" alt="Tituzent Logo" />
        </div>

        <div id="grid-container2">
          <div id="loginform">
            <h2 className="title">Welcome Back 👋</h2>
            <p className="subtitle">Please login to your account</p>

            <form>
              <label>Email Address</label>
              <input type="email" placeholder="Enter your email" />

              <label>Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                />
                <span
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>

              <button type="submit" id="login">
                Log In
              </button>

              <div className="divider">OR</div>

              <button type="button" className="social google">
                <FcGoogle /> Continue with Google
              </button>

              <button type="button" className="social apple">
                <IoLogoApple /> Continue with Apple
              </button>

              <p className="signup-text">
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
