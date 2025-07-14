import React, { useEffect, useState } from "react";
import axios from "axios";


const DonationUserList = () => {
    const [donationList, setDonationList] = useState([]);

    const fetchDonations = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;
            const res = await axios.get("http://localhost:8080/api/profile/history/all", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDonationList(res.data);
        } catch (err) {
            console.error("Không thể lấy danh sách người hiến:", err);
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
            <table className="donation-history-table">
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
                    {donationList.map((item, index) => (
                        <tr key={item.historyId}>
                            <td>{index + 1}</td>
                            <td>{item.userName}</td> {/* <-- Dùng userName từ API */}
                            <td>{formatDate(item.donationDate)}</td>
                            <td>{item.bloodType}</td>
                            <td>{item.recoveryStatus}</td>
                            <td>{formatDate(item.recoveryTime)}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
};

export default DonationUserList;
