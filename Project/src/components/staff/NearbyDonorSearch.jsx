import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/css/components/staff/NearbyDonorSearch.css";
import { useAlert } from "../../layouts/AlertContext";
import tableBG from "../../assets/img/backgrounds/tableBG.png";

const NearbyDonorSearch = () => {
  const { showAlert } = useAlert();
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospitalId, setSelectedHospitalId] = useState("");
  const [donors, setDonors] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const getCurrentDate = () => {
    return new Date().toISOString().slice(0, 10);
  };

  const [formData, setFormData] = useState({
    componentType: "",
    quantity: "",
    hospital: "",
    neededDate: "",
    neededTime: "",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:8080/api/hospitals", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setHospitals(res.data || []))
      .catch((err) => console.error("Lỗi tải danh sách bệnh viện:", err));
  }, []);

  const fetchNearbyDonors = async () => {
    const token = localStorage.getItem("token");

    if (!token || !selectedHospitalId) {
      alert("Thiếu token hoặc cơ sở y tế.");
      return;
    }

    setLoading(true);

    try {
      const selectedHospital = hospitals.find(
        (h) => h.hospitalId.toString() === selectedHospitalId
      );

      if (selectedHospital) {
        localStorage.setItem(
          "selectedHospitalName",
          selectedHospital.hospitalName
        );
      }

      const response = await axios.get(
        `http://localhost:8080/api/search/hospital-nearby?hospitalId=${selectedHospitalId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = response.data;

      if (Array.isArray(result)) {
        setDonors(result);
      } else {
        console.warn("API không trả về mảng, thông báo:", result);
        setDonors([]);
      }
    } catch (error) {
      console.error("Lỗi khi tìm kiếm người hiến máu:", error);
      setDonors([]);
    } finally {
      setLoading(false);
    }
  };

  const openContactForm = (user) => {
    setSelectedUser(user);
    setFormData((prev) => ({
      ...prev,
      hospital: selectedHospitalId || "",
    }));
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedUser(null);
    setFormData({
      componentType: "",
      quantity: "",
      hospital: "",
      neededDate: "",
      neededTime: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (
      !formData.componentType ||
      !formData.quantity ||
      !formData.hospital ||
      !formData.neededDate ||
      !formData.neededTime
    ) {
      showAlert(
        "Warning",
        "Vui lòng điền đầy đủ thông tin trước khi gửi yêu cầu."
      );
      return;
    }

    setLoading(true);
    const donorId = selectedUser?.userId;
    const payload = {
      componentType: formData.componentType,
      quantity: formData.quantity,
      hospitalId: formData.hospital,
      neededTime: `${formData.neededDate}T${formData.neededTime}:00`,
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

  const hospitalName = localStorage.getItem("selectedHospitalName");

  return (
    <div className="nearby-donor-search">
      <h1>Người hiến máu gần cơ sở</h1>

      <div className="form-group">
        <label htmlFor="hospital-select">Chọn cơ sở y tế:</label>
        <select
          id="hospital-select"
          className="nds-select"
          value={selectedHospitalId}
          onChange={(e) => setSelectedHospitalId(e.target.value)}
        >
          <option value="">-- Chọn bệnh viện --</option>
          {hospitals.map((h) => (
            <option key={h.hospitalId} value={h.hospitalId}>
              {h.hospitalName}
            </option>
          ))}
        </select>
      </div>

      <button className="nds-search-btn" onClick={fetchNearbyDonors}>
        Tìm người hiến máu
      </button>

      {hospitalName && donors.length > 0 && (
        <h2 className="nds-subtitle">
          Danh sách người hiến máu gần{" "}
          <span className="text-highlight">{hospitalName}</span>
        </h2>
      )}

      <div className="nearby-donor-search-table ">
        <div
          className="nearby-bg-wrapper"
          style={{ "--donation-bg": `url(${tableBG})` }}
        >
        <table className="nearby-blood-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Họ Và Tên</th>
              <th>Nhóm Máu</th>
              <th>Địa Chỉ</th>
              <th>Số Điện Thoại</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor, index) => (
              <React.Fragment key={donor.userId}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{donor.name}</td>
                  <td>{donor.bloodType}</td>
                  <td>{donor.address}</td>
                  <td>{donor.phoneNumber}</td>
                  <td>
                    <button
                      className="nds-action-btn"
                      onClick={() =>
                        setExpandedRow(
                          expandedRow === donor.userId ? null : donor.userId
                        )
                      }
                    >
                      {expandedRow === donor.userId ? "Đóng" : "Xem chi tiết"}
                    </button>
                  </td>
                </tr>
                {expandedRow === donor.userId && (
                  <tr className="nds-detail-row">
                    <td colSpan="6">
                      <div className="nds-detail-card">
                        <div className="nds-detail-grid">
                          <div>
                            <strong>Họ và tên:</strong> {donor.name}
                          </div>
                          <div>
                            <strong>Ngày sinh:</strong> {donor.yearOfBirth}
                          </div>
                          <div>
                            <strong>Giới tính:</strong>{" "}
                            {donor.gender === "Male"
                              ? "Nam"
                              : donor.gender === "Female"
                              ? "Nữ"
                              : "Khác"}
                          </div>
                          <div>
                            <strong>Nhóm máu:</strong> {donor.bloodType}
                          </div>
                          <div>
                            <strong>Email:</strong> {donor.email}
                          </div>
                          <div>
                            <strong>Số điện thoại:</strong> {donor.phoneNumber}
                          </div>
                          <div className="nds-detail-full">
                            <strong>Địa chỉ:</strong> {donor.address}
                          </div>
                          <div className="nds-detail-full">
                            <strong>Thời gian sẵn sàng hiến máu:</strong>{" "}
                            {new Date(donor.readyTime).toLocaleString()}
                          </div>
                        </div>
                        <div className="nds-detail-actions">
                          <button
                            className="nds-contact-btn"
                            onClick={() => openContactForm(donor)}
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
            {!loading && donors.length === 0 && hospitalName && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  Không tìm thấy người hiến máu phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
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

            <label>Hẹn lịch hiến máu:</label>
            <input
              type="date"
              name="neededDate"
              value={formData.neededDate}
              min={getCurrentDate()}
              onChange={handleInputChange}
            />

            <div className="time-buttons">
              {["07:30", "09:30", "14:00", "15:00"].map((time) => (
                <button
                  type="button"
                  key={time}
                  className={formData.neededTime === time ? "active-time" : ""}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, neededTime: time }))
                  }
                >
                  {time}
                </button>
              ))}
            </div>

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
};

export default NearbyDonorSearch;
