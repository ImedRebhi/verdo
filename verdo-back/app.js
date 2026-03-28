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
// Render will automatically inject a PORT, but we use 5000 as a fallback
const PORT = process.env.PORT || 5000;

// Gather all possible frontend URLs from environment variables
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

// Add local development URLs to the allowed set
const allowedOrigins = new Set([
  ...configuredOrigins,
  "http://localhost:5173",
  "http://localhost:8080",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:8080",
]);

// --- Middleware ---
app.use(
  cors({
    origin(origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
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

// --- Routes ---

// Root route - Important for health checks
app.get("/", (req, res) => {
  res.send("Verdolive API is running");
});

// Health check route
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

// --- Server Lifecycle ---

const startServer = async () => {
  if (!process.env.MONGO_URI) {
    console.error("CRITICAL: MONGO_URI is not defined in environment variables.");
    process.exit(1);
  }

  try {
    // 1. Connect to Database
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // 2. Start the Listener
    // FIX: We removed the "if !== production" check so it runs on Render!
    // Added '0.0.0.0' to ensure Render's network can reach the app.
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server successfully running on port ${PORT}`);
    });

  } catch (err) {
    if (err.code === "ENOTFOUND" && err.hostname) {
      console.error(
        `❌ MongoDB Connection Error: Could not resolve "${err.hostname}".`
      );
    } else {
      console.error("❌ MongoDB Connection Error:", err);
    }
    process.exit(1);
  }
};

startServer();

// Export for Vercel/Testing
module.exports = app;
