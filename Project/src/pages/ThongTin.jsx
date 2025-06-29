import React, { useState } from "react";
import UserInfo from "../components/User/UserInfo";
import UpdateUserInfo from "../components/User/UpdateUserInfo";
import UserLayout from "../layouts/UserLayout";
import EmergencyForm from "../components/staff/emergencyForm";
import ScheduleManagement from "../components/staff/ScheduleManagement";
import AppointmentList from "../components/staff/AppointmentList";
const ThongTin = () => {
  const [activeComponent, setActiveComponent] = useState("userInfo");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleEmergencyClick = () => {
    setActiveComponent("emergencyForm");
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <UserLayout>
      <div className="page-thongtin">
        <div className={`slidebar-user ${isCollapsed ? "collapsed" : ""}`}>
          <div className="logo_content">
            <div className="logo">
              <i className="bi bi-list" onClick={toggleSidebar}></i>
              {!isCollapsed && <div className="logo_name">Hello</div>}
            </div>
          </div>

          <ul className="nav">
            <li>
              <a
                href="#"
                onClick={() => setActiveComponent("userInfo")}
                className={activeComponent === "userInfo" ? "active" : ""}
              >
                <i className="bi bi-person-circle"></i>
                <span className="link_name">Thông tin người dùng</span>
              </a>
              <span className="tooltip">Thông tin người dùng</span>
            </li>

            <li>
              <a
                href="#"
                onClick={() => setActiveComponent("ScheduleManagement")}
                className={activeComponent === "ScheduleManagement" ? "active" : ""}
              >
                <i className="bi bi-calendar3"></i>
                <span className="link_name">Quản lí lịch hẹn </span>
              </a>
              <span className="tooltip">Quản lí lịch hẹn</span>
            </li>



            <li>
              <a href="#"
                onClick={() => setActiveComponent("AppointmentList")}
                className={activeComponent === "AppointmentList" ? "active" : ""}>
                <i className="bi bi-journal-bookmark-fill"></i>
                <span className="link_name">Lịch sử lịch hẹn hiến máu</span>
              </a>
              <span className="tooltip">Lịch sử lịch hẹn hiến máu</span>
            </li>

            <li>
              <a href="#" className={activeComponent === "notification" ? "active" : ""}>
                <i className="bi bi-bell-fill"></i>
                <span className="link_name">Thông Báo Cần Máu</span>
              </a>
              <span className="tooltip">Thông Báo Cần Máu</span>
            </li>

            <li>
              <a
                href="#"
                onClick={handleEmergencyClick}
                className={activeComponent === "emergencyForm" ? "active" : ""}
              >
                <i className="bi bi-exclamation-square-fill"></i>
                <span className="link_name">Cần Máu Khẩn Cấp</span>
              </a>
              <span className="tooltip">Cần Máu Khẩn Cấp</span>
            </li>
          </ul>
        </div>

        <main style={{ flex: 1, paddingLeft: "20px", transition: "all 0.4s ease" }}>
          {activeComponent === "userInfo" && (
            <>
              <UserInfo />
              <button
                onClick={() => setActiveComponent("updateUserInfo")}
                className="edit-user-btn"
              >
                Chỉnh sửa thông tin người dùng
              </button>
            </>
          )}

          {activeComponent === "updateUserInfo" && (
            <>
              <UpdateUserInfo />
              <button
                onClick={() => setActiveComponent("userInfo")}
                className="btn btn-secondary"
                style={{ marginTop: "20px" }}
              >
                Hủy / Quay lại
              </button>
            </>
          )}
          {activeComponent === "ScheduleManagement" && <ScheduleManagement />}
          {activeComponent === "AppointmentList" && <AppointmentList />}


          {activeComponent === "emergencyForm" && <EmergencyForm />}
        </main>
      </div>
    </UserLayout>
  );
};

export default ThongTin;
