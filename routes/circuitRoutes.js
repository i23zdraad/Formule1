const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const circuitController = require("../controllers/circuitController");
const requireLogin = require("../middlewares/authMiddleware");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.get("/", circuitController.getAllCircuits);
router.get("/:id", circuitController.getCircuitDetail);

router.get("/create", requireLogin, circuitController.showCreateForm);
router.post("/", requireLogin, upload.single("image"), circuitController.createCircuit);
router.get("/:id/edit", requireLogin, circuitController.showEditForm);
router.put("/:id", requireLogin, upload.single("image"), circuitController.updateCircuit);
router.delete("/:id", requireLogin, circuitController.deleteCircuit);

module.exports = router;