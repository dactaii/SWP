import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const UserMap = () => {
  const [position, setPosition] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const lat = parseFloat(localStorage.getItem("user_lat"));
    const lng = parseFloat(localStorage.getItem("user_lng"));
    if (!isNaN(lat) && !isNaN(lng)) {
      setPosition([lat, lng]);
    }
    setReady(true); 
  }, []);

  if (!ready) return null; 
  if (!position) {
    return <p>Không tìm thấy vị trí người dùng. Vui lòng cho phép định vị trước.</p>;
  }

  return (
    <MapContainer
      center={position}
      zoom={15}
      scrollWheelZoom={true}
      style={{ height: "400px", width: "100%", marginBottom: "1rem" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>Bạn đang ở đây</Popup>
      </Marker>
    </MapContainer>
  );
};

export default UserMap;
