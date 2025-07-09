import React from "react";
import AuthForm from "../components/AuthForm";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

const RegisterPage = () => {
    const navigate = useNavigate();

    const handleSubmit = async (data) => {
        data = { ...data, "strategy": "email" }
        try {
            const res = await api.post("/auth/register", data);
            if (res.status === 200) {
                navigate("/verify-otp", { state: { email: data.email } });
            }
        } catch (err) {
            alert(err.response?.data?.message || "Registration failed");
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
