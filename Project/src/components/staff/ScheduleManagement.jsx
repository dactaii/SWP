import React, { useState, useEffect } from "react";
// import axios from "axios";
export default function ScheduleManagement() {
    const [schedules, setSchedules] = useState([]);

    // Lấy danh sách lịch hiến máu
    async function fetchSchedules() {
        // Giả lập gọi API
        const data = [
            { id: 1, user: "Nguyễn Văn A", date: "2025-06-10", status: "Chưa xác nhận" },
            { id: 2, user: "Trần Thị B", date: "2025-06-12", status: "Đã xác nhận" },
        ];
        setSchedules(data);
    }

    // Lấy danh sách lịch hiến máu từ API thật
    // async function fetchSchedules() {
    //     try {
    //         const res = await axios.get("https://your-backend.com/api/schedules");
    //         setSchedules(res.data); // giả sử API trả về mảng các lịch
    //     } catch (error) {
    //         console.error("Lỗi khi tải danh sách lịch:", error);
    //     }
    // }

    // Xác nhận hoặc chỉnh sửa lịch (dummy)
    async function updateSchedule(id, newStatus) {
        alert(`Cập nhật lịch hiến máu #${id} sang trạng thái: ${newStatus} (giả lập)`);
        // Cập nhật state local (demo)
        setSchedules((prev) =>
            prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
        );
    }

    // Cập nhật trạng thái lịch hiến máu
    // async function updateSchedule(id, newStatus) {
    //     try {
    //         await axios.put(`https://your-backend.com/api/schedules/${id}`, {
    //             status: newStatus,
    //         });

    //         // Cập nhật trong state sau khi API thành công
    //         setSchedules((prev) =>
    //             prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    //         );
    //         alert(`Cập nhật lịch hiến máu #${id} thành công.`);
    //     } catch (error) {
    //         console.error("Lỗi khi cập nhật lịch:", error);
    //         alert("Cập nhật thất bại.");
    //     }
    // }

    useEffect(() => {
        fetchSchedules();
    }, []);

    return (
        <div className="schedule-management">
            <h2>Quản lý lịch hiến máu</h2>

            <table className="schedule-table">
                <thead>
                    <tr>
                        <th>Người đăng ký</th>
                        <th>Ngày hiến</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {schedules.map((sch) => (
                        <tr key={sch.id}>
                            <td>{sch.user}</td>
                            <td>{sch.date}</td>
                            <td>{sch.status}</td>
                            <td>
                                {sch.status !== "Đã xác nhận" && (
                                    <button
                                        className="btn"
                                        onClick={() => updateSchedule(sch.id, "Đã xác nhận")}
                                    >
                                        Xác nhận
                                    </button>
                                )}
                                {sch.status === "Đã xác nhận" && (
                                    <button
                                        className="btn btn-cancel"
                                        onClick={() => updateSchedule(sch.id, "Chưa xác nhận")}
                                    >
                                        Hủy xác nhận
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
