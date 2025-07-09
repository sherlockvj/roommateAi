import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar.js";
import ChatWindow from "./components/ChatWindow.js";
import LoginPage from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import VerifyOtpPage from "./pages/VerifyOtp.js";
import "./index.css";
import LandingPage from "./pages/LandingPage.js";

function App() {
    const [activeRoom, setActiveRoom] = useState(null);
    const [user, setUser] = useState(null);
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

    return (
        <Router>
            <Routes>
                {/* Auth Pages */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/verify-otp" element={<VerifyOtpPage />} />

                {/* Main App Layout */}
                <Route path="/" element={
                    <div className="app-layout">
                        <Sidebar
                            user={user}
                            activeRoomId={activeRoom?.id}
                            onRoomSelect={(room) => {
                                console.log("Room selected:", room);
                                setActiveRoom(room);
                            }}
                        />
                        <div className="main-content">
                            <LandingPage user={user} />
                        </div>
                    </div>} />
                <Route
                    path="/chat"
                    element={
                        <div className="app-layout">
                            <Sidebar
                                user={user}
                                activeRoomId={activeRoom?.id}
                                onRoomSelect={(room) => {
                                    console.log("Room selected:", room);
                                    setActiveRoom(room);
                                }}
                            />
                            <div className="main-content">
                                <ChatWindow room={activeRoom} />
                            </div>
                        </div>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
