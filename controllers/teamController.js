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
  if (req.file) logo = req.file.filename;
  await Team.create({ name, country, founded, description, logo });
  res.redirect("/teams");
};

exports.showEditForm = async (req, res) => {
  const team = await Team.findById(req.params.id);
  res.render("teams/edit", { team });
};

exports.updateTeam = async (req, res) => {
  const { name, country, founded, description } = req.body;
  const updateData = { name, country, founded, description };
  if (req.file) updateData.logo = req.file.filename;
  await Team.findByIdAndUpdate(req.params.id, updateData);
  res.redirect(`/teams/${req.params.id}`);
};

exports.deleteTeam = async (req, res) => {
  await Team.findByIdAndDelete(req.params.id);
  res.redirect("/teams");
};