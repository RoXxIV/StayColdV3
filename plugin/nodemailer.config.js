/** @requires module:nodemailer */
const nodemailer = require("nodemailer");
/** @requires module:dotenv */
const dotenv = require("dotenv");

/**
 * adresse utilisé pour l'envoie de mail
 * @type {string}
 */
const user = process.env.USER_MAIL;
/**
 * mot de passe associé a l'adresse mail
 * @type {string}
 */
const pass = process.env.USER_MAIL_SECRET;

/**
 * parametres SMTP
 * @type {object}
 */
const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

/**
 * Envoie le mail permettant l'activation du compte user
 * @param {string} name
 * @param {string} email
 * @param {string} confirmationCode
 */
module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Confirmation Du mail ✉",
      html: `<div>
        <h1>❄ Bonjour ${name} et bienvenue sur Staycold ! ❄</h1>
        <p>Merci de bien vouloir finaliser l'inscription en cliquant sur le lien ci-dessous</p>
        <a href=http://localhost:8080/comfirm-mail-redirection/${confirmationCode}>➡ Finaliser l'inscription ⬅</a>
        <p>À bientôt, <br />
        L'équipe StayCold</p>
        </div>`,
    })
    .catch((err) => console.log(err));
};
/**
 * Envoie le mail permettant de generer un nouveau mot de passe
 * @param {string} name
 * @param {string} email
 * @param {string} confirmationCode
 */
module.exports.resetPasswordEmail = (name, email, confirmationCode) => {
  console.log("reset password");
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Votre demande de nouveau mot de passe",
      html: `<div>
        <h1>❄ Bonjour ${name} ❄</h1>
        <p>Il semble que vous ayez besoin d'un nouveau mot de passe. Cliquez sur le lien ci-dessous pour confirmer votre demande.</p>
        <br />
        <a href=http://localhost:8080/reset-password/${confirmationCode}>➡ Confirmer votre demande ⬅</a>
        <br />
        <p>Si vous ne l'avez pas demandé, veuillez ignorer cet e-mail et votre mot de passe restera inchangé.</p>
        <p>À bientôt, <br />
        L'équipe StayCold</p>
        </div>`,
    })
    .catch((err) => console.log(err));
};
