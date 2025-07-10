import React from "react";
import AuthForm from "../components/AuthForm";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api/axios";
import { useAuth } from "../contexts/AuthContext";
import { useRooms } from "../contexts/RoomContext";

const LoginPage = () => {

  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { refreshRooms } = useRooms();

  const searchParams = new URLSearchParams(window.location.search);
  const redirectTo = searchParams.get("redirect") || "/";

  const handleSubmit = async (data) => {
    data = { ...data, strategy: "email" };
    try {
      const res = await api.post("/auth/login", data);
      const token = res.data.token;
      localStorage.setItem("token", token);

      const payload = jwtDecode(token);
      setUser({ id: payload.id, name: payload.name || payload.email });

      await refreshRooms();

      navigate(redirectTo, { replace: true });
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
