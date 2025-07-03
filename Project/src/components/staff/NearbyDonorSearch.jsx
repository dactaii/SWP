import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/css/components/staff/NearbyDonorSearch.css";

const NearbyDonorSearch = () => {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospitalId, setSelectedHospitalId] = useState("");
  const [donors, setDonors] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [loading, setLoading] = useState(false);

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
        setDonors([]); // để tránh .map lỗi
      }
    } catch (error) {
      console.error("Lỗi khi tìm kiếm người hiến máu:", error);
      setDonors([]);
    } finally {
      setLoading(false);
    }
  };

  const hospitalName = localStorage.getItem("selectedHospitalName");

  return (
    <div className="main-content">
      <h1>Người hiến máu gần bạn</h1>

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

      <div className="table-wrapper">
        <table className="blood-table">
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
                          <button className="nds-contact-btn">Liên hệ</button>
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
  );
};

export default NearbyDonorSearch;
