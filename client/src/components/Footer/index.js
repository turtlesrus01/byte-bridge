import React from "react";
import { Paper, Box } from "@mui/material";

const Footer = () => {
  return (
    <Paper
      elevation={3}
      style={{ padding: 20 }}
      sx={{ width: "100%", position: "fixed", bottom: 0 }}
    >
      <Box sx={{ justifyContent: "center", display: "flex" }}>Footer</Box>
    </Paper>
  );
};

export default Footer;
