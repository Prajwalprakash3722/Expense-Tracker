var express = require("express");
var expressGraphQL = require("express-graphql").graphqlHTTP;
var { buildSchema } = require("graphql");
var mongoose = require("mongoose");
var User = require("./models/UserSchema");
var Transaction = require("../Rest-Backend/models/TransactionSchema");
// Dummy Data

// GraphQL Schema
var schema = buildSchema(`
    type Query {
        message: String
        users: [Users!]
        transactions: [Transaction!]
    }
    type Users{
        id: ID!
        name: String!
        email: String!
        date: String!
    }
    type Transaction{
      id: ID!
      type: String!
      amount: Float!
      user: ID!
    }
`);

// Root resolver
var root = {
  message: () => "Hello Wold!",
  users: () => {
    return User.find()
      .then((users) => {
        return users.map((user) => {
          return {
            ...user._doc,
            id: user.id,
            date: new Date(user.date).toLocaleDateString(),
          };
        });
      })
      .catch((err) => {
        throw err;
      });
  },
};

// Create an express server and a GraphQL endpoint
var app = express();
app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

const startServer = async () => {
  await mongoose.connect(
    process.env.MONGO_URI || "mongodb://localhost:27017/ExpenseTracker",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log("Connected to MongoDB");
      app.listen(4000, () =>
        console.log(
          "Express GraphQL Server Now Running On http://localhost:4000/graphql"
        )
      );
    }
  );
};

startServer();
