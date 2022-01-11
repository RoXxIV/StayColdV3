import axios from "axios";

const API_URL = "/api/auth/";

/*
  Gestion Inscription, connexion, deconnexion et verification du mail user
*/

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

  register(user) {
    return axios.post(API_URL + "signup", {
      username: user.username,
      email: user.email,
      password: user.password,
    });
  }

  logout() {
    localStorage.removeItem("user");
  }

  verifyUser(code) {
    return axios.get(API_URL + "confirm/" + code).then((response) => {
      return response.data;
    });
  }
}

export default new AuthService();
