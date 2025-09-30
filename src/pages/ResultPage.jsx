import React from "react";
import { useLocation, useNavigate } from "react-router-dom";


const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state || {};

  // Debugging
  console.log("ResultPage state:", result);

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h2>
        Career Result for {result.collegeName || "Unknown College"}
      </h2>

      <section>
        <h4>Skills:</h4>
        {Array.isArray(result.skills) && result.skills.length > 0 ? (
          <ul>{result.skills.map((s, i) => <li key={i}>{s}</li>)}</ul>
        ) : (
          <p>No skills listed</p>
        )}
      </section>

      <section>
        <h4>Projects / Experiences:</h4>
        <p>{result.projects || "No projects listed"}</p>
      </section>

      <section>
        <h4>Preferred Job Type:</h4>
        <p>{result.preferredJobType || "Not specified"}</p>
      </section>

      <section>
        <h4>Preferred Location:</h4>
        <p>{result.preferredLocation || "Not specified"}</p>
      </section>

      <section>
        <h4>Eligible Companies:</h4>
        {Array.isArray(result.availableCompanies) && result.availableCompanies.length > 0 ? (
          <ul>
            {result.availableCompanies.map((c, i) => (
              <li key={i}>
                <strong>{c.name}</strong> - {c.jobType} ({c.workMode}) - {c.lpa}
              </li>
            ))}
          </ul>
        ) : (
          <p>No companies available</p>
        )}
      </section>

      <section>
        <h4>Career Advice:</h4>
        {Array.isArray(result.advice) && result.advice.length > 0 ? (
          <ul>
            {result.advice.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        ) : (
          <p>No advice available</p>
        )}
      </section>

      <button onClick={() => navigate("/")} style={{ marginTop: "20px", padding: "10px 20px" }}>
        Back to Form
      </button>
    </div>
  );
};

export default ResultPage;
