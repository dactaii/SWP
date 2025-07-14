import React, { useEffect, useState } from "react";
import axios from "axios";

const BloodUnit = () => {
  const [bloodUnits, setBloodUnits] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchBloodUnits = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get("http://localhost:8080/api/inventory/all-Inventory", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Dữ liệu API trả về:", response.data);
        setBloodUnits(response.data.data || []);
      } catch (error) {
        console.error("Lỗi khi tải danh sách kho máu:", error);
      }
    };

    fetchBloodUnits();
  }, []);

  const convertComponentType = (type) => {
    switch (type) {
      case "Whole":
        return "Máu toàn phần";
      case "RBC":
        return "Hồng cầu";
      case "Platelet":
        return "Tiểu cầu";
      case "Plasma":
        return "Huyết tương";
      default:
        return type;
    }
  };

  return (
    <div className="main-content">
      <h1>Tra cứu kho máu</h1>

      <div className="table-wrapper">
        <table className="blood-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Nhóm máu</th>
              <th>Thành phần máu</th>
              <th>Tên bệnh viện</th>
              <th>Số lượng</th>
              <th>Ngày hết hạn</th>
            </tr>
          </thead>
          <tbody>
            {bloodUnits.map((unit, index) => (
              <tr key={unit.bloodUnitId}>
                <td>{index + 1}</td>
                <td>{unit.bloodType}</td>
                <td>{convertComponentType(unit.componentType)}</td>
                <td>{unit.name}</td>
                <td>{unit.quantity}</td>
                <td>{unit.expiryDate}</td>
              </tr>
            ))}
            {bloodUnits.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>Không có dữ liệu</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BloodUnit;
