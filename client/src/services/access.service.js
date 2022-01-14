import axios from "axios";
import authHeader from "./auth.header";

const API_URL = "/api/test/";

/**
 * Verification du contenue autorisé definit par les roles utilisateur
 * @class
 */
class AccessService {
  /**
   * Definit le contenu Public
   * @returns {object}
   */
  getPublicContent() {
    return axios.get(API_URL + "all");
  }
  /**
   * Definit le contenu Utilisateur
   * @returns {object}
   */
  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }
  /**
   * Definit le contenu Moderateur
   * @returns {object}
   */
  getModeratorBoard() {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  }
  /**
   * Definit le contenu Admin
   * @returns {object}
   */
  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }
}

export default new AccessService();
