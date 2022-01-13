/** Modele des rôles
 * @module models/Role
 */

/** @requires module:mongoose */
const mongoose = require("mongoose");

/**
 * Rolechema schema
 * initialisé lors de la premiere connection
 * @constructor Role
 */
const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    /** intitulé du rôle */
    name: String,
  })
);

module.exports = Role;
