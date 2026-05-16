const mongoose = require("mongoose");

const circuitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  length: { type: Number, required: true },
  laps: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("Circuit", circuitSchema);