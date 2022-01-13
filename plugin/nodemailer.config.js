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
        <a href=http://localhost:8080/comfirm-mail-redirection/${confirmationCode}>➡ Finaliser l'inscription ⬅</a>
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
