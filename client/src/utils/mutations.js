
import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        password
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        password
        email
      }
    }
  }
`;

export const ADD_CALENDAR_EVENT = gql`
  mutation AddCalendarEvent(
    $id: ID!
    $title: String!
    $description: String!
    $startDate: String!
    $endDate: String!
    $location: String!
    $allDay: Boolean!
    $userId: ID!
  ) {
    addCalendarEvent(
      _id: $id
      title: $title
      description: $description
      startDate: $startDate
      endDate: $endDate
      location: $location
      allDay: $allDay
      userID: $userId
    ) {
      _id
      title
      description
      startDate
      endDate
      location
      allDay
      userID
    }
  }
`;

export const DELETE_CALENDAR_EVENT = gql`
  mutation DeleteCalendarEvent($eventId: ID!) {
    deleteCalendarEvent(eventID: $eventId) {
      _id
      title
      description
      startDate
      endDate
      location
      userID
    }
  }
`;

export const DELETE_ALL_CALENDAR_EVENTS = gql`
  mutation DeleteAllCalendarEvents {
    deleteAllCalendarEvents {
      _id
      title
      description
      startDate
      endDate
      location
      userID
    }
  }
`;

export const DELETE_USER = gql`
  mutation Mutation($username: String!) {
    deleteUser(username: $username) {
      _id
      username
      email
      password
    }
  }
`;

export const DELETE_ALL_USERS = gql`
  mutation DeleteAllUsers {
    deleteAllUsers {
      _id
      username
      email
      password
    }
  }
`;

export const UPDATE_CALENDAR_EVENT = gql`
  mutation UpdateCalendarEvent($userId: ID!, $startDate: String!, $endDate: String!, $location: String!) {
    updateCalendarEvent(UserID: $userId, startDate: $startDate, endDate: $endDate, location: $location) {
      userID
      startDate
      endDate
      location
    }
  }
`;
