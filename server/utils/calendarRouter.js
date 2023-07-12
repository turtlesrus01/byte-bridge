const express = require('express');
const router = express.Router();
const CalendarEvent = require('../models/CalendarEvent');

router.post('/calendar-requests', async (req, res) => {
  try {
    // Create a new calendar request instance using the data from the request body
    const newCalendarRequest = new CalendarEvent(req.body);

    // Save the new instance to the database
    const savedCalendarRequest = await newCalendarRequest.save();

    res.status(201).json(savedCalendarRequest);
  } catch (error) {
    console.error('Error creating calendar request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;