import React, { useState } from "react";
import { FaUser } from "react-icons/fa"
import "./Sidebar.css";

const rooms = [
    { id: "1", name: "Study Room", short: "SR" },
    { id: "2", name: "Doubt Chat", short: "DC" },
    { id: "3", name: "AI Help", short: "AI" },
];

export const Sidebar = ({ onRoomSelect, activeRoomId, user = { name: "Vishal" } }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);

    const handleRoomClick = (room) => {
        onRoomSelect(room);
        setMobileOpen(false);
    };

    const toggleAccountMenu = () => {
        setShowAccountMenu((prev) => !prev);
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

                <div className="account-section">
                    <div className="account-icon" onClick={toggleAccountMenu} title="Account">
                        <FaUser size={20} />
                    </div>

                    {showAccountMenu && (
                        <div className="account-popup">
                            <div className="account-name">{user?.name || "Guest"}</div>
                            <button className="account-btn">Settings / Account</button>
                            <button className="account-btn logout">Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};