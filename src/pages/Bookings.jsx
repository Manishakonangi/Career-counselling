import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Bookings.css";

const Bookings = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    service: "",
    mentor: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Navigate to confirmation page with form data
    navigate("/confirmation", { state: { ...formData } });

    // Reset form
    setFormData({
      name: "",
      email: "",
      date: "",
      service: "",
      mentor: "",
    });
  };

  return (
    <div className="bookings-container">
      <h2>📅 Book Your Counseling Session</h2>

      <form className="bookings-form" onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <label>Service:</label>
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="Career Counseling">Career Counseling</option>
          <option value="College Guidance">College Guidance</option>
          <option value="Placement Support">Placement Support</option>
        </select>

        <label>Mentor Name:</label>
        <select
          name="mentor"
          value={formData.mentor}
          onChange={handleChange}
          required
        >
          <option value="">Select Mentor</option>
          <option value="Dr. Ananya Sharma">Dr. Ananya Sharma</option>
          <option value="Mr. Rajesh Kumar">Mr. Rajesh Kumar</option>
          <option value="Ms. Priya Menon">Ms. Priya Menon</option>
          <option value="Mr. Arjun Verma">Mr. Arjun Verma</option>
        </select>

        <button type="submit" className="book-btn">
          Book Now
        </button>
      </form>
    </div>
  );
};

export default Bookings;
