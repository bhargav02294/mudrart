const express = require("express");
// ✅ Load .env from the exact path you said
require("dotenv").config({ path: "E:/coin-art/.env" });

const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

const artworkRoutes = require("./routes/artwork");
// ✅ Make sure the filename is routes/inquiry.js (NOT enquiry.js)
const inquiryRoutes = require("./routes/inquiry");

const app = express();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:3000",   // if you run React locally
    "http://localhost:5000",   // if you open index.html directly
    "https://mudrart.in"       // your production frontend
  ],
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve frontend
app.use(express.static(path.join(__dirname, "../public")));

// Serve uploads (if you later save files to disk)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/email_uploads", express.static(path.join(__dirname, "../public/email_uploads")));

// MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/coinart";
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// API routes
app.use("/api/artworks", artworkRoutes);
app.use("/api/inquiries", inquiryRoutes);

// Admin pages (optional)
app.get("/admin/:page", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/admin", req.params.page));
});

// Example Admin Login (placeholder)
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "1234") {
    res.json({ success: true, message: "Login successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Root -> public/index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Start server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () =>
  console.log(`🚀 Admin backend running on http://localhost:${PORT}`)
);
