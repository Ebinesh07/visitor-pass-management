const Visitor = require("../models/Visitor");
const Employee = require("../models/Employee");
const VisitorHistory = require("../models/VisitorHistory");

// ======================================================
// REGISTER VISITOR
// ======================================================

const registerVisitor = async (req, res) => {
  try {
    const {
      visitorName,
      phone,
      email,
      company,
      purpose,
      employee,
      visitDate,
      expectedArrivalTime,
    } = req.body;

    // Required validation
    if (
      !visitorName ||
      !phone ||
      !email ||
      !company ||
      !purpose ||
      !employee ||
      !visitDate ||
      !expectedArrivalTime
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Employee exists
    const employeeExists =
      await Employee.findById(employee);

    if (!employeeExists) {
      return res.status(404).json({
        success: false,
        message: "Employee Not Found",
      });
    }

    // ======================================================
    // RULE 1
    // Visitor cannot have more than one active visit
    // ======================================================

    const activeVisitor =
      await Visitor.findOne({
        phone,
        status: {
          $in: [
            "Pending",
            "Approved",
            "Checked-In",
          ],
        },
      });

    if (activeVisitor) {
      return res.status(400).json({
        success: false,
        message:
          "Visitor already has an active visit.",
      });
    }

    // ======================================================
    // RULE 2
    // Duplicate registration on same day
    // ======================================================

    const startDate =
      new Date(visitDate);

    startDate.setHours(0, 0, 0, 0);

    const endDate =
      new Date(visitDate);

    endDate.setHours(
      23,
      59,
      59,
      999
    );

    const duplicate =
      await Visitor.findOne({
        phone,
        visitDate: {
          $gte: startDate,
          $lte: endDate,
        },
      });

    if (duplicate) {
      return res.status(400).json({
        success: false,
        message:
          "Visitor already registered for this date.",
      });
    }

    // ======================================================
    // RULE 3
    // Visit date cannot be in past
    // ======================================================

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const selectedDate =
      new Date(visitDate);

    selectedDate.setHours(
      0,
      0,
      0,
      0
    );

    if (selectedDate < today) {
      return res.status(400).json({
        success: false,
        message:
          "Visit date cannot be earlier than today.",
      });
    }

    // ======================================================
    // RULE 4
    // Today's arrival time
    // ======================================================

    if (
      selectedDate.getTime() ===
      today.getTime()
    ) {

      const now =
        new Date();

      const currentMinutes =
        now.getHours() * 60 +
        now.getMinutes();

      const parts =
        expectedArrivalTime.split(" ");

      if (parts.length !== 2) {
        return res.status(400).json({
          success: false,
          message:
            "Time format must be like 10:30 AM",
        });
      }

      const [time, period] =
        parts;

      let [hours, minutes] =
        time
          .split(":")
          .map(Number);

      if (
        period === "PM" &&
        hours !== 12
      ) {
        hours += 12;
      }

      if (
        period === "AM" &&
        hours === 12
      ) {
        hours = 0;
      }

      const arrivalMinutes =
        hours * 60 + minutes;

      if (
        arrivalMinutes <
        currentMinutes
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Arrival time cannot be earlier than current time.",
        });
      }
    }

    // ======================================================
    // RULE 5
    // Max 3 pending requests
    // ======================================================

    const pendingCount =
      await Visitor.countDocuments({
        employee,
        status: "Pending",
      });

    if (pendingCount >= 3) {
      return res.status(400).json({
        success: false,
        message:
          "Employee already has 3 pending visitor requests.",
      });
    }

    // ======================================================
    // CREATE VISITOR
    // ======================================================

    const visitor =
      await Visitor.create({
        visitorName,
        phone,
        email,
        company,
        purpose,
        employee,
        visitDate,
        expectedArrivalTime,
      });

    // ======================================================
    // HISTORY
    // ======================================================

    await VisitorHistory.create({
      visitor: visitor._id,
      action: "REGISTERED",
      performedBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message:
        "Visitor Registered Successfully",
      visitor,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ======================================================
// GET ALL VISITORS
// ======================================================

const getAllVisitors = async (req, res) => {
  try {

    const visitors = await Visitor.find({
      status: { $ne: "Cancelled" },
    })
      .populate(
        "employee",
        "employeeId name department designation"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: visitors.length,
      visitors,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ======================================================
// APPROVE VISITOR
// ======================================================

const approveVisitor = async (req, res) => {
  try {
    const { remarks } = req.body;

    const visitor = await Visitor.findById(req.params.id);

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: "Visitor Not Found",
      });
    }

   // Employee can approve only assigned visitors
if (req.user.role === "employee") {

  if (!req.user.employee) {
    return res.status(403).json({
      success: false,
      message: "Employee account is not linked.",
    });
  }

  if (
    visitor.employee.toString() !==
    req.user.employee.toString()
  ) {
    return res.status(403).json({
      success: false,
      message:
        "You are not authorized to approve this visitor.",
    });
  }

}

    // Already approved
    if (visitor.status === "Approved") {
      return res.status(400).json({
        success: false,
        message: "Visitor already approved.",
      });
    }

    // Already rejected
    if (visitor.status === "Rejected") {
      return res.status(400).json({
        success: false,
        message:
          "Rejected visitor cannot be approved.",
      });
    }

    // Already checked in
    if (visitor.status === "Checked-In") {
      return res.status(400).json({
        success: false,
        message:
          "Visitor already checked in.",
      });
    }

    // Already checked out
    if (visitor.status === "Checked-Out") {
      return res.status(400).json({
        success: false,
        message:
          "Visitor already checked out.",
      });
    }

    // Cancelled
    if (visitor.status === "Cancelled") {
      return res.status(400).json({
        success: false,
        message:
          "Cancelled visitor cannot be approved.",
      });
    }

    visitor.status = "Approved";
    visitor.remarks = remarks || "";

    await visitor.save();

    await VisitorHistory.create({
      visitor: visitor._id,
      action: "APPROVED",
      performedBy: req.user.id,
      remarks: remarks || "",
    });

    return res.status(200).json({
      success: true,
      message:
        "Visitor Approved Successfully",
      visitor,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ======================================================
// REJECT VISITOR
// ======================================================

const rejectVisitor = async (req, res) => {
  try {
    const { remarks } = req.body;

    const visitor = await Visitor.findById(req.params.id);

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: "Visitor Not Found",
      });
    }

    // Employee can reject only assigned visitors
 if (req.user.role === "employee") {

  if (!req.user.employee) {
    return res.status(403).json({
      success: false,
      message: "Employee account is not linked."
    });
  }

  if (
    visitor.employee.toString() !==
    req.user.employee.toString()
  ) {
    return res.status(403).json({
      success: false,
      message: "Access Denied"
    });
  }

}

    // Already rejected
    if (visitor.status === "Rejected") {
      return res.status(400).json({
        success: false,
        message: "Visitor already rejected.",
      });
    }

    // Already approved
    if (visitor.status === "Approved") {
      return res.status(400).json({
        success: false,
        message:
          "Approved visitor cannot be rejected.",
      });
    }

    // Already checked in
    if (visitor.status === "Checked-In") {
      return res.status(400).json({
        success: false,
        message:
          "Checked-In visitor cannot be rejected.",
      });
    }

    // Already checked out
    if (visitor.status === "Checked-Out") {
      return res.status(400).json({
        success: false,
        message:
          "Checked-Out visitor cannot be rejected.",
      });
    }
// Cancelled
if (visitor.status === "Cancelled") {
  return res.status(400).json({
    success: false,
    message:
      "Cancelled visitor cannot be rejected.",
  });
}

visitor.status = "Rejected";
visitor.remarks = remarks || "";

await visitor.save();

await VisitorHistory.create({
  visitor: visitor._id,
  action: "REJECTED",
  performedBy: req.user.id,
  remarks: remarks || "",
});

return res.status(200).json({
  success: true,
  message: "Visitor Rejected Successfully",
  visitor,
});

} catch (error) {

  console.error(error);

  return res.status(500).json({
    success: false,
    message: error.message,
  });

}
};
// ======================================================
// CHECK-IN VISITOR
// ======================================================

const checkInVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: "Visitor Not Found",
      });
    }

    // Rule 6 - Only approved visitors can check in
    if (visitor.status !== "Approved") {
      return res.status(400).json({
        success: false,
        message:
          "Only approved visitors can check in.",
      });
    }

    // Rule 7 - Already checked in
    if (visitor.checkedIn) {
      return res.status(400).json({
        success: false,
        message:
          "Visitor already checked in.",
      });
    }

    // Already checked out
    if (visitor.checkedOut) {
      return res.status(400).json({
        success: false,
        message:
          "Visitor already checked out.",
      });
    }

    visitor.checkedIn = true;
    visitor.checkInTime = new Date();
    visitor.status = "Checked-In";

    await visitor.save();

    await VisitorHistory.create({
      visitor: visitor._id,
      action: "CHECKED_IN",
      performedBy: req.user.id,
    });

    return res.status(200).json({
      success: true,
      message:
        "Visitor Checked-In Successfully",
      visitor,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ======================================================
// CHECK-OUT VISITOR
// ======================================================

const checkOutVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: "Visitor Not Found",
      });
    }

    // Visitor must be checked in first
    if (!visitor.checkedIn) {
      return res.status(400).json({
        success: false,
        message: "Visitor has not checked in.",
      });
    }

    // Already checked out
    if (visitor.checkedOut) {
      return res.status(400).json({
        success: false,
        message: "Visitor already checked out.",
      });
    }

    // Rule 8 - Checkout time must be later than check-in time
    const checkOutTime = new Date();

    if (
      visitor.checkInTime &&
      checkOutTime <= visitor.checkInTime
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Check-out time must be later than check-in time.",
      });
    }

    visitor.checkedOut = true;
    visitor.checkOutTime = checkOutTime;
    visitor.status = "Checked-Out";

    await visitor.save();

    await VisitorHistory.create({
      visitor: visitor._id,
      action: "CHECKED_OUT",
      performedBy: req.user.id,
    });

    return res.status(200).json({
      success: true,
      message: "Visitor Checked-Out Successfully",
      visitor,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ======================================================
// CANCEL VISITOR
// ======================================================

const cancelVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: "Visitor Not Found",
      });
    }

    // Already Cancelled
    if (visitor.status === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Visitor Already Cancelled",
      });
    }

    // Cannot cancel after check-in
    if (
      visitor.status === "Checked-In" ||
      visitor.status === "Checked-Out"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Checked-In / Checked-Out visitor cannot be cancelled.",
      });
    }

    visitor.status = "Cancelled";

    await visitor.save();

    await VisitorHistory.create({
      visitor: visitor._id,
      action: "CANCELLED",
      performedBy: req.user.id,
    });

    return res.status(200).json({
      success: true,
      message: "Visitor Cancelled Successfully",
      visitor,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ======================================================
// EXPORTS
// ======================================================

module.exports = {
  registerVisitor,
  getAllVisitors,
  approveVisitor,
  rejectVisitor,
  checkInVisitor,
  checkOutVisitor,
  cancelVisitor,
};