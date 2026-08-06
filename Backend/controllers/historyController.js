const VisitorHistory = require("../models/VisitorHistory");

const getAllHistory = async (req, res) => {
  try {
    const history = await VisitorHistory.find()
      .populate("visitor", "visitorName phone company status")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: history.length,
      history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllHistory,
};