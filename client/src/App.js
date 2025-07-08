import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar.js";
import ChatWindow from "./components/ChatWindow.js";
import LoginPage from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import VerifyOtpPage from "./pages/VerifyOtp.js";
import "./index.css";

function App() {
    const [activeRoom, setActiveRoom] = useState(null);

    return (
        <Router>
            <Routes>
                {/* Auth Pages */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/verify-otp" element={<VerifyOtpPage />} />

                {/* Main App Layout */}
                <Route
                    path="/"
                    element={
                        <div className="app-layout">
                            <Sidebar
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
