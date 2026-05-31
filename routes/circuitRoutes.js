const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const circuitController = require("../controllers/circuitController");
const requireRole = require("../middlewares/roleMiddleware");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

const requireEditor = requireRole("spravce", "admin");

router.get("/", circuitController.getAllCircuits);
router.get("/create", requireEditor, circuitController.showCreateForm);
router.post("/", requireEditor, upload.single("image"), circuitController.createCircuit);
router.get("/:id/edit", requireEditor, circuitController.showEditForm);
router.put("/:id", requireEditor, upload.single("image"), circuitController.updateCircuit);
router.delete("/:id", requireEditor, circuitController.deleteCircuit);
router.get("/:id", circuitController.getCircuitDetail);

module.exports = router;