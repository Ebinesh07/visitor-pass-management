const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
  {
    visitorName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      required: true,
    },

    purpose: {
      type: String,
      required: true,
    },

    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    visitDate: {
      type: Date,
      required: true,
    },

    expectedArrivalTime: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Rejected",
        "Checked-In",
        "Checked-Out",
        "Cancelled",
      ],
      default: "Pending",
    },

    checkInTime: {
      type: Date,
    },

    checkedIn: {
        type: Boolean,
        default: false,
    },

    checkOutTime: {
      type: Date,
    },
    checkedOut: {
     type: Boolean,
     default: false,
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

module.exports = mongoose.model("Visitor", visitorSchema);