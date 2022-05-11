import axios from "./axios";

const scoresApi = {
  async getAll() {
    return await axios.get("api/scores");
  },

  async getCNTT() {
    return await axios.get("/api/scorescntt");
  },

  async getNN() {
    return await axios.get("/api/scoresnn");
  },

  async update(data) {
    return await axios.put(`/api/scores/${data.mssv}`, data);
  },

  async updateCNTT(data) {
    return await axios.put(`/api/scorescntt/${data.mssv}`, data);
  },

  async updateNN(data) {
    return await axios.put(`/api/scoresnn/${data.mssv}`, data);
  },
};

export default scoresApi;
