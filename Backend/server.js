const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const verifyToken = require("./middleware/authMiddleware");

const authorizeRoles = require("./middleware/roleMiddleware");

const employeeRoutes = require("./routes/employeeRoutes");

console.log("Employee Routes Loaded");


const authRoutes = require("./routes/authRoutes");

const visitorRoutes = require("./routes/visitorRoutes");

const historyRoutes = require("./routes/historyRoutes");

const dashboardRoutes = require("./routes/dashboardRoutes");

const reportRoutes = require("./routes/reportRoutes");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/visitors", visitorRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reports", reportRoutes);

// Test Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Visitor Pass Management Backend Running Successfully"
  });
});

app.get("/api/profile", verifyToken, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Protected Route Accessed Successfully",
    user: req.user,
  });
});

app.get(
  "/api/admin",
  verifyToken,
  authorizeRoles("admin"),
  (req, res) => {

    res.json({
      success: true,
      message: "Welcome Admin"
    });

  }
);
// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on Port ${PORT}`);
});