import React, { createContext, useContext, useState } from "react";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    title: "",
    message: "",
    type: "", // "success" | "error"
  });

  const showAlert = (title, message, type = "success") => {
    setAlert({ title, message, type });

    // Tự ẩn sau 4 giây
    setTimeout(() => {
      setAlert({ title: "", message: "", type: "" });
    }, 4000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert.message && (
        <div className={`custom-alert ${alert.type}`}>
          <h4>{alert.title}</h4>
          <p>{alert.message}</p>
        </div>
      )}
    </AlertContext.Provider>
  );
};
