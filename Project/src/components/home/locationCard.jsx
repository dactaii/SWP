import React, { useState } from "react";
import { BiMapPin } from "react-icons/bi";

const LocationCard = ({ onClose }) => {
  const [error, setError] = useState("");

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      setError("Trình duyệt không hỗ trợ định vị.");
    }
  };

  const showPosition = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    localStorage.setItem("user_lat", latitude);
    localStorage.setItem("user_lng", longitude);

    console.log("Latitude:", position.coords.latitude);
    console.log("Longitude:", position.coords.longitude);
    setError("");
    onClose();
  };

  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setError("Bạn đã từ chối chia sẻ vị trí.");
        break;
      case error.POSITION_UNAVAILABLE:
        setError("Không thể xác định vị trí.");
        break;
      case error.TIMEOUT:
        setError("Hết thời gian lấy vị trí.");
        break;
      default:
        setError("Lỗi không xác định.");
        break;
    }
    onClose();
  };

  return (
    <div className="lc-overlay">
      <div className="lc-card">
        <div className="lc-content">
          <div className="lc-icon-wrapper">
            <div className="lc-icon drop-bounce">
              <BiMapPin className="icon-pin" />
            </div>
          </div>

          <h5 className="lc-title">
            Chúng tôi muốn truy cập vị trí của bạn để tìm kiếm cơ sở y tế gần
            nhất.
          </h5>
          <div className="lc-buttons">
            <button className="lc-btn lc-accept" onClick={getLocation}>
              Đồng ý
            </button>
            <button
              className="lc-btn lc-decline"
              onClick={() => {
                localStorage.removeItem("user_lat");
                localStorage.removeItem("user_lng");
                onClose();
              }}
            >
              Từ chối
            </button>
          </div>
          {error && <p className="lc-error">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
