// Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, CircularProgress, Box, Divider } from "@mui/material";
import { FaUserPlus, FaTint, FaUsers, FaHeartbeat } from "react-icons/fa";
import { MdEventAvailable, MdEventNote, MdEmergency } from "react-icons/md";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!token) return;
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setData(res.data);
      } catch (err) {
        console.error("Lỗi gọi API dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box className="loading-container">
        <CircularProgress />
        <Typography className="loading-text">Đang tải dữ liệu...</Typography>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box className="error-container">
        <Typography color="error" className="error-text">
          Không thể tải dashboard.
        </Typography>
      </Box>
    );
  }

  const summary = [
    {
      title: "Người hiến máu",
      value: data.totalDonors,
      icon: <FaTint className="icon red" />,
    },
    {
      title: "Người nhận máu",
      value: data.totalRecipients,
      icon: <FaUsers className="icon blue" />,
    },
    {
      title: "Người dùng mới",
      value: data.newUsersThisMonth,
      icon: <FaUserPlus className="icon green" />,
    },
    {
      title: "Lượt hiến máu",
      value: data.donationsThisMonth,
      icon: <FaHeartbeat className="icon pink" />,
    },
    {
      title: "Hẹn hôm nay",
      value: data.appointmentsToday,
      icon: <MdEventAvailable className="icon gold" />,
    },
    {
      title: "Hẹn trong tuần",
      value: data.appointmentsThisWeek,
      icon: <MdEventNote className="icon purple" />,
    },
    {
      title: "Yêu cầu khẩn cấp",
      value: data.pendingEmergencyRequests,
      icon: <MdEmergency className="icon orange" />,
    },
    {
      title: "Đã ghép thành công",
      value: data.matchedEmergencyRequests,
      icon: <MdEmergency className="icon green" />,
    },
  ];

  const bloodByType = Object.entries(data.bloodInventoryByType).map(
    ([key, value]) => ({
      name: key,
      value,
    })
  );

  const componentColors = ["#00BFFF", "#FFD700", "#DC143C", "#8A2BE2"];
  const vietnameseNameMap = {
    Whole: "Máu toàn phần",
    RBC: "Hồng cầu",
    Platelet: "Tiểu cầu",
    Plasma: "Huyết tương",
  };

  const bloodByComponent = Object.entries(data.bloodInventoryByComponent).map(
    ([key, value], i) => ({
      name: vietnameseNameMap[key] || key,
      value,
      color: componentColors[i % componentColors.length],
    })
  );

  return (
    <Box className="admin-dashboard">
      <Typography variant="h4" className="dashboard-title">
        DashBoard
      </Typography>

      <section className="dashboard-summary">
        {summary.map((item, index) => (
          <div key={index} className="summary-card">
            {item.icon}
            <div>
              <div className="summary-value">{item.value}</div>
              <div className="summary-title">{item.title}</div>
            </div>
          </div>
        ))}
      </section>

      <Divider className="section-divider" />

      <section className="dashboard-charts">
        <div className="chart-card">
          <div className="chart-title">Tồn kho theo nhóm máu</div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bloodByType}>
              <XAxis
                dataKey="name"
                label={{ value: "Nhóm máu", position: "insideBottom", dy: 10 }}
              />
              <YAxis
                label={{ value: "Đơn vị", angle: -90, position: "insideLeft" }}
              />
              <Tooltip />
              <Bar dataKey="value" fill="#EF4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-title">Tồn kho theo thành phần máu</div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={bloodByComponent}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={40}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {bloodByComponent.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>
    </Box>
  );
}
