/** index
 * @module middleware/index
 */
/** @requires module:middleware/AuthJwt */
const authJwt = require("./auth-jwt");

/** @requires module:middleware/verifySignup */
const verifySignUp = require("./verify-signup");

module.exports = {
  authJwt,
  verifySignUp,
};
