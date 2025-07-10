import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api/axios";
import { useAuth } from "../contexts/AuthContext";
import { useRooms } from "../contexts/RoomContext";
import { useNotification } from "../contexts/NotificationContext";

const LoginPage = () => {

  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { refreshRooms } = useRooms();

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

  const searchParams = new URLSearchParams(window.location.search);

  const redirectTo = searchParams.get("redirect") || "/";

  const handleSubmit = async (data) => {
    data = { ...data, strategy: "email" };
    try {
      setLoading(true);
      const res = await api.post("/auth/login", data);
      const token = res.data.token;
      localStorage.setItem("token", token);

      const payload = jwtDecode(token);
      setUser({ id: payload.id, name: payload.name || payload.email });

      await refreshRooms();
      showNotification("success", "Logged in successfully");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      showNotification("error", err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <AuthForm
        title="Login"
        onSubmit={handleSubmit}
        loading={loading}
        loadingMessages={loadingMessages}
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
