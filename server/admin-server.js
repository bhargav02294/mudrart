const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const artworkRoutes = require("./routes/artwork");
const inquiryRoutes = require("./routes/inquiry");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve frontend
app.use(express.static(path.join(__dirname, "../public")));

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/coinart";
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use("/api/artworks", artworkRoutes);
app.use("/api/inquiries", inquiryRoutes);

app.get("/admin/:page", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/admin", req.params.page));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

const PORT = process.env.PORT_ADMIN || 5001;
app.listen(PORT, () => console.log(`🚀 Admin backend running on ${PORT}`));
