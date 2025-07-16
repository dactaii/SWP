import React from "react";
// Dùng dể tạo nút bật/tắt chat
const ChatToggleButton = ({ onClick }) => {
    return (
        <button className="chat-toggle-button" onClick={onClick}>
            <img
                src="https://cbx-prod.b-cdn.net/COLOURBOX54853075.jpg?height=800&quality=70&width=800"
                alt="Chat"
            />
        </button>
    );
};

export default ChatToggleButton;
