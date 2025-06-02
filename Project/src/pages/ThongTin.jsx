import React, { useEffect } from "react";
import UserInfo from "../components/User/UserInfo";
import UserLayout from "../layouts/UserLayout";

const ThongTin = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <UserLayout>
      <div className="registration-page">
        <aside>
          <nav className="slidebar-nav">
            <a href="#thongtin">Thông tin người dùng</a>
            <a href="#lichsu">Lịch sử hiến máu</a>
            <a href="#nhacnho">Nhắc nhở hiến máu</a>
            <a href="#canmau">Thông Báo Cần Máu</a>
          </nav>
        </aside>

        <UserInfo />
      </div>
    </UserLayout>
  );
};

export default ThongTin;
