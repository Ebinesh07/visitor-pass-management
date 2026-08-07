const Employee = require("../models/Employee");
const Visitor = require("../models/Visitor");

const getDashboard = async (req, res) => {
  try {

    // Employee Count
    const totalEmployees =
      await Employee.countDocuments();

    // Visitor Count
    const totalVisitors =
      await Visitor.countDocuments();

    // Pending Visitors
    const pendingVisitors =
      await Visitor.countDocuments({
        status: "Pending",
      });

    // Approved Visitors
    const approvedVisitors =
      await Visitor.countDocuments({
        status: "Approved",
      });

    // Checked-In Visitors
    const checkedInVisitors =
      await Visitor.countDocuments({
        status: "Checked-In",
      });
          // Checked-Out Visitors
    const checkedOutVisitors =
      await Visitor.countDocuments({
        status: "Checked-Out",
      });

    // Rejected Visitors
    const rejectedVisitors =
      await Visitor.countDocuments({
        status: "Rejected",
      });

    // Cancelled Visitors
    const cancelledVisitors =
      await Visitor.countDocuments({
        status: "Cancelled",
      });

    // Today's Visitors
    const today = new Date();

    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    const todayVisitors =
      await Visitor.countDocuments({
        visitDate: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      });

    // Visitors Currently Inside
    const visitorsInside =
      await Visitor.countDocuments({
        status: "Checked-In",
      });
          return res.status(200).json({
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
        todayVisitors,
        visitorsInside,
      },
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getDashboard,
};