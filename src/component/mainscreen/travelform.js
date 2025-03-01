import React, { useState } from "react";
import axios from "axios";
import "./travelform.css";

const Travelform = () => {
  const [formData, setFormData] = useState({
    project_name: "",
    purpose_travel: "",
    travel_start_date: "",
    travel_mode: "By Flight",
    ticket_booking_mode: "Self",
    travel_start_loc: "",
    travel_end_loc: "",
  });

  const [errors, setErrors] = useState({});
  const [isloading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear errors when user starts typing
    setErrors({ ...errors, [name]: "" });
  };
  const formattedData = {
    ...formData,
    travel_start_date: formData.travel_start_date
      ? formData.travel_start_date.split("-").reverse().join("-")
      : "",
  };
  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios
        .post(
          "http://127.0.0.1:8000/auth/api/travel-requests/",
          formattedData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
            window.location.href = "/Dashboard";
          }, 1000);
        });
    } catch (error) {
      console.error("API Error:", error);
      alert("Failed to submit travel request.");
    }
  };

  return (
    <div className="trip-container">
      <h2 className="title">Trip Details</h2>
      {isloading ? (
        <div style={{ color: "green", fontSize: 15, height: "100vh" }}>
          Submitted successfully
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Project Name</label>
            <input
              type="text"
              name="project_name"
              value={formData.project_name}
              onChange={handleChange}
              placeholder="Enter project name"
            />
            {errors.project_name && (
              <span className="error">{errors.project_name}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Purpose of Travel</label>
            <textarea
              name="purpose_travel"
              value={formData.purpose_travel}
              onChange={handleChange}
              placeholder="Enter purpose of travel"
            />
            {errors.purpose_travel && (
              <span className="error">{errors.purpose_travel}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Travel Start Date</label>
            <input
              type="date"
              name="travel_start_date"
              value={formData.travel_start_date}
              onChange={handleChange}
            />
            {errors.travel_start_date && (
              <span className="error">{errors.travel_start_date}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Travel Mode</label>
            <select
              name="travel_mode"
              value={formData.travel_mode}
              onChange={handleChange}
            >
              <option value="By Flight">By Flight</option>
              <option value="By Train">By Train</option>
            </select>
            {errors.travel_mode && (
              <span className="error">{errors.travel_mode}</span>
            )}
          </div>

          <div className="form-groups">
            <label className="form-label">Ticket Booking Mode</label>
            <div className="radio-groups">
              <div className="radio-group">
                <input
                  type="radio"
                  name="ticket_booking_mode"
                  value="Self"
                  className="radiosize"
                  checked={formData.ticket_booking_mode === "Self"}
                  onChange={handleChange}
                />
                Self
              </div>
              <div className="radio-group">
                <input
                  type="radio"
                  name="ticket_booking_mode"
                  className="radiosize"
                  value="Travel desk"
                  checked={formData.ticket_booking_mode === "Travel desk"}
                  onChange={handleChange}
                />
                Travel Desk
              </div>
            </div>
            {errors.ticket_booking_mode && (
              <span className="error">{errors.ticket_booking_mode}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Travel Start Location</label>
            <input
              type="text"
              name="travel_start_loc"
              value={formData.travel_start_loc}
              onChange={handleChange}
              placeholder="Enter starting location"
            />
            {errors.travel_start_loc && (
              <span className="error">{errors.travel_start_loc}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Travel End Location</label>
            <input
              type="text"
              name="travel_end_loc"
              value={formData.travel_end_loc}
              onChange={handleChange}
              placeholder="Enter destination"
            />
            {errors.travel_end_loc && (
              <span className="error">{errors.travel_end_loc}</span>
            )}
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default Travelform;
