// import
const mongoose = require("mongoose");
/*
  Seul les champs author, waterTemperature, timeInWater, temperatureOutside, weather.
  Le temps maximal accepté pour les champs timeInWater & recoveryTime est de 1440min (24h).
*/
const Bath = mongoose.model(
  "Bath",
  new mongoose.Schema(
    {
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      waterTemperature: {
        type: Number,
        min: 0.1,
        max: 50,
        required: true,
      },
      timeInWater: {
        type: Number,
        min: 1,
        max: 1440,
        required: true,
      },
      temperatureOutside: {
        type: Number,
        required: true,
        max: 60,
      },
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
      wind: {
        type: String,
        enum: ["aucun", "leger", "modéré", "beaucoup", null],
      },
      recoveryTime: {
        type: Number,
        min: 0.1,
        max: 1440,
      },
      afterdrop: {
        type: String,
        enum: ["très intense", "intense", "modéré", "leger", "aucun", null],
      },
      globalFeeling: {
        type: String,
        enum: ["très dur", "dur", "modéré", "facile", "très facile", null],
      },
      commentary: { type: String, maxlength: 500 },
    },
    { timestamps: true }
  )
);

module.exports = Bath;
