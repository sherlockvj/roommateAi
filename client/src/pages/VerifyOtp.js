import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const VerifyOtpPage = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (location?.state?.email) {
      setEmail(location.state.email);
    }
  }, [location]);

  const handleSubmit = (data) => {
    const payload = {
      email: email || data.email,
      otp: data.otp,
    };
    console.log("Verifying OTP:", payload);
    // Call your verify API here
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
