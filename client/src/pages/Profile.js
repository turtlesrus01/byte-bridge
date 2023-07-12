import React from "react";
import {
  Grid,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useQuery, gql } from "@apollo/client";

// Query to the database
const GET_CALENDAR_EVENTS = gql`
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

const Profile = () => {
  const { loading, error, data } = useQuery(GET_CALENDAR_EVENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const events = data.calendarEvents;

  return (
    <div>
      <Typography variant="h3">Profile</Typography>
      <Grid container>
        <List>
          {events.length === 0 ? (
            <ListItem>
              <ListItemText primary="No events found." />
            </ListItem>
          ) : (
            events.map((event) => (
              <ListItem key={event._id}>
                <ListItemText
                  primary={event.title}
                  secondary={event.description}
                />
                <ListItemText primary={`Start Date: ${event.startDate}`} />
                <ListItemText primary={`End Date: ${event.endDate}`} />
                <ListItemText primary={`Location: ${event.location}`} />
              </ListItem>
            ))
          )}
        </List>
      </Grid>
    </div>
  );
};

export default Profile;
