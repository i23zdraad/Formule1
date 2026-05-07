const mongoose = require("mongoose"); 
 
const animalSchema = new mongoose.Schema({ 
  name: { 
    type: String, 
    required: true 
  }, 
  species: { 
    type: String, 
    required: true 
  }, 
  age: { 
    type: Number, 
    required: true 
  }, 
  description: { 
    type: String, 
    required: true 
  },
  image: {
    type: String,
    default: ""
   }
   
  
  
}, { timestamps: true }); 
 
module.exports = mongoose.model("Animal", animalSchema); 