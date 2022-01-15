import AccessService from "../services/access.service";
import store from "../store/index";
/**
 * Gestion des role , restriction d'acces utilisé dans le routeur pour les redirections
 * @class
 */
class AuthGuards {
  /**
   * Verifie si l'utilisateur est admin
   */
  isAdmin(to, from, next) {
    AccessService.getAdminBoard()
      .then((response) => {
        response.status === 200 ? next() : next("/");
      })
      .catch((err) => {
        if (err) return next("/");
      });
  }
  /**
   * Redirection l'utilisateur n'est pas connecté
   */
  userGuard(to, from, next) {
    !store.state.auth.user ? next("/login") : next();
  }
  /**
   * Redirection si l'utilisateur est connecté
   */
  redirectUserGuard(to, from, next) {
    store.state.auth.user ? next("/") : next();
  }
}

export default new AuthGuards();
