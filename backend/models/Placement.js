const mongoose = require("mongoose");

const PlacementSchema = new mongoose.Schema({
  collegeName: { type: String, required: true },
  skills: { type: [String], required: true },
  projects: { type: String, default: "No projects listed" },
  preferredJobType: { type: String, required: true },
  preferredLocation: { type: String, required: true },
  preferredCompany: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Placement", PlacementSchema);
