import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useNotification } from "../contexts/NotificationContext";

const RegisterPage = () => {
    const navigate = useNavigate();

    const { showNotification } = useNotification();
    const [loading, setLoading] = useState(false);

    const loadingMessages = [
        "Securing your account...",
        "Authenticating your credentials...",
        "Verifying your digital identity...",
        "Waking up your chat assistant...",
        "Fetching your rooms and secrets...",
        "Setting up your dashboard...",
        "Establishing secure connection...",
        "Decrypting token of trust...",
        "Finalizing...",
    ];


    const handleSubmit = async (data) => {
        data = { ...data, "strategy": "email" }
        const password = data.password;

        const isValidPassword = password.length >= 6

        if (!isValidPassword) {
            showNotification("error", "Password must be at least 6 characters");
            return;
        }

        setLoading(true);

        try {
            const res = await api.post("/auth/register", data);
            if (res.status === 200) {
                showNotification("success", "Registered successfully! You can login now.");
                navigate("/login", { state: { email: data.email } });
            }
        } catch (err) {
            showNotification("error", err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <AuthForm
                title="Register"
                onSubmit={handleSubmit}
                loading={loading}
                loadingMessages={loadingMessages}
                fields={[
                    { name: "name", label: "Name", type: "text", placeholder: "John Doe" },
                    { name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
                    { name: "password", label: "Password", type: "password", placeholder: "********" },
                ]}
                footer={
                    <><p><i style={{ "fontSize": "small", "fontWeight": "bolder", "color": "#f92828" }}>For SOM - you can register with dummy email.</i></p>
                        <p>Already have an account? <Link to="/login">Login</Link></p></>}
            />
        </div>
    );
};

export default RegisterPage;
