const express = require("express");
const router = express.Router();
const animalController = require("../controllers/animalController");
const requireLogin = require("../middlewares/authMiddleware");
router.get("/test-create", requireLogin, (req, res) => {
    res.send("Tuto stránku uvidí jen přihlášený uživatel.");
   });
   
router.get("/", animalController.getAllAnimals);
router.get("/:id", animalController.getAnimalDetail);
module.exports = router;