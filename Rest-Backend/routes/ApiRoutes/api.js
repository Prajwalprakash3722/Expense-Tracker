const express = require("express");
const User = require("../../models/UserSchema");
const Transaction = require("../../models/TransactionSchema");
const router = express.Router();
var auth = require("../../middleware/Auth");
router.use("/auth", require("./auth"));

router.get("/", (req, res) => {
  res.json({ message: "Working Perfectly Lol!!" });
});

router.get("/user", auth, (req, res, next) => {
  const _id = req.user["id"];
  const user = User.find({ _id: _id }, (err, user) => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: "No User Found" });
    }
  });
});

router.get("/users", auth, (req, res, next) => {
  const _id = req.user["id"];
  if (_id === process.env.ADMIN_ID) {
    const users = User.find((err, users) => {
      if (users) {
        res.status(200).json(users);
        return 1;
      } else {
        res.status(401).json({ message: "No Users Found" });
        return 0;
      }
    });
  }
});

// GET all transactions for a particular user (userId)

router.get("/transactions", auth, (req, res, next) => {
  const _id = req.user["id"];
  const transactions = Transaction.find({ user: _id }, (err, transactions) => {
    if (transactions.length > 0) {
      res.status(200).json(transactions);
    } else {
      res.status(401).json({ message: "No Transactions Found" });
    }
  });
});

// POST a new transaction for a particular user (userId)

router.post("/transactions", auth, (req, res, next) => {
  const _id = req.user["id"];
  const user = User.findOne({ _id: _id }, (err, user) => {
    if (user) {
      const { amount, type, category, description } = req.body;
      const transaction = new Transaction({
        amount,
        type,
        category,
        description,
        user: _id,
      });
      transaction.save();
      user.transactions.push(transaction);
      user.save();
      res.status(200).json({ message: "Transaction Recorded" });
      return 1;
    } else {
      res.status(401).json({ message: "No User Found" });
    }
    if (err) {
      res.status(500).json({ message: "Internal Error" });
      return 0;
    }
  });
});

// GET a particular transaction for a particular user (userId)

router.get("/transaction/:id", auth, (req, res, next) => {
  const _id = req.user["id"];
  const transaction = Transaction.findOne(
    { _id: req.params.id },
    (err, transaction) => {
      const user_id = transaction.user.toString();
      if (user_id === _id) {
        res.status(200).json({
          ...transaction,
          date: new Date(transaction.date).toLocaleDateString(),
        });
      } else if (user_id !== _id) {
        res.status(401).json({ message: "Auth Failed" });
      } else {
        res.status(401).json({ message: "No Transaction Found" });
      }
    }
  );
});

module.exports = router;
