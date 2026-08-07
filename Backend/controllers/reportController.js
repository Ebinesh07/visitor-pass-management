const Visitor = require("../models/Visitor");

const getVisitorReport = async (req, res) => {
  try {

    const {
      status,
      search,
      employee,
      startDate,
      endDate,
      reportType,
    } = req.query;

    let filter = {};

    // -----------------------------
    // Status Filter
    // -----------------------------
    if (status && status !== "All") {
      filter.status = status;
    }

    // -----------------------------
    // Employee Filter
    // -----------------------------
    if (employee) {
      filter.employee = employee;
    }

    // -----------------------------
    // Search Filter
    // -----------------------------
    if (search) {
      filter.$or = [
        {
          visitorName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          phone: {
            $regex: search,
            $options: "i",
          },
        },
        {
          company: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }
        // -----------------------------
    // Date Filters
    // -----------------------------
    if (reportType === "today") {

      const today = new Date();

      const start = new Date(today);
      start.setHours(0, 0, 0, 0);

      const end = new Date(today);
      end.setHours(23, 59, 59, 999);

      filter.visitDate = {
        $gte: start,
        $lte: end,
      };

    } else if (reportType === "week") {

      const today = new Date();

      const firstDay = new Date(today);
      firstDay.setDate(today.getDate() - today.getDay());
      firstDay.setHours(0, 0, 0, 0);

      const lastDay = new Date(firstDay);
      lastDay.setDate(firstDay.getDate() + 6);
      lastDay.setHours(23, 59, 59, 999);

      filter.visitDate = {
        $gte: firstDay,
        $lte: lastDay,
      };

    } else if (startDate && endDate) {

      filter.visitDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };

    }
        // -----------------------------
    // Get Visitors
    // -----------------------------
    const visitors = await Visitor.find(filter)
      .populate(
        "employee",
        "employeeId name department designation"
      )
      .sort({ visitDate: -1 });

    // -----------------------------
    // Statistics
    // -----------------------------
    const statistics = {
      total: visitors.length,
      pending: visitors.filter(
        (v) => v.status === "Pending"
      ).length,
      approved: visitors.filter(
        (v) => v.status === "Approved"
      ).length,
      rejected: visitors.filter(
        (v) => v.status === "Rejected"
      ).length,
      checkedIn: visitors.filter(
        (v) => v.status === "Checked-In"
      ).length,
      checkedOut: visitors.filter(
        (v) => v.status === "Checked-Out"
      ).length,
      cancelled: visitors.filter(
        (v) => v.status === "Cancelled"
      ).length,
    };

    return res.status(200).json({
      success: true,
      count: visitors.length,
      statistics,
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

module.exports = {
  getVisitorReport,
};