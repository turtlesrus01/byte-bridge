import { useState } from "react";
import Calendar from "react-calendar";
import "../../../src/App.css";
import { Typography } from "@mui/material";

function TestCalendar() {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
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
