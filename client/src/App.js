import React from "react";
import { Routes, Route } from "react-router-dom";

import { Sidebar } from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VerifyOtpPage from "./pages/VerifyOtp";
import LandingPage from "./pages/LandingPage";

import "./index.css";
import ProtectedChatRoute from "./components/ProtectedChatRoute";

function App() {
    return (
        <Routes>
            {/* Auth Pages */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify-otp" element={<VerifyOtpPage />} />

            {/* Landing Page with Sidebar */}
            <Route
                path="/"
                element={
                    <div className="app-layout">
                        <Sidebar />
                        <div className="main-content">
                            <LandingPage />
                        </div>
                    </div>
                }
            />

            <Route
                path="/chat/:roomId"
                element={
                    <div className="app-layout">
                        <Sidebar />
                        <div className="main-content">
                            <ProtectedChatRoute />
                        </div>
                    </div>
                }
            />
        </Routes>
    );
}

export default App;
