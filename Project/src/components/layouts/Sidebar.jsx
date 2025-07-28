import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Swal from "../../assets/js/swalConfig";
import LoginModal from "../../components/login/LoginModal";
import logo from "../../assets/img/logos/logo.png";
import logoDefault from "../../assets/img/icons/logoDefault.png";
import FallingLeaves from "../../components/login/FallingLeaves";

import {
  MdHomeFilled,
  MdBloodtype,
  MdOutlineBloodtype,
  MdOutlineStorage,
} from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { LuSwatchBook } from "react-icons/lu";
import { TiThMenu } from "react-icons/ti";
import { PiChatsCircleBold } from "react-icons/pi";
import { FaUserFriends, FaRegCalendarAlt } from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { BiHistory } from "react-icons/bi";
import { MdManageAccounts } from "react-icons/md";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";

const Default_Avatar = logoDefault;

const Sidebar = () => {
  const [moreOpen, setMoreOpen] = useState(false);
  const [switchOpen, setSwitchOpen] = useState(false);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(Default_Avatar);
  const [role, setRole] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [sidebarMode, setSidebarMode] = useState(() => {
    return localStorage.getItem("sidebarMode") || "user";
  });

  const navigate = useNavigate();
  const location = useLocation();

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
      setSidebarMode("user");
      window.location.href = "/";
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setName("");
      setAvatar(Default_Avatar);
      setRole(null);
      localStorage.setItem("sidebarMode", "user");
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

      const defaultMode =
        decoded.role === "ROLE_ADMIN"
          ? "admin"
          : decoded.role === "ROLE_STAFF"
          ? "staff"
          : "user";

      localStorage.setItem("sidebarMode", defaultMode);
      setSidebarMode(defaultMode);
      setName(decoded.name || "");
      setRole(decoded.role || null);

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
    const handleLogin = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setName(decoded.name || "");
          setRole(decoded.role || null);
        } catch {
          setName("");
          setRole(null);
        }
      }
    };

    window.addEventListener("loginSuccess", handleLogin);
    return () => window.removeEventListener("loginSuccess", handleLogin);
  }, []);

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
        setShowLoginModal(true);
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
                  Swal.fire(
                    "Lỗi",
                    "Không thể lấy vị trí: " + error.message,
                    "error"
                  );
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
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Đã xảy ra lỗi khi kiểm tra thông tin người dùng.",
      });
    }
  };

  const changeSidebarMode = (mode) => {
    setSidebarMode(mode);
    localStorage.setItem("sidebarMode", mode);
    setMoreOpen(false);
    setSwitchOpen(false);
  };

  return (
    <>
      <aside className="sidebar full-height">
        <div className="sidebar-logo-wrapper">
          <Link to="/" className="sidebar-logo">
            <img src={logo} alt="Logo" />
          </Link>
        </div>

        <div className="sidebar-main">
          <nav className="sidebar-nav">
            <ul>
              {sidebarMode === "admin" ? (
                <>
                  <li>
                    <Link
                      to="/UserManagementPage"
                      className={isActive("/UserManagementPage")}
                    >
                      <MdManageAccounts className="sidebar-icon" />
                      Quản Lý Người Dùng
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/DashBoardPage"
                      className={isActive("/DashBoardPage")}
                    >
                      <RiDashboardHorizontalFill className="sidebar-icon" />
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/ReportPage" className={isActive("/ReportPage")}>
                      <TbReportAnalytics className="sidebar-icon" />
                      Report
                    </Link>
                  </li>
                </>
              ) : sidebarMode === "staff" ? (
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
                      to="/DonationUserListPage"
                      className={isActive("/DonationUserListPage")}
                    >
                      <BiHistory className="sidebar-icon" />
                      Lịch Sử Hiến Máu
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/NearbyDonorSearchPage"
                      className={isActive("/NearbyDonorSearchPage")}
                    >
                      <GrMapLocation className="sidebar-icon" />
                      Tìm người hiến khẩn cấp
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
                          <Link
                            to="/bloodtype"
                            className={isActive("/bloodtype")}
                          >
                            Các Loại Máu
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/UseBloodPage"
                            className={isActive("/UseBloodPage")}
                          >
                            Cách Sử Dụng Máu
                          </Link>
                        </li>
                      </ul>
                    </details>
                  </li>
                  <li>
                    <a
                      href="#blog"
                      onClick={(e) => {
                        e.preventDefault();
                        const token = localStorage.getItem("token");
                        if (!token) {
                          Swal.fire({
                            icon: "warning",
                            title: "Chưa đăng nhập",
                            text: "Vui lòng đăng nhập để tiếp tục.",
                          }).then(() => {
                            setShowLoginModal(true);
                          });
                          return;
                        }
                        navigate("/blog");
                      }}
                      className={isActive("/blog")}
                    >
                      <PiChatsCircleBold className="sidebar-icon" />
                      Nhật ký hiến máu
                    </a>
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

        {name ? (
          <div className="sidebar-user">
            <Link to="/UserInfoPage" className="user-info">
              <img src={avatar} alt="avatar" className="user-avatar" />
              <span className="username">{name}</span>
            </Link>

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
                  <Link to="/UserInfoPage">Thông Tin Cá Nhân</Link>
                </li>
                <li>
                  <Link to="/DonationHistoryPage">Lịch Sử Hiến Máu</Link>
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
            <button onClick={() => setShowLoginModal(true)}>Đăng Nhập</button>
          </div>
        )}
      </aside>

      {showLoginModal && (
        <>
          <FallingLeaves />
          <LoginModal onClose={() => setShowLoginModal(false)} />
        </>
      )}
    </>
  );
};

export default Sidebar;
