/** Controller auth
 * @module controller/auth
 */
/** @requires module:dotenv */
const dotenv = require("dotenv");
/** @requires module:models */
const db = require("../models");
/** @requires module:jsonwebtoken */
var jwt = require("jsonwebtoken");
/** @requires module:bcryptjs */
var bcrypt = require("bcryptjs");
/** @requires module:nodemailer */
const nodemailer = require("../plugin/nodemailer.config");

const User = db.user;
const Role = db.role;

dotenv.config();

/**
 * Creation d'un compte utilisateur
 */
exports.signup = (req, res) => {
  /**
   * Création du token unique { comfirmationCode } pour la vérification d'email
   */
  const token = jwt.sign({ email: req.body.email }, process.env.SECRET);
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    confirmationCode: token,
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    /**
     * Gestion des roles
     */
    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({
              message:
                "L'utilisateur a été enregistré avec succès! merci de vérifier votre email",
            });
            nodemailer.sendConfirmationEmail(
              user.username,
              user.email,
              user.confirmationCode
            );
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({
            message:
              "L'utilisateur a été enregistré avec succès! merci de vérifier votre email",
          });
          nodemailer.sendConfirmationEmail(
            user.username,
            user.email,
            user.confirmationCode
          );
        });
      });
    }
  });
};
/**
 * Connexion au compte utilisateur
 */
exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "Utilisateur non trouvé." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Mot de passe invalide!",
        });
      }
      if (user.status != "Active") {
        return res.status(401).send({
          message:
            "Ce compte est en attente de validation, merci de verifier votre email",
        });
      }
      var token = jwt.sign({ id: user.id }, process.env.SECRET, {
        expiresIn: 86400, // 24 hours
      });
      var authorities = [];
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
        createdAt: user.createdAt,
      });
    });
};

/**
 * Changement du status du compte utilisateur apres verification du mail
 */
exports.verifyUSer = (req, res, next) => {
  User.findOne({ confirmationCode: req.params.confirmationCode })
    .then((user) => {
      /**
       * code de comfirmation incorrect
       */
      if (!user) {
        return res.status(401).send({ message: "Utilisateur non trouvé." });
      }
      // Si le profile est deja activé
      if (user.status === "Active") {
        return res.status(403).send({
          message: "Cet email a deja été verifié",
        });
      }
      user.status = "Active";
      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.json({ message: "Le compte à bien été activé!" });
      });
    })
    .catch((err) => {
      console.log(err);
    });
  //
};

/**
 * Envoie un mail de reinitialisation du mot de passe a l'utilisateur
 */
exports.sendEmailResetPassword = (req, res, next) => {
  User.findOne({ email: req.params.email })
    .then((user) => {
      /**
       * code de comfirmation incorrect
       */
      if (!user) {
        return res.status(401).send({ message: "Utilisateur non trouvé." });
      }
      res.send({
        message: "La démarche à suivre vous a été envoyé par mail",
      });
      nodemailer.resetPasswordEmail(
        user.username,
        user.email,
        user.confirmationCode
      );
    })
    .catch((err) => {
      console.log(err);
    });
  //
};
/**
 * Reinitialisation du mot de passe utilisateur
 */
exports.resetPassword = (req, res, next) => {
  User.findOne({ confirmationCode: req.params.confirmationCode })
    .then((user) => {
      /**
       * code de comfirmation incorrect
       */
      if (!user) {
        return res.status(401).send({ message: "Utilisateur non trouvé." });
      }
      user.password = bcrypt.hashSync(req.body.password, 8);
      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.json({ message: "Votre demande a bien été prise en compte" });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
