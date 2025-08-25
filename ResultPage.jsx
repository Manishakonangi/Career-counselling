import React from "react";
import { useLocation, useNavigate } from "react-router-dom";



const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state;

  if (!result) {
    return (
      <div style={{ padding: "20px" }}>
        <p>No result data found. Go back to submit the form.</p>
        <button onClick={() => navigate("/")}>Back to Form</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "750px", margin: "auto", padding: "20px" }}>
      <h2>Career Result for {result.collegeName}</h2>
      <p><strong>CGPA:</strong> {result.cgpa}</p>

      <h4>Skills:</h4>
      <ul>{result.skills.map((s, idx) => <li key={idx}>{s}</li>)}</ul>

      <h4>Projects:</h4>
      <p>{result.projects || "No projects listed"}</p>

      <h4>Preferred Job Type:</h4>
      <p>{result.preferredJobType}</p>

      <h4>Preferred Locations:</h4>
      <p>{result.preferredLocations.join(", ")}</p>

      <h4>Available Companies:</h4>
      <ul>
        {result.availableCompanies.length > 0 ? (
          result.availableCompanies.map((c, idx) => (
            <li key={idx}>
              <strong>{c.name}</strong> - {c.jobType} ({c.workMode}) - {c.lpa} LPA
            </li>
          ))
        ) : (
          <li>No companies available for your preferences.</li>
        )}
      </ul>

      <h4>Result & Advice:</h4>
      <ul>
        {result.advice.map((a, idx) => (
          <li key={idx}>
            {a.split(/(https?:\/\/[^\s]+)/g).map((part, i) =>
              /https?:\/\//.test(part) ? <a key={i} href={part} target="_blank" rel="noopener noreferrer">{part}</a> : part
            )}
          </li>
        ))}
      </ul>

      <button onClick={() => navigate("/")} style={{ marginTop: "20px" }}>Back to Form</button>
    </div>
  );
};

export default ResultPage;
