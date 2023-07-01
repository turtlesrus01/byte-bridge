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
    userID: ID!
  }
  
  type Query {
    getCalendarEvent(eventID: ID!): CalendarEvent!
    getAllCalendarEvents: [CalendarEvent]!
    getUser(username: String!): User!
    getUsers: [User]!
  }

  type Qyery {
    me: User
  }
    
   
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth!
    login(email: String!, password: String!): Auth!
    addCalendarEvent(title: String!, description: String!, startDate: String!, endDate: String!, location: String!, userID: ID!): CalendarEvent!
    updateCalendarEvent(eventID: ID!, title: String, description: String, startDate: String, endDate: String, location: String, userID: ID!): CalendarEvent!
    deleteCalendarEvent(eventID: ID!): CalendarEvent!
    deleteAllCalendarEvents: [CalendarEvent]!
    deleteUser(username: String!): User!
    deleteAllUsers: [User]!
  }
    
  `;

module.exports = typeDefs;
