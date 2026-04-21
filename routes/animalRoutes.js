const express = require("express");
const router = express.Router();
const animalController = require("../controllers/animalController");
const requireLogin = require("../middlewares/authMiddleware");
router.get("/", animalController.getAllAnimals);
router.get("/create", requireLogin, animalController.showCreateForm);
router.post("/", requireLogin, animalController.createAnimal);
router.get("/:id/edit", requireLogin, animalController.showEditForm);
router.put("/:id", requireLogin, animalController.updateAnimal);
router.delete("/:id", requireLogin, animalController.deleteAnimal);
router.get("/test-create", requireLogin, (req, res) => {
res.send("Tuto stránku uvidí jen přihlášený uživatel.");
});
router.get("/:id", animalController.getAnimalDetail);
module.exports = router;