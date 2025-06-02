import React, { useState, useEffect, useRef } from "react";
import logo from "../../assets/img/logos/logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import logoDefault from "../../assets/img/icons/logoDefault.png";
import ScrollToAnchorLink from "../../assets/js/ScrollToAnchorLink";

const Default_Avata = logoDefault;

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(Default_Avata);
  const [role, setRole] = useState(null);
  const location = useLocation();

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const isLoginPage = location.pathname === "/login";

  const isActive = (path) => (location.pathname === path ? "active" : "");
  const isSubActive = (basePath) =>
    location.pathname.includes(basePath) ? "active" : "";

  /*Lấy name từ token*/
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.name) setName(decoded.name);
        if (decoded.role) setRole(decoded.role);
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          localStorage.removeItem("avatar_url");
          localStorage.removeItem("email");
          localStorage.removeItem("name");
          navigate("/login");
          return;
        }

        const avatarFromLocalStorage = localStorage.getItem("avatar_url");
        if (avatarFromLocalStorage && avatarFromLocalStorage.trim() !== "") {
          setAvatar(avatarFromLocalStorage);
        } else {
          // Lấy avatar từ decoded token (key avatar)
          const tokenAvatar = decoded.avatar || "";
          setAvatar(tokenAvatar.trim() !== "" ? tokenAvatar : Default_Avata);
        }
      } catch (error) {
        console.error("Token không hợp lệ", error);
        setName("");
        setAvatar(Default_Avata);
        setRole(null);
      }
    } else {
      setName("");
      setAvatar(Default_Avata);
      setRole(null);
    }
  }, [location.pathname, navigate]);

  /*Đóng dropdown khi click ra ngoài*/
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  /*Chuyển hướng Login cho Guest */
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
                    <Link to="/bloodtype" className={isActive("/bloodtype")}>
                      Các Loại Máu
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cachsudungmau"
                      className={isActive("/cachsudungmau")}
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
                      to="/dangkyhienmau"
                      onClick={(e) => handleAccessLink(e, "/dangkyhienmau")}
                      className={isActive("/dangkyhienmau")}
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
                      <Link to="/history">Lịch Sử Hiến Máu</Link>
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
