import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ScheduleManagement() {
    const [schedules, setSchedules] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({
        componentType: "",
        quantity: "",
        hospital: ""
    });
    const [hospitals, setHospitals] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");




    const fetchSchedules = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;
            const res = await axios.get("http://localhost:8080/api/donor", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setSchedules(res.data);
        } catch (err) {
            console.error(" Không thể lấy danh sách người hiến:", err.response?.status, err.response?.data || err.message);
        }
    };

    const fetchHospitals = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;
            const res = await axios.get("http://localhost:8080/api/hospitals", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(" Danh sách bệnh viện:", res.data);
            setHospitals(res.data);
        } catch (err) {
            console.error(" Lỗi khi lấy danh sách bệnh viện:", err.response?.status, err.response?.data || err.message);
        }
    };

    useEffect(() => {
        fetchSchedules();
        fetchHospitals();
    }, []);

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
            hospital: ""
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // POST gửi yêu cầu cần máu
    const handleSubmit = async () => {
        if (!formData.componentType || !formData.quantity || !formData.hospital) {
            return;
        }
        const donorId = selectedUser?.donorId;
        console.log("🔍 donorId:", donorId);



        const payload = {
            componentType: formData.componentType,
            quantity: formData.quantity,
            hospitalId: formData.hospital
        };

        //  Tìm tên bệnh viện từ ID để console.log
        const selectedHospital = hospitals.find(
            h => h.id === parseInt(formData.hospital)
        );
        console.log(" Bệnh viện đã chọn:", selectedHospital?.hospitalName);
        closeForm();

        try {
            const token = localStorage.getItem("token");
            if (!token) return;
            const res = await axios.post(
                `http://localhost:8080/api/emergency-requests/no-available-blood?donorId=${donorId}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            console.log(" Request success:", res.data);

            setAlertMessage("Đã gửi yêu cầu thành công!");
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 5000); // 3 giây ẩn
        } catch (err) {
            console.error("❌ Lỗi khi gửi yêu cầu:", err.response?.data || err.message);
            setAlertMessage("Gửi thất bại!");
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 5000);

        }
    };

    return (

        <div className="schedule-management">
            <h2>Yêu cầu hỗ trợ máu	</h2>

            <table className="schedule-table" >
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Họ và tên</th>
                        <th>Ngày hiến máu</th>
                        <th>Nhóm máu</th>
                        <th>Liên hệ</th>
                    </tr>
                </thead>
                <tbody>
                    {schedules.map((sch, index) => (
                        <tr key={sch.donorId}>
                            <td>{index + 1}</td>
                            <td>{sch.name}</td>
                            <td>{new Date(sch.readyTime).toLocaleDateString("vi-VN")}</td>
                            <td>{sch.bloodType}</td>
                            <td>
                                <button onClick={() => openContactForm(sch)}>
                                    Liên hệ
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>


            </table>

            {/*Form Popup */}
            {
                showForm && (

                    <div className="overlay">
                        <div className="contact-form">
                            <h3>Liên hệ người hiến	</h3>
                            <p>Người nhận: <strong>{selectedUser?.name}</strong></p>

                            <label>Thành phần máu:</label>
                            <select
                                name="componentType"
                                value={formData.componentType}
                                onChange={handleInputChange}
                            >
                                <option value="">-- Chọn loại thành phần máu --</option>
                                <option value="Whole" >Toàn phần</option>
                                <option value="RBC"  >Hồng Cầu </option>
                                <option value="Plasma"  >Huyết tương</option>
                                <option value="Platelet"  > Tiểu cầu</option>
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
                                {hospitals.map(h => (
                                    <option key={h.hospitalId} value={h.hospitalId}>
                                        {h.hospitalName}
                                    </option>
                                ))}
                            </select>

                            <div className="form-buttons">
                                <button onClick={handleSubmit}>Gửi</button>
                                <button onClick={closeForm} className="cancel">Đóng</button>
                            </div>
                        </div>
                    </div>
                )
            }
            {/* Hiển thị alert ở góc trái dưới */}
            {showAlert && (
                <div className="custom-alert">
                    {alertMessage}
                </div>
            )}
        </div >
    );
}
