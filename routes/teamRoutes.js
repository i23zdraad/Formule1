const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const teamController = require("../controllers/teamController");
const requireLogin = require("../middlewares/authMiddleware");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.get("/", teamController.getAllTeams);
router.get("/:id", teamController.getTeamDetail);

router.get("/create", requireLogin, teamController.showCreateForm);
router.post("/", requireLogin, upload.single("image"), teamController.createTeam);
router.get("/:id/edit", requireLogin, teamController.showEditForm);
router.put("/:id", requireLogin, upload.single("image"), teamController.updateTeam);
router.delete("/:id", requireLogin, teamController.deleteTeam);

module.exports = router;