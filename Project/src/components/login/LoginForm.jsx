import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useAlert } from "../../layouts/AlertContext";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

function LoginForm({ onClose }) {
  const { showAlert } = useAlert();

  const [rightPanelActive, setRightPanelActive] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [signUpUserName, setSignUpUserName] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [isResetPassword, setIsResetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

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
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/;

    if (!phoneRegex.test(phoneNumber)) {
      showAlert(
        "Số điện thoại phải bắt đầu bằng số 0 và dài hơn 10 chữ số.",
        "error"
      );
      return;
    }

    if (!passwordRegex.test(signUpPassword)) {
      showAlert(
        "Mật khẩu phải có ít nhất 8 ký tự, chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt.",
        "error"
      );
      return;
    }

    if (
      signUpPassword.toLowerCase().includes(signUpUserName.toLowerCase()) ||
      signUpPassword
        .toLowerCase()
        .includes(signUpUserName.toLowerCase().split("@")[0])
    ) {
      showAlert("Mật khẩu không được chứa tên đăng nhập hoặc email.", "error");
      return;
    }

    if (signUpPassword !== confirmPassword) {
      showAlert("Mật khẩu xác nhận không khớp!", "error");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/api/register", {
        fullName,
        userName: signUpUserName,
        password: signUpPassword,
      });

      if (res.data.code === 200 && res.data.data === 200) {
        showAlert("Đăng ký thành công! Vui lòng đăng nhập.", "success");

        setRightPanelActive(false);
        setFullName("");
        setSignUpUserName("");
        setSignUpPassword("");
        setConfirmPassword("");
        setPhoneNumber("");
      } else {
        showAlert("Đăng ký thất bại!", "error");
      }
    } catch (err) {
      showAlert("Đăng ký thất bại. Vui lòng thử lại sau!", "error");
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
        showAlert("Sai tài khoản hoặc mật khẩu!", "error");
        return;
      }
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      const role = decoded.role;
      if (["ROLE_ADMIN", "ROLE_MEMBER", "ROLE_STAFF"].includes(role)) {
        localStorage.setItem("token", token);
        window.dispatchEvent(new Event("loginSuccess"));

        onClose();
        window.location.reload(); 
      } else {
        showAlert("Vai trò không hợp lệ!", "error");
      }
    } catch (err) {
      showAlert("Sai tài khoản hoặc mật khẩu!", "error");
    }
  };

  const handleRequestOTP = async () => {
    try {
      await axios.post("http://localhost:8080/api/auth/request-reset", {
        email: resetEmail,
      });
      setOtpSent(true);
      setOtpCooldown(120);

      showAlert("OTP đã được gửi đến email của bạn!", "success");
    } catch (error) {
      showAlert(
        "Không thể gửi OTP. Vui lòng kiểm tra email và thử lại.",
        "error"
      );
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      showAlert("Mật khẩu xác nhận không khớp!", "error");
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
      setOtpCooldown(0);
      setOtpSent(false);
      showAlert("Đổi mật khẩu thành công! Vui lòng đăng nhập.", "success");
    } catch (error) {
      showAlert("OTP không chính xác hoặc đã hết hạn.", "error");
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
              <h1>Đăng ký</h1>
              <div className="social-container">
                <a href="#" className="social" onClick={handleGoogleLogin}>
                  <i className="bi bi-google"></i>
                </a>
              </div>
              <span>Hoặc đăng ký tài khoản mới</span>
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
              </form>
            ) : (
              <form onSubmit={handleLogin}>
                <h1>Đăng Nhập</h1>
                <div className="social-container">
                  <a href="#" className="social" onClick={handleGoogleLogin}>
                    <i className="bi bi-google"></i>
                  </a>
                </div>
                <span>Hoặc sử dụng tài khoản của bạn</span>
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
              </form>
            )}
          </div>

          {/* ===== Overlay ===== */}
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Hiến máu – Trao sự sống!</h1>
                <p>Chung tay lan tỏa sự sống, để không ai thiếu máu khi cần.</p>
                <button
                  className="ghost"
                  id="signIn"
                  onClick={() => setRightPanelActive(false)}
                >
                  <FaArrowLeft /> Đăng Nhập
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Trao máu – Gửi hy vọng!</h1>
                <p>
                  Chung tay cứu sống nhiều người, vì ai cũng xứng đáng được sẻ
                  chia sự sống.
                </p>
                <button
                  className="ghost"
                  id="signUp"
                  onClick={() => setRightPanelActive(true)}
                >
                  <FaArrowRight /> Đăng Ký
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
