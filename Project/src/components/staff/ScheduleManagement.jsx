import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/css/components/staff/ScheduleManagement.css";

export default function ScheduleManagement() {
  const [schedules, setSchedules] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    componentType: "",
    quantity: "",
    hospital: "",
  });
  const [hospitals, setHospitals] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    fetchSchedules();
    fetchHospitals();
  }, []);

  const fetchSchedules = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await axios.get("http://localhost:8080/api/donor", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSchedules(res.data);
    } catch (err) {
      console.error("Không thể lấy danh sách người hiến:", err);
    }
  };

  const fetchHospitals = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await axios.get("http://localhost:8080/api/hospitals", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHospitals(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách bệnh viện:", err);
    }
  };

  const openContactForm = (user) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedUser(null);
    setFormData({
      componentType: "",
      quantity: "",
      hospital: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.componentType || !formData.quantity || !formData.hospital)
      return;

    const donorId = selectedUser?.donorId;
    const payload = {
      componentType: formData.componentType,
      quantity: formData.quantity,
      hospitalId: formData.hospital,
      neededTime: selectedUser?.readyTime,
    };

    closeForm();

    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      await axios.post(
        `http://localhost:8080/api/emergency-requests/no-available-blood?donorId=${donorId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAlertMessage("Đã gửi yêu cầu thành công!");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    } catch (err) {
      console.error("❌ Lỗi khi gửi yêu cầu:", err);
      setAlertMessage("Gửi thất bại!");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year} ${hour}:${minute}`;
  };

  return (
    <div className="schedule-management">
      <h2>Yêu cầu hỗ trợ máu</h2>

      <div className="table-wrapper">
        <table className="schedule-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Họ và tên</th>
              <th>Ngày hiến máu</th>
              <th>Nhóm máu</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((sch, index) => (
              <React.Fragment key={sch.donorId}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{sch.name}</td>
                  <td>{formatDateTime(sch.readyTime)}</td>
                  <td>{sch.bloodType}</td>
                  <td>
                    <button
                      onClick={() =>
                        setExpandedRow(
                          expandedRow === sch.donorId ? null : sch.donorId
                        )
                      }
                      className="nds-action-btn"
                    >
                      {expandedRow === sch.donorId ? "Đóng" : "Xem chi tiết"}
                    </button>
                  </td>
                </tr>
                {expandedRow === sch.donorId && (
                  <tr className="nds-detail-row">
                    <td colSpan="5">
                      <div className="nds-detail-card">
                        <div className="nds-detail-grid">
                          <div>
                            <strong>Họ và tên:</strong> {sch.name}
                          </div>
                          <div>
                            <strong>Năm sinh:</strong> {sch.yearOfBirth}
                          </div>
                          <div>
                            <strong>Giới tính:</strong>{" "}
                            {sch.gender === "Male"
                              ? "Nam"
                              : sch.gender === "Female"
                              ? "Nữ"
                              : "Khác"}
                          </div>
                          <div>
                            <strong>Nhóm máu:</strong> {sch.bloodType}
                          </div>
                          <div>
                            <strong>Email:</strong> {sch.email}
                          </div>
                          <div>
                            <strong>Số điện thoại:</strong> {sch.phoneNumber}
                          </div>
                          <div className="nds-detail-full">
                            <strong>Địa chỉ:</strong> {sch.address}
                          </div>
                          <div className="nds-detail-full">
                            <strong>Thời gian sẵn sàng hiến máu:</strong>{" "}
                            {formatDateTime(sch.readyTime)}
                          </div>
                        </div>
                        <div className="nds-detail-actions">
                          <button
                            onClick={() => openContactForm(sch)}
                            className="nds-contact-btn"
                          >
                            Liên hệ
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="overlay">
          <div className="contact-form">
            <h3>Gửi yêu cầu hiến máu</h3>
            <p>
              Người nhận: <strong>{selectedUser?.name}</strong>
            </p>

            <label>Thành phần máu:</label>
            <select
              name="componentType"
              value={formData.componentType}
              onChange={handleInputChange}
            >
              <option value="">-- Chọn loại thành phần máu --</option>
              <option value="Whole">Toàn phần</option>
              <option value="RBC">Hồng Cầu</option>
              <option value="Plasma">Huyết tương</option>
              <option value="Platelet">Tiểu cầu</option>
            </select>

            <label>Số túi máu:</label>
            <input
              type="number"
              name="quantity"
              min={1}
              max={3}
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="Nhập số lượng túi"
            />

            <label>Tên bệnh viện:</label>
            <select
              name="hospital"
              value={formData.hospital}
              onChange={handleInputChange}
            >
              <option value="">-- Chọn bệnh viện --</option>
              {hospitals.map((h) => (
                <option key={h.hospitalId} value={h.hospitalId}>
                  {h.hospitalName}
                </option>
              ))}
            </select>

            <div className="form-buttons">
              <button onClick={handleSubmit}>Gửi yêu cầu</button>
              <button onClick={closeForm} className="cancel">
                Hủy bỏ
              </button>
            </div>
          </div>
        </div>
      )}

      {showAlert && <div className="custom-alert">{alertMessage}</div>}
    </div>
  );
}
