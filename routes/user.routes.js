/** Routeur express, routes liées aux utilisateurs
 * @module routes/user
 */

/** @requires module:middleware */
const { authJwt } = require("../middleware");

/** @requires module:controllers/user */
const controller = require("../controllers/user.controller");

/** @module routes/auth */
module.exports = function (app) {
  /**
   * Headers
   * @param middleware
   */
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  /**
   * Test permission public.
   * @name get/api/test/all
   * @function
   * @memberof module:routes/user
   * @inner
   * @param {string} path - Express path
   * @param {module} controller - controllers/user.controller.allAccess()
   */
  app.get("/api/test/all", controller.allAccess);
  /**
   * Test permissions utilisateur.
   * @name get/api/test/user
   * @function
   * @memberof module:routes/user
   * @inner
   * @param {string} path - Express path
   * @param {array} middleware - authJwt.verifyToken()
   * @param {module} controller - controllers/user.controller.userBoard()
   */
  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);
  /**
   * Test permissions moderateurs.
   * @name get/api/test/mod
   * @function
   * @memberof module:routes/user
   * @inner
   * @param {string} path - Express path
   * @param {array} middleware - authJwt.verifyToken() && authJwt.isModerator()
   * @param {module} controller - controllers/user.controller.moderatorBoard()
   */
  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );
  /**
   * Test permissions admins.
   * @name get/api/test/admin
   * @function
   * @memberof module:routes/user
   * @inner
   * @param {string} path - Express path
   * @param {array} middleware - authJwt.verifyToken() && authJwt.isAdmin()
   * @param {module} controller - controllers/user.controller.adminBoard()
   */
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  /**
   * Recupere tout les utilisateurs.
   * @name get/api/user
   * @function
   * @memberof module:routes/user
   * @inner
   * @param {string} path - Express path
   * @param {array} middleware - authJwt.verifyToken() && authJwt.isAdmin()
   * @param {module} controller - controllers/user.controller.getAllUsers()
   */
  app.get(
    "/api/user",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllUsers
  );
  /**
   * Recupere un utilisateurs par ID.
   * @name get/api/user/:id
   * @function
   * @memberof module:routes/user
   * @inner
   * @param {string} path - Express path
   * @param {array} middleware - authJwt.verifyToken() && authJwt.isAdmin()
   * @param {module} controller - controllers/user.controller.getOneUser()
   */
  app.get(
    "/api/user/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getOneUser
  );
  /**
   * Supprime un utilisateur.
   * @name delete/api/user/:id
   * @function
   * @memberof module:routes/user
   * @inner
   * @param {string} path - Express path
   * @param {array} middleware - authJwt.verifyToken() && authJwt.isAdmin()
   * @param {module} controller - controllers/user.controller.deleteUser()
   */
  app.delete(
    "/api/user/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteUser
  );
  /**
   * Modifie le rôle de l'utilisateur.
   * @name post/api/user/update-role/:id
   * @function
   * @memberof module:routes/user
   * @inner
   * @param {string} path - Express path
   * @param {array} middleware - authJwt.verifyToken() && authJwt.isAdmin()
   * @param {module} controller - controllers/user.controller.updateUserRole()
   */
  app.post(
    "/api/user/update-role/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateUserRole
  );
};
