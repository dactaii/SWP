import React, { useEffect, useState } from "react";
import axios from "axios";
import tableBG from "../../assets/img/backgrounds/tableBG.png";
import Pagination from "../Pagination/Pagination.jsx";
import usePagination from "../Pagination/usePagination.js";
import { MdCancel } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { PiWarningCircleFill } from "react-icons/pi";
import { BiSolidDonateBlood } from "react-icons/bi";
import { useAlert } from "../../layouts/AlertContext";

const BloodUnit = () => {
  const [bloodUnits, setBloodUnits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("");
  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [requestQuantity, setRequestQuantity] = useState("");
  const [requestNote, setRequestNote] = useState("");
  const { showAlert } = useAlert();

  const { currentPage, totalPages, paginatedItems, goToPage } = usePagination(
    bloodUnits,
    10
  );

  const bloodOrder = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const componentOrder = ["Whole", "RBC", "Platelet", "Plasma"];

  useEffect(() => {
    fetchAllInventory();
  }, []);

  const fetchAllInventory = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.get(
        "http://localhost:8080/api/inventory/all-Inventory",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBloodUnits(response.data.data || []);
    } catch (error) {
      console.error("Lỗi khi tải toàn bộ kho máu:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchByComponent = async (componentType) => {
    const token = localStorage.getItem("token");
    if (!token) return [];

    try {
      const res = await axios.post(
        "http://localhost:8080/api/inventory/component",
        { componentType },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return res.data.data || [];
    } catch (err) {
      console.error("Lỗi lọc theo thành phần:", err);
      return [];
    }
  };

  const fetchByBloodType = async (bloodType) => {
    const token = localStorage.getItem("token");
    if (!token) return [];

    try {
      const res = await axios.post(
        "http://localhost:8080/api/inventory/blood-unit",
        { bloodType },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return res.data.data || [];
    } catch (err) {
      console.error("Lỗi lọc theo nhóm máu:", err);
      return [];
    }
  };

  const handleFilter = async (componentType, bloodType) => {
    setLoading(true);
    try {
      if (!componentType && !bloodType) {
        await fetchAllInventory();
        return;
      }

      if (componentType && !bloodType) {
        const data = await fetchByComponent(componentType);
        setBloodUnits(data);
      } else if (!componentType && bloodType) {
        const data = await fetchByBloodType(bloodType);
        setBloodUnits(data);
      } else {
        const componentData = await fetchByComponent(componentType);
        const bloodTypeData = await fetchByBloodType(bloodType);
        const intersection = componentData.filter((unit) =>
          bloodTypeData.some((item) => item.inventoryId === unit.inventoryId)
        );
        setBloodUnits(intersection);
      }
    } catch (error) {
      console.error("Lỗi khi lọc:", error);
      setBloodUnits([]);
    } finally {
      setLoading(false);
    }
  };

  const handleComponentChange = (e) => {
    const value = e.target.value;
    setSelectedComponent(value);
    handleFilter(value, selectedBloodType);
  };

  const handleBloodTypeChange = (e) => {
    const value = e.target.value;
    setSelectedBloodType(value);
    handleFilter(selectedComponent, value);
  };

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

  const convertStatus = (status) => {
    const style = {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      fontWeight: 500,
    };
    switch (status) {
      case "IN_STOCK":
        return (
          <span style={{ ...style, color: "#2e7d32" }}>
            <FaCheckCircle /> Sẵn sàng
          </span>
        );
      case "OUT_OF_STOCK":
        return (
          <span style={{ ...style, color: "#d32f2f" }}>
            <MdCancel /> Hết kho
          </span>
        );
      case "EXPIRED":
        return (
          <span style={{ ...style, color: "#f57c00" }}>
            <PiWarningCircleFill /> Hết hạn
          </span>
        );
      case "USED":
        return (
          <span style={{ ...style, color: "#6c757d" }}>
            <BiSolidDonateBlood /> Đã sử dụng
          </span>
        );
      default:
        return status;
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc")
      direction = "desc";
    const sorted = [...bloodUnits].sort((a, b) => {
      let orderList = key === "bloodType" ? bloodOrder : componentOrder;
      const aIndex = orderList.indexOf(a[key]);
      const bIndex = orderList.indexOf(b[key]);
      return direction === "asc" ? aIndex - bIndex : bIndex - aIndex;
    });
    setSortConfig({ key, direction });
    setBloodUnits(sorted);
  };

  const formatDateTime = (date) => {
    const pad = (n) => n.toString().padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate()
    )}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
      date.getSeconds()
    )}`;
  };

  const openRequestPopup = (unit) => {
    setSelectedUnit(unit);
    setShowPopup(true);
    setRequestQuantity("");
    setRequestNote("");
  };

  const handleSubmitRequest = async () => {
    if (!selectedUnit || !requestQuantity || !requestNote) {
      showAlert("Thiếu thông tin", "Vui lòng nhập đầy đủ thông tin.", "error");
      return;
    }

    const quantity = parseInt(requestQuantity);
    if (quantity <= 0) {
      showAlert("Số lượng không hợp lệ", "Số lượng phải lớn hơn 0.", "error");
      return;
    }

    if (quantity > selectedUnit.quantity) {
      showAlert(
        "Vượt quá số lượng",
        `Số lượng yêu cầu vượt quá số lượng trong kho (${selectedUnit.quantity})`,
        "error"
      );
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    const now = new Date();
    const formattedTime = formatDateTime(now);

    const requestData = {
      hospitalId: selectedUnit.hospitalId,
      bloodType: selectedUnit.bloodType,
      componentType: selectedUnit.componentType,
      quantity,
      note: requestNote,
      neededTime: formattedTime,
    };

    try {
      await axios.post(
        "http://localhost:8080/api/emergency-requests",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      showAlert("Thành công", "Xuất kho máu thành công.", "success");

      setShowPopup(false);
      setRequestQuantity("");
      setRequestNote("");
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
      showAlert("Lỗi", "Gửi yêu cầu thất bại.", "error");
    }
  };

  return (
    <div className="BloodUnit">
      <h1>Tra cứu kho máu</h1>
      <div style={{ marginBottom: "20px", display: "flex", gap: "20px" }}>
        <div>
          <label>Thành phần máu: </label>
          <select value={selectedComponent} onChange={handleComponentChange}>
            <option value="">Tất cả</option>
            <option value="Whole">Máu toàn phần</option>
            <option value="RBC">Hồng cầu</option>
            <option value="Platelet">Tiểu cầu</option>
            <option value="Plasma">Huyết tương</option>
          </select>
        </div>
        <div>
          <label>Nhóm máu: </label>
          <select value={selectedBloodType} onChange={handleBloodTypeChange}>
            <option value="">Tất cả</option>
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
      </div>
      <div
        className="bloodunit-table-wrapper has-bg"
        style={{ "--donation-bg": `url(${tableBG})` }}
      >
        {loading ? (
          <p style={{ textAlign: "center" }}>Đang tải dữ liệu...</p>
        ) : (
          <table className="blood-table">
            <thead>
              <tr>
                <th>STT</th>
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSort("bloodType")}
                >
                  Nhóm máu{" "}
                  {sortConfig.key === "bloodType"
                    ? sortConfig.direction === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSort("componentType")}
                >
                  Thành phần máu{" "}
                  {sortConfig.key === "componentType"
                    ? sortConfig.direction === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
                <th>Bệnh viện</th>
                <th>Số lượng</th>
                <th>Ngày hết hạn</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center" }}>
                    Không có dữ liệu phù hợp
                  </td>
                </tr>
              ) : (
                paginatedItems.map((unit, index) => (
                  <tr key={unit.bloodUnitId}>
                    <td>{(currentPage - 1) * 10 + index + 1}</td>
                    <td>{unit.bloodType}</td>
                    <td>{convertComponentType(unit.componentType)}</td>
                    <td>{unit.name}</td>
                    <td>{unit.quantity}</td>
                    <td>{unit.expiryDate}</td>
                    <td>{convertStatus(unit.status)}</td>
                    <td>
                      <button onClick={() => openRequestPopup(unit)}>
                        Xuất kho máu
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      )}
      {showPopup && selectedUnit && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Xuất kho máu</h3>
            <p>
              <strong>Bệnh viện:</strong> {selectedUnit.name}
            </p>
            <p>
              <strong>Nhóm máu:</strong> {selectedUnit.bloodType}
            </p>
            <p>
              <strong>Thành phần:</strong>{" "}
              {convertComponentType(selectedUnit.componentType)}
            </p>
            <label>
              Số lượng:
              <input
                type="number"
                value={requestQuantity}
                onChange={(e) => setRequestQuantity(e.target.value)}
              />
            </label>
            <label>
              Ghi chú:
              <input
                type="text"
                value={requestNote}
                onChange={(e) => setRequestNote(e.target.value)}
              />
            </label>
            <div style={{ marginTop: "10px" }}>
              <button onClick={handleSubmitRequest}>Gửi yêu cầu</button>
              <button
                onClick={() => setShowPopup(false)}
                style={{ marginLeft: "10px" }}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BloodUnit;
