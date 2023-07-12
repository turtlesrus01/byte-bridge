const { gql } = require("apollo-server-express");

const typeDefs = gql`
type User {
  _id: ID
  username: String
  email: String
  password: String
}

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
  calendarEvent(id: ID!): CalendarEvent
  calendarEvents: [CalendarEvent]
}

type Mutation {
  addUser(username: String!, email: String!, password: String!): Auth!
  login(email: String!, password: String!): Auth!
  addCalendarEvent(input: AddCalendarEventInput!): CalendarEvent!
  updateCalendarEvent(input: UpdateCalendarEventInput!): CalendarEvent!
  deleteCalendarEvent(id: ID!): CalendarEvent!
  deleteAllCalendarEvents: Boolean!
  deleteUser(username: String!): User!
  deleteAllUsers: Boolean!
}

input AddCalendarEventInput {
  title: String!
  description: String!
  startDate: String!
  endDate: String!
  location: String!
  allDay: Boolean!
  userID: ID!
}

input UpdateCalendarEventInput {
  id: ID!
  startDate: String
  endDate: String
  location: String
}
`;

module.exports = typeDefs;