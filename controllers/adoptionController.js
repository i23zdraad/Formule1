const AdoptionRequest = require("../models/AdoptionRequest"); 
 
exports.createRequest = async (req, res) => { 
  const { applicantName, email, message } = req.body; 
 
  await AdoptionRequest.create({ 
    animal: req.params.animalId, 
    applicantName, 
    email, 
    message 
  }); 
 
  res.redirect("/animals"); 
}; 
 
exports.getAllRequests = async (req, res) => { 
  const requests = await AdoptionRequest.find() 
    .populate("animal") 
    .sort({ createdAt: -1 }); 
 
  res.render("adoptions/index", { requests }); 
}; 
 
exports.approveRequest = async (req, res) => { 
  await AdoptionRequest.findByIdAndUpdate(req.params.id, { 
    status: "approved" 
  }); 
 
  res.redirect("/adoptions"); 
}; 
 
exports.rejectRequest = async (req, res) => { 
  await AdoptionRequest.findByIdAndUpdate(req.params.id, { 
    status: "rejected" 
  }); 
 
  res.redirect("/adoptions"); 
}; 