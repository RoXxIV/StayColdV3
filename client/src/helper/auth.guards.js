import AccessService from "../services/access.service";

/**
 * Gestion des role , restriction d'acces utilisé dans le routeur pour les redirections
 * @class
 */
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
