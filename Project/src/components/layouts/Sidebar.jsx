import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import logo from "../../assets/img/logos/logo.png";
import logoDefault from "../../assets/img/icons/logoDefault.png";
import Swal from "../../assets/js/swalConfig";

import { MdHomeFilled } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { LuSwatchBook } from "react-icons/lu";
import { MdBloodtype, MdOutlineBloodtype } from "react-icons/md";
import { TiThMenu } from "react-icons/ti";
import { PiChatsCircleBold } from "react-icons/pi";
import { FaUserFriends } from "react-icons/fa";
import { MdOutlineStorage } from "react-icons/md";
import { BiDonateBlood } from "react-icons/bi";
import { GrMapLocation } from "react-icons/gr";
import { FaRegCalendarAlt } from "react-icons/fa";
import { RiCalendarScheduleLine } from "react-icons/ri";

const Default_Avatar = logoDefault;

const Sidebar = () => {
  const [moreOpen, setMoreOpen] = useState(false);
  const [switchOpen, setSwitchOpen] = useState(false);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(Default_Avatar);
  const [role, setRole] = useState(null);
  const [isStaffMode, setIsStaffMode] = useState(() => {
    return localStorage.getItem("isStaffMode") === "true";
  });
  const [isAdminMode, setIsAdminMode] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  const isActive = (path) => (location.pathname === path ? "active" : "");
  const isSubActive = (basePath) =>
    location.pathname.includes(basePath) ? "active" : "";

  const logout = () => {
    const email = localStorage.getItem("email");
    if (window.google && email) {
      window.google.accounts.id.revoke(email, () => {
        cleanupAndRedirect();
      });
    } else {
      cleanupAndRedirect();
    }
    function cleanupAndRedirect() {
      localStorage.clear();
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setName("");
      setAvatar(Default_Avatar);
      setRole(null);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.clear();
        setName("");
        setAvatar(Default_Avatar);
        setRole(null);
        navigate("/login");
        return;
      }

      setName(decoded.name || "");
      setRole(decoded.role || null);

      if (decoded.role === "ROLE_ADMIN") {
        setIsAdminMode(true);
        setIsStaffMode(false);
        localStorage.setItem("isStaffMode", "false");
      } else if (decoded.role === "ROLE_STAFF") {
        setIsStaffMode(true);
        setIsAdminMode(false);
        localStorage.setItem("isStaffMode", "true");
      } else {
        setIsStaffMode(false);
        setIsAdminMode(false);
        localStorage.setItem("isStaffMode", "false");
      }

      axios
        .get("http://localhost:8080/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const avatarFromAPI = res.data.avatar_url || res.data.avatar;
          const localAvatar = localStorage.getItem("avatar_url");
          setAvatar(localAvatar || avatarFromAPI || Default_Avatar);
        })
        .catch(() => {
          setAvatar(Default_Avatar);
        });
    } catch (e) {
      localStorage.clear();
      setName("");
      setAvatar(Default_Avatar);
      setRole(null);
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "avatar_url") {
        const newAvatar = event.newValue;
        setAvatar(newAvatar || Default_Avatar);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleBloodDonationClick = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Chưa đăng nhập",
        text: "Vui lòng đăng nhập để tiếp tục.",
      }).then(() => {
        navigate("/login");
      });
      return;
    }

    try {
      const res = await axios.get("http://localhost:8080/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { phoneNumber } = res.data;
      const lat = localStorage.getItem("user_lat");
      const lng = localStorage.getItem("user_lng");

      if (!phoneNumber) {
        Swal.fire({
          icon: "info",
          title: "Chưa cập nhật thông tin người dùng",
          text: "Vui lòng cập nhật thông tin để tiếp tục.",
          confirmButtonText: "Cập nhật ngay",
          showCancelButton: true,
          cancelButtonText: "Để sau",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/thongtin");
          }
        });
      } else if (!lat || !lng) {
        Swal.fire({
          icon: "info",
          title: "Thiếu thông tin vị trí",
          text: "Hệ thống cần vị trí hiện tại của bạn để tìm cơ sở hiến máu phù hợp.",
          confirmButtonText: "Chia sẻ vị trí",
          showCancelButton: true,
          cancelButtonText: "Để sau",
        }).then((result) => {
          if (result.isConfirmed) {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const { latitude, longitude } = position.coords;
                  localStorage.setItem("user_lat", latitude);
                  localStorage.setItem("user_lng", longitude);
                  navigate("/BloodDonation");
                },
                (error) => {
                  switch (error.code) {
                    case error.PERMISSION_DENIED:
                      Swal.fire("Lỗi", "Bạn đã từ chối chia sẻ vị trí.", "error");
                      break;
                    case error.POSITION_UNAVAILABLE:
                      Swal.fire("Lỗi", "Không thể xác định vị trí.", "error");
                      break;
                    case error.TIMEOUT:
                      Swal.fire("Lỗi", "Hết thời gian lấy vị trí.", "error");
                      break;
                    default:
                      Swal.fire("Lỗi", "Lỗi không xác định.", "error");
                  }
                }
              );
            } else {
              Swal.fire("Lỗi", "Trình duyệt không hỗ trợ định vị.", "error");
            }
          }
        });
      } else {
        navigate("/BloodDonation");
      }
    } catch (err) {
      console.error("Lỗi khi kiểm tra profile:", err);
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Đã xảy ra lỗi khi kiểm tra thông tin người dùng.",
      });
    }
  };

  return (
    <aside className={`sidebar full-height ${isStaffMode ? "staff-mode" : ""}`}>
      <div className="sidebar-logo-wrapper">
        <Link to="/" className="sidebar-logo">
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      <div className="sidebar-main">
        <div className="sidebar-top">
          <nav className="sidebar-nav">
            <ul>
              {isAdminMode ? (
                <>
                  <li>
                    <Link
                      to="/DashBoardPage"
                      className={isActive("/DashBoardPage")}
                    >
                      <RiCalendarScheduleLine className="sidebar-icon" />
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/ReportPage"
                      className={isActive("/ReportPage")}
                    >
                      <RiCalendarScheduleLine className="sidebar-icon" />
                      Report
                    </Link>
                  </li>
                </>
              ) : isStaffMode ? (
                <>
                  <li>
                    <Link
                      to="/bloodUnitPage"
                      className={isActive("/bloodUnitPage")}
                    >
                      <IoSearch className="sidebar-icon" />
                      Tra Cứu Kho Máu
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/staff/manage-blood"
                      className={isActive("/staff/manage-blood")}
                    >
                      <MdOutlineStorage className="sidebar-icon" />
                      Quản Lý Kho Máu
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/NearbyDonorSearchPage"
                      className={isActive("/NearbyDonorSearchPage")}
                    >
                      <GrMapLocation className="sidebar-icon" />
                      Tìm người hiến gần cơ sở
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/ScheduleManagementPage"
                      className={isActive("/ScheduleManagementPage")}
                    >
                      <FaRegCalendarAlt className="sidebar-icon" />
                      Quản Lý Lịch Hẹn
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/AppointmentListPage"
                      className={isActive("/AppointmentListPage")}
                    >
                      <RiCalendarScheduleLine className="sidebar-icon" />
                      Xác Nhận Hiến Máu
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/" className={isActive("/")}>
                      <MdHomeFilled className="sidebar-icon" />
                      Trang Chủ
                    </Link>
                  </li>
                  <li>
                    <details>
                      <summary className={isSubActive("/bloodtype")}>
                        <LuSwatchBook className="sidebar-icon" />
                        Tìm Hiểu Về Máu
                      </summary>
                      <ul>
                        <li>
                          <Link to="/bloodtype" className={isActive("/bloodtype")}>
                            Các Loại Máu
                          </Link>
                        </li>
                        <li>
                          <Link to="/BloodTypeFake" className={isActive("/BloodTypeFake")}>
                            Cách Sử Dụng Máu
                          </Link>
                        </li>
                      </ul>
                    </details>
                  </li>
                  <li>
                    <Link to="/blog" className={isActive("/blog")}>
                      <PiChatsCircleBold className="sidebar-icon" />
                      Nhật ký hiến máu
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#blood"
                      onClick={handleBloodDonationClick}
                      className={isActive("/BloodDonation")}
                    >
                      <MdBloodtype className="sidebar-icon" />
                      Đăng ký hiến máu
                    </a>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>

      {!isLoginPage && name ? (
        <div className="sidebar-user">
          <Link to="/thongtin" className="user-info">
            <img src={avatar} alt="avatar" className="user-avatar" />
            <span className="username">{name}</span>
          </Link>

          {role === "ROLE_STAFF" && !isAdminMode && (
            <>
              <button
                className="sidebar-more-btn"
                onClick={() => setSwitchOpen(!switchOpen)}
              >
                <FaUserFriends className="sidebar-icon" />
                Chuyển đổi trạng thái
              </button>
              {switchOpen && (
                <ul className="user-dropdown">
                  <li>
                    <a
                      href="#user"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsStaffMode(false);
                        localStorage.setItem("isStaffMode", "false");
                        setSwitchOpen(false);
                      }}
                      className={!isStaffMode ? "active" : ""}
                    >
                      Người dùng
                    </a>
                  </li>
                  <li>
                    <a
                      href="#staff"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsStaffMode(true);
                        localStorage.setItem("isStaffMode", "true");
                        setSwitchOpen(false);
                      }}
                      className={isStaffMode ? "active" : ""}
                    >
                      Nhân viên
                    </a>
                  </li>
                </ul>
              )}
            </>
          )}

          <button
            className="sidebar-more-btn"
            onClick={() => setMoreOpen(!moreOpen)}
          >
            <TiThMenu className="sidebar-icon" />
            Xem thêm
          </button>
          {moreOpen && (
            <ul className="user-dropdown">
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
                  href="#logout"
                  onClick={(e) => {
                    e.preventDefault();
                    logout();
                  }}
                >
                  Đăng Xuất
                </a>
              </li>
            </ul>
          )}
        </div>
      ) : (
        <div className="sidebar-login-btn">
          <Link to="/login">Đăng Nhập</Link>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
