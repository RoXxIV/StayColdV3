import axios from "axios";

const API_URL = "/api/auth/";

// Connexion
class AuthService {
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
  //Inscription
  register(user) {
    return axios.post(API_URL + "signup", {
      username: user.username,
      email: user.email,
      password: user.password,
    });
  }
  // Deconnexion
  logout() {
    localStorage.removeItem("user");
  }
  // verification de l'email user
  verifyUser(code) {
    return axios.get(API_URL + "confirm/" + code).then((response) => {
      return response.data;
    });
  }
  // reinitialisation du mot de passe
  resetPassword(code, password) {
    return axios.post(API_URL + "reset-password/" + code, {
      password: password,
    });
  }
}

export default new AuthService();
