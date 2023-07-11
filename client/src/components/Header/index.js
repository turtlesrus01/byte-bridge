import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Paper, Typography, Button, AppBar, Toolbar, Tab, Tabs,  } from "@mui/material";

import Auth from "../../utils/auth";

const Header = () => {
  const location = useLocation();

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
              <Typography variant="body1">
                Realty Scheduling Solutions.
              </Typography>
            </div>
            <div>
              {Auth.loggedIn() ? (
                <Tabs value={location.pathname}>
                  <Tab
                    label={`${Auth.getProfile().data.username}'s profile`}
                    value="/me"
                    component={Link}
                    to="/me"
                  />
                  <Button
                    variant="outlined"
                    className="btn btn-lg btn-light m-2"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </Tabs>
              ) : (
                <Tabs value={location.pathname}>
                  <Tab
                    label="Login"
                    value="/login"
                    component={Link}
                    to="/login"
                  />
                  <Tab
                    label="Signup"
                    value="/signup"
                    component={Link}
                    to="/signup"
                  />
                </Tabs>
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Paper>
  );
};

export default Header;
