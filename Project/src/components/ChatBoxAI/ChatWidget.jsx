import React, { useState } from "react";
import ChatToggleButton from "./ChatToggleButton";
import { FiSend } from "react-icons/fi"; // icon gửi
import { BiReply } from "react-icons/bi"; // icon reply


const ChatWidget = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { from: "bot", text: "Xin chào Anh/Chị! Em là trợ lý AI của hệ thống." },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false); // trạng thái loading

    const handleSend = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { from: "user", text: input }];
        setMessages(newMessages);
        setInput("");
        setLoading(true); // <-- THÊM DÒNG NÀY

        try {
            const response = await fetch("http://localhost:8080/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: input }),
            });

            if (!response.ok) throw new Error("Lỗi kết nối đến máy chủ AI.");

            const data = await response.json();
            setMessages([...newMessages, { from: "bot", text: data.reply }]);
        } catch (error) {
            console.error("Lỗi:", error);
            setMessages([
                ...newMessages,
                { from: "bot", text: "⚠️ Không thể kết nối tới máy chủ." },
            ]);
        } finally {
            setLoading(false); 
        }
    };



    return (
        <>
            <ChatToggleButton onClick={() => setOpen(!open)} />
            <div className={`chat-box ${open ? "show" : ""}`}>
                <div className="chat-header">
                    <img
                        src="https://cbx-prod.b-cdn.net/COLOURBOX54853075.jpg?height=800&quality=70&width=800"
                        alt="logo"
                    />
                    <span>Trợ lý AI</span>
                    <button onClick={() => setOpen(false)} className="close-button" title="Đóng trợ lý">
                        <span className="close-icon" />
                    </button>

                </div>

                <div className="chat-body">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`chat-message-container ${msg.from}`}>
                            {msg.from === "bot" && (
                                <img
                                    src="https://cbx-prod.b-cdn.net/COLOURBOX54853075.jpg?height=800&quality=70&width=800"
                                    alt="Bot Avatar"
                                    className="chat-avatar"
                                />
                            )}
                            <div className={`chat-message ${msg.from}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="chat-message bot typing-indicator">
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </div>
                    )}
                </div>


                <div className="chat-input-wrapper">
                    <div className="chat-input-inner">


                        <textarea
                            className="chat-textarea"
                            placeholder="Nhập tin nhắn..."
                            rows="1"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                        />

                        <button
                            type="button"
                            className={`send-button ${input.trim() ? "active" : ""}`}
                            onClick={handleSend}
                        >
                            <FiSend size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );

};

export default ChatWidget;
