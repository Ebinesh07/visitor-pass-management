const mongoose = require("mongoose");

const visitorHistorySchema = new mongoose.Schema(
  {
    visitor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Visitor",
      required: true,
    },

    action: {
      type: String,
      enum: [
        "REGISTERED",
        "APPROVED",
        "REJECTED",
        "CHECKED_IN",
        "CHECKED_OUT",
        "CANCELLED",
      ],
      required: true,
    },

    performedBy: {
      type: String,
      enum: ["admin", "employee", "receptionist"],
      required: true,
    },

    remarks: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "VisitorHistory",
  visitorHistorySchema
);