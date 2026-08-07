const express = require("express");

const { registerVisitor,
        getAllVisitors,
        approveVisitor,
        rejectVisitor,
        checkInVisitor,
        checkOutVisitor,
        cancelVisitor,
        } = require("../controllers/visitorController");

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Register Visitor (Receptionist/Admin)
router.post(
  "/",
  verifyToken,
  authorizeRoles("admin", "receptionist"),
  registerVisitor
);
router.get(
  "/",
  verifyToken,
  authorizeRoles(
    "admin",
    "receptionist",
    "employee"
  ),
  getAllVisitors
);
router.put(
  "/approve/:id",
  verifyToken,
  authorizeRoles("employee", "admin"),
  approveVisitor
);
router.put(
  "/reject/:id",
  verifyToken,
  authorizeRoles("employee", "admin"),
  rejectVisitor
);
router.put(
  "/checkin/:id",
  verifyToken,
  authorizeRoles("receptionist", "admin"),
  checkInVisitor
);
router.put(
  "/checkout/:id",
  verifyToken,
  authorizeRoles("receptionist", "admin"),
  checkOutVisitor
);
router.put(
  "/cancel/:id",
  verifyToken,
  authorizeRoles("admin", "receptionist"),
  cancelVisitor
);

module.exports = router;