const VisitorHistory = require("../models/VisitorHistory");

const getAllHistory = async (req, res) => {
  try {

    const {
      search,
      action,
      performedBy,
      startDate,
      endDate,
    } = req.query;

    let filter = {};

    // -----------------------------
    // Action Filter
    // -----------------------------
    if (action && action !== "All") {
      filter.action = action;
    }

    // -----------------------------
    // Performed By Filter
    // -----------------------------
    if (performedBy) {
      filter.performedBy = performedBy;
    }

    // -----------------------------
    // Date Range Filter
    // -----------------------------
    if (startDate && endDate) {

      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };

    }
        // -----------------------------
    // Search Filter
    // -----------------------------
    if (search) {

      filter.$or = [
        {
          action: {
            $regex: search,
            $options: "i",
          },
        },
        {
          remarks: {
            $regex: search,
            $options: "i",
          },
        },
      ];

    }

    // -----------------------------
    // Get History
    // -----------------------------
    const history = await VisitorHistory.find(filter)
      .populate(
        "visitor",
        "visitorName phone company status visitDate"
      )
      .populate(
        "performedBy",
        "name email role"
      )
      .sort({
        createdAt: -1,
      });
          // -----------------------------
    // Response
    // -----------------------------
    return res.status(200).json({
      success: true,
      count: history.length,
      history,
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
  getAllHistory,
};