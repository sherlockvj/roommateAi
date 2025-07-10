import React from "react";
import { Routes, Route } from "react-router-dom";

import { Sidebar } from "./components/Sidebar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VerifyOtpPage from "./pages/VerifyOtp";
import LandingPage from "./pages/LandingPage";

import "./index.css";
import ProtectedChatRoute from "./components/ProtectedChatRoute";
import PublicOnlyRoute from "./components/PublicOnlyRoute";

function App() {
    return (
        <Routes>
            {/* Auth Pages */}
            <Route path="/login" element={
                <PublicOnlyRoute>
                    <div className="app-layout">
                        <Sidebar />
                        <div className="main-content">
                            <LoginPage />
                        </div>
                    </div>
                </PublicOnlyRoute>
            } />
            <Route path="/register" element={
                <PublicOnlyRoute>
                    <div className="app-layout">
                        <Sidebar />
                        <div className="main-content">
                            <RegisterPage />
                        </div>
                    </div>
                </PublicOnlyRoute>
            } />
            <Route path="/verify-otp" element={
                <PublicOnlyRoute>
                    <VerifyOtpPage />
                </PublicOnlyRoute>
            } />


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
