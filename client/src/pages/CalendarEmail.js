import React from 'react';
import { Grid, Paper } from '@mui/material';
import ContactForm from '../components/ContactForm';
import TestCalendar from '../components/TestCalendar/TestCalendar';

const CalendarEmail = () => {
  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid item xs={12} sm={6}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <ContactForm />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <TestCalendar />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CalendarEmail;