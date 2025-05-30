import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function LoginForm() {

  const [rightPanelActive, setRightPanelActive] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const fakeToken = "eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiTmd1eeG7hW4gVsSDbiBBIiwicm9sZSI6IlJPTEVfTUVNQkVSIiwiZXhwIjoxNzU0MDA2NDAwfQ.KmkUnLMzhK9Im9OdSwPNxvqHtwwESXbmFksXX-nh8EU";
  
  /* ===== Add class no-scroll ======*/
  useEffect(() => {
    document.body.classList.add("no-scroll"); 
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

    const handleLogin= async (e) =>{
      e.preventDefault();

    if (userName === "username" && password === "12345") {
      localStorage.setItem("token",fakeToken);

      const decoded = jwtDecode(fakeToken);
      const role = decoded.role;

      if (role === "ROLE_ADMIN"){
        navigate("/adminPage");
      }else if(role === "ROLE_MEMBER"){
        navigate("/");
      }else if(role ==="ROLE_STAFF"){
        navigate("/staffHome");
      }else {
        setErrorMessage("Vai trò không hợp lệ!");
      }
    } else{
      setErrorMessage("Sai tài khoản hoặc mật khẩu!");
    }
  }

  return (
    <>
      <Helmet>
        <title>Login Page</title>
      </Helmet>
      <div className="login-page">
        <div id="container" className={`container ${rightPanelActive ? "right-panel-active" : ""}`}>

          <div className="form-container sign-up-container">
            <form action="#">
              <h1>Register as a Donor</h1>
              <div className="social-container">
                <a href="#" className="social">
                  <i className="bi bi-google"></i>
                </a>
              </div>
              <span>or use your email for registration</span>
              <input type="text" placeholder="Họ và Tên" />
              <input type="text" placeholder="Tên Người dùng" />
              <input type="password" placeholder="Mật Khẩu" />
              <input type="password" placeholder="Xác Nhận Mật Khẩu" />
              <button>Sign Up</button>
            </form>
          </div>

          <div className="form-container sign-in-container">
            <form onSubmit={handleLogin}>
              <h1>Đăng Nhập</h1>
              <div className="social-container">
                <a href="#" className="social">
                  <i className="bi bi-google"></i>
                </a>
              </div>
              <span>Or use your account</span>

            {/*================ Input login ================*/}
              <input type="text" 
                placeholder="Tên Đăng Nhập"
                value={userName}
                onChange={(e) => setUserName(e.target.value)} 
                required
                />

              <input 
                type="password" 
                placeholder="Mật Khẩu" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
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
                <p>Join us to save more lives. Everyone deserves access to blood transfusion.</p>

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