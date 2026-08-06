import api from "./api";

const reportService = {
  getAllVisitorsReport: async () => {
    const response = await api.get("/reports");
    return response.data;
  },

  getPendingReport: async () => {
    const response = await api.get("/reports/pending");
    return response.data;
  },

  getApprovedReport: async () => {
    const response = await api.get("/reports/approved");
    return response.data;
  },

  getRejectedReport: async () => {
    const response = await api.get("/reports/rejected");
    return response.data;
  },

  getCancelledReport: async () => {
    const response = await api.get("/reports/cancelled");
    return response.data;
  },

  getCheckedInReport: async () => {
    const response = await api.get("/reports/checkedin");
    return response.data;
  },

  getCheckedOutReport: async () => {
    const response = await api.get("/reports/checkedout");
    return response.data;
  },

  getTodayVisitorsReport: async () => {
    const response = await api.get("/reports/today");
    return response.data;
  },
};

export default reportService;