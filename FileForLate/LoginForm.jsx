import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function LoginForm() {

  const [rightPanelActive, setRightPanelActive] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  /* ===== Add class no-scroll ======*/
  useEffect(() => {
    document.body.classList.add("no-scroll"); 
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

    const handleLogin= async (e) =>{
      e.preventDefault();

    try{
      const res = await axios.post("http://localhost:8000/api/login",{
        username,
        password
      });

      const token = res.data.token;
      if(!token){
        alert("Đăng nhập thất bại!");
        return;
      }
      localStorage.setItem("token",token);

      const decoded = jwtDecode(token);
      const role = decoded.role;

      if (role === "admin"){
        navigate("/adminPage");
      }else if(role === "user"){
        navigate("/userHome");
      }else if(role ==="staff"){
        navigate("/staffHome");
      }else {
        alert("Vai trò không hợp lệ!");
      }
    } catch (err){
      alert("Sai tài khoản hoặc mật khẩu!")
    }
  }

  return (
    <>
      <Helmet>
        <title>Login Page</title>
      </Helmet>
      <div className="login-page">
        <div
          className={`container ${rightPanelActive ? "right-panel-active" : ""}`}id="container"
        >
          <div className="form-container sign-up-container">
            <form action="#">
              <h1>Register as a Donor</h1>
              <div className="social-container">
                <a href="#" className="social">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="social">
                  <i className="bi bi-google"></i>
                </a>
              </div>
              <span>or use your email for registration</span>
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button>Sign Up</button>
            </form>
          </div>

          <div className="form-container sign-in-container">
            <form onSubmit={handleLogin}>
              <h1>Sign In</h1>
              <div className="social-container">
                <a href="#" className="social">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="social">
                  <i className="bi bi-google"></i>
                </a>
              </div>
              <span>Or use your account</span>

            {/*================ Input login ================*/}
              <input 
                type="text" 
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
                />

              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            {/*================ End Input login ================*/}

              <a href="#">Forgot your password?</a>
              <button type="submit">Đăng Nhập</button>
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
