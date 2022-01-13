/** Routeur express, routes liées à l'authentification
 * @module routes/auth
 */
/** @requires module:middleware */
const { verifySignUp } = require("../middleware");

/** @requires module:controllers/auth */
const controller = require("../controllers/auth.controller");

/**
 * @module routes/auth
 * @param {object} app
 */
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
   * Inscription
   * @name post/api/auth/signup
   * @function
   * @memberof module:routes/auth
   * @inner
   * @param {string} path - Express path
   * @param {array} middleware - verifySignUp.checkDuplicateUsernameOrEmail() & verifySignUp.checkRolesExisted()
   * @param {module} controller - controllers/auth.controller.signup()
   */
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );
  /**
   * Connexion
   * @name post/api/auth/signin
   * @function
   * @memberof module:routes/auth
   * @inner
   * @param {string} path - Express path
   * @param {module} controller - controllers/auth.controller.signin()
   */
  app.post("/api/auth/signin", controller.signin);
  /**
   * Reset password.
   * @name post/api/auth/reset-password/:confirmationCode
   * @function
   * @memberof module:routes/auth
   * @inner
   * @param {string} path - Express path
   * @param {module} controller - controllers/auth.controller.resetPassword()
   */
  app.post(
    "/api/auth/reset-password/:confirmationCode",
    controller.resetPassword
  );
  /**
   * Envoie du mail permettant d'aciver le compte user
   * @name post/api/auth/confirm/:confirmationCode
   * @function
   * @memberof module:routes/auth
   * @inner
   * @param {string} path - Express path
   * @param {module} controller - controllers/auth.controller.verifyUSer()
   */
  app.get("/api/auth/confirm/:confirmationCode", controller.verifyUSer);
  /**
   * Envoie du mail permettant de générer un nouveau mot de passe.
   * @name post/api/auth/confirm/:confirmationCode
   * @function
   * @memberof module:routes/auth
   * @inner
   * @param {string} path - Express path
   * @param {module} controller - controllers/auth.controller.sendEmailResetPassword()
   */
  app.get(
    "/api/auth/email-reset-password/:email",
    controller.sendEmailResetPassword
  );
};
