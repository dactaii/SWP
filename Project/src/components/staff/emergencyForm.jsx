import React, { useState } from "react";

function EmergencyForm() {
  const [form, setForm] = useState({
    bloodType: "",
    componentType: "",
    quantity: "",
    hospitalName: "",
    note: "",
    neededTime: "",
  });

  const [message, setMessage] = useState("");

  const todayISO = new Date().toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "quantity" && Number(value) < 0) return;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Đang gửi...");

    const token = localStorage.getItem("token"); // Lấy token từ localStorage

    if (!token) {
      setMessage("❌ Không tìm thấy token đăng nhập.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/emergency/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ " + data.message);
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setMessage("❌ Lỗi kết nối tới server");
    }
  };

  return (
    <div className="emergency form-container">
      <h2>Đăng ký yêu cầu máu khẩn cấp</h2>
      <form onSubmit={handleSubmit}>
        <label>Nhóm máu</label>
        <select
          name="bloodType"
          value={form.bloodType}
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

        <label>Loại thành phần máu</label>
        <select
          name="componentType"
          list="componentType"
          value={form.componentType}
          onChange={handleChange}
          required
          placeholder="Tiểu cầu, Hồng cầu..."
        >

          <option value="Whole" >Toàn phần</option>
          <option value="RBC"  >Hồng Cầu </option>
          <option value="Plasma"  >Huyết tương</option>
          <option value="Platelet"  > Tiểu cầu</option>
        </select>

        <label>Số lượng (đơn vị)</label>
        <input
          type="number"
          name="quantity"
          min="1"
          step="1"
          value={form.quantity}
          onChange={handleChange}
          required
        />

        <label>Tên bệnh viện</label>
        <input
          name="hospitalName"
          value={form.hospitalName}
          onChange={handleChange}
          required
        />

        <label>Ghi chú</label>
        <textarea
          name="note"
          value={form.note}
          onChange={handleChange}
        ></textarea>

        <label>Thời gian cần</label>
        <input
          type="datetime-local"
          name="neededTime"
          value={form.neededTime}
          onChange={handleChange}
          min={todayISO}
          required
        />

        <button type="submit">Gửi yêu cầu</button>
      </form>
      <p className="message">{message}</p>
    </div>
  );
}

export default EmergencyForm;
