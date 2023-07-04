import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
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
      }
    }
  }
`;

export const AddCalenderEvent = gql`
mutation AddCalendarEvent($title: String!, $description: String!, $startDate: String!, $endDate: String!, $location: String!, $userId: ID!) {
  addCalendarEvent(title: $title, description: $description, startDate: $startDate, endDate: $endDate, location: $location, userID: $userId) {
    title
    description
    startDate
    endDate
    location
    userID
  }
}
`;