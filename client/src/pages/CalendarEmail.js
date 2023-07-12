import React from "react";
import { Grid, Paper } from "@mui/material";
import ContactForm from "../components/ContactForm";
import CalendarProps from "../components/CalendarProps";


const CalendarEmail = () => {
  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid item xs={4} sm={3}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <ContactForm />
        </Paper>
      </Grid>

      <Grid item xs={12} sm={8}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <CalendarProps />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CalendarEmail;
