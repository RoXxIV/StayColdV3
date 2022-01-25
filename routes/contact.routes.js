/** Routeur express, routes liées au formulaire de contact
 * @module routes/contact
 */

/** @requires module:controllers/contact */
const controller = require("../controllers/contact.controller");

/**
 * @module routes/contact
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
   * Envoie le contenu du formulaire de contact sur mon email personnel
   * @name post/contact
   * @function
   * @memberof module:routes/contact
   * @inner
   * @param {string} path - Express path
   * @param {module} controller - controllers/contact.controller.handleFormContact()
   */
  app.post("/api/contact", controller.handleFormContact);
};
