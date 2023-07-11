import React from "react";
import TestCalendar from "../TestCalendar";

function CalendarProps() {
  // Define props for CRUD operations
  const userId = "user123";
  const eventId = "event456";
  const eventTitle = "Meeting";
  const eventDescription = "Discuss project details";
  const eventStartDate = new Date(2023, 6, 9, 10, 0); // July 9, 2023, 10:00 AM
  const eventEndDate = new Date(2023, 6, 9, 12, 0); // July 9, 2023, 12:00 PM
  const eventLocation = "Conference Room";
  const eventAllDay = false;

  return (
    <TestCalendar
      userId={userId}
      eventId={eventId}
      eventTitle={eventTitle}
      eventDescription={eventDescription}
      eventStartDate={eventStartDate}
      eventEndDate={eventEndDate}
      eventLocation={eventLocation}
      eventAllDay={eventAllDay}
    />
  );
}

export default CalendarProps;
