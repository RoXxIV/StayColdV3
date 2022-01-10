// import
const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // Test permission
  app.get("/api/test/all", controller.allAccess);
  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);
  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  // User queries
  app.get(
    "/api/user",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllUsers
  );
  app.get(
    "/api/user/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getOneUser
  );
  app.delete(
    "/api/user/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteUser
  );
  app.post(
    "/api/user/update-role/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateUserRole
  );
};
