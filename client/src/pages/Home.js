import React, { useContext } from "react";
// Import the UserContext
import { UserContext, SET_LOGIN_STATUS } from "../utils/UserContext";
// Import the components
import CalendarEmail from "./CalendarEmail";
import { Button, Typography, Box, Grid, Container} from "@mui/material";
//import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import hero from "../assets/img/pexels-fabian-reitmeier-707915.jpg";
import Login  from "./Login";


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
          <Container maxWidth="lg">
      <Box className="col-12 col-md-6 mb-3 p-3">
        <Box mb={3}>
          <Typography variant="h3" component="h3">
            HOMEPAGE
          </Typography>
        </Box>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6}>
            <Box pr={2}>
              <img
                src={hero}
                alt="Nature Hero"
                style={{ width: "100%", maxWidth: "100%" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography variant="body1" paragraph='true'>
              Byte-Bridge is a cutting-edge scheduling app designed specifically for realtors and home buyers. With Byte-Bridge, the process of scheduling property viewings and appointments becomes seamless and efficient. Realtors can easily manage their listings, availability, and client appointments all in one place, while home buyers can conveniently browse available properties and request viewings. 
              <br/>
              The app provides a user-friendly interface, allowing realtors and home buyers to communicate and coordinate effortlessly. Byte-Bridge streamlines the scheduling process, saving time and reducing the stress often associated with property viewings. Experience a new level of convenience and organization with Byte-Bridge for all your real estate scheduling needs.
              </Typography>
              
                <Login onClick={handleLogin}/>
              
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
        </>
      )}
    </Box>
  );
};

export default Home;
