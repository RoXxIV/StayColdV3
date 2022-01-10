import axios from "axios";
import authHeader from "./auth.header";

const API_URL = "/api/user/";

class UserService {
  getAllUsers() {
    return axios.get(API_URL, { headers: authHeader() });
  }
  deleteOne(id) {
    return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
  }
  updateUserRole(id, role) {
    return axios.post(
      `${API_URL}/update-role/${id}`,
      { roles: role },
      { headers: authHeader() }
    );
  }
}

export default new UserService();
