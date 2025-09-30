const express = require("express");
const router = express.Router();
const Placement = require("../models/Placement");

// POST /api/career-advice
router.post("/", async (req, res) => {
  const {
    collegeName,
    skills,
    projects,
    preferredJobType,
    preferredLocation,
    preferredCompany,
  } = req.body;

  // Validate required fields
  const requiredFields = [
    "collegeName",
    "skills",
    "preferredJobType",
    "preferredLocation",
    "preferredCompany",
  ];

  for (const field of requiredFields) {
    if (!req.body[field] || !req.body[field].toString().trim()) {
      return res.status(400).json({ error: `Missing required field: ${field}` });
    }
  }

  // Convert skills to array if needed
  const skillsArray = Array.isArray(skills)
    ? skills
    : skills.split(",").map((s) => s.trim()).filter(Boolean);

  try {
    // Save to MongoDB
    const placement = new Placement({
      collegeName,
      skills: skillsArray,
      projects: projects || "No projects listed",
      preferredJobType,
      preferredLocation,
      preferredCompany,
    });

    await placement.save();

    // Sample career advice and available companies
    const availableCompanies = [
      {
        name: preferredCompany,
        jobType: preferredJobType,
        locations: [preferredLocation],
        lpa: "12 LPA",
        workMode: "Hybrid",
      },
      {
        name: "OtherTech",
        jobType: preferredJobType,
        locations: [preferredLocation],
        lpa: "10 LPA",
        workMode: "Remote",
      },
    ];

    const advice = [
      `Keep improving your skills in ${skillsArray.join(", ")}.`,
      "Build projects to showcase your experience.",
      `Prepare for interviews at ${preferredCompany}.`,
    ];

    // Respond with saved data + advice
    res.status(201).json({
      placement,
      availableCompanies,
      advice,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while saving placement" });
  }
});

module.exports = router;
