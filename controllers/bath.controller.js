/** Controller bath
 * @module controller/bath
 */
/** @requires module:models */
const db = require("../models");

const Bath = db.bath;
const sortOptions = { createdAt: -1 };

/**
 * Creation d'une baignade
 */
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
/**
 * Modification d'une baignade
 */
exports.modifyBath = (req, res, next) => {
  Bath.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Baignade edité !" }))
    .catch((error) => res.status(400).json({ error }));
};
/**
 * Suppression d'une baignade
 */
exports.deleteBath = (req, res, next) => {
  Bath.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Baignade supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};
/**
 * Recupere toutes les baignades
 */
exports.getAllBaths = (req, res, next) => {
  Bath.find()
    .sort(sortOptions)
    .populate("author", "username -_id")
    .then((baths) => res.status(200).json(baths))
    .catch((error) => res.status(400).json({ error }));
};
/**
 * Recuperation d'une baignade
 */
exports.getOneBath = (req, res, next) => {
  Bath.findOne({ _id: req.params.id })
    .populate("author", "username -_id")
    .then((bath) => res.status(200).json(bath))
    .catch((error) => res.status(404).json({ error }));
};
/**
 * Recuperation des baignade recente, le nombre est definit coté client
 */
exports.getRecentBaths = (req, res, next) => {
  const limit = req.params.limit;
  Bath.find()
    .limit(Number(limit))
    .sort(sortOptions)
    .populate("author", "username -_id")
    .then((baths) => res.status(200).json(baths))
    .catch((error) => res.status(400).json({ error }));
};
/**
 * Recuperation des baignades appartenant à un seul utilisateur
 */
exports.getUserBaths = (req, res, next) => {
  const username = req.params.userId;
  Bath.find({ author: username })
    .sort(sortOptions)
    .populate("author", "username -_id")
    .then((baths) => res.status(200).json(baths))
    .catch((error) => res.status(400).json({ error }));
};
