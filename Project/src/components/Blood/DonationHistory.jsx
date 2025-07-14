// DonationHistory.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";


export default function DonationHistory() {
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        fetchDonationHistory();
    }, []);

    const fetchDonationHistory = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:8080/api/donor/donors/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDonations([response.data]); // API trả về 1 object, gói vào array để map dễ
        } catch (error) {
            console.error("Lỗi khi lấy lịch sử hiến máu:", error);
        }
    };

    const formatDateTime = (dateStr) => {
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };


    return (
        <div className="schedule-management">
            <h2>Lịch sử hiến máu</h2>
            <div className="table-wrapper">
                <table className="schedule-table">
                    <thead>
                        <tr>
                            <th>Họ và Tên</th>
                            <th>Nhóm máu</th>
                            <th>Ngày hiến</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donations.map((d, index) => (
                            <tr key={index}>
                                <td>{d.name || "Chưa có"}</td>
                                <td>{d.bloodType || "--"}</td>
                                <td>{d.readyTime ? formatDateTime(d.readyTime) : "--"}</td>
                                <td>{d.donationStatus || "--"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
