// import
const mongoose = require("mongoose");

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
