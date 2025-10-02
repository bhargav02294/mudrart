const express = require("express");
require("dotenv").config({ path: "E:/coin-art/.env" });
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes
const artworkRoutes = require("./routes/artwork");
const inquiryRoutes = require("./routes/inquiry");

const app = express();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5000",
    "http://localhost:5001",
    "https://mudrart-admin.onrender.com"
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploads folder
const uploadDir = path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadDir));

// Serve admin frontend
app.use(express.static(path.join(__dirname, "../public")));
app.use("/admin", express.static(path.join(__dirname, "../public/admin")));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));



// API routes
app.use("/api/artworks", artworkRoutes);
app.use("/api/inquiries", inquiryRoutes);

// Admin login example
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "1234") {
    res.json({ success: true, message: "Login successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Admin pages
app.get("/admin/:page", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/admin", req.params.page));
});

// Root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Start server
const PORT = process.env.PORT_ADMIN || 5001;
app.listen(PORT, () => console.log(`🚀 Admin backend running on port ${PORT}`));
