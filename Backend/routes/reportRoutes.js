const express = require("express");

const { getVisitorReport } = require("../controllers/reportController");

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
  "/",
  verifyToken,
  authorizeRoles("admin"),
  getVisitorReport
);

module.exports = router;