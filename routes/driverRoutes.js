const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const driverController = require("../controllers/driverController");
const requireRole = require("../middlewares/roleMiddleware");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

const requireEditor = requireRole("spravce", "admin");

router.get("/", driverController.getAllDrivers);
router.get("/create", requireEditor, driverController.showCreateForm);
router.post("/", requireEditor, upload.single("image"), driverController.createDriver);
router.get("/:id/edit", requireEditor, driverController.showEditForm);
router.put("/:id", requireEditor, upload.single("image"), driverController.updateDriver);
router.delete("/:id", requireEditor, driverController.deleteDriver);
router.get("/:id", driverController.getDriverDetail);

module.exports = router;