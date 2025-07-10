import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar.js";
import ChatWindow from "./components/ChatWindow.js";
import LoginPage from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import VerifyOtpPage from "./pages/VerifyOtp.js";
import LandingPage from "./pages/LandingPage.js";
import "./index.css";

function App() {
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
                <Route
                    path="/"
                    element={
                        <div className="app-layout">
                            <Sidebar user={user} />
                            <div className="main-content">
                                <LandingPage user={user} />
                            </div>
                        </div>
                    }
                />
                <Route
                    path="/chat/:roomId"
                    element={
                        <div className="app-layout">
                            <Sidebar user={user} />
                            <div className="main-content">
                                <ChatWindow user={user} />
                            </div>
                        </div>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
