const Visitor = require("../models/Visitor");
const Employee = require("../models/Employee");

const VisitorHistory = require("../models/VisitorHistory");

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
    

    // Check required fields
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

    // Rule 1 - Check active visit
const activeVisitor = await Visitor.findOne({
  phone: phone,
  status: {
    $in: ["Pending", "Approved", "Checked-In"],
  },
});


if (activeVisitor) {
  return res.status(400).json({
    success: false,
    message: "Visitor Already Has An Active Visit",
  });
}

// Rule 2 - Duplicate registration on same date
const existingVisitor = await Visitor.findOne({
  phone,
  visitDate: new Date(visitDate),
});

if (existingVisitor) {
  return res.status(400).json({
    success: false,
    message: "Visitor Already Registered For This Date",
  });
}


// Rule 3 - Visit date cannot be in the past
const today = new Date();
today.setHours(0, 0, 0, 0);

const selectedDate = new Date(visitDate);
selectedDate.setHours(0, 0, 0, 0);

if (selectedDate < today) {
  return res.status(400).json({
    success: false,
    message: "Visit Date Cannot Be In The Past",
  });
}

// Rule 4 - Arrival time cannot be earlier than current time (for today's visits)

const currentDate = new Date();

const visit = new Date(visitDate);

if (visit.toDateString() === currentDate.toDateString()) {

  const currentMinutes =
    currentDate.getHours() * 60 + currentDate.getMinutes();

  const [time, period] = expectedArrivalTime.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  const arrivalMinutes = hours * 60 + minutes;

  if (arrivalMinutes < currentMinutes) {
    return res.status(400).json({
      success: false,
      message:
        "Expected Arrival Time Cannot Be Earlier Than Current Time",
    });
  }
}

// Rule 5 - Maximum 3 Pending Requests Per Employee

const pendingRequests = await Visitor.countDocuments({
  employee: employee,
  status: "Pending",
});

if (pendingRequests >= 3) {
  return res.status(400).json({
    success: false,
    message: "Employee Already Has Maximum 3 Pending Visitor Requests",
  });
}

    // Check employee exists
    const employeeExists = await Employee.findById(employee);

    if (!employeeExists) {
      return res.status(404).json({
        success: false,
        message: "Employee Not Found",
      });
    }

    // Create visitor
    const visitor = await Visitor.create({
      visitorName,
      phone,
      email,
      company,
      purpose,
      employee,
      visitDate,
      expectedArrivalTime,
    });
    await VisitorHistory.create({
  visitor: visitor._id,
  action: "REGISTERED",
  performedBy: req.user.role,
});

    res.status(201).json({
      success: true,
      message: "Visitor Registered Successfully",
      visitor,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find({
  status: { $ne: "Cancelled" }
})
      .populate("employee", "employeeId name department designation")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: visitors.length,
      visitors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

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
    // Prevent approving again
if (visitor.status === "Approved") {
  return res.status(400).json({
    success: false,
    message: "Visitor Already Approved",
  });
}

    visitor.status = "Approved";
    visitor.remarks = remarks || "";

    await visitor.save();

    await VisitorHistory.create({
  visitor: visitor._id,
  action: "APPROVED",
  performedBy: req.user.role,
  remarks: remarks || "",
});

    res.status(200).json({
      success: true,
      message: "Visitor Approved Successfully",
      visitor,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

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

    visitor.status = "Rejected";
    visitor.remarks = remarks || "";

    await visitor.save();

    await VisitorHistory.create({
  visitor: visitor._id,
  action: "REJECTED",
  performedBy: req.user.role,
  remarks: remarks || "",
});

    res.status(200).json({
      success: true,
      message: "Visitor Rejected Successfully",
      visitor,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const checkInVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: "Visitor Not Found",
      });
    }

    // Rule 6
    if (visitor.status !== "Approved") {
      return res.status(400).json({
        success: false,
        message: "Only Approved Visitors Can Check-In",
      });
    }

    // Rule 7
    if (visitor.checkedIn) {
      return res.status(400).json({
        success: false,
        message: "Visitor Already Checked-In",
      });
    }

    visitor.checkedIn = true;
    visitor.checkInTime = new Date();
    visitor.status = "Checked-In";

    await visitor.save();
    await VisitorHistory.create({
  visitor: visitor._id,
  action: "CHECKED_IN",
  performedBy: req.user.role,
});

    res.status(200).json({
      success: true,
      message: "Visitor Checked-In Successfully",
      visitor,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

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
        message: "Visitor Not Checked-In",
      });
    }

    // Already checked out
    if (visitor.checkedOut) {
      return res.status(400).json({
        success: false,
        message: "Visitor Already Checked-Out",
      });
    }

    visitor.checkedOut = true;
    visitor.checkOutTime = new Date();
    visitor.status = "Checked-Out";

    await visitor.save();
    await VisitorHistory.create({
  visitor: visitor._id,
  action: "CHECKED_OUT",
  performedBy: req.user.role,
});

    res.status(200).json({
      success: true,
      message: "Visitor Checked-Out Successfully",
      visitor,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const cancelVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: "Visitor Not Found",
      });
    }

    visitor.status = "Cancelled";

    await visitor.save();
    await VisitorHistory.create({
  visitor: visitor._id,
  action: "CANCELLED",
  performedBy: req.user.role,
});

    res.status(200).json({
      success: true,
      message: "Visitor Cancelled Successfully",
      visitor,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerVisitor,
  getAllVisitors,
  approveVisitor,
  rejectVisitor,
  checkInVisitor,
  checkOutVisitor,
  cancelVisitor,
};