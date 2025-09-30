const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  state: { type: String, required: true, trim: true },
  cutoff: { type: Number, required: true, min: 0 },
  type: { 
    type: String, 
    required: true, 
    enum: ["Engineering", "Arts", "Law", "Medical"] 
  },
  category: { 
    type: String, 
    required: true, 
    enum: ["General", "SC", "ST", "OBC", "BC", "MBC"] 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("College", collegeSchema);
