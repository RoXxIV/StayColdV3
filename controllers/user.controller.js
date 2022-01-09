// import
const db = require("../models");
const Bath = require("../models/bath.model");

const User = db.user;
const Role = db.role;
const sortOptions = { roles: -1 };

// Gestion des acces
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
// Acces utilisateur
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};
// Acces Admin
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Board.");
};
// Acces Moderateur
exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

// Recupere tout les utilisateurs
exports.getAllUsers = (req, res, next) => {
  User.find()
    .select({ password: 0, confirmationCode: 0 })
    .populate("roles", "name")
    .sort(sortOptions)
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};
// Recupere un utilisateur
exports.getOneUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .select({ password: 0, confirmationCode: 0 })
    .populate("roles", "name")
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ error }));
};
// Suppression d'un utilisateur et des baignades associé
exports.deleteUser = (req, res, next) => {
  User.deleteOne({ _id: req.params.id })
    .then(() => {
      Bath.deleteMany({ author: req.params.id })
        .then(() =>
          res.status(200).json({
            message:
              "L'utilisateur et les baignades associé ont bien été supprimé !",
          })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};
// change le role du user
exports.updateUserRole = (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (!user) {
        return res.status(401).send({ message: "Utilisateur non trouvé." });
      }
      // Gestion des roles
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
            });
          }
        );
      }
      res.status(200).send("Le Role a mis à jour.");
    })
    .catch((error) => res.status(400).json({ error }));
};
