import React, { useState } from "react";
import { FaUser, FaPlus, FaHome } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import "./styles/Sidebar.css";

import JoinRoomModal from "../pages/JoinRoomModal";
import CreateRoomModal from "../pages/CreateRoomModal";
import { useAuth } from "../contexts/AuthContext";
import { useRooms } from "../contexts/RoomContext";
import RoomsInfoModal from "../pages/RoomsInfoModal";
import api from "../api/axios";

export const Sidebar = () => {
    const { user } = useAuth();
    const { rooms, loading, refreshRooms } = useRooms();

    const navigate = useNavigate();
    const { roomId: activeRoomId } = useParams();

    const [showJoinRoomModal, setShowJoinRoomModal] = useState(false);
    const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
    const [showRoomInfoModal, setShowRoomInfoModal] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);

    const handleOnDeleteRoomSubmit = async (roomId) => {
        try {
            await api.post(`/room/remove/${roomId}`);
            await refreshRooms();
        } catch (e) {
            alert(e.message);
        }
    };

    const handleOnCreateRoomSubmit = async (roomData) => {
        try {
            const response = await api.post("/room/create", roomData);
            console.log("ROOM CREATED" + JSON.stringify(response.data))
            if (response.data.success) {
                navigate(`/chat/${response.data.room._id}`);
                 await refreshRooms();
            }
        } catch (e) {
            alert(e.message);
        }
    };


    const handleRoomClick = (room) => {
        navigate(`/chat/${room._id}`);
        setMobileOpen(false);
    };

    const toggleAccountMenu = () => {
        setShowAccountMenu((prev) => !prev);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
        window.location.reload();
    };

    return (
        <>
            <div className="sidebar-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
                ☰
            </div>

            <div className={`sidebar ${mobileOpen ? "open" : ""}`}>
                <div className="home-icon" onClick={() => navigate("/")} title="Home">
                    <FaHome size={24} />
                </div>

                <ul className="room-list">
                    {loading ? (
                        <li>Loading...</li>
                    ) : (
                        rooms.map((room) => (
                            <li
                                key={room._id}
                                className={`room-icon ${activeRoomId === room._id ? "active" : ""}`}
                                onClick={() => handleRoomClick(room)}
                                title={room.name}
                            >
                                {room.short || room.name.slice(0, 2).toUpperCase()}
                            </li>
                        ))
                    )}

                    <li
                        className="room-icon create-room-btn"
                        onClick={() => setShowCreateRoomModal(true)}
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
                    onCreate={handleOnCreateRoomSubmit}
                    onSwitchToJoin={() => {
                        setShowCreateRoomModal(false);
                        setShowJoinRoomModal(true);
                    }}
                />

                <RoomsInfoModal
                    isOpen={showRoomInfoModal}
                    onClose={() => setShowRoomInfoModal(false)}
                    rooms={rooms}
                    onJoin={(room) => {
                        navigate(`/chat/${room._id}`);
                        setShowRoomInfoModal(false);
                    }}
                    onSwitchToJoin={() => {
                        setShowRoomInfoModal(false);
                        setShowJoinRoomModal(true);
                    }}
                    onDelete={handleOnDeleteRoomSubmit}
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
                                    <button className="account-btn" onClick={() => setShowRoomInfoModal(true)}>
                                        Manage Rooms
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
