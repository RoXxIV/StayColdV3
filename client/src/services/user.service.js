import axios from "axios";
import authHeader from "./auth.header";

const API_URL = "/api/user/";

/**
 * Service utilisateur
 * @class
 */
class UserService {
  /**
   * Recupere tout les utilisateurs
   * @returns {object}
   */
  getAllUsers() {
    return axios.get(API_URL, { headers: authHeader() });
  }
  /**
   * Supprime un utilisateur
   * @param {string} id
   * @returns {object}
   */
  deleteOne(id) {
    return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
  }
  /**
   * Modifie un utilisateur
   * @param {string} id
   * @param {string} role
   * @returns {object}
   */
  updateUserRole(id, role) {
    return axios.post(
      `${API_URL}/update-role/${id}`,
      { roles: role },
      { headers: authHeader() }
    );
  }
}

export default new UserService();
