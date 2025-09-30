import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/AbroadStudies.css";

const Advice = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const advice = state?.advice || "No advice found.";
  const recommendedUniversities = state?.recommendedUniversities || [];

  return (
    <div className="form-container">
      <h2>Your Personalized Career Advice</h2>

      <div className="advice-box">
        <p>{advice}</p>
      </div>

      {recommendedUniversities.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Recommended Universities:</h3>
          <ul>
            {recommendedUniversities.map((uni, index) => (
              <li key={index}>{uni}</li>
            ))}
          </ul>
        </div>
      )}

      <button style={{ marginTop: "20px" }} onClick={() => navigate("/")}>
        Back to Form
      </button>
    </div>
  );
};

export default Advice;
