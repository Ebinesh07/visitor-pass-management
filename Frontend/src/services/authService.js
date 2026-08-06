import api from "./api";

const authService = {
  login: async (loginData) => {
    const response = await api.post("/auth/login", loginData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  getUser: () => {
    return JSON.parse(localStorage.getItem("user"));
  },

  getRole: () => {
    return localStorage.getItem("role");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },
};

export default authService;