import React from "react";
import { Link } from "react-router-dom";
import { Paper, Typography, Button, AppBar, Toolbar } from "@mui/material";

import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <Paper elevation={3}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <div className="container flex-row justify-space-between-lg justify-center align-center">
            <div>
              <Link className="text-light" to="/">
                <Typography variant="h4">Byte-Bridge</Typography>
              </Link>
              <Typography variant="body1">Realty Scheduling Solutions.</Typography>
            </div>
            <div>
              {Auth.loggedIn() ? (
                <>
                  <Link className="btn btn-lg btn-info m-2" to="/me">
                    {Auth.getProfile().data.username}'s profile
                  </Link>
                  <Button variant="outlined" className="btn btn-lg btn-light m-2" onClick={logout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link variant="outlined" className="btn btn-lg btn-info m-2" to="/login">
                    Login
                  </Link>
                  <Link className="btn btn-lg btn-light m-2" to="/signup">
                    Signup
                  </Link>
                  <Link className="btn btn-lg btn-light m-2" to="/signup">
                    TestCalendar
                  </Link>
                </>
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Paper>
  );
};

export default Header;
