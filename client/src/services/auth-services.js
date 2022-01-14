import axios from "axios";

const API_URL = "/api/auth/";

/**
 * Service d'authentification de l'utilisateur
 * @class
 */
class AuthService {
  /**
   * Connexion utilisateur
   * @param {object} user
   * @returns {object}
   */
  login(user) {
    return axios
      .post(API_URL + "signin", {
        username: user.username,
        password: user.password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  /**
   * Inscription utilisateur
   * @param {object} user
   * @returns {object}
   */
  register(user) {
    return axios.post(API_URL + "signup", {
      username: user.username,
      email: user.email,
      password: user.password,
    });
  }
  /**
   * Deconnexion utilisateur
   */
  logout() {
    localStorage.removeItem("user");
  }
  /**
   * verification de l'email utilisateur
   * @param {string} code
   * @returns {object}
   */
  verifyUser(code) {
    return axios.get(API_URL + "confirm/" + code).then((response) => {
      return response.data;
    });
  }
  /**
   * Remplacement du mot de passe utilisateur
   * @param {string} code
   * @param {string} password
   * @returns {object}
   */
  resetPassword(code, password) {
    return axios.post(API_URL + "reset-password/" + code, {
      password: password,
    });
  }
  /**
   * Envoie du mail de recuperation de mot de passe
   * @param {string} email
   * @returns {object}
   */
  resetPasswordEmail(email) {
    return axios
      .get(API_URL + "email-reset-password/" + email)
      .then((response) => {
        return response.data;
      });
  }
}

export default new AuthService();
