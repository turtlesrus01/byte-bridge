import React, { useState } from "react";
import Calendar from "react-calendar";
import "../../../src/App.css";
import { useMutation } from "@apollo/client";
import {
  ADD_CALENDAR_EVENT,
  DELETE_CALENDAR_EVENT,
  DELETE_ALL_CALENDAR_EVENTS,
  UPDATE_CALENDAR_EVENT,
} from "../../utils/mutations";
import { Typography, Box, Snackbar, Button } from "@mui/material";

function TestCalendar({
  userId,
  eventId,
  eventTitle,
  eventDescription,
  eventStartDate,
  eventEndDate,
  eventLocation,
  eventAllDay,
}) {
  const [error, setError] = useState(null);
  const [date, setDate] = useState(new Date());
  const [addEvent] = useMutation(ADD_CALENDAR_EVENT);
  const [deleteEvent] = useMutation(DELETE_CALENDAR_EVENT);
  const [deleteAllEvents] = useMutation(DELETE_ALL_CALENDAR_EVENTS);
  const [updateEvent] = useMutation(UPDATE_CALENDAR_EVENT);
  
  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  // Add a new event
  const handleAddCalendarEvent = async () => {
    try {
      if (!eventStartDate || !eventEndDate) {
        throw new Error("Missing start date or end date");
      }

      console.log({
        id: eventId,
        title: eventTitle,
        description: eventDescription,
        startDate: eventStartDate.toISOString(),
        endDate: eventEndDate.toISOString(),
        location: eventLocation,
        allDay: eventAllDay,
        userId: userId,
      });
      
      const { data } = await addEvent({
        variables: {
          id: eventId,
          title: eventTitle,
          description: eventDescription,
          startDate: eventStartDate.toISOString(),
          endDate: eventEndDate.toISOString(),
          location: eventLocation,
          allDay: eventAllDay,
          userId: userId,
        },
      });

      console.log("Event added:", data);
      // Perform any other operations or display notifications/alerts based on the response
    } catch (error) {
      console.error("Error adding event:", error);
      // Display an error notification or handle the error gracefully
    }
  };

  // Delete an event
  const handleDeleteCalendarEvent = async () => {
    try {
      const response = await deleteEvent({
        variables: {
          eventId: eventId,
        },
      });

      console.log("Event deleted:", response);
      // Perform any other operations or display notifications/alerts based on the response
    } catch (error) {
      console.error("Error deleting event:", error);
      // Display an error notification or handle the error gracefully
    }
  };

  // Delete all events
  const handleDeleteAllCalendarEvents = async () => {
    try {
      const response = await deleteAllEvents({
        variables: {
          userId: userId,
        },
      });

      console.log("All events deleted:", response);
      // Perform any other operations or display notifications/alerts based on the response
    } catch (error) {
      console.error("Error deleting all events:", error);
      // Display an error notification or handle the error gracefully
    }
  };

  // Update an event
  const handleUpdateCalendarEvent = async () => {
    try {
      const response = await updateEvent({
        variables: {
          userId: userId,
          startDate: eventStartDate.toISOString(),
          endDate: eventEndDate.toISOString(),
          location: eventLocation,
        },
      });

      console.log("Event updated:", response);
      // Perform any other operations or display notifications/alerts based on the response
    } catch (error) {
      console.error("Error updating event:", error);
      // Display an error notification or handle the error gracefully
    }
  };

  // Snackbar (front-end error messaging) handler
  const handleSnackbarClose = () => {
    setError(null);
  };

  const renderSelectedDate = () => {
    if (Array.isArray(date)) {
      return (
        <Typography variant="body1" align="center">
          <span className="bold">Start:</span> {date[0].toDateString()} |{" "}
          <span className="bold">End:</span> {date[1].toDateString()}
        </Typography>
      );
    } else {
      return (
        <Typography variant="body1" align="center">
          <span className="bold">Selected date:</span> {date.toDateString()}
        </Typography>
      );
    }
  };

  return (
    <div className="app">
      <Typography variant="h4" align="center">
        Book Your Appointment with Your Realtor
      </Typography>
      <div className="calendar-container" align="center">
        <Calendar onChange={handleDateChange} value={date} selectRange={true} />
      </div>
      {renderSelectedDate()}
      <Box className="buttons-container" align="center">
        <Button variant="contained" onClick={handleAddCalendarEvent} sx={{ m: 1 }}>
          Add Event
        </Button>
        <Button variant="contained" onClick={handleDeleteCalendarEvent} sx={{ m: 1 }}>
          Delete Event
        </Button>
        <Button
          variant="contained"
          onClick={handleDeleteAllCalendarEvents}
          sx={{ m: 1 }}
        >
          Delete All Events
        </Button>
        <Button variant="contained" onClick={handleUpdateCalendarEvent} sx={{ m: 1 }}>
          Update Event
        </Button>
        <Snackbar
          open={error !== null}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={error}
        />
      </Box>
    </div>
  );
}

export default TestCalendar;
