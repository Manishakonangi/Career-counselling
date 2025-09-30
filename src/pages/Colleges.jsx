// Colleges.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Colleges.css";
import bg from "../images/background.jpg"; // go up one level to src, then into images

// Dropdown options
const counsellingTypes = ["Academic", "Vocational", "Sports"];
const collegeStreams = ["Engineering", "Arts", "Law", "Medical"];
const categories = ["General", "SC", "ST", "OBC", "BC", "MBC"];
const states = [
  "Mumbai", "Delhi", "Bangalore", "Tamil Nadu", "Andhra Pradesh",
  "Telangana", "Kerala", "Karnataka", "Jammu & Kashmir", "Rajasthan", "Calcutta"
];

const Colleges = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    counsellingType: "",
    stream: "",
    category: "",
    cutoff: "",
    state: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value.trim() });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!form.name || !form.counsellingType || !form.stream || !form.category || !form.cutoff || !form.state) {
      setError("Please fill all fields!");
      return;
    }

    if (Number(form.cutoff) < 0) {
      setError("Cutoff must be a positive number.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5000/api/domestic-colleges", {
        name: form.name,
        counselling: form.counsellingType,
        state: form.state,
        category: form.category,
        cutoff: Number(form.cutoff),
        type: form.stream
      });

      const eligibleColleges = res.data.results || [];
      setLoading(false);

      // Navigate to results page
      navigate("/results", {
        state: {
          results: eligibleColleges,
          stateName: form.state,
          category: form.category,
          counsellingType: form.counsellingType,
          stream: form.stream
        }
      });

    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data?.message || "Error fetching colleges from backend."
      );
      console.error(err);
    }
  };

  return (
    <div className="portal-container">
      <form onSubmit={handleSubmit}>
        <h2>Student Counselling Portal</h2>

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <select
          name="counsellingType"
          value={form.counsellingType}
          onChange={handleChange}
          required
        >
          <option value="">Select Counselling Type</option>
          {counsellingTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <select
          name="stream"
          value={form.stream}
          onChange={handleChange}
          required
        >
          <option value="">Select College Stream</option>
          {collegeStreams.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <input
          name="cutoff"
          type="number"
          min="0"
          placeholder="Enter your cutoff/score"
          value={form.cutoff}
          onChange={handleChange}
          required
        />

        <select
          name="state"
          value={form.state}
          onChange={handleChange}
          required
        >
          <option value="">Select State</option>
          {states.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Checking..." : "Check Eligible Colleges"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Colleges;
