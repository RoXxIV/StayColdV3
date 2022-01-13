/** Express router providing bath related routes
 * @module routes/user
 */

/**
 * @requires module:middleware
 * @const
 */
const { authJwt } = require("../middleware");
/**
 * @requires module:controllers/user
 * @const
 */
const controller = require("../controllers/user.controller");

/** @module routes/auth */
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  /**
   * Test public permissions.
   * @name get/api/test/all
   * @function
   * @memberof module:routes/user
   * @inner
   * @param {string} path - Express path
   * @param {callback} middleware - Express middleware.
   */
  app.get("/api/test/all", controller.allAccess);
  /**
   * Test users permissions.
   * @name get/api/test/user
   * @function
   * @memberof module:routes/user
   * @inner
   * @param {string} path - Express path
   * @param {callback} middleware - Express middleware.
   */
  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);
  /**
   * Test moderator permissions.
   * @name get/api/test/mod
   * @function
   * @memberof module:routes/user
   * @inner
   * @param {string} path - Express path
   * @param {callback} middleware - Express middleware.
   */
  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );
  /**
   * Test Admin permissions.
   * @name get/api/test/admin
   * @function
   * @memberof module:routes/user
   * @inner
   * @param {string} path - Express path
   * @param {callback} middleware - Express middleware.
   */
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  /**
   * Get all users.
   * @name get/api/user
   * @function
   * @memberof module:routes/user
   * @inner
   * @param {string} path - Express path
   * @param {callback} middleware - Express middleware.
   */
  app.get(
    "/api/user",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllUsers
  );
  /**
   * Get user by id.
   * @name get/api/user/:id
   * @function
   * @memberof module:routes/user
   * @inner
   * @param {string} path - Express path
   * @param {callback} middleware - Express middleware.
   */
  app.get(
    "/api/user/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getOneUser
  );
  /**
   * Delete one user.
   * @name delete/api/user/:id
   * @function
   * @memberof module:routes/user
   * @inner
   * @param {string} path - Express path
   * @param {callback} middleware - Express middleware.
   */
  app.delete(
    "/api/user/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteUser
  );
  /**
   * Update user rôle.
   * @name post/api/user/update-role/:id
   * @function
   * @memberof module:routes/user
   * @inner
   * @param {string} path - Express path
   * @param {callback} middleware - Express middleware.
   */
  app.post(
    "/api/user/update-role/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateUserRole
  );
};
