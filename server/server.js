const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

dotenv.config();

const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


const adminAuthRoutes = require("./routes/adminAuth");
const posterRoutes = require("./routes/posterRoutes");

app.use("/api/admin", adminAuthRoutes);
app.use("/api/posters", posterRoutes);
app.use("/uploads", express.static("server/uploads"));
app.use("/api/users", require("./routes/userAuth"));


// Example test route
app.get("/api/test", (req, res) => {
  res.json({ message: "API working 🚀" });
});

// =============================
// PRODUCTION REACT SERVE
// =============================
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});