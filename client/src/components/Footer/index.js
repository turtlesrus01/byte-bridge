import React from "react";
import { Paper, Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Paper
      elevation={3}
      style={{ padding: 20 }}
      sx={{
        padding: 20,
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        zIndex: 9999,
      }}
    >
      <Box sx={{ justifyContent: "center", display: "flex" }}>
        <Typography variant="body1" component="h2">
          Made by{" "}
          <Link
            href="https://github.com/That-Dude13"
            aria-label="GitHub profile of Kelvin Easily"
          >
            Kelvin Easiley
          </Link>{" "}
          and{" "}
          <Link
            href="https://github.com/turtlesrus01"
            aria-label="GitHub profile of Stefan Palacios"
          >
            Stefan Palacios
          </Link>
        </Typography>
      </Box>
    </Paper>
  );
};

export default Footer;
