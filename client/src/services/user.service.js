import axios from "axios";

const API_URL = "/api/user/";

class UserService {
  getAllUsers() {
    return axios.get(API_URL);
  }
  deleteOne(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
  updateUserRole(id, role) {
    return axios.post(`${API_URL}/update-role/${id}`, { roles: role });
  }
}

export default new UserService();
