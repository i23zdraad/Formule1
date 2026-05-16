const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  founded: { type: Number },
  description: { type: String, required: true },
  logo: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("Team", teamSchema);