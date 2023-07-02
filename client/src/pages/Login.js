import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
//MUI components
import { Button, TextField, Grid, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert"; 

import Auth from "../utils/auth";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  // State change based on form input
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  // form submit handler
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: {...formState },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
    // clear values after submit
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Login</h4>
          <div className="card-body">
            {data ? (
              <Snackbar open={true} autoHideDuration={3000}>
                <MuiAlert severity="success">
                  Success! You may now head{' '}
                  <Link to="/">back to the homepage.</Link>
                </MuiAlert>
              </Snackbar>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <Grid container spacing={2}> {/* Use MUI Grid for layout */}
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
                  style={{ cursor: 'pointer' }}
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

export default Login;