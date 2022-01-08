import axios from "axios";
import authHeader from "./auth.header";

const API_URL_BOARD = "/api/test/";
const API_URL = "/api/user/";

class UserService {
  // access
  getPublicContent() {
    return axios.get(API_URL_BOARD + "all");
  }

  getUserBoard() {
    return axios.get(API_URL_BOARD + "user", { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL_BOARD + "mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL_BOARD + "admin", { headers: authHeader() });
  }

  // queries
  getAllUsers() {
    return axios.get(API_URL);
  }
}

export default new UserService();
