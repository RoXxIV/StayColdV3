/** verifie les doublon d'email, usurname ou la presense d'un rôle donné
 * @module middleware/verifySignup
 */

/** @requires module:models */
const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

/**
 * Verifie, lors de l'inscription si l'email ou l'usurname n'est pas deja présent en bdd
 */
checkDuplicateUsernameOrEmail = (req, res, next) => {
  /**
   * Verification de l'usurname
   */
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res
        .status(400)
        .send({ message: "Ce Nom d'utilisateur est déja utilisé!" });
      return;
    }
    /**
     * Verification de l'email
     */
    User.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user) {
        res.status(400).send({ message: "Cet email est déja utilisé!" });
        return;
      }
      next();
    });
  });
};

/**
 * Verifie, lors de l'ajout d'un utilisateur si le rôle présent dans la requete
 * existe bien en bdd
 */
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Le role ${req.body.roles[i]} n'existe pas`,
        });
        return;
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};

module.exports = verifySignUp;
