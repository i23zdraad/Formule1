require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const makeAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Připojeno k MongoDB");

    const username = "adam"; 

    const user = await User.findOneAndUpdate(
      { username },
      { role: "admin" },
      { new: true }
    );

    if (!user) {
      console.log("❌ Uživatel nenalezen! Zkontroluj jméno.");
      process.exit(1);
    }

    console.log(`✅ Uživatel ${user.username} je nyní: ${user.role}`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Chyba:", err.message);
    process.exit(1);
  }
};

makeAdmin();