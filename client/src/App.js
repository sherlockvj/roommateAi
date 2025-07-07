import React, { useState } from "react";
import { Sidebar } from "./components/Sidebar.js";
import ChatWindow from "./components/ChatWindow.js";
import "./index.css";



function App() {
    const [activeRoom, setActiveRoom] = useState(null);

    return (
        <div className="app-layout">
            <Sidebar
                activeRoomId={activeRoom?.id}
                onRoomSelect={(room) => {
                    console.log("Room selected:", room);
                    setActiveRoom(room);
                }}
            />
            <ChatWindow room={activeRoom} />
        </div>
    );
}

export default App;
