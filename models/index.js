/** Index des modeles
 * @module models
 */
/** @requires module:mongoose */
const mongoose = require("mongoose");

/** use mongoose in different position inside the codes */
mongoose.Promise = global.Promise;

/**
 * @module db
 * @type {object}
 */
const db = {};

db.mongoose = mongoose;

/** @requires module:models/User */
db.user = require("./user.model");

/** @requires module:models/Role */
db.role = require("./role.model");
db.ROLES = ["user", "moderator", "admin"];

/** @requires module:models/Bath */
db.bath = require("./bath.model");

module.exports = db;
