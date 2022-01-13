/** Modele utilisateur
 * @module models/User
 */
/** @requires module:mongoose */
const mongoose = require("mongoose");

/**
 * Userchema schema
 * Le champs confirmationCode sert de token unique afin d'authentifier le user lors du mails de comfirmation
 * @constructor User
 */
const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      /** Pseudo de l'utilisateur */
      username: {
        type: String,
        minlength: 4,
        maxlength: 50,
        required: true,
      },
      /** Email unique de l'utilisateur */
      email: {
        type: String,
        minlength: 5,
        maxlength: 255,
        unique: true,
      },
      /** Mot de passe hashé de l'utilisateur */
      password: {
        type: String,
        minlength: 4,
        required: true,
      },
      /** Statue du compte de l'utilisateur */
      status: {
        type: String,
        enum: ["Pending", "Active"],
        default: "Pending",
      },
      /** Code de confirmation generé aleatoirement utilisé pour
       * l'activation du compte ou la recuperation de mot de passe
       */
      confirmationCode: {
        type: String,
        unique: true,
      },
      /** Rôle de l'utilisateur */
      roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role",
        },
      ],
    },
    /**
     * date de création
     * date de modification
     */
    { timestamps: true }
  )
);

module.exports = User;
