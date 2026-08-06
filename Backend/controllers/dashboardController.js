const Employee = require("../models/Employee");
const Visitor = require("../models/Visitor");

const getDashboard = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();

    const totalVisitors = await Visitor.countDocuments();

    const pendingVisitors = await Visitor.countDocuments({
      status: "Pending",
    });

    const approvedVisitors = await Visitor.countDocuments({
      status: "Approved",
    });

    const checkedInVisitors = await Visitor.countDocuments({
      status: "Checked-In",
    });

    const checkedOutVisitors = await Visitor.countDocuments({
      status: "Checked-Out",
    });

    const rejectedVisitors = await Visitor.countDocuments({
      status: "Rejected",
    });

    const cancelledVisitors = await Visitor.countDocuments({
      status: "Cancelled",
    });

    res.status(200).json({
      success: true,
      dashboard: {
        totalEmployees,
        totalVisitors,
        pendingVisitors,
        approvedVisitors,
        checkedInVisitors,
        checkedOutVisitors,
        rejectedVisitors,
        cancelledVisitors,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};