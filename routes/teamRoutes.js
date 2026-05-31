const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const teamController = require("../controllers/teamController");
const requireRole = require("../middlewares/roleMiddleware");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

const requireEditor = requireRole("spravce", "admin");

router.get("/", teamController.getAllTeams);
router.get("/create", requireEditor, teamController.showCreateForm);
router.post("/", requireEditor, upload.fields([
  { name: "logo", maxCount: 1 },
  { name: "carImage", maxCount: 1 }
]), teamController.createTeam);
router.get("/:id/edit", requireEditor, teamController.showEditForm);
router.put("/:id", requireEditor, upload.fields([
  { name: "logo", maxCount: 1 },
  { name: "carImage", maxCount: 1 }
]), teamController.updateTeam);
router.delete("/:id", requireEditor, teamController.deleteTeam);
router.get("/:id", teamController.getTeamDetail);

module.exports = router;