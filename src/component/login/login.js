import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import Logo from "../../UIkit/logo";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [touched, setTouched] = useState({ username: false, password: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.username) {
      newErrors.username = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.username)) {
      newErrors.username = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ username: true, password: true });

    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/auth/api/login/",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then((response) => {
            localStorage.setItem("token", response.data.access);
            localStorage.setItem("is_admin", response.data.user.is_admin);
            window.location.href = "/Dashboard";
        });
        alert("Login successful!");
      } catch (error) {
        console.error("Login Error:", error.response?.data || error.message);
        alert("Login failed. Please check your credentials.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="logo">
        <Logo fontSize={50} />
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div
          className="input-group"
          style={{ marginBottom: touched.username && errors.username && "0px" }}
        >
          {formData.username && <label className="focused">Email</label>}
          <input
            type="text"
            placeholder="Enter email"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        {touched.username && errors.username && (
          <span className="error">{errors.username}</span>
        )}
        <div
          className="input-group"
          style={{ marginBottom: touched.password && errors.password && "0px" }}
        >
          {formData.password && <label className="focused">Password</label>}
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {touched.password && errors.password && (
          <span className="error">{errors.password}</span>
        )}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
