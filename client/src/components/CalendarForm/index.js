import React, { useState } from "react";
import { TextField, Button, Grid } from "@material-ui/core";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any necessary validation or API requests here
    console.log(formData);
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
            label="Event Start Date"
            type="datetime-local"
            value={formData.eventStartDate}
            onChange={handleInputChange}
            required
          />
          <TextField
            name="eventEndDate"
            label="Event End Date"
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
