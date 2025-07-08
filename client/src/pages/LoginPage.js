import React from "react";
import AuthForm from "../components/AuthForm";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const handleSubmit = (data) => {
    console.log("Login data:", data);
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
