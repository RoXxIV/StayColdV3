const controller = require("../controllers/bath.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/bath", controller.createBath);
  app.put("/api/bath/:id", controller.modifyBath);
  app.delete("/api/bath/:id", controller.deleteBath);
  app.get("/api/bath", controller.getAllBath);
};
