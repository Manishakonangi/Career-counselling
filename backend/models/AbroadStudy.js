const mongoose = require("mongoose");

const abroadStudySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  level: { type: String, required: true },
  course: { type: String, required: true },
  country: { type: String, required: true },
  exam: { type: String, required: true },
  marks: { type: Number, required: true },
  budget: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AbroadStudy", abroadStudySchema);
