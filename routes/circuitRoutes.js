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

// 1. Seznam (musí být před /:id)
router.get("/", circuitController.getAllCircuits);

// 2. Konkrétní cesty (musí být před /:id)
router.get("/create", requireLogin, circuitController.showCreateForm);
router.post("/", requireLogin, upload.single("image"), circuitController.createCircuit);

// 3. Editace (musí být před /:id)
router.get("/:id/edit", requireLogin, circuitController.showEditForm);
router.put("/:id", requireLogin, upload.single("image"), circuitController.updateCircuit);
router.delete("/:id", requireLogin, circuitController.deleteCircuit);

// 4. Detail – VŽDY POSLEDNÍ!
router.get("/:id", circuitController.getCircuitDetail);

module.exports = router;