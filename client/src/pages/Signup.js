import React, { useState } from "react";
import { Link } from "react-router-dom";
// mutations
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
//MUI components
import { Button, TextField, Grid, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

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
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
          <div className="card-body">
            {data ? (
              <Snackbar open={true} autoHideDuration={3000}>
                <MuiAlert severity="success">
                  Success! You may now head{" "}
                  <Link to="/">back to the homepage.</Link>
                </MuiAlert>
              </Snackbar>
            ) : (
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
                >
                  Submit
                </Button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
