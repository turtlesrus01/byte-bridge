import React, { useState } from "react";
import Calendar from "react-calendar";
import "../../../src/App.css";
import { Typography } from "@mui/material";
import { addCalendarEvent, 
      deleteCalendarEvent, 
      deleteAllCalendarEvents, 
      UpdateCalendarEvent } 
  from "../../utils/mutations";
  import { Button } from "@mui/material";
  import { useMutation } from "@apollo/client";

 
import { Typography, Box, Snackbar, Button } from "@mui/material";
import {
  addCalendarEvent,
  deleteCalendarEvent,
  deleteAllCalendarEvents,
  UpdateCalendarEvent,
} from "../../../src/utils/mutations";

  function TestCalendar() {
    const [date, setDate] = useState(new Date());
  
    const handleDateChange = async (selectedDate) => {
      setDate(selectedDate);
    };
  
    const handleAddEvent = async () => {
      try {
        const response = await addCalendarEvent(date);
        console.log("Event added:", response);
        // Perform any other operations or display notifications/alerts based on the response
      } catch (error) {
        console.error("Error adding event:", error);
        // Display an error notification or handle the error gracefully
      }
    };
  
    const handleDeleteEvent = async () => {
      try {
        const response = await deleteCalendarEvent(date);
        console.log("Event deleted:", response);
        // Perform any other operations or display notifications/alerts based on the response
      } catch (error) {
        console.error("Error deleting event:", error);
        // Display an error notification or handle the error gracefully
      }
    };
  
    const handleDeleteAllEvents = async () => {
      try {
        const response = await deleteAllCalendarEvents();
        console.log("All events deleted:", response);
        // Perform any other operations or display notifications/alerts based on the response
      } catch (error) {
        console.error("Error deleting all events:", error);
        // Display an error notification or handle the error gracefully
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
      }
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
        <div className="buttons-container">
          <Button variant="contained" onClick={handleAddEvent}>
            Add Event
          </Button>
          <Button variant="contained" onClick={handleDeleteEvent}>
            Delete Event
          </Button>
          <Button variant="contained" onClick={handleDeleteAllEvents}>
            Delete All Events
          </Button>
          <Button variant="contained" onClick={handleUpdateEvent}>
            Update Event
          </Button>
        </div>
      </div>
    );
  }
  
  export default TestCalendar;
