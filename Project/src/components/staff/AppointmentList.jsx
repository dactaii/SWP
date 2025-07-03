import React, { useEffect, useState } from "react";
import axios from "axios";

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            if (!token) return;
            const res = await axios.get("http://localhost:8080/api/appointment", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAppointments(res.data);
        } catch (error) {
            console.error("Lỗi khi lấy lịch hẹn:", error);
        }
    };

    const handleConfirm = async (id) => {
        try {
            if (!token) return;
            await axios.patch(
                `http://localhost:8080/api/emergency-requests/${id}/status`,
                { status: "Completed" },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchAppointments();


            setAlertMessage("Xác nhận thành công!");
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 5000); // 5s ẩn
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái:", error);


            setAlertMessage("Xác nhận thất bại!");
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 5000);
        }
    };

    return (
        <div className="appointment-container">
            <h2>Danh sách lịch hẹn khẩn cấp</h2>
            <div className="table-wrapper">
            <table className="appointment-table">
                <thead>
                    <tr>
                        <th>Người hiến</th>
                        <th>Nhân viên xác nhận</th>
                        <th>Địa điểm</th>
                        <th>Ngày hẹn</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((item) => (
                        <tr key={item.appointmentId}>
                            <td>{item.donorName}</td>
                            <td>{item.recipientName}</td>
                            <td>{item.location}</td>
                            <td>{item.appointmentDate}</td>
                            <td>{item.status}</td>
                            <td>
                                {item.status !== "Completed" ? (
                                    <button
                                        className="confirm-btn"
                                        onClick={() => handleConfirm(item.appointmentId)}
                                    >
                                        Xác nhận
                                    </button>
                                ) : (
                                    <span className="confirmed-label">Đã hoàn tất</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>       

            {showAlert && (
                <div className="custom-alert">
                    {alertMessage}
                </div>
            )}
        </div>
    );
};

export default AppointmentList;
