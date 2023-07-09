import React, { useContext } from "react";
// Import the UserContext
import { UserContext, SET_LOGIN_STATUS } from "../utils/UserContext";
// Import the components
import CalendarEmail from "./CalendarEmail";
import { Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const Home = () => {
  // Access the state from UserContext
  const { state, dispatch } = useContext(UserContext);

  const handleLogin = () => {
    // Dispatch action to set login status to true
    dispatch({ type: SET_LOGIN_STATUS, payload: true });
  };

  const handleLogout = () => {
    Auth.logout();
    dispatch({ type: SET_LOGIN_STATUS, payload: false });
  };

  return (
    <Box display="flex" justifyContent="center">
      {state.isLoggedIn ? (
        <Box className="col-12 col-md-8 mb-3">
          <CalendarEmail />
          <Button variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      ) : (
        <>
          <Box className="col-12 col-md-10 mb-3 p-3" sx={{ border: "1px dotted #1a1a1a" }}>
            <Typography variant="h3" component="h3">
              HOMEPAGE
            </Typography>
            <Button variant="contained" onClick={handleLogin}>
              Login
            </Button>
          </Box>
          <Box className="col-12 col-md-8 mb-3">
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Home;
