/** Controller contact
 * @module controller/contact
 */

/** @requires module:nodemailer */
const nodemailer = require("../plugin/nodemailer.config");

/**
 * Recupere le contenu du formulaire de contact pour
 * le renvoyer sur mon mail personnel
 */
exports.handleFormContact = (req, res, next) => {
  if (req.body) {
    nodemailer.sendContactMail(
      req.body.contact,
      req.body.subject,
      req.body.message
    );
    res.setHeader("Content-Type", "text/plain");
    res.send({
      message: `Votre message a bien été envoyé,
        il sera traitée dans les meilleurs délais`,
    });
  } else {
    res.send({
      message: "Une erreur est survenue",
    });
  }
};
