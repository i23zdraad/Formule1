const express = require("express");
const router = express.Router();
const animalController = require("../controllers/animalController");
router.get("/", animalController.getAllAnimals);
router.get("/:id", animalController.getAnimalDetail);
module.exports = router;