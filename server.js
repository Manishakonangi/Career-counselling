const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// ===================== MongoDB Connection =====================
const MONGO_URI = "mongodb+srv://<username>:<password>@cluster0.a889tyu.mongodb.net/?retryWrites=flase&w=majority&ppName=Cluster0";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected Successfully!"))
.catch((err) => console.error("❌ MongoDB Connection Failed:", err));

// ===================== Multer Setup for Resume Upload =====================
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// ===================== Data =====================

// Domestic Colleges
const domesticColleges = {
  "Mumbai": [
    { name: "IIT Bombay", type: "Engineering", cutoff: 90 },
    { name: "Veermata Jijabai Technological Institute", type: "Engineering", cutoff: 88 },
    { name: "Government Law College Mumbai", type: "Law", cutoff: 85 },
    { name: "KC Law College", type: "Law", cutoff: 82 },
    { name: "Grant Medical College", type: "Medical", cutoff: 90 },
    { name: "Topiwala National Medical College", type: "Medical", cutoff: 88 },
    { name: "St. Xavier's College", type: "Arts", cutoff: 87 },
    { name: "SNDT Women's University", type: "Arts", cutoff: 85 },
  ],
  "Delhi": [
    { name: "IIT Delhi", type: "Engineering", cutoff: 92 },
    { name: "DTU", type: "Engineering", cutoff: 89 },
    { name: "Faculty of Law, DU", type: "Law", cutoff: 88 },
    { name: "Amity Law School", type: "Law", cutoff: 85 },
    { name: "AIIMS Delhi", type: "Medical", cutoff: 95 },
    { name: "Maulana Azad Medical College", type: "Medical", cutoff: 92 },
    { name: "Delhi University Arts Faculty", type: "Arts", cutoff: 86 },
    { name: "Jawaharlal Nehru University Arts Faculty", type: "Arts", cutoff: 84 },
  ],
};

// Abroad Colleges
const abroadColleges = [
  { name: "MIT", country: "USA", courses: ["UG","PG","MS","MBA","PhD"], rank: 1 },
  { name: "Stanford University", country: "USA", courses: ["UG","PG","MS","MBA","PhD"], rank: 2 },
  { name: "Harvard University", country: "USA", courses: ["UG","PG","MS","MBA","PhD"], rank: 3 },
  { name: "University of Oxford", country: "UK", courses: ["UG","PG","MS","MBA","PhD"], rank: 1 },
  { name: "University of Cambridge", country: "UK", courses: ["UG","PG","MS","MBA","PhD"], rank: 2 },
  { name: "Imperial College London", country: "UK", courses: ["UG","PG","MS","MBA","PhD"], rank: 3 },
];

// Companies
const companies = [
  { name: "TCS", jobType: "Full-time", workMode: "Onsite", lpa: 8, locations: ["Pune", "Bangalore"] },
  { name: "Infosys", jobType: "Full-time", workMode: "Hybrid", lpa: 7, locations: ["Hyderabad", "Mumbai"] },
  { name: "Wipro", jobType: "Internship", workMode: "Remote", lpa: 3, locations: ["Bangalore", "Chennai"] },
  { name: "Google", jobType: "Full-time", workMode: "Remote", lpa: 30, locations: ["Bangalore", "Delhi"] },
  { name: "Amazon", jobType: "Full-time", workMode: "Hybrid", lpa: 25, locations: ["Pune", "Mumbai"] },
  { name: "Microsoft", jobType: "Internship", workMode: "Remote", lpa: 5, locations: ["Bangalore", "Hyderabad"] },
  { name: "Flipkart", jobType: "Full-time", workMode: "Hybrid", lpa: 12, locations: ["Bangalore", "Pune"] },
];

// ===================== ROUTES =====================

// Root
app.get("/", (req, res) => res.send("✅ Unified Career Counselling Backend Running!"));

// Domestic Colleges
app.post("/api/domestic-colleges", (req, res) => {
  const { state, cutoff, type } = req.body;
  if (!state || !cutoff || !type) return res.status(400).json({ error: "All fields are required!" });

  const allColleges = domesticColleges[state] || [];
  const eligibleColleges = allColleges.filter(c => c.type === type && Number(cutoff) >= c.cutoff);

  res.json({ results: eligibleColleges });
});

// Abroad Studies
app.post("/api/abroad-studies", (req, res) => {
  const { name, email, mobile, level, course, country, exam, marks, budget } = req.body;
  if (!name || !email || !mobile || !level || !course || !country || !exam || !marks || !budget) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  let advice = `Hello ${name}!\n📧 ${email} | 📱 ${mobile}\nInterested in ${level} ${course} in ${country}.\n`;

  const requiredScores = { IELTS: 6.5, TOEFL: 90, GRE: 300, GMAT: 600, SAT: 1200, ACT: 25, PTE: 65, MCAT: 500, LSAT: 150 };
  const required = requiredScores[exam] || 0;
  advice += marks >= required ? `✅ ${exam} score meets eligibility.\n` : `⚠️ ${exam} score below requirement (${required}).\n`;

  const avgCost = 25000;
  advice += budget >= avgCost ? `💰 Budget sufficient.\n` : `💰 Budget low; consider scholarships.\n`;

  let recommended = abroadColleges
    .filter(c => c.country === country && c.courses.includes(level))
    .sort((a,b) => a.rank-b.rank)
    .map(c => c.name);
  while (recommended.length < 3) recommended.push("Other College");

  advice += `🎓 Top Colleges:\n- ${recommended.slice(0,3).join("\n- ")}`;

  res.json({ advice });
});

// Career Advice
app.post("/api/career-advice", upload.single("resume"), (req, res) => {
  try {
    const { collegeName, cgpa, skills, projects, preferredJobType, preferredLocations } = req.body;
    if (!collegeName || !cgpa || !preferredJobType || !preferredLocations) {
      return res.status(400).json({ error: "All required fields must be filled!" });
    }

    const skillArray = skills ? skills.split(",").map(s => s.trim()) : [];
    const projectArray = projects ? projects.split(",").map(p => p.trim()) : [];
    const locationArray = preferredLocations.split(",").map(l => l.trim());

    const availableCompanies = companies.filter(c =>
      c.jobType.toLowerCase() === preferredJobType.toLowerCase() &&
      c.locations.some(loc => locationArray.includes(loc))
    );

    let advice = [];
    let needsImprovement = false;

    if (Number(cgpa) < 7) { advice.push("Your CGPA is low."); needsImprovement = true; } 
    else advice.push("Your CGPA is good.");

    if (projectArray.length < 5) { advice.push("Add more projects."); needsImprovement = true; }
    if (skillArray.length < 3) { advice.push("Improve your skills."); needsImprovement = true; }
    if (availableCompanies.length === 0) advice.push("No companies match preferences.");

    if (needsImprovement) {
      advice.push("Focus on subjects, aptitude, communication skills.");
      advice.push("Learning Resources: Coursera, Udemy, LinkedIn Learning, LeetCode, PrepInsta.");
    } else advice.push("You are on track for placements.");

    res.json({ collegeName, cgpa, skills: skillArray, projects: projectArray, preferredJobType, preferredLocations: locationArray, availableCompanies, advice });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while generating career advice." });
  }
});

// ===================== START SERVER =====================
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Backend running at http://localhost:${PORT}`));

