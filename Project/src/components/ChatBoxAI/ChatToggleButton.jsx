import React from "react";
import chatai from "../../assets/img/logos/chatai.png";
const ChatToggleButton = ({ onClick }) => {
    return (
        <button className="chat-toggle-button" onClick={onClick}>
            <img
                src={chatai}
                alt="Chat"
            />
        </button>
    );
};

export default ChatToggleButton;
