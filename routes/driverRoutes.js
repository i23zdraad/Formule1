const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const driverController = require("../controllers/driverController");
const requireLogin = require("../middlewares/authMiddleware");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.get("/", driverController.getAllDrivers);
router.get("/:id", driverController.getDriverDetail);

router.get("/create", requireLogin, driverController.showCreateForm);
router.post("/", requireLogin, upload.single("image"), driverController.createDriver);
router.get("/:id/edit", requireLogin, driverController.showEditForm);
router.put("/:id", requireLogin, upload.single("image"), driverController.updateDriver);
router.delete("/:id", requireLogin, driverController.deleteDriver);

module.exports = router;