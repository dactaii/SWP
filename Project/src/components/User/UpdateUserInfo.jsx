import React, { useState, useEffect } from "react";
import logoDefault from "../../assets/img/icons/logoDefault.png";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../layouts/AlertContext";

const Default_Avatar = logoDefault;

const UpdateUserInfo = () => {
  const { showAlert } = useAlert();
  const navigate = useNavigate();
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
  const [isGoogleUser, setIsGoogleUser] = useState(false);

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

        setFullName(data.name || "");
        setFormData({
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
      if (decoded.googleID) {
        setIsGoogleUser(true);
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

      const response = await axios.post(
        "http://localhost:8080/api/updateProfile/update",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const result = response.data;

      if (result.avatarPath) {
        localStorage.setItem("avatar_url", result.avatarPath);
      }

      showAlert("Thành công", "Đã cập nhật thông tin của bạn", "success");

      setTimeout(() => {
        navigate("/UserInfoPage");
      }, 1500);
    } catch (error) {
      const status = error.response?.status;
      const apiMessage = error.response?.data?.message;

      if (status === 400) {
        // Các lỗi 400 tùy theo message cụ thể
        if (apiMessage === "Email already exists") {
          showAlert(
            "Lỗi",
            "Email đã tồn tại. Vui lòng dùng email khác.",
            "error"
          );
        } else if (
          apiMessage === "Year of birth must be between 1900 and 2020"
        ) {
          showAlert(
            "Lỗi",
            "Năm sinh phải nằm trong khoảng 1900 đến 2020.",
            "error"
          );
        } else {
          showAlert(
            "Lỗi",
            apiMessage || "Dữ liệu gửi lên không hợp lệ.",
            "error"
          );
        }
      } else if (status === 403) {
        showAlert(
          "Không được phép",
          "Bạn không có quyền thực hiện hành động này",
          "error"
        );
      } else {
        const msg = error.response?.data?.message || "Đã xảy ra lỗi.";
        showAlert("Lỗi", msg, "error");
      }
    }
  };

  return (
    <div className="update-user-info-wrapper">
      <h1>Chỉnh sửa thông tin người dùng</h1>

      <div className="avatar-container">
        <img src={avatar} alt="avatar" className="avatar" />
        {isGoogleUser ? (
          <p style={{ color: "gray", fontStyle: "italic" }}>
            Bạn đã đăng nhập bằng Google – không thể thay đổi ảnh đại diện.
          </p>
        ) : (
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
        )}
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
        <div className="edit-user-btn-wrapper">
          <button type="submit" className="edit-user-btn">
            Cập nhật
          </button>
          <button
            type="button"
            className="edit-user-btn"
            style={{ backgroundColor: "#94a3b8", marginLeft: "12px" }}
            onClick={() => navigate("/UserInfoPage")}
          >
            Hủy / Quay lại
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserInfo;
