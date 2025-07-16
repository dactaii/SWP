import React from "react";
import LoginForm from "./LoginForm";

const LoginModal = ({ onClose }) => {
  return (
    <div className="login-modal-overlay">
      <div className="login-modal-content">
        <LoginForm onClose={onClose} />
      </div>
    </div>
  );
};

export default LoginModal;
