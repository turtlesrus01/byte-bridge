const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    # These are all fields we can access from our user model
    _id: ID
    username: String
    email: String
    password: String
  }
`;

module.exports = typeDefs;
