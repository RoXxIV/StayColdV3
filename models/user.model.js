// import
const mongoose = require("mongoose");
/*
  Le champs confirmationCode sert de token unique afin d'authentifier le user lors du mails de comfirmation
*/
const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      username: { type: String, minlength: 4, maxlength: 50, required: true },
      email: { type: String, minlength: 5, maxlength: 255, unique: true },
      password: { type: String, minlength: 4, required: true },
      status: { type: String, enum: ["Pending", "Active"], default: "Pending" },
      confirmationCode: { type: String, unique: true },
      roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role",
        },
      ],
    },
    { timestamps: true }
  )
);

module.exports = User;
