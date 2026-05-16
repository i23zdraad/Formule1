require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const methodOverride = require("method-override");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const circuitRoutes = require("./routes/circuitRoutes");
const driverRoutes = require("./routes/driverRoutes");
const teamRoutes = require("./routes/teamRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
connectDB();

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

app.use("/", authRoutes);
app.use("/circuits", circuitRoutes);
app.use("/drivers", driverRoutes);
app.use("/teams", teamRoutes);
app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
    res.redirect("/circuits");
});

app.listen(PORT, () => {
    console.log(`Server běží na adrese http://localhost:${PORT}`);
});