const express = require("express"); 
const router = express.Router(); 
const requireLogin = require("../middlewares/authMiddleware"); 
const adoptionController = require("../controllers/adoptionController"); 
router.post("/:animalId", adoptionController.createRequest); 
router.get("/", requireLogin, adoptionController.getAllRequests); 
router.post("/:id/approve", requireLogin, adoptionController.approveRequest); 
router.post("/:id/reject", requireLogin, adoptionController.rejectRequest); 
module.exports = router;