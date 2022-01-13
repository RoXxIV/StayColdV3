// import
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

const user = process.env.USER_MAIL;
const pass = process.env.USER_MAIL_SECRET;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
  // console.log("Check mail");
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Confirmation Du mail ✉",
      html: `<div>
        <h1>❄ Bonjour ${name} et bienvenue sur Staycold ! ❄</h1>
        <p>Merci de bien vouloir finaliser l'inscription en cliquant sur le lien ci-dessous</p>
        <a href=http://localhost:8080/comfirmation-email-redirection/${confirmationCode}>➡ Finaliser l'inscription ⬅</a>
        </div>`,
    })
    .catch((err) => console.log(err));
};

module.exports.resetPasswordEmail = (name, email, confirmationCode) => {
  console.log("reset password");
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Récupération de mot de passe",
      html: `<div>
        <h1>❄ Bonjour ${name}</h1>
        <p>Veuillez cliquer sur le lien ci-dessous afin de générer un nouveau mot de passe</p>
        <a href=http://localhost:8080/recuperation-mot-de-passe/${confirmationCode}>➡ Générer un nouveau mot de passe ⬅</a>
        <p>Si vous ne l'avez pas demandé, veuillez ignorer cet e-mail et votre mot de passe restera inchangé.</p>
        </div>`,
    })
    .catch((err) => console.log(err));
};
