const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/mongodb");

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/abroad-studies", require("./routes/abroadStudies"));
app.use("/api/domestic-colleges", require("./routes/colleges"));
app.use("/api/career-advice", require("./routes/placements"));
app.use("/api/auth", require("./routes/auth")); 

app.get("/", (req, res) => {
  res.send("✅ Career Guidance API running with MongoDB Atlas");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
