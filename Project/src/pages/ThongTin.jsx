import React, { useState } from "react";
import UserInfo from "../components/User/UserInfo";
import UpdateUserInfo from "../components/User/UpdateUserInfo";
import UserLayout from "../layouts/UserLayout";
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
              <a href="#"
                onClick={() => setActiveComponent("userInfo")}
                className={activeComponent === "" ? "active" : ""}>
                <i className="bi bi-journal-bookmark-fill"></i>
                <span className="link_name">Lịch sử hiến máu</span>
              </a>
              <span className="tooltip">Lịch sử hiến máu</span>
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


        </main>
      </div>
    </UserLayout>
  );
};

export default ThongTin;
