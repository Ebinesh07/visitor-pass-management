import api from "./api";

const visitorService = {
  getAllVisitors: async () => {
    const response = await api.get("/visitors");
    return response.data;
  },

  registerVisitor: async (visitorData) => {
    const response = await api.post(
      "/visitors/register",
      visitorData
    );
    return response.data;
  },

  approveVisitor: async (id, remarks) => {
    const response = await api.put(
      `/visitors/approve/${id}`,
      { remarks }
    );

    return response.data;
  },

registerVisitor: async (visitorData) => {
  const response = await api.post(
    "/visitors",
    visitorData
  );
  return response.data;
},

  checkInVisitor: async (id) => {
    const response = await api.put(
      `/visitors/checkin/${id}`
    );

    return response.data;
  },

  checkOutVisitor: async (id) => {
    const response = await api.put(
      `/visitors/checkout/${id}`
    );

    return response.data;
  },

  cancelVisitor: async (id) => {
    const response = await api.put(
      `/visitors/cancel/${id}`
    );

    return response.data;
  },

  getPendingVisitors: async () => {
    const response = await api.get(
      "/reports/pending"
    );

    return response.data;
  },

  getApprovedVisitors: async () => {
    const response = await api.get(
      "/reports/approved"
    );

    return response.data;
  },

  getTodayVisitors: async () => {
    const response = await api.get(
      "/reports/today"
    );

    return response.data;
  },
};

export default visitorService;