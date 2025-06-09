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
    <div className="main-content">
      <h1>Thông tin người dùng</h1>
      <div className="avatar-container">
        <img src={avatar} alt="avatar" className="avatar" />
      </div>

      <form className="regis-form">
        <div className="row">
          <div className="col-md-7">
            <input
              type="text"
              name="name"
              value={userInfo.name}
              placeholder="Họ và Tên"
              readOnly
            />
          </div>
          <div className="col-md-5">
            <input
              type="text"
              name="gender"
              value={userInfo.gender}
              placeholder="Giới tính"
              readOnly
            />
          </div>
        </div>

        <input
          type="text"
          name="yearOfBirth"
          value={userInfo.yearOfBirth}
          placeholder="Ngày sinh"
          readOnly
        />
        <input
          type="email"
          name="email"
          value={userInfo.email}
          placeholder="Email"
          readOnly
        />
        <input
          type="text"
          name="address"
          value={userInfo.address}
          placeholder="Địa chỉ thường trú"
          readOnly
        />
        <input
          type="tel"
          name="phoneNumber"
          value={userInfo.phoneNumber}
          placeholder="Số điện thoại"
          readOnly
        />
      </form>
    </div>
  );
};

export default UserInfo;
