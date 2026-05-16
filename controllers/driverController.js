const Driver = require("../models/Driver");
const Team = require("../models/Team");

exports.getAllDrivers = async (req, res) => {
  const drivers = await Driver.find().populate("team").sort({ createdAt: -1 });
  res.render("drivers/index", { drivers });
};

exports.getDriverDetail = async (req, res) => {
  const driver = await Driver.findById(req.params.id).populate("team");
  res.render("drivers/show", { driver });
};

exports.showCreateForm = async (req, res) => {
  const teams = await Team.find().sort({ name: 1 });
  res.render("drivers/create", { teams });
};

exports.createDriver = async (req, res) => {
  const { name, nationality, age, number, team, description } = req.body;
  let image = "";
  if (req.file) image = req.file.filename;
  await Driver.create({ name, nationality, age, number, team, description, image });
  res.redirect("/drivers");
};

exports.showEditForm = async (req, res) => {
  const driver = await Driver.findById(req.params.id);
  const teams = await Team.find().sort({ name: 1 });
  res.render("drivers/edit", { driver, teams });
};

exports.updateDriver = async (req, res) => {
  const { name, nationality, age, number, team, description } = req.body;
  const updateData = { name, nationality, age, number, team, description };
  if (req.file) updateData.image = req.file.filename;
  await Driver.findByIdAndUpdate(req.params.id, updateData);
  res.redirect(`/drivers/${req.params.id}`);
};

exports.deleteDriver = async (req, res) => {
  await Driver.findByIdAndDelete(req.params.id);
  res.redirect("/drivers");
};