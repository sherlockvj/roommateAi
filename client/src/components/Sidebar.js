import React, { useEffect, useState } from "react";
import { FaUser, FaPlus } from "react-icons/fa"
import "./styles/Sidebar.css";
import { useNavigate } from "react-router-dom";
import JoinRoomModal from "../pages/JoinRoomModal";
import CreateRoomModal from "../pages/CreateRoomModal";

const rooms = [
    { id: "1", name: "Study Room", short: "SR" },
    { id: "2", name: "Doubt Chat", short: "DC" },
    { id: "3", name: "AI Help", short: "AI" }
];

export const Sidebar = ({ onRoomSelect, activeRoomId }) => {

    const [user, setUser] = useState(null);
    const [showJoinRoomModal, setShowJoinRoomModal] = useState(false);
    const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split(".")[1]));
                setUser({ id: payload.id, name: payload.name || payload.email });
            } catch (err) {
                console.error("Invalid token");
                setUser(null);
            }
        }
    }, []);

    const [mobileOpen, setMobileOpen] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const navigate = useNavigate();

    const handleRoomClick = (room) => {
        onRoomSelect(room);
        setMobileOpen(false);
    };

    const toggleAccountMenu = () => {
        setShowAccountMenu((prev) => !prev);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
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

                    <li
                        className="room-icon create-room-btn"
                        onClick={() => {
                            setShowCreateRoomModal(true)
                        }}
                        title="Create New Room"
                    >
                        <FaPlus size={16} />
                    </li>
                </ul>

                <JoinRoomModal
                    isOpen={showJoinRoomModal}
                    onClose={() => setShowJoinRoomModal(false)}
                    onJoin={(roomId) => {
                        navigate(`/chat/${roomId}`);
                        setShowJoinRoomModal(false);
                    }}
                />

                <CreateRoomModal
                    isOpen={showCreateRoomModal}
                    onClose={() => setShowCreateRoomModal(false)}
                    onCreate={(roomData) => {
                        console.log("Room created:", roomData);
                    }}
                    onSwitchToJoin={() => {
                        setShowCreateRoomModal(false);
                        setShowJoinRoomModal(true);
                    }}
                />

                <div className="account-section">
                    <div className="account-icon" onClick={toggleAccountMenu} title="Account">
                        <FaUser size={20} />
                    </div>

                    {showAccountMenu && (
                        <div className="account-popup">
                            {user ? (
                                <>
                                    <div className="account-name">{user.name || "Guest"}</div>
                                    <button className="account-btn" onClick={() => navigate("/account")}>
                                        Settings / Account
                                    </button>
                                    <button className="account-btn logout" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button className="account-btn" onClick={() => navigate("/login")}>
                                        Login
                                    </button>
                                    <button className="account-btn" onClick={() => navigate("/register")}>
                                        Register
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};