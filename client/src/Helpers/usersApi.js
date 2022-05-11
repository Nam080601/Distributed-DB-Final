import axios from "./axios";

const usersApi = {
  async getCNTT() {
    return await axios.get("/api/userscntt");
  },
  async getNN() {
    return await axios.get("/api/usersnn");
  },
  async login(data) {
    return await axios.post("/api/users/login", data);
  },

  async registerCNTT(data) {
    return await axios.post("/api/userscntt/register", data);
  },

  async registerNN(data) {
    return await axios.post("/api/usersnn/register", data);
  },
};

export default usersApi;
