// CollegeResult.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
 import "../styles/CollegeResult.css";// optional for better styling

const CollegeResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { results, stateName, category, counsellingType, stream } = location.state || {};

  // Handle empty results
  if (!results || results.length === 0) {
    return (
      <div className="no-results">
        <h2>No Eligible Colleges Found</h2>
        <p>Please go back and check your inputs or select a different state/stream.</p>
        <button onClick={() => navigate("/")} className="back-btn">
          Back to Form
        </button>
      </div>
    );
  }

  return (
    <div className="results-page">
      <h2>Eligible Colleges in {stateName}</h2>
      <div className="info">
        <p><strong>Category:</strong> {category}</p>
        <p><strong>Counselling Type:</strong> {counsellingType}</p>
        <p><strong>Stream:</strong> {stream}</p>
      </div>

      <table className="results-table">
        <thead>
          <tr>
            <th>College Name</th>
            <th>Type</th>
            <th>Cutoff</th>
          </tr>
        </thead>
        <tbody>
          {results.map((college, idx) => (
            <tr key={idx}>
              <td>{college.name}</td>
              <td>{college.type}</td>
              <td>{college.cutoff}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => navigate("/")} className="back-btn">
        Back to Form
      </button>
    </div>
  );
};

export default CollegeResult;
