import axios from "./axios";

const studentsApi = {
  async getAll() {
    return await axios.get("api/students");
  },

  async getCNTT() {
    return await axios.get("/api/studentscntt");
  },

  async getNN() {
    return await axios.get("/api/studentsnn");
  },
};

export default studentsApi;
