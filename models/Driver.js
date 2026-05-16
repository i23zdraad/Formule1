const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nationality: { type: String, required: true },
  age: { type: Number, required: true },
  number: { type: Number, required: true },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true
  },
  description: { type: String, required: true },
  image: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("Driver", driverSchema);