//import
const db = require("../models");
const Role = db.role;

// Creation des roles lors de la première connexion à la base de données
const initial = () => {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("Ajout de 'user' à la collection roles");
      });

      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("Ajout de 'moderator' à la collection roles");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("Ajout de 'admin' à la collection roles");
      });
    }
  });
};

module.exports = initial;
