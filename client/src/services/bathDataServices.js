import axios from "axios";

axios.create({
  headers: {
    "Content-type": "application/json",
  },
});

const API_URL = "/api/bath/";
/**
 * Limite appliqué au nombre de baignade recente que l'on souhaite récupéré
 */
const limit = 8;
/**
 * Service Baignades
 * @class
 */
class BathDataService {
  /**
   * Recupere toutes les baignades
   * @returns {object}
   */
  getAll() {
    return axios.get(API_URL);
  }
  /**
   * Recupere les baignades d'un utilisateur donné
   * @param {string} username
   * @returns {object}
   */
  getByUsername(username) {
    return axios.get(`${API_URL}user/${username}`);
  }
  /**
   * Recupere les baignades recente avec une limite donné
   * @returns {object}
   */
  getRecent() {
    return axios.get(`${API_URL}recent/${limit}`);
  }
  /**
   * Recupere une baignades
   * @param {string} id
   * @returns {object}
   */
  getOne(id) {
    return axios.get(API_URL + id);
  }
  /**
   * Ajoute une baignade
   * @param {object} bath
   * @returns {object}
   */
  create(bath) {
    return axios.post(API_URL, bath);
  }
  /**
   * Modifie une baignade
   * @param {string} id
   * @param {object} bath
   * @returns {object}
   */
  update(id, bath) {
    return axios.put(API_URL + id, bath);
  }
  /**
   * Supprime une baignade
   * @param {string} id
   * @returns {object}
   */
  deleteOne(id) {
    return axios.delete(API_URL + id);
  }
}

export default new BathDataService();
