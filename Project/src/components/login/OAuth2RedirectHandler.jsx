import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function OAuth2RedirectHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
  console.log("URL Search params:", location.search);
  const query = new URLSearchParams(location.search);
  const code = query.get("code");
  console.log("Code extracted:", code);

  if (code) {
    axios
      .get("http://localhost:8080/api/auth/social/callback", {
        params: {
          code: code,
          loginType: "google",
        },
      })
      .then((res) => {
        const token = res.data.data;
        localStorage.setItem("token", token);

        const decoded = jwtDecode(token);
        localStorage.setItem("avatar_url", decoded.avatar || "");
        localStorage.setItem("email", decoded.email || "");
        localStorage.setItem("name", decoded.name || "");
        console.log("Decoded token payload:", decoded);

        const role = decoded.role;
        if (["ROLE_ADMIN", "ROLE_MEMBER", "ROLE_STAFF"].includes(role)) {
          window.dispatchEvent(new Event("loginSuccess"));
          navigate("/", { state: { justLoggedIn: true } });
        } else {
          alert("Vai trò không hợp lệ!");
        }
      })
      .catch((err) => {
        console.error("Lỗi khi xử lý callback:", err);
        navigate("/");
      });
  } else {
    navigate("/login");
  }
}, [location, navigate]);


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div
        className="spinner"
        style={{
          border: "6px solid #f3f3f3",
          borderTop: "6px solid #3498db",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          animation: "spin 1s linear infinite",
          marginBottom: "20px",
        }}
      ></div>
      <p style={{ fontSize: "18px", color: "#333" }}>
        Đang đăng nhập bằng Google...
      </p>
      <style>
        {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
      </style>
    </div>
  );
}

export default OAuth2RedirectHandler;
