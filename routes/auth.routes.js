/** Express router providing authentication related routes
 * @module routes/auth
 */
/**
 * @requires module:middleware
 * @const
 */
const { verifySignUp } = require("../middleware");
/**
 * @requires module:controllers/auth
 * @const
 */
const controller = require("../controllers/auth.controller");

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
   * Signup.
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
   * Login.
   * @name post/api/auth/signin
   * @function
   * @memberof module:routes/auth
   * @inner
   * @param {string} path - Express path
   * @param {module} controller - controllers/auth.controller.signin()
   */
  app.post("/api/auth/signin", controller.signin);
  /**
   * Reset user password.
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
   * Send a mail to comfirm the user account.
   * @name post/api/auth/confirm/:confirmationCode
   * @function
   * @memberof module:routes/auth
   * @inner
   * @param {string} path - Express path
   * @param {module} controller - controllers/auth.controller.verifyUSer()
   */
  app.get("/api/auth/confirm/:confirmationCode", controller.verifyUSer);
  /**
   * Send a mail to reset the user password.
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
