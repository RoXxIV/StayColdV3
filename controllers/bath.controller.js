const db = require("../models");
const Bath = db.bath;

const User = db.user;

exports.createBath = (req, res, next) => {
  // supprime le faux_id envoyé par le front-end
  delete req.body._id;
  const bath = new Bath({
    ...req.body,
  });
  bath
    .save()
    .then(() => res.status(201).json({ message: "Baignade enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};
