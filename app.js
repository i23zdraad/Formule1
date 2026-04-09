require("dotenv").config();
const express = require("express");

const connectDB = require("./config/db");
const animalRoutes = require("./routes/animalRoutes");


const path = require("path");
const app = express();
connectDB();
const PORT = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/animals", animalRoutes);
app.get("/", (req, res) => {
    res.redirect("/animals"); 
});
app.listen(PORT, () => {
 console.log(`Server běží na adrese http://localhost:${PORT}`);
});