// src/components/Sidebar.js
import React, { useState } from "react";
import "./Sidebar.css";

const rooms = [
    { id: "1", name: "Study Room", short: "SR" },
    { id: "2", name: "Doubt Chat", short: "DC" },
    { id: "3", name: "AI Help", short: "AI" },
];

export const Sidebar = ({ onRoomSelect, activeRoomId }) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleRoomClick = (room) => {
        onRoomSelect(room);
        setMobileOpen(false);
    };

    return (
        <>
            <div className="sidebar-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
                ☰
            </div>

            <div className={`sidebar ${mobileOpen ? "open" : ""}`}>
                <div className="logo">🧠</div>
                <ul className="room-list">
                    {rooms.map((room) => (
                        <li
                            key={room.id}
                            className={`room-icon ${activeRoomId === room.id ? "active" : ""}`}
                            onClick={() => handleRoomClick(room)}
                            title={room.name}
                        >
                            {room.short}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};