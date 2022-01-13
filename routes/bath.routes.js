/** Routeur express, routes liées aux baignades
 * @module routes/bath
 */

/** @requires module:controllers/bath */
const controller = require("../controllers/bath.controller");

/** @module routes/bath */
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
   * Ajout d'une baignade
   * @name post/api/bath
   * @function
   * @memberof module:routes/bath
   * @inner
   * @param {string} path - Express path
   * @param {module} controller - controllers/bath.controller.createBath()
   */
  app.post("/api/bath", controller.createBath);
  /**
   * Edition d'une baignade
   * @name post/api/bath/:id
   * @function
   * @memberof module:routes/bath
   * @inner
   * @param {string} path - Express path
   * @param {module} controller - controllers/bath.controller.modifyBath()
   */
  app.put("/api/bath/:id", controller.modifyBath);
  /**
   * Suppression d'une baignade
   * @name delete/api/bath/:id
   * @function
   * @memberof module:routes/bath
   * @inner
   * @param {string} path - Express path
   * @param {module} controller - controllers/bath.controller.deleteBath()
   */
  app.delete("/api/bath/:id", controller.deleteBath);
  /**
   * Recupere toutes les baignades
   * @name get/api/bath
   * @function
   * @memberof module:routes/bath
   * @inner
   * @param {string} path - Express path
   * @param {module} controller - controllers/bath.controller.getAllBaths()
   */
  app.get("/api/bath", controller.getAllBaths);
  /**
   * Recupere une baignades par sont ID
   * @name get/api/bath/:id
   * @function
   * @memberof module:routes/bath
   * @inner
   * @param {string} path - Express path
   * @param {module} controller - controllers/bath.controller.getOneBath()
   */
  app.get("/api/bath/:id", controller.getOneBath);
  /**
   * Recupere toutes les baignades recentes avec une limite
   * @name get/api/recent/:limit
   * @function
   * @memberof module:routes/bath
   * @inner
   * @param {string} path - Express path
   * @param {module} controller - controllers/bath.controller.getRecentBath()
   */
  app.get("/api/bath/recent/:limit", controller.getRecentBaths);
  /**
   * Recupere toutes les baignades appartenant a un utilisateur
   * @name get/api/bath/user/:userId
   * @function
   * @memberof module:routes/bath
   * @inner
   * @param {string} path - Express path
   * @param {module} controller - controllers/bath.controller.getUserBath()
   */
  app.get("/api/bath/user/:userId", controller.getUserBaths);
};
