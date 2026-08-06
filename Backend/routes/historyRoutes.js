const express = require("express");

const { getAllHistory } = require("../controllers/historyController");

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
  "/",
  verifyToken,
  authorizeRoles("admin"),
  getAllHistory
);

module.exports = router;