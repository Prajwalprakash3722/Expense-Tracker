const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: [String],
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model(
  "Transaction",
  TransactionSchema,
  "Transaction"
);

//   amount: {
//     type: number,
//   },
//   type: {
//     type: {Credit OR Debit},
//   },
//   description: {
//     type: String,
//   },
//   date: {
//     type: Date,
//   },
//   tags: {
//     type: [String],
//   },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
