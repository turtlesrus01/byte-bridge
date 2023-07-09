import React, { useState } from "react";
import Calendar from "react-calendar";
import "../../../src/App.css";
import { Typography, Box, Snackbar, Button } from "@mui/material";
import {
  addCalendarEvent,
  deleteCalendarEvent,
  deleteAllCalendarEvents,
  UpdateCalendarEvent,
} from "../../../src/utils/mutations";

function TestCalendar() {
  // Declare state variables
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState(null);

  const handleDateChange = async (selectedDate) => {
    setDate(selectedDate);
  };

  const handleAddEvent = async () => {
    try {
      const response = await addCalendarEvent(date);
      console.log("Event added:", response);
      // Perform any other operations or display notifications/alerts based on the response
      setError(null);
    } catch (error) {
      console.error("Error adding event:", error);
      // Display an error notification or handle the error gracefully
      setError("Error adding event. Please try again.");
    }
  };

  const handleDeleteEvent = async () => {
    try {
      const response = await deleteCalendarEvent(date);
      console.log("Event deleted:", response);
      // Perform any other operations or display notifications/alerts based on the response
      setError(null);
    } catch (error) {
      console.error("Error deleting event:", error);
      // Display an error notification or handle the error gracefully
      setError("Error deleting event. Please try again.");
    }
  };

  const handleDeleteAllEvents = async () => {
    try {
      const response = await deleteAllCalendarEvents();
      console.log("All events deleted:", response);
      // Perform any other operations or display notifications/alerts based on the response
      setError(null);
    } catch (error) {
      console.error("Error deleting all events:", error);
      // Display an error notification or handle the error gracefully
      setError("Error deleting all events. Please try again.");
    }
  };

  const handleUpdateEvent = async () => {
    try {
      const response = await UpdateCalendarEvent(date);
      console.log("Event updated:", response);
      // Perform any other operations or display notifications/alerts based on the response
    } catch (error) {
      console.error("Error updating event:", error);
      // Display an error notification or handle the error gracefully
      setError("Error updating event. Please try again.");
    }
  };

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
      <Typography variant="h4">
        Book Your Appointment with Your Realtor
      </Typography>
      <div className="calendar-container">
        <Calendar onChange={handleDateChange} value={date} selectRange={true} />
      </div>
      {renderSelectedDate()}
      <Box className="buttons-container" >
        <Button variant="contained" onClick={handleAddEvent} sx={{m:1}}>
          Add Event
        </Button>
        <Button variant="contained" onClick={handleDeleteEvent} sx={{m:1}}>
          Delete Event
        </Button>
        <Button variant="contained" onClick={handleDeleteAllEvents} sx={{m:1}}>
          Delete All Events
        </Button>
        <Button variant="contained" onClick={handleUpdateEvent } sx={{m:1}}>
          Update Event
        </Button>
      </Box>
      <Snackbar
        open={error !== null}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={error}
      />
    </div>
  );
}

export default TestCalendar;
