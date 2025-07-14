import React, { useState } from "react";
import axios from "axios";


const Report = () => {
  const [reportType, setReportType] = useState("ARTICLE_STATISTICS");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [title, setTitle] = useState("");
  const [latestReport, setLatestReport] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const reportTypeMap = {
    ARTICLE_STATISTICS: "Thống kê bài viết",
    APPOINTMENT_STATISTICS: "Thống kê lịch hẹn",
    USER_STATISTICS: "Thống kê người dùng",
    DONATION_HISTORY: "Lịch sử hiến máu",
    EMERGENCY_REQUEST: "Yêu cầu khẩn cấp",
    BLOOD_INVENTORY: "Tồn kho máu",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    const requestData = { reportType, startDate, endDate, title };

    try {
      const res = await axios.post(
        "http://localhost:8080/api/dashboard/report",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setLatestReport(res.data);
      setShowModal(true);
    } catch (err) {
      console.error("Tạo báo cáo thất bại:", err);
    }
  };

  const renderReportData = (report) => {
    const data = JSON.parse(report.data);

    switch (report.reportType) {
      case "ARTICLE_STATISTICS":
        return (
          <>
            <p><strong>Tổng bài viết:</strong> {data.totalArticles}</p>
            <ul>
              {Object.entries(data.articlesByCategory).map(([cat, count]) => (
                <li key={cat}>{cat}: {count}</li>
              ))}
            </ul>
          </>
        );

      case "APPOINTMENT_STATISTICS":
        return (
          <>
            <p><strong>Tổng lịch hẹn:</strong> {data.totalAppointments}</p>
            <ul>
              {Object.entries(data.appointmentsByStatus).map(([status, count]) => (
                <li key={status}>{status}: {count}</li>
              ))}
            </ul>
          </>
        );

      case "USER_STATISTICS":
        return (
          <>
            <p><strong>Tổng người dùng:</strong> {data.totalUsers}</p>
            <h4>Theo vai trò:</h4>
            <ul>
              {Object.entries(data.usersByRole).map(([role, count]) => (
                <li key={role}>{role.replace("ROLE_", "")}: {count}</li>
              ))}
            </ul>
            <h4>Lượt hiến theo người dùng:</h4>
            <table>
              <thead>
                <tr>
                  <th>Người dùng</th>
                  <th>Lượt hiến</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data.donationsByUser).map(([user, count]) => (
                  <tr key={user}>
                    <td>{user}</td>
                    <td>{count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        );

      case "DONATION_HISTORY":
        return (
          <>
            <p><strong>Tổng lượt hiến:</strong> {data.totalDonations}</p>
            <ul>
              {Object.entries(data.donationsByBloodType).map(([type, count]) => (
                <li key={type}>{type}: {count}</li>
              ))}
            </ul>
          </>
        );

      case "EMERGENCY_REQUEST":
        return (
          <>
            <p><strong>Tổng yêu cầu khẩn cấp:</strong> {data.totalRequests}</p>
            <ul>
              {Object.entries(data.emergencyRequests).map(([status, count]) => (
                <li key={status}>{status}: {count}</li>
              ))}
            </ul>
          </>
        );

      case "BLOOD_INVENTORY":
        return (
          <>
            <p><strong>Tổng đơn vị máu:</strong> {data.totalUnits}</p>
            <table>
              <thead>
                <tr>
                  <th>Nhóm máu</th>
                  <th>Số lượng</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data.bloodByType).map(([type, count]) => (
                  <tr key={type}>
                    <td>{type}</td>
                    <td>{count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        );

      default:
        return <p>Không có dữ liệu cho loại báo cáo này.</p>;
    }
  };

  return (
    <div className="report-section">
      <h2>Tạo báo cáo thống kê</h2>

      <form onSubmit={handleSubmit} className="report-form">
        <div>
          <label>Loại báo cáo</label>
          <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
            {Object.entries(reportTypeMap).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Từ ngày</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        </div>

        <div>
          <label>Đến ngày</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        </div>

        <div>
          <label>Tiêu đề báo cáo</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <button type="submit">Tạo báo cáo</button>
      </form>

      {/* Modal hiển thị báo cáo */}
      {showModal && latestReport && (
        <div className="report-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="report-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="report-modal-close" onClick={() => setShowModal(false)}>×</button>
            <h3>{latestReport.title}</h3>
            <hr />
            <p><strong>Loại:</strong> {reportTypeMap[latestReport.reportType]}</p>
            <p><strong>Ngày tạo:</strong> {new Date(latestReport.createdDate).toLocaleString()}</p>
            <div style={{ marginTop: "1rem" }}>
              {renderReportData(latestReport)}
            </div>
            <div style={{ marginTop: "1.5rem" }}>
              <button className="export-button">Xuất báo cáo</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Report;
