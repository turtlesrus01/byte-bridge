import React, { useContext } from "react";
// Import the UserContext
import { UserContext, SET_LOGIN_STATUS } from "../utils/UserContext"; 
// Import the components
import CalendarEmail from "./CalendarEmail";
import { Button, Typography, Box } from "@mui/material";

const Home = () => {
  // Access the state from UserContext
  const { state, dispatch } = useContext(UserContext); 

  const handleLogin = () => {
    // Dispatch action to set login status to true
    dispatch({ type: SET_LOGIN_STATUS, payload: true }); 
  };

  return (
    <Box display="flex" justifyContent="center">
      <Box
        className="col-12 col-md-10 mb-3 p-3"
        sx={{ border: "1px dotted #1a1a1a" }}
      >
        <Typography variant="h2" component="h2">
          HOMEPAGE
        </Typography>
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
      </Box>
      <Box className="col-12 col-md-8 mb-3">
        {state.isLoggedIn ? (
          <CalendarEmail />
        ) : (
          <Typography variant="body1">Default Content</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Home;