import React from "react";
import Sidebar from "../components/layouts/Sidebar";
import Footer from "../components/layouts/Footer";

const UserLayout = ({ children }) => {
  return (
    <div>
      <Sidebar />
      <div
        style={{
          marginLeft: "300px",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh"
        }}
      >
        <main style={{ flex: 1, padding: "20px" }}>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default UserLayout;
