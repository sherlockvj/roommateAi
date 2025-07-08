import React from "react";
import AuthForm from "../components/AuthForm";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const navigate = useNavigate();

    const handleSubmit = (data) => {
        console.log("Register data:", data);
        navigate("/verify-otp", { state: { email: data.email } });
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
