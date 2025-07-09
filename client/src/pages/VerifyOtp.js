import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import api from "../api/axios";

const VerifyOtpPage = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (location?.state?.email) {
      setEmail(location.state.email);
    }
  }, [location]);

  const handleSubmit = async (data) => {
    try {
      const res = await api.post("/auth/verify-otp", {
        email: email || data.email,
        otp: data.otp,
      });

      if (res.status === 200) {
        alert("✅ OTP verified! You can now login.");
        navigate("/login");
      }
    } catch (err) {
      alert(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="auth-page">
      <AuthForm
        title="Verify OTP"
        onSubmit={handleSubmit}
        fields={[
          ...(!email
            ? [{ name: "email", label: "Email", type: "email", placeholder: "you@example.com" }]
            : []),
          { name: "otp", label: "Enter OTP", type: "text", placeholder: "123456" },
        ]}
      />
    </div>
  );
};

export default VerifyOtpPage;
