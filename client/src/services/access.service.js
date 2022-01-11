import axios from "axios";
import authHeader from "./auth.header";

const API_URL = "/api/test/";
/*
  Verification du contenue autorisé definit par les roles utilisateur
  backend - middleware/auth-jwt.js & routes/auth.routes.js
*/
class AccessService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }
  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }
  getModeratorBoard() {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  }
  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }
}

export default new AccessService();
