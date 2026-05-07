const multer = require("multer");
const path = require("path");
const express = require("express");
const router = express.Router();
const animalController = require("../controllers/animalController");
const requireLogin = require("../middlewares/authMiddleware");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, "public/uploads/");
    },
    filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
    }
   });
   const upload = multer({ storage });
router.get("/", animalController.getAllAnimals);
router.get("/create", requireLogin, animalController.showCreateForm);
router.post("/", requireLogin, upload.single("image"), animalController.createAnimal);
router.get("/:id/edit", requireLogin, animalController.showEditForm);
router.put("/:id", requireLogin, upload.single("image"), animalController.updateAnimal);
router.delete("/:id", requireLogin, animalController.deleteAnimal);
router.get("/test-create", requireLogin, (req, res) => {
res.send("Tuto stránku uvidí jen přihlášený uživatel.");
});
router.get("/:id", animalController.getAnimalDetail);
module.exports = router;