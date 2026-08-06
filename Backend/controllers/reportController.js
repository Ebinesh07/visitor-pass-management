const Visitor = require("../models/Visitor");

const getVisitorReport = async (req, res) => {
  try {
    const { status, date, search } = req.query;

    let filter = {};

    // Status Filter
    if (status) {
      filter.status = status;
    }

    // Date Filter
    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);

      filter.visitDate = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    // Search Filter
    if (search) {
      filter.$or = [
        { visitorName: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }

    const visitors = await Visitor.find(filter)
      .populate(
        "employee",
        "employeeId name department designation"
      )
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

module.exports = {
  getVisitorReport,
};