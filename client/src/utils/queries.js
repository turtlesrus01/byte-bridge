import { gql } from '@apollo/client';

// Query to the database
export const GET_CALENDAR_EVENTS = gql`
  query GetCalendarEvents {
    calendarEvents {
      _id
      title
      description
      startDate
      endDate
      location
    }
  }
`;

