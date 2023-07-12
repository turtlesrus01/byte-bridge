import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Paper,
  Typography,
  Button,
  AppBar,
  Toolbar,
} from "@mui/material";

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
              <Link className="text-light" to="/" underline="none">
                <Typography variant="h3" component="h3" color="white">
                  Byte-Bridge
                </Typography>
              </Link>
              <Typography variant="body1">
                Realty Scheduling Solutions.
              </Typography>
            </div>
            <div>
              {Auth.loggedIn() ? (
                <>
                  <Button
                    component={Link}
                    to="/me"
                    variant="inherit"
                    className="btn btn-lg btn-light m-2"
                  >
                    {`${Auth.getProfile().data.username}'s profile`}
                  </Button>
                  <Button
                    variant="outlined"
                    className="btn btn-lg btn-light m-2"
                    onClick={logout}
                  >
                    <Typography variant="body1">Logout</Typography>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    component={Link}
                    to="/login"
                    variant="inherit"
                    className="btn btn-lg btn-light m-2"
                  >
                    <Typography variant="body1">Login</Typography>
                  </Button>
                  <Button
                    component={Link}
                    to="/signup"
                    variant="inherit"
                    className="btn btn-lg btn-light m-2"
                  >
                    <Typography variant="body1">Signup</Typography>
                  </Button>
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
