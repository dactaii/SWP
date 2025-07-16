import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { IoMdCloseCircleOutline } from "react-icons/io";

function LoginForm({ onClose }) {
  const [rightPanelActive, setRightPanelActive] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [signUpUserName, setSignUpUserName] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUpError, setSignUpError] = useState("");

  const [isResetPassword, setIsResetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetSuccessMsg, setResetSuccessMsg] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCooldown, setOtpCooldown] = useState(0);

  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  useEffect(() => {
    if (otpCooldown > 0) {
      const timer = setInterval(() => {
        setOtpCooldown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [otpCooldown]);

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
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/login", {
        userName,
        password,
      });
      const token = res.data.data;
      if (!token) {
        setErrorMessage("Đăng nhập thất bại!");
        return;
      }
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      const role = decoded.role;
      if (["ROLE_ADMIN", "ROLE_MEMBER", "ROLE_STAFF"].includes(role)) {
        localStorage.setItem("token", token);
        window.dispatchEvent(new Event("loginSuccess"));
        navigate("/", { state: { justLoggedIn: true } });
        onClose();
      } else {
        setErrorMessage("Vai trò không hợp lệ!");
      }
    } catch (err) {
      setErrorMessage("Sai tài khoản hoặc mật khẩu!");
    }
  };

  const handleRequestOTP = async () => {
    try {
      await axios.post("http://localhost:8080/api/auth/request-reset", {
        email: resetEmail,
      });
      setOtpSent(true);
      setOtpCooldown(120);
      setResetError("");
      setResetSuccessMsg("OTP đã được gửi đến email của bạn!");
    } catch (error) {
      setResetError("Không thể gửi OTP. Vui lòng kiểm tra email và thử lại.");
      setResetSuccessMsg("");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setResetError("Mật khẩu xác nhận không khớp!");
      setResetSuccessMsg("");
      return;
    }
    try {
      await axios.post("http://localhost:8080/api/auth/reset-password", {
        email: resetEmail,
        otp: otp,
        newPassword: newPassword,
      });
      setIsResetPassword(false);
      setResetEmail("");
      setOtp("");
      setNewPassword("");
      setConfirmNewPassword("");
      setResetError("");
      setResetSuccessMsg("");
      setOtpCooldown(0);
      setOtpSent(false);
      alert("Đổi mật khẩu thành công! Vui lòng đăng nhập.");
    } catch (error) {
      setResetError("OTP không chính xác hoặc đã hết hạn.");
      setResetSuccessMsg("");
    }
  };

  return (
    <>
      <Helmet>
        <title>Login Page</title>
      </Helmet>

      <div className="login-page">
        <button className="floating-close-btn" onClick={onClose} title="Đóng">
          <IoMdCloseCircleOutline />
        </button>

        <div
          id="container"
          className={`container ${
            rightPanelActive ? "right-panel-active" : ""
          }`}
        >
          {/* ===== Đăng ký ===== */}
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
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>
              <button type="submit">Sign Up</button>
              {signUpError && <p className="error-message">{signUpError}</p>}
            </form>
          </div>

          {/* ===== Đăng nhập hoặc Đặt lại mật khẩu ===== */}
          <div className="form-container sign-in-container">
            {isResetPassword ? (
              <form onSubmit={handleResetPassword}>
                <h1>Đặt lại mật khẩu</h1>

                <input
                  type="email"
                  placeholder="Email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                />

                <button
                  type="button"
                  onClick={handleRequestOTP}
                  disabled={otpCooldown > 0 || !resetEmail}
                  style={{
                    backgroundColor: otpCooldown > 0 ? "#ccc" : "",
                    cursor: otpCooldown > 0 ? "not-allowed" : "pointer",
                  }}
                >
                  {otpCooldown > 0 ? `Nhận OTP (${otpCooldown}s)` : "Nhận OTP"}
                </button>

                <input
                  type="text"
                  placeholder="Nhập mã OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />

                <div className="input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Mật khẩu mới"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <span
                    className="show-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </span>
                </div>

                <div className="input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Xác nhận mật khẩu mới"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    required
                  />
                  <span
                    className="show-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </span>
                </div>

                <button type="submit">Xác nhận đổi mật khẩu</button>
                <a href="#" onClick={() => setIsResetPassword(false)}>
                  Quay lại đăng nhập
                </a>
                {resetError && <p className="error-message">{resetError}</p>}
                {resetSuccessMsg && (
                  <p className="success-message">{resetSuccessMsg}</p>
                )}
              </form>
            ) : (
              <form onSubmit={handleLogin}>
                <h1>Đăng Nhập</h1>
                <div className="social-container">
                  <a href="#" className="social" onClick={handleGoogleLogin}>
                    <i className="bi bi-google"></i>
                  </a>
                </div>
                <span>Or use your account</span>
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
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </span>
                </div>
                <a href="#" onClick={() => setIsResetPassword(true)}>
                  Quên mật khẩu?
                </a>
                <button type="submit">Đăng Nhập</button>
                {errorMessage && (
                  <p className="error-message">{errorMessage}</p>
                )}
              </form>
            )}
          </div>

          {/* ===== Overlay ===== */}
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Donate Today, Save Tomorrow!</h1>
                <p>Together, we save lives and ensure blood for everyone</p>
                <button
                  className="ghost"
                  id="signIn"
                  onClick={() => setRightPanelActive(false)}
                >
                  Give Hope - Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Your Blood, Their Future!</h1>
                <p>
                  Join us to save more lives. Everyone deserves access to blood
                  transfusion.
                </p>
                <button
                  className="ghost"
                  id="signUp"
                  onClick={() => setRightPanelActive(true)}
                >
                  Start Saving Lives - Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
