const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const rolesRoutes = require("./routes/roles");
const geoAiRoutes = require("./routes/geoai");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const configuredOrigins = [
  process.env.CLIENT_URL,
  process.env.CLIENT_URLS,
  process.env.FRONTEND_URL,
]
  .filter(Boolean)
  .flatMap((value) =>
    String(value)
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
  );
const allowedOrigins = new Set([
  ...configuredOrigins,
  "http://localhost:5173",
  "http://localhost:8080",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:8080",
]);

// Middleware
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`Origin ${origin} is not allowed by CORS`));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Root route
app.get("/", (req, res) => {
  res.send("Verdolive API is running");
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "ok",
    uptime: process.uptime(),
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/roles", rolesRoutes);
app.use("/api/geoai", geoAiRoutes);

const startServer = async () => {
  if (!process.env.MONGO_URI) {
    console.error("MongoDB connection error: MONGO_URI is not defined.");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    if (process.env.NODE_ENV !== "production") {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    }
  } catch (err) {
    if (err.code === "ENOTFOUND" && err.hostname) {
      console.error(
        `MongoDB connection error: could not resolve "${err.hostname}". Check that your Atlas host in MONGO_URI is correct and still exists.`
      );
    } else {
      console.error("MongoDB connection error:", err);
    }

    process.exit(1);
  }
};

startServer();

// Export for Vercel
module.exports = app;
