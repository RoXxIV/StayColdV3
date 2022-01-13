// import
const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // Inscription
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );
  // Connexion
  app.post("/api/auth/signin", controller.signin);
  // Update mot de passe
  app.post(
    "/api/auth/reset-password/:confirmationCode",
    controller.resetPassword
  );
  // Envoie mail de verification de compte
  app.get("/api/auth/confirm/:confirmationCode", controller.verifyUSer);
  // Envoie mail de reinitialisation du mot de passe
  app.get(
    "/api/auth/email-reset-password/:email",
    controller.sendEmailResetPassword
  );
};
