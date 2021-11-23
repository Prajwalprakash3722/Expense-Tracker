const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  transactions: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
  },
});

module.exports = mongoose.model("User", UserSchema, "User");

// schema = {
//   "name":
//     "email"
//   "password"
// }
