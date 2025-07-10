import React from "react";
import AuthForm from "../components/AuthForm";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useNotification } from "../contexts/NotificationContext";

const RegisterPage = () => {
    const navigate = useNavigate();

    const { showNotification } = useNotification();

    const handleSubmit = async (data) => {
        data = { ...data, "strategy": "email" }
        const password = data.password;

        const isValidPassword = password.length >= 6 &&
            /[A-Za-z]/.test(password) &&
            /\d/.test(password);

        if (!isValidPassword) {
            showNotification("error", "Password must be at least 6 characters and contain at least one letter and one number.");
            return;
        }

        try {
            const res = await api.post("/auth/register", data);
            if (res.status === 200) {
                showNotification("success", "Registered successfully! Verify your email.");
                navigate("/verify-otp", { state: { email: data.email } });
            }
        } catch (err) {
            showNotification("error", err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="auth-page">
            <AuthForm
                title="Register"
                onSubmit={handleSubmit}
                fields={[
                    { name: "name", label: "Name", type: "text", placeholder: "John Doe" },
                    { name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
                    { name: "password", label: "Password", type: "password", placeholder: "********" },
                ]}
                footer={<p>Already have an account? <Link to="/login">Login</Link></p>}
            />
        </div>
    );
};

export default RegisterPage;
