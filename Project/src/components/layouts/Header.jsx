import React, { useState, useEffect, useRef } from "react";
import logo from "../../assets/img/logos/logo.png";
import logoDefault from "../../assets/img/icons/logoDefault.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import ScrollToAnchorLink from "../../assets/js/ScrollToAnchorLink";

const Default_Avatar = logoDefault;

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(Default_Avatar);
  const [role, setRole] = useState(null);

  const location = useLocation();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const isLoginPage = location.pathname === "/login";

  const isActive = (path) => (location.pathname === path ? "active" : "");
  const isSubActive = (basePath) =>
    location.pathname.includes(basePath) ? "active" : "";

  // Lấy profile user từ API + xử lý token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Nếu không có token thì reset
      setName("");
      setAvatar(Default_Avatar);
      setRole(null);
      return;
    }

    // Decode token để kiểm tra hết hạn
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        // Token hết hạn, xóa và reset
        localStorage.removeItem("token");
        localStorage.removeItem("avatar_url");
        setName("");
        setAvatar(Default_Avatar);
        setRole(null);
        navigate("/login");
        return;
      }
      setName(decoded.name || "");
      setRole(decoded.role || null);

      // Gọi API lấy profile user để cập nhật avatar và dữ liệu khác nếu có
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8080/api/profile",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = response.data;

          // Lấy avatar ưu tiên theo localStorage rồi đến data trả về API
          const localAvatar = localStorage.getItem("avatar_url");
          if (localAvatar && localAvatar.trim() !== "") {
            setAvatar(localAvatar);
          } else if (data.avatar_url || data.avatar) {
            setAvatar(data.avatar_url || data.avatar);
          } else {
            setAvatar(Default_Avatar);
          }
        } catch (error) {
          console.error("Lỗi khi tải thông tin người dùng:", error);
          // Nếu lỗi thì dùng avatar mặc định
          setAvatar(Default_Avatar);
        }
      };

      fetchUserProfile();
    } catch (error) {
      console.error("Token không hợp lệ", error);
      setName("");
      setAvatar(Default_Avatar);
      setRole(null);
    }
  }, [location.pathname, navigate]);

  // Lắng nghe thay đổi avatar trong localStorage từ các tab khác
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "avatar_url") {
        const newAvatar = event.newValue;
        if (newAvatar && newAvatar.trim() !== "") {
          setAvatar(newAvatar);
        } else {
          setAvatar(Default_Avatar);
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Đóng dropdown khi click ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  // Chuyển hướng đăng nhập nếu chưa đăng nhập
  const handleAccessLink = (e, path) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vui lòng đăng nhập để tiếp tục!");
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <header className="header sticky-top">
      <div className="topbar d-flex align-items-center">
        <div className="container d-flex justify-content-center justify-content-md-between">
          <div className="header-top d-none d-md-flex align-items-center">
            <i className="bi bi-clock-fill"></i> Thứ 2 - Thứ 7 : 8:00 - 17:00
          </div>
          <div className="header-top d-flex align-items-center">
            <i className="bi bi-telephone-fill"></i> Liên Hệ : +84 123 456 789
          </div>
        </div>
      </div>

      <div className="header-logo d-flex align-items-center justify-content-end">
        <div className="container position-relative d-flex align-items-center justify-content-end">
          <Link to="/" className="logo d-flex align-items-center me-auto">
            <img src={logo} alt="Logo" />
          </Link>

          <nav id="navmenu" className="navmenu">
            <ul>
              <li>
                <Link
                  to="/"
                  state={{ forceScrollTop: true }}
                  className={isActive("/")}
                >
                  Trang Chủ
                </Link>
              </li>
              <li className="dropdown">
                <a className={isSubActive("#gioithieu")}>
                  <span>Thông Tin</span>{" "}
                  <i className="bi bi-chevron-down toggle-dropdown"></i>
                </a>
                <ul>
                  <li>
                    <ScrollToAnchorLink to="/" anchorId="gioithieu">
                      Giới Thiệu
                    </ScrollToAnchorLink>
                  </li>
                  <li>
                    <ScrollToAnchorLink to="/" anchorId="tieuchuan">
                      Tiêu Chuẩn Hiến Máu
                    </ScrollToAnchorLink>
                  </li>
                  <li>
                    <ScrollToAnchorLink to="/" anchorId="lienhe">
                      Liên Hệ
                    </ScrollToAnchorLink>
                  </li>
                </ul>
              </li>

              <li className="dropdown">
                <a
                  className={
                    isSubActive("/dangkyhienmau") ||
                    isSubActive("/dangkycanmau")
                  }
                >
                  <span>Kiến Thức Về Máu</span>{" "}
                  <i className="bi bi-chevron-down toggle-dropdown"></i>{" "}
                </a>
                <ul>
                  <li>
                    <Link
                      to="/bloodtype"
                      className={isActive("/bloodtype")}>
                      Các Loại Máu
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/BloodTypeFake"
                      className={isActive("/BloodTypeFake")}
                    >
                      Cách Sử Dụng Máu
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="dropdown">
                <a
                  className={
                    isSubActive("/dangkyhienmau") ||
                    isSubActive("/dangkycanmau")
                  }
                >
                  <span>Hiến Máu</span>{" "}
                  <i className="bi bi-chevron-down toggle-dropdown"></i>{" "}
                </a>
                <ul>
                  <li>
                    <Link
                      to="/BloodDonation"
                      onClick={(e) => handleAccessLink(e, "/BloodDonation")}
                      className={isActive("/BloodDonation")}
                    >
                      Đăng ký hiến máu
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dangkytimmau"
                      onClick={(e) => handleAccessLink(e, "/dangkycanmau")}
                      className={isActive("/dangkycanmau")}
                    >
                      Đăng ký tìm máu
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="dropdown">
                {" "}
                <a
                  className={isSubActive("/tracuu") || isSubActive("/timnguoi")}
                >
                  <span>Tìm Máu</span>{" "}
                  <i className="bi bi-chevron-down toggle-dropdown"></i>
                </a>
                <ul>
                  <li>
                    <Link
                      to="/tracuu"
                      onClick={(e) => handleAccessLink(e, "/tracuu")}
                      className={isActive("/tracuu")}
                    >
                      Tra cứu nhóm máu phù hợp
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/timnguoiHM"
                      onClick={(e) => handleAccessLink(e, "/timnguoiHM")}
                      className={isActive("/timnguoiHM")}
                    >
                      Tìm người hiến máu gần bạn
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/timnguoiCM"
                      onClick={(e) => handleAccessLink(e, "/timnguoiCM")}
                      className={isActive("/timnguoiCM")}
                    >
                      Tìm người cần máu
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link
                  to="/DKmauKC"
                  onClick={(e) => handleAccessLink(e, "/DKmauKC")}
                  className={isActive("/DKmauKC")}
                >
                  Đăng ký cần máu khẩn cấp
                </Link>
              </li>
            </ul>
          </nav>

          {!isLoginPage &&
            (name ? (
              <div
                ref={dropdownRef}
                className={`name-btn dropdown ${dropdownOpen ? "open" : ""}`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img src={avatar} alt="avatar" />
                <span>{name}</span>{" "}
                <i className="bi bi-chevron-down toggle-dropdown"></i>
                {dropdownOpen && (
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/thongtin">Thông Tin Cá Nhân</Link>
                    </li>
                    <li>
                      <Link to="/ScheduleManagement">Lịch Sử Hiến Máu</Link>
                    </li>
                    <li>
                      <Link to="/note">Nhắc Nhở Hiến Máu</Link>
                    </li>
                    <li>
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          const token = localStorage.getItem("token");
                          const email = localStorage.getItem("email");

                          if (window.google && email) {
                            window.google.accounts.id.revoke(email, () => {
                              console.log("Google session revoked.");
                              cleanupAndRedirect();
                            });
                          } else {
                            cleanupAndRedirect();
                          }

                          function cleanupAndRedirect() {
                            localStorage.removeItem("token");
                            localStorage.removeItem("email");
                            localStorage.removeItem("avatar_url");
                            window.location.href = "/login";
                          }
                        }}
                      >
                        Đăng Xuất
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <Link to="/login" className="header-btn">
                Đăng Nhập
              </Link>
            ))}
        </div>
      </div>
    </header>
  );
};
export default Header;
