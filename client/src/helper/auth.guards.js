import AccessService from "../services/access.service";

class AuthGuards {
  isAdmin(to, from, next) {
    AccessService.getAdminBoard()
      .then((response) => {
        response.status === 200 ? next() : next("/");
      })
      .catch((err) => {
        if (err) return next("/");
      });
  }
}

export default new AuthGuards();
