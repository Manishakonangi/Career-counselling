const express = require("express");
const router = express.Router();
const College = require("../models/College");

// Allowed lists
const counsellingTypes = ["Academic", "Vocational", "Sports"];
const collegeStreams = ["Engineering", "Arts", "Law", "Medical"];
const categories = ["General", "SC", "ST", "OBC", "BC", "MBC"];
const states = [
  "Mumbai","Delhi","Bangalore","Tamil Nadu","Andhra Pradesh",
  "Telangana","Kerala","Karnataka","Jammu & Kashmir","Rajasthan","Calcutta"
];

// Dummy colleges database
const colleges = [
  { name: "ABC Engineering College", state: "Tamil Nadu", cutoff: 80, type: "Engineering", category: "General" },
  { name: "Madras Engineering College", state: "Tamil Nadu", cutoff: 80, type: "Engineering", category: "General" },
  { name: "XYZ Arts College", state: "Delhi", cutoff: 70, type: "Arts", category: "OBC" },
  { name: "PQR Law College", state: "Mumbai", cutoff: 75, type: "Law", category: "SC" },
  { name: "LMN Medical College", state: "Kerala", cutoff: 85, type: "Medical", category: "General" },
  { name: "JKL Engineering College", state: "Bangalore", cutoff: 65, type: "Engineering", category: "BC" },
    { name: "Ram Engineering College", state: "Bangalore", cutoff: 78, type: "Engineering", category: "BC" },
];

router.post("/", (req, res) => {
  const { state, category, cutoff, type, counselling } = req.body;

  // Validation: check required fields
  if (!state || !category || !cutoff || !type || !counselling) {
    return res.status(400).json({ error: "Please fill all fields!" });
  }

  // Validate input values
  if (!states.includes(state)) return res.status(400).json({ error: "Invalid state!" });
  if (!categories.includes(category)) return res.status(400).json({ error: "Invalid category!" });
  if (!collegeStreams.includes(type)) return res.status(400).json({ error: "Invalid stream type!" });
  if (!counsellingTypes.includes(counselling)) return res.status(400).json({ error: "Invalid counselling type!" });

  const enteredCutoff = Number(cutoff);

  // Filter eligible colleges
  const results = colleges.filter(
    c =>
      c.state === state &&
      c.type === type &&
      c.category === category &&
      enteredCutoff >= c.cutoff
  );

  res.json({
    counsellingType: counselling,
    appliedState: state,
    appliedCategory: category,
    appliedStream: type,
    enteredCutoff: enteredCutoff,
    results: results.length > 0 ? results : []
  });
});

module.exports = router;
