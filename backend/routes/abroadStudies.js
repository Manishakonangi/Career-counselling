const express = require("express");
const router = express.Router();
const AbroadStudy = require("../models/AbroadStudy");

// Sample universities for given countries
const universityData = {
  USA: ["MIT", "Stanford University", "Harvard University"],
  UK: ["University of Oxford", "University of Cambridge", "Imperial College London"],
  Canada: ["University of Toronto", "McGill University", "University of British Columbia"],
  Australia: ["University of Melbourne", "Australian National University", "University of Sydney"],
  Germany: ["Technical University of Munich", "Heidelberg University", "LMU Munich"],
  France: ["Sorbonne University", "École Polytechnique", "PSL University"],
  Netherlands: ["Delft University of Technology", "University of Amsterdam", "Leiden University"],
  Sweden: ["Lund University", "KTH Royal Institute of Technology", "Uppsala University"],
  Switzerland: ["ETH Zurich", "EPFL", "University of Zurich"],
  Ireland: ["Trinity College Dublin", "University College Dublin", "National University of Ireland Galway"],
  "New Zealand": ["University of Auckland", "University of Otago", "Victoria University of Wellington"],
  Singapore: ["National University of Singapore", "Nanyang Technological University", "Singapore Management University"],
  Japan: ["University of Tokyo", "Kyoto University", "Osaka University"],
  "South Korea": ["Seoul National University", "KAIST", "Yonsei University"],
  Italy: ["University of Bologna", "Sapienza University of Rome", "Politecnico di Milano"],
  Spain: ["University of Barcelona", "Complutense University of Madrid", "Autonomous University of Madrid"],
  Belgium: ["KU Leuven", "Ghent University", "Université catholique de Louvain"],
  Denmark: ["University of Copenhagen", "Technical University of Denmark", "Aarhus University"],
  Norway: ["University of Oslo", "Norwegian University of Science and Technology", "BI Norwegian Business School"],
  Finland: ["University of Helsinki", "Aalto University", "University of Turku"]
};

// Utility functions for validation
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidMobile = (mobile) => /^[0-9]{7,15}$/.test(mobile); // allows 7–15 digit numbers

// POST: Add Abroad Study Application
router.post("/", async (req, res) => {
  try {
    const { name, email, mobile, level, course, country, exam, marks, budget } = req.body;

    // Basic field presence check
    if (!name || !email || !mobile || !level || !course || !country || !exam || !marks || !budget) {
      return res.status(400).json({ error: "Please fill all fields!" });
    }

    // Extra validation
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email format!" });
    }
    if (!isValidMobile(mobile)) {
      return res.status(400).json({ error: "Invalid mobile number! Use digits only (7–15)." });
    }
    const budgetNumber = Number(budget);
    if (isNaN(budgetNumber) || budgetNumber <= 0) {
      return res.status(400).json({ error: "Budget must be a positive number!" });
    }

    // Normalize country name (case-insensitive)
    const formattedCountry = Object.keys(universityData).find(
      (c) => c.toLowerCase() === country.toLowerCase()
    );

    const universities = formattedCountry
      ? universityData[formattedCountry]
      : ["No sample universities available"];

    const adviceMessage = `Hi ${name}, based on your interest in ${course} at ${level} level with a budget of $${budgetNumber}, ${country} is a good choice!`;

    // ✅ Save to MongoDB
    const newApplication = new AbroadStudy({
      name,
      email,
      mobile,
      level,
      course,
      country,
      exam,
      marks,
      budget: budgetNumber
    });

    await newApplication.save();

    res.json({
      msg: "✅ Abroad study application saved successfully",
      advice: adviceMessage,
      recommendedUniversities: universities,
      examRequired: exam,
      estimatedBudget: `${budgetNumber} USD`,
      savedData: newApplication
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Fetch all applications
router.get("/", async (req, res) => {
  try {
    const applications = await AbroadStudy.find();
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
