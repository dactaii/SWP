import React, { useState, useEffect } from "react";
import logoDefault from "../../assets/img/icons/logoDefault.png";
import axios from "axios";
import { Link } from "react-router-dom";

const Default_Avatar = logoDefault;

const UserInfo = () => {
  const [avatar, setAvatar] = useState(Default_Avatar);
  const [userInfo, setUserInfo] = useState({
    name: "",
    gender: "",
    yearOfBirth: "",
    email: "",
    address: "",
    phoneNumber: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;

        setUserInfo({
          name: data.name || "",
          gender: data.gender || "",
          yearOfBirth: data.yearOfBirth || "",
          email: data.email || "",
          address: data.address || "",
          phoneNumber: data.phoneNumber || "",
        });

        const localAvatar = localStorage.getItem("avatar_url");
        if (localAvatar?.trim()) {
          setAvatar(localAvatar);
        } else if (data.avatar_url || data.avatar) {
          setAvatar(data.avatar_url || data.avatar);
        }
      } catch (error) {
        console.error("Lỗi khi tải thông tin người dùng:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="user-info-wrapper">
      <div className="user-left">
        <div className="user-avatar-box">
          <img src={avatar} alt="avatar" className="user-avatar" />
          <div className="user-name">{userInfo.name}</div>
        </div>
      </div>

      <div className="user-right">
        <h1 className="dashboard-title">Thông tin người dùng</h1>

        <form className="regis-form">
          <div className="form-row">
            <input type="text" value={userInfo.name} placeholder="Họ và tên" readOnly />
            <input type="text" value={userInfo.gender} placeholder="Giới tính" readOnly />
          </div>
          <input type="text" value={userInfo.yearOfBirth} placeholder="Năm sinh" readOnly />
          <input type="email" value={userInfo.email} placeholder="Email" readOnly />
          <input type="text" value={userInfo.address} placeholder="Địa chỉ thường trú" readOnly />
          <input type="tel" value={userInfo.phoneNumber} placeholder="Số điện thoại" readOnly />
        </form>

        <div className="edit-user-btn-wrapper">
          <Link to="/UpdateUserInfoPage" className="edit-user-btn">
            Chỉnh sửa thông tin người dùng
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
