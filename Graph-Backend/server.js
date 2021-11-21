const { GraphQLServer } = require("graphql-yoga");

const typeDefs = `
  type Query {
      hello: String!,
      users: [User!]!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello World",
    users: () => {
      return;
      [
        {
          id: 1,
          name: "John Doe",
          email: "",
        },
      ];
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
// server.listen(4000, () => console.log("Server is running on localhost:4000"));
server.start(4000, () =>
  console.log("Server is running on http://localhost:4000")
);
