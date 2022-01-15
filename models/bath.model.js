/** Modele des baignades
 * @module models/Bath
 */

/** @requires module:mongoose */
const mongoose = require("mongoose");

/**
 * BathSchema schema
 * Seul les champs author, waterTemperature, timeInWater, temperatureOutside, weather.
 * Le temps maximal accepté pour les champs timeInWater & recoveryTime est de 1440min (24h).
 * @constructor Bath
 */
const Bath = mongoose.model(
  "Bath",
  new mongoose.Schema(
    {
      /* Utilisateur lier à la baignade */
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      /** temperature de l'eau */
      waterTemperature: {
        type: Number,
        min: 0.1,
        max: 50,
        required: true,
      },
      /** temps resté dans l'eau */
      timeInWater: {
        type: Number,
        min: 1,
        max: 1440,
        required: true,
      },
      /** temperature de l'air */
      temperatureOutside: {
        type: Number,
        required: true,
        max: 60,
      },
      /** météo */
      weather: {
        type: String,
        enum: [
          "partiellement nuageux",
          "nuageux",
          "ensoleillé",
          "pluie",
          "neige",
          "tempête",
        ],
        required: true,
      },
      /** vent */
      wind: {
        type: String,
        enum: ["aucun", "leger", "modéré", "beaucoup", ""],
      },
      /** temps de recuperation apres la baignade */
      recoveryTime: {
        type: Number,
        min: 0.1,
        max: 1440,
      },
      /** intensité des tremlements pendant la recuperation */
      afterdrop: {
        type: String,
        enum: ["très intense", "intense", "modéré", "leger", "aucun", ""],
      },
      /** ressenti generale de la baignade */
      globalFeeling: {
        type: String,
        enum: ["très dur", "dur", "modéré", "facile", "très facile", ""],
      },
      /** commantaire sir la baignade */
      commentary: { type: String, maxlength: 500 },
    },
    /**
     * date de création
     * date de modification
     */
    { timestamps: true }
  )
);

module.exports = Bath;
