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

 

  function TestCalendar() {
    const [date, setDate] = useState(new Date());
    const [addEvent] = useMutation(addCalendarEvent);
    const [deleteEvent] = useMutation(deleteCalendarEvent);
    const [deleteAllEvents] = useMutation(deleteAllCalendarEvents);
    const [updateEvent] = useMutation(UpdateCalendarEvent);
  
    const handleDateChange = async (selectedDate) => {
      setDate(selectedDate);
    };
  
    const handleAddEvent = async (selectedDate) => {
      try {
        const response = await addEvent({
          variables: {
            id: String,
            title: String,
            description: String,
            startDate: String,
            endDate: String,
            location: String,
            allDay: Boolean,
            userID: String,
          },
        }); 

      } catch (error) {
        console.error("Error adding event:", error);
        // Display an error notification or handle the error gracefully
      }
      // Perform any other operations or display notifications/alerts based on the response
      console.log("Event added:", response);
    };
    const handledeleteEvent = async (selectedDate) => {
      try{
        const response = await deleteEvent({
          variables: {
            id: String,
            title: String,
            description: String,
            startDate: String,
            endDate: String,
            location: String,
            userID: String,
          },

        });
      }
      catch (error) {
        console.error("Error deleting event:", error);
        // Display an error notification or handle the error gracefully
      }
      // Perform any other operations or display notifications/alerts based on the response
      console.log("Event deleted:", response);
    };
  
    const DeleteAllEvents = async (selectedDate) => {
      try {
        const response = await deleteAllCalendarEvents({
          variables: {
            id: String,
            title: String,
            description: String,
            startDate: String,
            endDate: String,
            location: String,
            userID: String,
          },
        });
      } catch (error) {
        console.error("Error deleting all events:", error);
        // Display an error notification or handle the error gracefully
      }
      // Perform any other operations or display notifications/alerts based on the response
      console.log("All events deleted:", response);
    };
  
    const handleUpdateEvent = async (selectedDate) => {
      try {
        const response = await updateEvent({
          variables: {
             
            userID: String,
            startDate: String,
            endDate: String,
          },
        });
      } catch (error) {
        console.error("Error updating event:", error);
        // Display an error notification or handle the error gracefully
      }
      // Perform any other operations or display notifications/alerts based on the response
      console.log("Event updated:", response);
    }

    
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
