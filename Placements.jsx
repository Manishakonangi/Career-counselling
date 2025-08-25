import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Placements = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    collegeName: "",
    cgpa: "",
    skills: "",
    projects: "",
    preferredJobType: "",
    preferredLocations: "",
    resume: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setForm({ ...form, resume: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.collegeName || !form.cgpa || !form.resume || !form.preferredJobType || !form.preferredLocations) {
      setError("Please fill all required fields and upload resume!");
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      Object.keys(form).forEach(key => data.append(key, form[key]));
      
      const res = await axios.post("http://localhost:5000/api/career-advice", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setLoading(false);
      navigate("/result", { state: res.data }); // Navigate with result
    } catch (err) {
      setLoading(false);
      setError("Error fetching career advice from backend.");
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "auto", padding: "20px" }}>
      <h2>Career Counselling Portal</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <input name="collegeName" placeholder="College Name" value={form.collegeName} onChange={handleChange} required />
        <input name="cgpa" type="number" step="0.01" placeholder="Enter your CGPA" value={form.cgpa} onChange={handleChange} required />
        <textarea name="skills" placeholder="Your skills (comma separated)" value={form.skills} onChange={handleChange} />
        <textarea name="projects" placeholder="Your projects / experiences" value={form.projects} onChange={handleChange} />
        <select name="preferredJobType" value={form.preferredJobType} onChange={handleChange} required>
          <option value="">Select Job Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Internship">Internship</option>
          <option value="Part-time">Part-time</option>
        </select>
        <select name="preferredLocations" value={form.preferredLocations} onChange={handleChange} required>
          <option value="">Select Location</option>
          <option value="Pune">Pune</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Coimbatore">Coimbatore</option>
          <option value="Chennai">Chennai</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
        </select>
        <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} required />
        <button type="submit" disabled={loading}>{loading ? "Getting Result..." : "Get Career Result"}</button>
      </form>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
};

export default Placements;
