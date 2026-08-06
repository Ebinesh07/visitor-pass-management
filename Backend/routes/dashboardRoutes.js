const express = require("express");

const { getDashboard } = require("../controllers/dashboardController");

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
  "/",
  verifyToken,
  authorizeRoles("admin"),
  getDashboard
);

module.exports = router;