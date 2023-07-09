import React, { useState } from "react";
import Calendar from "react-calendar";
import "../../../src/App.css";
import { Typography } from "@mui/material";
import { addCalendarEvent, deleteCalendarEvent, deleteAllCalendarEvents, UpdateCalendarEvent } from "../../../src/utils/mutations";

function TestCalendar() {
  const [date, setDate] = useState(new Date());

  const handleDateChange = async (selectedDate) => {
    setDate(selectedDate);

    try {
      const response = await addCalendarEvent(selectedDate); // Call the addCalendarEvent function with the selected date
      console.log("Event added:", response);
      // Perform any other operations or display notifications/alerts based on the response
    } catch (error) {
      console.error("Error adding event:", error);
      // Display an error notification or handle the error gracefully
    }
  
  try {
    const response = await addCalendarEvent(date); // Call the addCalendarEvent function with the selected date
    console.log("Event added:", response);
    // Perform any other operations or display notifications/alerts based on the response
  } catch (error) {
    console.error("Error adding event:", error);
    // Display an error notification or handle the error gracefully
  }
  try {
    const response = await deleteCalendarEvent(date); // Call the addCalendarEvent function with the selected date
    console.log("Event added:", response);
    // Perform any other operations or display notifications/alerts based on the response
  } catch (error) {
    console.error("Error adding event:", error);
    // Display an error notification or handle the error gracefully
  }
  try {
    const response = await deleteAllCalendarEvents(); // Call the addCalendarEvent function with the selected date
    console.log("Event added:", response);
    // Perform any other operations or display notifications/alerts based on the response
  } catch (error) {
    console.error("Error adding event:", error);
    // Display an error notification or handle the error gracefully
  }
  try {
    const response = await UpdateCalendarEvent(date); // Call the addCalendarEvent function with the selected date
    console.log("Event added:", response);
    // Perform any other operations or display notifications/alerts based on the response
  } catch (error) {
    console.error("Error adding event:", error);
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
    </div>
  );
}

export default TestCalendar;
