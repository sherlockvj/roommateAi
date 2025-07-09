import React from "react";
import AuthForm from "../components/AuthForm";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

const LoginPage = () => {

  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    data = { ...data, "strategy": "email" }
    try {
      const res = await api.post("/auth/login", data);
      const token = res.data.token;
      localStorage.setItem("token", token);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <AuthForm
        title="Login"
        onSubmit={handleSubmit}
        fields={[
          { name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
          { name: "password", label: "Password", type: "password", placeholder: "********" },
        ]}
        footer={<p>Don't have an account? <Link to="/register">Register</Link></p>}
      />
    </div>
  );
};

export default LoginPage;
