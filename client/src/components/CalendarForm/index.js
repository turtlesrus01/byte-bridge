import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import TestCalendar from "../TestCalendar";

function CalendarPage() {
  const [formData, setFormData] = useState({
    userId: "",
    eventId: "",
    eventTitle: "",
    eventDescription: "",
    eventStartDate: "",
    eventEndDate: "",
    eventLocation: "",
    eventAllDay: false,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const API_URL = "http://localhost:3001"

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Perform API request to create instance in the database
      const response = await fetch( `${API_URL}/CalendarPage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Handle the response from the API
      if (response.ok) {
        console.log("Instance created successfully");
        // Reset the form data
        setFormData({
          userId: "",
          eventId: "",
          eventTitle: "",
          eventDescription: "",
          eventStartDate: "",
          eventEndDate: "",
          eventLocation: "",
          eventAllDay: false,
        });
      } else {
        console.error("Failed to create instance");
      }
    } catch (error) {
      console.error("Error creating instance", error);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit}>
          <TextField
            name="userId"
            label="User ID"
            value={formData.userId}
            onChange={handleInputChange}
            required
          />
          <TextField
            name="eventId"
            label="Event ID"
            value={formData.eventId}
            onChange={handleInputChange}
            required
          />
          <TextField
            name="eventTitle"
            label="Event Title"
            value={formData.eventTitle}
            onChange={handleInputChange}
            required
          />
          <TextField
            name="eventDescription"
            label="Event Description"
            value={formData.eventDescription}
            onChange={handleInputChange}
            required
          />
          <TextField
            name="eventStartDate"
            type="datetime-local"
            value={formData.eventStartDate}
            onChange={handleInputChange}
            required
          />
          <TextField
            name="eventEndDate"
            type="datetime-local"
            value={formData.eventEndDate}
            onChange={handleInputChange}
            required
          />
          <TextField
            name="eventLocation"
            label="Event Location"
            value={formData.eventLocation}
            onChange={handleInputChange}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Grid>
      <Grid item xs={12}>
        <TestCalendar {...formData} />
      </Grid>
    </Grid>
  );
}

export default CalendarPage;
