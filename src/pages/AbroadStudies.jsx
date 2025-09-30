import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AbroadStudies.css";
import bg from "../images/background.jpg"; 
// Dropdown options
const countries = [
  "USA","UK","Canada","Australia","Germany","France","Netherlands","Sweden",
  "Switzerland","Ireland","New Zealand","Singapore","Japan","South Korea",
  "Italy","Spain","Belgium","Denmark","Norway","Finland"
];

const exams = ["IELTS","TOEFL","GRE","GMAT","SAT","ACT","PTE","MCAT","LSAT"];

const levels = ["UG","PG","MS","MBA","PhD","MPhil","Diploma","Postdoc"];

const AbroadStudies = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    level: "",
    course: "",
    country: "",
    exam: "",
    marks: "",
    budget: ""
  });

  // Handle form changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/abroad-studies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
      } else {
        // Navigate to Advice page
        navigate("/advice", {
          state: {
            advice: data.advice,
            recommendedUniversities: data.recommendedUniversities,
          },
        });
      }
    } catch (err) {
      console.error("❌ Backend Error:", err);
      alert("Error fetching advice. Please check if backend is running.");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Career Counseling - Abroad Studies</h2>

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="mobile"
          placeholder="Mobile Number"
          type="tel"
          pattern="[0-9]{10}"
          title="Enter a valid 10-digit mobile number"
          value={form.mobile}
          onChange={handleChange}
          required
        />

        <select name="level" value={form.level} onChange={handleChange} required>
          <option value="">Select Level</option>
          {levels.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>

        <input
          name="course"
          placeholder="Course Name"
          value={form.course}
          onChange={handleChange}
          required
        />

        <select
          name="country"
          value={form.country}
          onChange={handleChange}
          required
        >
          <option value="">Select Country</option>
          {countries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          name="exam"
          value={form.exam}
          onChange={handleChange}
          required
        >
          <option value="">Select Exam</option>
          {exams.map((e) => (
            <option key={e} value={e}>{e}</option>
          ))}
        </select>

        <input
          name="marks"
          placeholder="Your Marks/Score"
          type="number"
          step="0.1"
          value={form.marks}
          onChange={handleChange}
          required
        />

        <input
          name="budget"
          placeholder="Your Budget (USD)"
          type="number"
          min="1000"
          value={form.budget}
          onChange={handleChange}
          required
        />

        <button type="submit">Get Career Advice</button>
      </form>
    </div>
  );
};

export default AbroadStudies;
