import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ChatWidget from "../components/ChatBoxAI/ChatWidget";

const ChatBox = () => {
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const hideChat = location.pathname === "/login";

    return (
        <>
            <Outlet />
            {!hideChat && (
                <ChatWidget open={open} setOpen={setOpen} />
            )}
        </>
    );
};

export default ChatBox;
