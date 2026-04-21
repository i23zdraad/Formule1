require("dotenv").config();
const express = require("express");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const animalRoutes = require("./routes/animalRoutes");


const path = require("path");
const session = require("express-session");

const app = express();
connectDB();
const PORT = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
const methodOverride = require("method-override");
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
app.use("/animals", animalRoutes);
app.get("/", (req, res) => {
    res.redirect("/animals"); 
});
app.listen(PORT, () => {
 console.log(`Server běží na adrese http://localhost:${PORT}`);
});