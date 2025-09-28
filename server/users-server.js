const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

const User = require("./models/user");
const Artwork = require("./models/artwork");
const artworkRoutes = require("./routes/artwork");

const app = express();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5000",
    "https://mudrart.in"
  ],
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve frontend
app.use(express.static(path.join(__dirname, "../public")));

// MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/coinart";
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// =====================
// Auth Routes
// =====================

// User signup
app.post("/api/signup", async (req, res) => {
  const { role, username, fullname, mobile, email, password } = req.body;
  if (!role || !username || !fullname || !mobile || !email || !password)
    return res.status(400).json({ message: "All fields are required." });

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser)
      return res.status(409).json({ message: "Email or username already exists." });

    const newUser = new User({ role, username, fullname, mobile, email, password });
    await newUser.save();

    res.status(201).json({ message: "Signup successful!" });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
});

// User login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Username and password required" });

  try {
    const user = await User.findOne({ username, password });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    res.status(200).json({
      message: "Login successful",
      user: {
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Artwork routes
app.use("/api/artworks", artworkRoutes);

// Root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Users backend running on http://localhost:${PORT}`));
