const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const requireRole = require("../middlewares/roleMiddleware");

router.get("/users", requireRole("admin"), adminController.getUsers);
router.post("/users/:id/role", requireRole("admin"), adminController.changeRole);

module.exports = router;