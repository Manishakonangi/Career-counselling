import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // import navigate
import "../styles/Bookings.css"; 

const Bookings = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    service: "",
    mentor: "",
  });

  const navigate = useNavigate(); // initialize navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Normally here you would send formData to a backend API
    // After successful booking, navigate to confirmation page with data
    navigate("/confirmation", { state: { ...formData } });

    // Reset form (optional, since we're navigating)
    setFormData({
      name: "",
      email: "",
      date: "",
      service: "",
      mentor: "",
    });
  };

  return (
    <div className="bookings" style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h4>📅 Book Your Counseling Session</h4>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
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

        <button type="submit" style={{ padding: "10px", marginTop: "10px" }}>Book Now</button>
      </form>
    </div>
  );
};

export default Bookings;
