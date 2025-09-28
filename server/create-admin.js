const mongoose = require("mongoose");
require("dotenv").config();
const Admin = require("./models/admin");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/coinart";

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

const adminData = {
  username: "admin",      // ✅ Change as you like
  password: "1234"    // ✅ Change as you like
};

async function createAdmin() {
  try {
    const exists = await Admin.findOne({ username: adminData.username });
    if (exists) {
      console.log("⚠️ Admin already exists:", exists.username);
      mongoose.connection.close();
      return;
    }

    const admin = new Admin(adminData);
    await admin.save();
    console.log("✅ Admin created:", admin.username);
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
}

createAdmin();
