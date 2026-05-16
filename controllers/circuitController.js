const Circuit = require("../models/Circuit");

exports.getAllCircuits = async (req, res) => {
  const circuits = await Circuit.find().sort({ createdAt: -1 });
  res.render("circuits/index", { circuits });
};

exports.getCircuitDetail = async (req, res) => {
  const circuit = await Circuit.findById(req.params.id);
  res.render("circuits/show", { circuit });
};

exports.showCreateForm = (req, res) => {
  res.render("circuits/create");
};

exports.createCircuit = async (req, res) => {
  const { name, country, length, laps, description } = req.body;
  let image = "";
  if (req.file) image = req.file.filename;
  await Circuit.create({ name, country, length, laps, description, image });
  res.redirect("/circuits");
};

exports.showEditForm = async (req, res) => {
  const circuit = await Circuit.findById(req.params.id);
  res.render("circuits/edit", { circuit });
};

exports.updateCircuit = async (req, res) => {
  const { name, country, length, laps, description } = req.body;
  const updateData = { name, country, length, laps, description };
  if (req.file) updateData.image = req.file.filename;
  await Circuit.findByIdAndUpdate(req.params.id, updateData);
  res.redirect(`/circuits/${req.params.id}`);
};

exports.deleteCircuit = async (req, res) => {
  await Circuit.findByIdAndDelete(req.params.id);
  res.redirect("/circuits");
};