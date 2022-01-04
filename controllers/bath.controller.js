// import
const db = require("../models");

const Bath = db.bath;
const sortOptions = { createdAt: -1 };

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

exports.modifyBath = (req, res, next) => {
  Bath.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Baignade edité !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteBath = (req, res, next) => {
  Bath.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Baignade supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllBath = (req, res, next) => {
  Bath.find()
    .sort(sortOptions)
    .populate("author", "username -_id")
    .then((baths) => res.status(200).json(baths))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneBath = (req, res, next) => {
  Bath.findOne({ _id: req.params.id })
    .populate("author", "username -_id")
    .then((bath) => res.status(200).json(bath))
    .catch((error) => res.status(404).json({ error }));
};
