const express = require("express");

const {
  addEmployee,
  getAllEmployees,
  getEmployeeById,
   updateEmployee,
   deleteEmployee,
} = require("../controllers/employeeController");


const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  verifyToken,
  authorizeRoles("admin"),
  addEmployee
);

router.get(
  "/",
  verifyToken,
  authorizeRoles("admin"),
  getAllEmployees
);

router.get(
    "/:id",
     verifyToken,
      authorizeRoles("admin"), 
      getEmployeeById
    );

router.put(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  updateEmployee
);

router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  deleteEmployee
);

module.exports = router;