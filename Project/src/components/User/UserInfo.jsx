import React, { useState, useEffect } from "react";
import logoDefault from "../../assets/img/icons/logoDefault.png";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Default_Avata = logoDefault;

const UserInfo = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [avatar, setAvatar] = useState(Default_Avata);
  const [avatarFile, setAvatarFile] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    birthDate: "",
    email: "",
    address: "",
    phoneNumber: "",
    bloodGroup: "",
  });

  /* đổi avata nếu chưa có */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);

        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          localStorage.removeItem("avatar_url");
          localStorage.removeItem("email");
          localStorage.removeItem("name");
          setAvatar(Default_Avata);
          setFormData({
            fullName: "",
            gender: "",
            birthDate: "",
            email: "",
            address: "",
            phoneNumber: "",
            bloodGroup: "",
          });
          return;
        }

        setFormData((prev) => ({
          ...prev,
          fullName: decoded.name || prev.fullName,
          email: decoded.email || prev.email,
        }));

        const avatarFromLocalStorage = localStorage.getItem("avatar_url");
        if (avatarFromLocalStorage && avatarFromLocalStorage.trim() !== "") {
          setAvatar(avatarFromLocalStorage);
        } else {
          // Nếu không có avatar trong localStorage thì lấy từ token
          const tokenAvatar = decoded.avatar_url || decoded.avatar || "";
          setAvatar(tokenAvatar.trim() !== "" ? tokenAvatar : Default_Avata);
        }
      } catch (error) {
        console.error("Token không hợp lệ", error);
        setAvatar(Default_Avata);
      }
    } else {
      setAvatar(Default_Avata);
    }
  }, []);

  /* update avata */
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  /* cập nhật giá trị từng input */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData(); //tạo form data để chứa thông tin

      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      if (avatarFile) {
        data.append("avatar", avatarFile);
      }

      const response = await axios.post(
        "https://your-api-endpoint.com/update-user",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            // KHÔNG set 'Content-Type', axios sẽ tự set đúng khi gửi FormData
          },
        }
      );

      const result = response.data;

      console.log("Cập nhật thành công:", result);

      if (result.avatar_url) {
        setAvatar(result.avatar_url);
        setAvatarFile(null);
      }
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      alert("Có lỗi xảy ra khi cập nhật thông tin");
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
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Họ và Tên"
                required
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
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>
          </div>

          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            placeholder="Ngày Sinh"
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
            placeholder="Địa Chỉ Thường Trú"
            required
          />
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Số Điện Thoại"
            required
          />
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
          >
            <option value="">Chọn Nhóm Máu</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="AB">AB</option>
            <option value="O">O</option>
          </select>
          <button type="submit">Cập Nhật</button>
        </form>
      </div>
  );
};
export default UserInfo;
