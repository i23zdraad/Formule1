const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  founded: { type: Number },
  description: { type: String, required: true },
  logo: { type: String, default: "" },      // logo týmu
  carImage: { type: String, default: "" }   // monopost/tým
}, { timestamps: true });

module.exports = mongoose.model("Team", teamSchema);