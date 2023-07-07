const { gql } = require("apollo-server-express");

const typeDefs = gql`
type User {
  _id: ID
  username: String
  email: String
  password: String
}

type Auth {
  token: ID!
  user: User
}

type CalendarEvent {
  _id: ID!
  title: String!
  description: String!
  startDate: String!
  endDate: String!
  location: String!
  allDay: Boolean!
  userID: ID!
}

type Query {
  users: [User]
  user(username: String!): User
  calendarEvent(_id: ID!): User
  calendarEvents: [User]
  getCalendarEvent(eventID: ID!): CalendarEvent!
  getUser(username: String!): User!
  getUsers: [User]!
}

type Mutation {
  addUser(username: String!, email: String!, password: String!): Auth!
  login(email: String!, password: String!): Auth!
  addCalendarEvent(
    _id: ID!
  title: String!
  description: String!
  startDate: String!
  endDate: String!
  location: String!
  allDay: Boolean!
  userID: ID!
  ): CalendarEvent!
  
  updateCalendarEvent(
    UserID: ID!
    startDate: String!
    endDate: String!
    location: String!): CalendarEvent!
    deleteCalendarEvent(eventID: ID!): CalendarEvent!
  deleteAllCalendarEvents: CalendarEvent!
  deleteUser(username: String!): User!
  deleteAllUsers: [User]!
}
`;

module.exports = typeDefs;
