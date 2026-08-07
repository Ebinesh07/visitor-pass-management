import api from "./api";

const visitorService = {
  // Get All Visitors
  getAllVisitors: async () => {
    const response = await api.get("/visitors");
    return response.data;
  },

  // Register Visitor
  registerVisitor: async (visitorData) => {
    const response = await api.post(
      "/visitors",
      visitorData
    );
    return response.data;
  },

  // Approve Visitor
  approveVisitor: async (id, remarks = "") => {
    const response = await api.put(
      `/visitors/approve/${id}`,
      {
        remarks,
      }
    );

    return response.data;
  },

  // Reject Visitor
  rejectVisitor: async (id, remarks = "") => {
    const response = await api.put(
      `/visitors/reject/${id}`,
      {
        remarks,
      }
    );

    return response.data;
  },

  // Check In
  checkInVisitor: async (id) => {
    const response = await api.put(
      `/visitors/checkin/${id}`
    );

    return response.data;
  },

  // Check Out
  checkOutVisitor: async (id) => {
    const response = await api.put(
      `/visitors/checkout/${id}`
    );

    return response.data;
  },

  // Cancel Visitor
  cancelVisitor: async (id) => {
    const response = await api.put(
      `/visitors/cancel/${id}`
    );

    return response.data;
  },
};

export default visitorService;