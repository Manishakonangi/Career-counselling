// CollegeResult.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CollegeResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Destructure values from location state
  const { results, stateName, category, counsellingType, stream } = location.state || {};

  // Handle empty results
  if (!results || results.length === 0) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>No Eligible Colleges Found</h2>
        <p>Please go back and check your inputs or select a different state/stream.</p>
        <button onClick={() => navigate("/")} style={{ padding: "10px 20px", marginTop: "10px" }}>
          Back to Form
        </button>
      </div>
    );
  }

  return (
    <div className="results-page" style={{ padding: "20px" }}>
      <h2>Eligible Colleges in {stateName}</h2>
      <p><strong>Category:</strong> {category}</p>
      <p><strong>Counselling Type:</strong> {counsellingType}</p>
      <p><strong>Stream:</strong> {stream}</p>

      <ul style={{ marginTop: "20px" }}>
        {results.map((college, idx) => (
          <li key={idx} style={{ marginBottom: "10px" }}>
            <strong>{college.name}</strong> - Type: {college.type}, Cutoff: {college.cutoff}
          </li>
        ))}
      </ul>

      <button
        onClick={() => navigate("/")}
        style={{ padding: "10px 20px", marginTop: "20px" }}
      >
        Back to Form
      </button>
    </div>
  );
};

export default CollegeResult;
