import React, { useEffect, useState } from "react";
import "./styles/AuthForm.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AuthForm = ({ title, fields, onSubmit, footer, loading, loadingMessages = [] }) => {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState({});
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [loading, loadingMessages.length]);

  const handleChange = (e, name) => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  const toggleVisibility = (name) => {
    setShowPassword((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="auth-form-container">
      <h2>{title}</h2>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
        {fields.map((field) => (
          <div className="form-group" key={field.name}>
            <label>{field.label}</label>
            <div className="form-input-wrapper">
              <input
                type={field.type === "password" && showPassword[field.name] ? "text" : field.type}
                placeholder={field.placeholder}
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(e, field.name)}
              />
              {field.type === "password" && (
                <span className="eye-icon" onClick={() => toggleVisibility(field.name)}>
                  {showPassword[field.name] ? <FaEyeSlash /> : <FaEye />}
                </span>
              )}
            </div>
          </div>
        ))}
        <button type="submit" disabled={loading} className={`auth-submit-btn ${loading ? "loading" : ""}`}>
          {loading ? <div className="loader-spinner" /> : title}
        </button>

        {loading && (
          <div className="loading-message">
            <em>{loadingMessages[messageIndex]}</em>
          </div>
        )}

      </form>
      {footer}
    </div>
  );
};

export default AuthForm;
