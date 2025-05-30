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
          const role = decoded.role;
          if (role === "ROLE_ADMIN") {
            navigate("/adminPage");
          } else if (role === "ROLE_MEMBER") {
            navigate("/");
          } else if (role === "ROLE_STAFF") {
            navigate("/staffHome");
          } else {
            navigate("/login");
          }
        })
        .catch((err) => {
          console.error("Lỗi khi xử lý callback:", err);
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, [location]);

  return <div>Đang xử lý đăng nhập bằng Google...</div>;
}

export default OAuth2RedirectHandler;
