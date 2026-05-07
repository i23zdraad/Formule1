const mongoose = require("mongoose"); 
const adoptionRequestSchema = new mongoose.Schema({ 
animal: { 
type: mongoose.Schema.Types.ObjectId, 
ref: "Animal" 
}, 
applicantName: String, 
email: String, 
message: String, 
status: { 
type: String, 
default: "pending" 
} 
}, { timestamps: true }); 
module.exports = mongoose.model("AdoptionRequest", adoptionRequestSchema); 