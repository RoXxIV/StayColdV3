/** Token et permissions
 * @module middleware/authJwt
 */

/** @requires module:jsonwebtoken */
const jwt = require("jsonwebtoken");

/** @requires module:dotenv */
const dotenv = require("dotenv");

/** @requires module:models */
const db = require("../models");
const User = db.user;
const Role = db.role;

dotenv.config();

/**
 * Verifie la presence d'un token dans le header
 */
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "Aucun token fourni!" });
  }
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Non autorisé!" });
    }
    req.userId = decoded.id;
    next();
  });
};
/**
 * Verifie si l'utilisateur est admin
 */
isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    /**
     * parcours les roles a la recherche de la mention admin
     */
    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Rôle admin requis!" });
        return;
      }
    );
  });
};
/**
 * Verifie si l'utilisateur est moderateur
 */
isModerator = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    /**
     * parcours les roles a la recherche de la mention moderateur
     */
    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Rôle moderator requis!" });
        return;
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
};

module.exports = authJwt;
