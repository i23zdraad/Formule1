const User = require("../models/User");

exports.getUsers = async (req, res) => {
  const users = await User.find().sort({ username: 1 });
  res.render("admin/users", { users });
};

exports.changeRole = async (req, res) => {
  const { role } = req.body;

  // Ochrana: nikdo nesmí změnit roli jinému adminovi (kromě sebe sama, volitelně)
  const targetUser = await User.findById(req.params.id);
  if (targetUser.role === "admin" && req.session.user.id !== targetUser.id.toString()) {
    return res.status(403).send("Nemůžeš měnit roli jinému adminovi");
  }

  await User.findByIdAndUpdate(req.params.id, { role });
  res.redirect("/admin/users");
};