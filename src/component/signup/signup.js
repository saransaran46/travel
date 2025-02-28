import React, { useState } from "react";
import "./signup.css";
import axios from "axios";
import Logo from "../../UIkit/logo";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one special character";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ username: true, email: true, password: true });

    if (validateForm()) {
      setLoading(true);
      setSuccessMessage("");
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/auth/api/register/",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Response:", response.data);
        setSuccessMessage("Registration successful!");
        navigate("/login");
        setFormData({ username: "", email: "", password: "" });
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        setErrors(error.response?.data || { general: "Registration failed" });
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="signup-container">
      <div className="logo">
        <Logo fontSize={50} />
      </div>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div
          className="input-group"
          style={{ marginBottom: touched.username && errors.username && "0px" }}
        >
          {formData.username && (
            <label className="focused" htmlFor="username">
              Username
            </label>
          )}
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter Your Username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        {touched.username && errors.username && (
          <span className="error">{errors.username}</span>
        )}
        <div
          className="input-group"
          style={{ marginBottom: touched.email && errors.email && "0px" }}

        >{formData.email && <label className="focused" htmlFor="email">Email</label>}
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        {touched.email && errors.email && (
          <span className="error">{errors.email}</span>
        )}
        <div
          className="input-group"
          style={{ marginBottom: touched.password && errors.password && "0px" }}
        >
          {formData.password && (
            <label className="focused" htmlFor="password">
              Password
            </label>
          )}
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter Your Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {touched.password && errors.password && (
          <span className="error">{errors.password}</span>
        )}
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
