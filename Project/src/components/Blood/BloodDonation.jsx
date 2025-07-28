import React, { useState, useEffect } from "react";
import axios from "axios";
import LaPhongGB from "../../assets/img/backgrounds/LaPhongBG1.png";
import PageBG from "../../assets/img/backgrounds/PageBG.png";
function getCurrentDateTime() {
  return new Date().toISOString().slice(0, 16);
}

function BloodDonation() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    gender: "",
    yearOfBirth: "",
    email: "",
    address: "",
    phoneNumber: "",
  });

  const [formData, setFormData] = useState({
    bloodType: "",
    readyDate: "",
    readyHour: "",
    note: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
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
      } catch (error) {
        console.error("Lỗi khi tải thông tin người dùng:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vui lòng đăng nhập.");
      return;
    }

    const { readyDate, readyHour } = formData;

    if (!readyDate || !readyHour) {
      alert("Vui lòng chọn ngày và giờ.");
      return;
    }

    const latitude = localStorage.getItem("user_lat");
    const longitude = localStorage.getItem("user_lng");

    try {
      const readyTime = `${readyDate}T${readyHour}:00`;

      const fullData = {
        bloodType: formData.bloodType,
        readyTime: readyTime,
        note: formData.note,
        latitude,
        longitude,
      };

      const response = await axios.post(
        "http://localhost:8080/api/donor/register",
        fullData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setFormData({ bloodType: "", readyDate: "", readyHour: "", note: "" });
        setMessage("Đăng ký thành công!");
      } else {
        setMessage("Có lỗi xảy ra khi gửi đăng ký.");
      }
    } catch (error) {
      console.error("Lỗi gửi API:", error);
      setMessage("Bạn đã đăng ký trước đó.");
    }
  };

  return (
    <div
      className="blood-donation-page has-bg"
      style={{ "--donation-bg": `url(${PageBG})` }}
    >
      <div
        className="form-wrapper has-bg"
        style={{ "--form-bg": `url(${LaPhongGB})` }}
      >
        <h1>Đăng ký hiến máu</h1>
        <form className="blood-form" onSubmit={handleSubmit}>
          <div className="Head">
            <div className="avatar1">
              <input
                type="text"
                value={userInfo.name}
                placeholder="Họ và Tên"
                readOnly
              />
            </div>
            <div className="avatar2">
              <input
                type="text"
                value={userInfo.gender}
                placeholder="Giới tính"
                readOnly
              />
            </div>
          </div>

          <input
            type="text"
            value={userInfo.yearOfBirth}
            placeholder="Năm sinh"
            readOnly
          />
          <input
            type="email"
            value={userInfo.email}
            placeholder="Email"
            readOnly
          />
          <input
            type="text"
            value={userInfo.address}
            placeholder="Địa chỉ thường trú"
            readOnly
          />
          <input
            type="tel"
            value={userInfo.phoneNumber}
            placeholder="Số điện thoại"
            readOnly
          />

          <div className="form-group">
            <select
              name="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
              required
            >
              <option value="">-- Chọn nhóm máu --</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <div className="form-group">
            <label>Ngày bạn sẵn sàng hiến máu</label>
            <input
              type="date"
              name="readyDate"
              value={formData.readyDate || ""}
              min={getCurrentDateTime().slice(0, 10)}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Chọn giờ:</label>
            <div className="time-buttons">
              {["07:30", "09:30", "14:00", "15:00"].map((time) => (
                <button
                  type="button"
                  key={time}
                  className={formData.readyHour === time ? "active-time" : ""}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, readyHour: time }))
                  }
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <textarea
              name="note"
              placeholder="Ghi chú (tùy chọn)"
              value={formData.note}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <button type="submit" className="submit-btn">
            Gửi đăng ký
          </button>
          {message && (
            <p
              className="message"
              style={{
                marginTop: "1rem",
                color: message.includes("thành công") ? "green" : "red",
              }}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default BloodDonation;
