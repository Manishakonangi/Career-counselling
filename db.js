const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ================== 1. CONNECT TO MONGODB ATLAS ==================
const uri = "mongodb+srv://manisha_14:mani@cluster0.asr9ugt.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected (CareerCounselling DB)"))
  .catch(err => console.error("❌ DB Connection Error:", err));

// ================== 2. DEFINE SCHEMAS & MODELS ==================

// Abroad Study Schema
const AbroadStudySchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  level: String,
  course: String,
  country: String,
  exam: String,
  marks: Number,
  budget: Number,
});
const AbroadStudy = mongoose.model("AbroadStudy", AbroadStudySchema);

// Domestic College Schema
const DomesticCollegeSchema = new mongoose.Schema({
  state: String,
  studentName: String,
  category: String,
  stream: String,
  cutoff: Number,
  eligibleColleges: [String],
});
const DomesticCollege = mongoose.model("DomesticCollege", DomesticCollegeSchema);

// Placement Schema
const PlacementSchema = new mongoose.Schema({
  collegeName: String,
  cgpa: Number,
  skills: [String],
  projects: [String],
  preferredJobType: String,
  preferredLocations: [String],
  resume: String,
});
const Placement = mongoose.model("Placement", PlacementSchema);

// ================== 3. ROUTES (APIs) ==================

// Test Route
app.get("/", (req, res) => {
  res.send("Career Counselling API Running 🚀");
});

// Save Abroad Study Data
app.post("/abroad", async (req, res) => {
  try {
    const data = new AbroadStudy(req.body);
    await data.save();
    res.json({ message: "✅ Abroad study data saved!", data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save Domestic College Data
app.post("/domestic", async (req, res) => {
  try {
    const data = new DomesticCollege(req.body);
    await data.save();
    res.json({ message: "✅ Domestic college data saved!", data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save Placement Data
app.post("/placement", async (req, res) => {
  try {
    const data = new Placement(req.body);
    await data.save();
    res.json({ message: "✅ Placement data saved!", data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================== 4. START SERVER ==================
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
