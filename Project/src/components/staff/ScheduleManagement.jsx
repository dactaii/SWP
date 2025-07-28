import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/css/components/staff/ScheduleManagement.css";
import { useAlert } from "../../layouts/AlertContext";
import tableBG from "../../assets/img/backgrounds/tableBG.png";
import Pagination from "../Pagination/Pagination.jsx";
import usePagination from "../Pagination/usePagination.js";

export default function ScheduleManagement() {
  const { showAlert } = useAlert();
  const [schedules, setSchedules] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    componentType: "",
    quantity: "",
    hospital: "",
  });
  const [hospitals, setHospitals] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({});
  const { currentPage, totalPages, paginatedItems, goToPage, setCurrentPage } =
    usePagination(schedules, 10);

  useEffect(() => {
    fetchSchedules();
    fetchHospitals();
  }, []);

  const fetchDonorProfile = async (donorId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(
        `http://localhost:8080/api/profile/${donorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const profile = res.data?.data?.body;

      setProfileData((prev) => ({
        ...prev,
        [donorId]: profile,
      }));
    } catch (err) {
      console.error("Lỗi khi lấy profile người hiến:", err);
      showAlert("Error", "Không thể lấy thông tin chi tiết người hiến.");
    }
  };

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

    if (name === "quantity") {
      const numberValue = parseInt(value, 10);

      // Nếu người dùng nhập nhỏ hơn 1 thì ngăn lại
      if (numberValue < 1 || isNaN(numberValue)) {
        setFormData((prev) => ({ ...prev, [name]: 1 }));
        showAlert("Error", "Số lượng túi máu phải lớn hơn hoặc bằng 1");
        return;
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.componentType || !formData.quantity || !formData.hospital)
      return;

    setLoading(true);
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
      console.log("Dữ liệu gửi đi:", payload);
      showAlert("Success", "Đã gửi yêu cầu hỗ trợ thành công!");
    } catch (err) {
      console.error("Lỗi khi gửi yêu cầu:", err);
      showAlert("Error", "Không thể gửi yêu cầu. Vui lòng thử lại!");
    } finally {
      setLoading(false);
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
      <h2>Quản Lý Lịch Hẹn</h2>
      <div
        className="schedule-table-wrapper schedule-bg"
        style={{ "--donation-bg": `url(${tableBG})` }}
      >
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
            {paginatedItems.map((sch, index) => (
              <React.Fragment key={sch.donorId}>
                <tr>
                  <td>{(currentPage - 1) * 10 + index + 1}</td>
                  <td>{sch.name}</td>
                  <td>{formatDateTime(sch.readyTime)}</td>
                  <td>{sch.bloodType}</td>
                  <td>
                    <button
                      onClick={async () => {
                        if (expandedRow === sch.donorId) {
                          setExpandedRow(null);
                        } else {
                          if (!profileData[sch.donorId]) {
                            await fetchDonorProfile(sch.donorId);
                          }
                          setExpandedRow(sch.donorId);
                        }
                      }}
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
                            <strong>Họ và tên:</strong>{" "}
                            {profileData[sch.donorId]?.name || "—"}
                          </div>
                          <div>
                            <strong>Năm sinh:</strong>{" "}
                            {profileData[sch.donorId]?.yearOfBirth?.slice(
                              0,
                              10
                            ) || "—"}
                          </div>
                          <div>
                            <strong>Giới tính:</strong>{" "}
                            {profileData[sch.donorId]?.gender === "Male"
                              ? "Nam"
                              : profileData[sch.donorId]?.gender === "Female"
                              ? "Nữ"
                              : "Khác"}
                          </div>
                          <div>
                            <strong>Nhóm máu:</strong>{" "}
                            {profileData[sch.donorId]?.bloodType || "—"}
                          </div>
                          <div>
                            <strong>Email:</strong>{" "}
                            {profileData[sch.donorId]?.email || "—"}
                          </div>
                          <div>
                            <strong>Số điện thoại:</strong>{" "}
                            {profileData[sch.donorId]?.phoneNumber || "—"}
                          </div>
                          <div className="nds-detail-full">
                            <strong>Địa chỉ:</strong>{" "}
                            {profileData[sch.donorId]?.address || "—"}
                          </div>
                          <div className="nds-detail-full">
                            <strong>Thời gian sẵn sàng hiến máu:</strong>{" "}
                            {formatDateTime(
                              profileData[sch.donorId]?.readyTime
                            )}
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
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      )}

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
              <button onClick={handleSubmit} disabled={loading}>
                Gửi yêu cầu
              </button>
              <button onClick={closeForm} className="cancel">
                Hủy bỏ
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="global-loading-overlay">
          <div className="global-loading-content">
            <div className="global-spinner"></div>
            <p className="loading-text">Đang xử lý...</p>
          </div>
        </div>
      )}
    </div>
  );
}
