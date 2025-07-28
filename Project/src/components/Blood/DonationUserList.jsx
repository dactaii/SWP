import React, { useEffect, useState } from "react";
import axios from "axios";
import tableBG from "../../assets/img/backgrounds/tableBG.png";
import usePagination from "../Pagination/usePagination";
import Pagination from "../Pagination/Pagination";
const DonationUserList = () => {
  const [donationList, setDonationList] = useState([]);
  const { currentPage, totalPages, paginatedItems, goToPage } = usePagination(
    donationList,
    13
  );
  const mapRecoveryStatusToVietnamese = (status) => {
  switch (status) {
    case "Recovered":
      return "Đã phục hồi";
    case "Recovering":
      return "Đang phục hồi";
    default:
      return "Không rõ";
  }
};


  const fetchDonations = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(
        "http://localhost:8080/api/profile/history/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const body = res.data?.data;
      if (Array.isArray(body)) {
        setDonationList(body);
      } else {
        console.error("Lỗi: `data` không phải mảng", body);
        setDonationList([]);
      }
    } catch (err) {
      console.error("Không thể lấy danh sách người hiến:", err);
      setDonationList([]);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="donation-history-container">
      <h2>Danh sách người hiến máu</h2>
      <table
        className="donation-history-table donation-bg"
        style={{ "--donation-bg": `url(${tableBG})` }}
      >
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên người hiến</th>
            <th>Ngày hiến</th>
            <th>Nhóm máu</th>
            <th>Trạng thái phục hồi</th>
            <th>Ngày phục hồi</th>
          </tr>
        </thead>
        <tbody>
          {paginatedItems.length > 0 ? (
            paginatedItems.map((item, index) => (
              <tr key={item.historyId}>
                <td>{(currentPage - 1) * 10 + index + 1}</td> 
                <td>{item.userName}</td>
                <td>{formatDate(item.donationDate)}</td>
                <td>{item.bloodType}</td>
                <td>{mapRecoveryStatusToVietnamese(item.recoveryStatus)}</td>
                <td>{formatDate(item.recoveryTime)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      )}
    </div>
  );
};

export default DonationUserList;
