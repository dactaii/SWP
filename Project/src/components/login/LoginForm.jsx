import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function LoginForm() {
  const [rightPanelActive, setRightPanelActive] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const [fullName, setFullName] = useState("");
  const [signUpUserName, setSignUpUserName] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUpError, setSignUpError] = useState("");

  /* ===== Add class no-scroll ======*/
  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  /*================ Handle Google Login ================*/
  const handleGoogleLogin = () => {
    axios
      .get("http://localhost:8080/api/auth/social?loginType=google")
      .then((res) => {
        if (res.data.code === 200 && res.data.data) {
          window.location.href = res.data.data + "&prompt=select_account";
        }
      })
      .catch((err) => {
        console.error("Lỗi khi lấy link đăng nhập Google:", err);
      });
  };

  /*================ Handle Sign Up ================*/
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (signUpPassword !== confirmPassword) {
      setSignUpError("Mật khẩu xác nhận không khớp!");
      return;
    }
    try {
      const res = await axios.post("http://localhost:8080/api/register", {
        fullName,
        userName: signUpUserName,
        password: signUpPassword,
      });
      if (res.data.code === 200 && res.data.data === 200) {
        alert("Đăng ký thành công! Vui lòng đăng nhập.");
        setRightPanelActive(false);
        setFullName("");
        setSignUpUserName("");
        setSignUpPassword("");
        setConfirmPassword("");
        setSignUpError("");
      } else {
        setSignUpError("Đăng ký thất bại!");
      }
    } catch (err) {
      setSignUpError("Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại sau.");
      console.error(err);
    }
  };
  /*================ End Handle Sign Up ================*/

  /*================ Handle login ================*/
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/api/login", {
        userName,
        password,
      });
      console.log("Server response:", res);
      const token = res.data.data;
      console.log("token", token);
      if (!token) {
        alert("Đăng nhập thất bại!");
        return;
      }
      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      const role = decoded.role;

      if (role === "ROLE_ADMIN") {
        navigate("/adminPage");
      } else if (role === "ROLE_MEMBER") {
        navigate("/");
      } else if (role === "ROLE_STAFF") {
        navigate("/staffHome");
      } else {
        setErrorMessage("Vai trò không hợp lệ!");
      }
    } catch (err) {
      setErrorMessage("Sai tài khoản hoặc mật khẩu!");
    }
  };
  /*================ End Handle login ================*/

  return (
    <>
      <Helmet>
        <title>Login Page</title>
      </Helmet>
      <div className="login-page">
        <div
          id="container"
          className={`container ${
            rightPanelActive ? "right-panel-active" : ""
          }`}
        >
          <div className="form-container sign-up-container">
            <form onSubmit={handleSignUp}>
              <h1>Register as a Donor</h1>
              <div className="social-container">
                <a href="#" className="social" onClick={handleGoogleLogin}>
                  <i className="bi bi-google"></i>
                </a>
              </div>
              <span>or use your email for registration</span>
              <input
                type="text"
                placeholder="Họ và Tên"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Tên Người dùng"
                value={signUpUserName}
                onChange={(e) => setSignUpUserName(e.target.value)}
                required
              />
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mật Khẩu"
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  required
                />
                <span
                  className="show-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>

              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Xác Nhận Mật Khẩu"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <span
                  className="show-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>
              <button type="submit">Sign Up</button>
              {signUpError && <p className="error-message">{signUpError}</p>}
            </form>
          </div>

          <div className="form-container sign-in-container">
            <form onSubmit={handleLogin}>
              <h1>Đăng Nhập</h1>
              <div className="social-container">
                <a href="#" className="social" onClick={handleGoogleLogin}>
                  <i className="bi bi-google"></i>
                </a>
              </div>
              <span>Or use your account</span>

              {/*================ Input login ================*/}
              <input
                type="text"
                placeholder="Tên Đăng Nhập"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />

              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mật Khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="show-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>
              {/*================ End Input login ================*/}

              <a href="#">Forgot your password?</a>
              <button type="submit">Đăng Nhập</button>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
          </div>

          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Donate Today, Save Tomorrow!</h1>
                <p>Together, we save lives and ensure blood for everyone</p>

                {/*================ JS ================*/}
                <button
                  className="ghost"
                  id="signIn"
                  onClick={() => setRightPanelActive(false)}
                >
                  Give Hope - Sign In
                </button>
                {/*================ End JS ================*/}
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Your Blood, Their Future!</h1>
                <p>
                  Join us to save more lives. Everyone deserves access to blood
                  transfusion.
                </p>

                {/*================ JS ================*/}
                <button
                  className="ghost"
                  id="signUp"
                  onClick={() => setRightPanelActive(true)}
                >
                  Start Saving Lives - Sign Up
                </button>
                {/*================ End JS ================*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
