// import
const db = require("../models");

const User = db.user;
const sortOptions = { roles: -1 };

// Gestion des acces
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Board.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

// queries
exports.getAllUsers = (req, res, next) => {
  User.find()
    .select({ password: 0, confirmationCode: 0 })
    .populate("roles", "name -_id")
    .sort(sortOptions)
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};
