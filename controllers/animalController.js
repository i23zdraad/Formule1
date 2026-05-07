const Animal = require("../models/Animal");
exports.getAllAnimals = async (req, res) => {
 const animals = await Animal.find().sort({ createdAt: -1 });
 res.render("animals/index", { animals });
};
exports.getAnimalDetail = async (req, res) => {
 const animal = await Animal.findById(req.params.id);
 res.render("animals/show", { animal });
};
exports.showCreateForm = (req, res) => {
 res.render("animals/create");
};
exports.createAnimal = async (req, res) => {
    const { name, species, age, description } = req.body;
    let image = "";
    if (req.file) {
    image = req.file.filename;
    }
    await Animal.create({
    name,
    species,
    age,
    description,
    image
    });
    res.redirect("/animals");
   };
   
exports.showEditForm = async (req, res) => {
    const animal = await Animal.findById(req.params.id);
    res.render("animals/edit", { animal });
   };
   exports.updateAnimal = async (req, res) => {
    const { name, species, age, description } = req.body;
    const updateData = {
    name,
    species,
    age,
    description
    };
    if (req.file) {
    updateData.image = req.file.filename;
    }
    await Animal.findByIdAndUpdate(req.params.id, updateData);
    res.redirect(`/animals/${req.params.id}`);
   };
   
   exports.deleteAnimal = async (req, res) => {
    await Animal.findByIdAndDelete(req.params.id);
    res.redirect("/animals");
   };
   