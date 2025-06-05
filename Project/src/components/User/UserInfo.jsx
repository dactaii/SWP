import React, { useState, useEffect } from "react";
import logoDefault from "../../assets/img/icons/logoDefault.png";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Default_Avatar = logoDefault;

const UserInfo = () => {
  const [avatar, setAvatar] = useState(Default_Avatar);
  const [avatarFile, setAvatarFile] = useState(null);
  const [fullName, setFullName] = useState("");
  const [formData, setFormData] = useState({
    gender: "",
    yearOfBirth: "",
    email: "",
    address: "",
    phoneNumber: "",
  });

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Cleanup object URL on unmount/change
  useEffect(() => {
    return () => {
      if (avatar && avatar !== Default_Avatar) {
        URL.revokeObjectURL(avatar);
      }
    };
  }, [avatar]);

  // Token & avatar loading
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return resetState();

    try {
      const decoded = jwtDecode(token);

      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        localStorage.removeItem("avatar_url");
        return resetState();
      }

      setFullName(decoded.name || "");

      setFormData((prev) => ({
        ...prev,
        email: decoded.email || prev.email,
      }));

      const localAvatar = localStorage.getItem("avatar_url");
      if (localAvatar?.trim()) {
        setAvatar(localAvatar);
      } else if (decoded.avatar_url || decoded.avatar) {
        setAvatar(decoded.avatar_url || decoded.avatar);
      }
    } catch (error) {
      console.error("Invalid token:", error);
      resetState();
    }
  }, []);

  const resetState = () => {
    setAvatar(Default_Avatar);
    setFullName("");
    setFormData({
      gender: "",
      yearOfBirth: "",
      email: "",
      address: "",
      phoneNumber: "",
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const url = URL.createObjectURL(file);
      setAvatar(url);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      if (avatarFile) {
        data.append("avatarFile", avatarFile);
      }

      console.log("TOKEN:", localStorage.getItem("token"));
      console.log("HEADER:", {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      });

      const response = await axios.post(
        "http://localhost:8080/api/updateProfile/update",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const result = response.data;
      alert(result.message || "Cập nhật thành công!");

      if (result.avatarPath) {
        localStorage.setItem("avatar_url", result.avatarPath);
      }
    } catch (error) {
  const status = error.response?.status;

  if (status === 401) {
    alert("Lỗi 401: Chưa xác thực. Vui lòng đăng nhập lại nếu cần.");
  } else if (status === 403) {
    alert("Lỗi 403: Bạn không có quyền thực hiện hành động này.");
  } else {
    console.error("Lỗi cập nhật:", error);
    const msg = error?.response?.data?.message || "Lỗi khi cập nhật hồ sơ";
    alert(msg);
  }    
  }
  };

  return (
    <div className="main-content">
      <h1>Thông tin người dùng</h1>
      <div className="avatar-container">
        <img src={avatar} alt="avatar" className="avatar" />
        <input type="file" accept="image/*" onChange={handleAvatarChange} />
      </div>
      <form className="regis-form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-7">
            <input
              type="text"
              name="fullName"
              value={fullName}
              placeholder="Họ và Tên"
              readOnly
            />
          </div>
          <div className="col-md-5">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Chọn giới tính</option>
              <option value="Male">Nam</option>
              <option value="Female">Nữ</option>
            </select>
          </div>
        </div>

        <input
          type="date"
          name="yearOfBirth"
          value={formData.yearOfBirth}
          onChange={handleChange}
          placeholder="Ngày sinh"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Địa chỉ thường trú"
          required
        />
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Số điện thoại"
          required
        />
        <button type="submit">Cập Nhật</button>
      </form>
    </div>
  );
};

export default UserInfo;
