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

    // Ensure quantity is non-negative
    if (name === "quantity" && Number(value) < 0) {
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Đang gửi...");

    try {
      const response = await fetch(
        "http://localhost:8080/api/emergency/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage("✅ " + data.message);
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (error) {
      setMessage("❌ Lỗi kết nối tới server");
    }
  };

  return (
    <div className="emergency form-container">
      <h2>Đăng ký yêu cầu máu khẩn cấp</h2>
      <form onSubmit={handleSubmit}>
        <label>Nhóm máu</label>
        <input
          list="bloodtype"
          name="bloodType"
          value={form.bloodType}
          onChange={handleChange}
          placeholder="-- Chọn nhóm máu --"
          required
        />

        <datalist id="bloodtype">
          <option value="Nhóm máu A+" />
          <option value="Nhóm máu A-" />
          <option value="Nhóm máu B+" />
          <option value="Nhóm máu B-" />
          <option value="Nhóm máu AB+" />
          <option value="Nhóm máu AB-" />
          <option value="Nhóm máu O+" />
          <option value="Nhóm máu O-" />
        </datalist>

        <label>Loại thành phần máu</label>
        <input
          name="componentType"
          value={form.componentType}
          onChange={handleChange}
          required
          placeholder="Tiểu cầu, Hồng cầu..."
        />

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
