import React, { useState, useEffect } from "react";
import axios from "axios";

function getCurrentDateTime() {
    return new Date().toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm
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
        readyTime: "",
        note: "",
    });

    const [message, setMessage] = useState("");

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
        console.log("Dữ liệu formData nhận được:", formData);
        try {
            const fullData = {
                bloodType: formData.bloodType,
                readyTime: new Date(formData.readyTime).toISOString(),
                note: formData.note,
            };

            const response = await axios.post("http://localhost:8080/api/donor/register", fullData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200 || response.status === 201) {

                setFormData({
                    bloodType: "",
                    readyTime: "",
                    note: "",
                });
                setMessage(" " + (response.data.message || "Đăng ký thành công!"));
            } else {
                setMessage(" Có lỗi xảy ra khi gửi đăng ký.");
            }
        } catch (error) {
            console.error("Lỗi gửi API:", error);
            setMessage(" Lỗi kết nối tới server");
        }
    };

    return (
        <div className="form-wrapper">
            <h1>Đăng ký hiến máu</h1>
            <form className="blood-form" onSubmit={handleSubmit}>
                <div className="Head">
                    <div className="avatar1">
                        <input type="text" name="name" value={userInfo.name} placeholder="Họ và Tên" readOnly />
                    </div>
                    <div className="avatar2">
                        <input type="text" name="gender" value={userInfo.gender} placeholder="Giới tính" readOnly />
                    </div>
                </div>

                <input type="text" name="yearOfBirth" value={userInfo.yearOfBirth} placeholder="Năm sinh" readOnly />
                <input type="email" name="email" value={userInfo.email} placeholder="Email" readOnly />
                <input type="text" name="address" value={userInfo.address} placeholder="Địa chỉ thường trú" readOnly />
                <input type="tel" name="phoneNumber" value={userInfo.phoneNumber} placeholder="Số điện thoại" readOnly />

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
                    <label>Thời gian bạn sẵn sàng hiến máu</label>
                    <input
                        type="datetime-local"
                        name="readyTime"
                        value={formData.readyTime}
                        onChange={handleChange}
                        min={getCurrentDateTime()}
                        required
                    />
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

                <button type="submit" className="submit-btn">Gửi đăng ký</button>
                {message && <p className="message" style={{ marginTop: "1rem", color: message.startsWith("") ? "green" : "blue" }}>{message}</p>}
            </form>
        </div>
    );
}

export default BloodDonation;
