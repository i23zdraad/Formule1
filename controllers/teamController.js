const Team = require("../models/Team");

exports.getAllTeams = async (req, res) => {
  const teams = await Team.find().sort({ createdAt: -1 });
  res.render("teams/index", { teams });
};

exports.getTeamDetail = async (req, res) => {
  const team = await Team.findById(req.params.id);
  res.render("teams/show", { team });
};

exports.showCreateForm = (req, res) => {
  res.render("teams/create");
};

exports.createTeam = async (req, res) => {
  const { name, country, founded, description } = req.body;
  let logo = "";
  let carImage = "";

  if (req.files) {
    if (req.files.logo) logo = req.files.logo[0].filename;
    if (req.files.carImage) carImage = req.files.carImage[0].filename;
  }

  await Team.create({ name, country, founded, description, logo, carImage });
  res.redirect("/teams");
};

exports.showEditForm = async (req, res) => {
  const team = await Team.findById(req.params.id);
  res.render("teams/edit", { team });
};

exports.updateTeam = async (req, res) => {
  const { name, country, founded, description } = req.body;
  const updateData = { name, country, founded, description };

  if (req.files) {
    if (req.files.logo) updateData.logo = req.files.logo[0].filename;
    if (req.files.carImage) updateData.carImage = req.files.carImage[0].filename;
  }

  await Team.findByIdAndUpdate(req.params.id, updateData);
  res.redirect(`/teams/${req.params.id}`);
};

exports.deleteTeam = async (req, res) => {
  await Team.findByIdAndDelete(req.params.id);
  res.redirect("/teams");
};