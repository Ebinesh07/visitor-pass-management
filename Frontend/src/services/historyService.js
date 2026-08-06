import api from "./api";

const historyService = {
  getAllHistory: async () => {
    const response = await api.get("/history");
    return response.data;
  },

  getVisitorHistory: async (visitorId) => {
    const response = await api.get(`/history/${visitorId}`);
    return response.data;
  },
};

export default historyService;