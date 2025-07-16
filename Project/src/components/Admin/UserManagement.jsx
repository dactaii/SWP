import React, { useEffect, useState } from "react";
import axios from "axios";


export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newRole, setNewRole] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const res = await axios.get("http://localhost:8080/api/profile/all", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers(res.data.data.body);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách user:", error);
        }
    };

    const handleOpenPopup = (user) => {
        setSelectedUser(user);
        setNewRole(user.roleName);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setSelectedUser(null);
        setNewRole("");
        setShowPopup(false);
    };

    const handleChangeRole = async () => {
        if (!newRole || !selectedUser) return;

        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            await axios.post(
                "http://localhost:8080/api/profile/edit-role",
                {
                    userId: selectedUser.userId,
                    roleName: newRole,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const updatedUsers = users.map((user) =>
                user.userId === selectedUser.userId
                    ? { ...user, roleName: newRole }
                    : user
            );
            setUsers(updatedUsers);

            setAlertMessage("Cập nhật vai trò thành công!");
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 4000);
            handleClosePopup();
        } catch (error) {
            const msg = error.response?.data || "Lỗi khi cập nhật vai trò.";
            setAlertMessage(msg);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 4000);
        }
    };

    const handleSoftDelete = async (userId) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            await axios.delete(`http://localhost:8080/api/profile/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const updatedUsers = users.map((user) =>
                user.userId === userId ? { ...user, status: "DELETED" } : user
            );
            setUsers(updatedUsers);

            setAlertMessage("Đã vô hiệu hóa tài khoản thành công!");
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 4000);
        } catch (error) {
            console.error("Lỗi khi xóa tài khoản:", error);
        }
    };

    return (
        <div className="schedule-management">
            <h2>Quản lý tài khoản</h2>
            <div className="table-wrapper">
                <table className="schedule-table">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Họ và Tên</th>
                            <th>Mail</th>
                            <th>SĐT</th>
                            <th>Vai Trò</th>
                            <th>Trạng Thái</th>
                            <th>Tùy Chỉnh</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.userId}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phoneNumber}</td>
                                <td>{user.roleName}</td>
                                <td>{user.status}</td>
                                <td>
                                    <div className="action-buttons-group">
                                        <button
                                            className="nds-action-btn"
                                            onClick={() => handleOpenPopup(user)}
                                        >
                                            Chỉnh sửa
                                        </button>
                                        {user.status !== "DELETED" && (
                                            <button
                                                className="nds-contact-btn"
                                                onClick={() => handleSoftDelete(user.userId)}
                                            >
                                                Vô hiệu hóa
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showPopup && (
                <div className="overlay">
                    <div className="contact-form">
                        <h3>Chỉnh sửa vai trò</h3>
                        <p>
                            Người dùng: <strong>{selectedUser?.name}</strong>
                        </p>
                        <label>Chọn vai trò mới:</label>
                        <select value={newRole} onChange={(e) => setNewRole(e.target.value)}>
                            <option value="">-- Chọn vai trò --</option>
                            <option value="ROLE_MEMBER">ROLE_MEMBER</option>
                            <option value="ROLE_STAFF">ROLE_STAFF</option>
                            <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                        </select>

                        <div className="form-buttons">
                            <button onClick={handleChangeRole}>Lưu</button>
                            <button onClick={handleClosePopup} className="cancel">
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showAlert && <div className="custom-alert">{alertMessage}</div>}
        </div>
    );
}
