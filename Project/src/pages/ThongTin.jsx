import React, { useState } from "react";
import UserInfo from "../components/User/UserInfo";
import UpdateUserInfo from "../components/User/UpdateUserInfo";
import UserLayout from "../layouts/UserLayout";

const ThongTin = () => {
  const [activeComponent, setActiveComponent] = useState("userInfo");

  return (
    <UserLayout>
      <div className="registration-page" style={{ display: "flex" }}>
        <aside>
          <nav className="slidebar-nav">
            <a href="#thongtin">Thông tin người dùng</a>
            <a href="#lichsu">Lịch sử hiến máu</a>
            <a href="#nhacnho">Nhắc nhở hiến máu</a>
            <a href="#canmau">Thông Báo Cần Máu</a>
          </nav>
        </aside>

        <main style={{ flex: 1, paddingLeft: "20px" }}>
          {activeComponent === "userInfo" && (
            <>
              <UserInfo />
              <button
                onClick={() => setActiveComponent("updateUserInfo")}
                className="btn btn-primary"
                style={{ marginTop: "20px" }}
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
        </main>
      </div>
    </UserLayout>
  );
};

export default ThongTin;
