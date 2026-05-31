// Použití: requireRole("admin") nebo requireRole("spravce", "admin")
const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.session.user) {
      return res.redirect("/login");
    }

    if (!allowedRoles.includes(req.session.user.role)) {
      return res.status(403).send("Přístup zamítnut – nedostatečná oprávnění");
    }

    next();
  };
};

module.exports = requireRole;