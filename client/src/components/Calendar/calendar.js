import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import "./calendar.css";
const calendar = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker className="container" orientation="landscape" />
    </LocalizationProvider>
  );
};
export default calendar;
