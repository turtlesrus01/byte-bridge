import React, { useState } from "react";
import { Link } from "react-router-dom";
// mutations
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
//MUI components
import { Button,
  TextField,
  Grid,
  Snackbar,
  Container,
  Box,
  Alert,
  Typography } from "@mui/material";

import Auth from "../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" justifyContent="center" mt={4} mb={4}>
        <div>
          <Typography variant="h3" component="h3" sx={{my: 2}}>Sign Up</Typography>
          <Snackbar open={Boolean(data)} autoHideDuration={3000}>
            <Alert severity="success">
              Success! You may now head{" "}
              <Link to="/">back to the homepage.</Link>
            </Alert>
          </Snackbar>
          <form onSubmit={handleFormSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Your username"
                  name="username"
                  type="text"
                  value={formState.username}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              style={{ cursor: "pointer" }}
              type="submit"
              sx={{ my: 2}}
            >
              Submit
            </Button>
          </form>
          {error && (
            <div className="my-3 p-3 bg-danger text-white">
              {error.message}
            </div>
          )}
        </div>
      </Box>
    </Container>
  );
};

export default Signup;
