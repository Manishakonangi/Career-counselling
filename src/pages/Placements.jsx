import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bg from "../images/background.jpg";
const Placements = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    collegeName: "",
    skills: "",
    projects: "",
    preferredJobType: "",
    preferredLocation: "",
    preferredCompany: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Required fields
    const requiredFields = [
      "collegeName",
      "skills",
      "preferredJobType",
      "preferredLocation",
      "preferredCompany",
    ];

    for (let key of requiredFields) {
      if (!form[key].trim()) {
        setError(`Please fill the ${key} field.`);
        return;
      }
    }

       // Prepare payload safely
    const payload = {
      ...form,
      skills: Array.isArray(form.skills)
        ? form.skills
        : form.skills.split(",").map((s) => s.trim()).filter(Boolean),
      projects: form.projects.trim() || "No projects listed",
    };
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/career-advice",
        payload
      );
      setLoading(false);

      navigate("/result", { state: res.data });
    } catch (err) {
      setLoading(false);
      console.error(err);
      setError(err.response?.data?.error || "Error fetching career advice.");
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "auto", padding: "20px" }}>
      <h2>Placement & Career Guidance</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <input
          name="collegeName"
          placeholder="College Name"
          value={form.collegeName}
          onChange={handleChange}
        />
        <textarea
          name="skills"
          placeholder="Skills (comma separated)"
          value={form.skills}
          onChange={handleChange}
        />
        <textarea
          name="projects"
          placeholder="Projects / Experiences"
          value={form.projects}
          onChange={handleChange}
        />
        <select
          name="preferredJobType"
          value={form.preferredJobType}
          onChange={handleChange}
        >
          <option value="">Select Job Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
        </select>
        <select
          name="preferredLocation"
          value={form.preferredLocation}
          onChange={handleChange}
        >
          <option value="">Select Location</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Chennai">Chennai</option>
          <option value="Pune">Pune</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Coimbatore">Coimbatore</option>
          <option value="Mumbai">Mumbai</option>
        </select>
        <select
          name="preferredCompany"
          value={form.preferredCompany}
          onChange={handleChange}
        >
          <option value="">Select Company</option>
          <option value="Google">Google</option>
          <option value="Microsoft">Microsoft</option>
          <option value="Amazon">Amazon</option>
          <option value="Facebook">Facebook</option>
          <option value="Apple">Apple</option>
          <option value="Infosys">Infosys</option>
          <option value="TCS">TCS</option>
          <option value="Wipro">Wipro</option>
          <option value="Intel">Intel</option>
          <option value="IBM">IBM</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Getting Result..." : "Get Career Result"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Placements;
