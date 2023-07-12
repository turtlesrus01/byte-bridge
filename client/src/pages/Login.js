import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

//MUI components
import {
  Button,
  TextField,
  Grid,
  Snackbar,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
// Import utils
import { LOGIN_USER } from "../utils/mutations";
import { UserContext, SET_LOGIN_STATUS } from "../utils/UserContext";
import Auth from "../utils/auth";
import CalendarEmail from "./CalendarEmail";


const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const [modalOpen, setModalOpen] = useState(false);
  // Context setup
  const { dispatch } = useContext(UserContext);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };
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
        variables: { ...formState },
      });
      console.log("Received token:", data.login.token);
      Auth.login(data.login.token);
      // Context update
      dispatch({ type: SET_LOGIN_STATUS, payload: true });
    } catch (e) {
      console.error(e);
    }
    // Clear values after submit
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <Box
            className="card-header"
            sx={{
              backgroundColor: "dark",
              color: "light",
              padding: "2px",
            }}
          
          ></Box>
            
         
          <div className="card-body">
            {data ? (
              <Snackbar open={true} autoHideDuration={3000}>
                <MuiAlert severity="success">
                  Success! You may now head{" "}
                  <Link to="./CalendarEmail">back to the homepage.</Link>
                </MuiAlert>
              </Snackbar>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleModalOpen}
                >
                 Click Here to Login
                </Button>
                
                <Modal open={modalOpen} onClose={handleModalClose}>
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      bgcolor: "background.paper",
                      boxShadow: 24,
                      p: 4,
                      width: "300px",
                    }}
                  >
                    <form onSubmit={handleFormSubmit}>
                      <Grid container spacing={2}>
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
                        type="submit"
                        style={{ marginTop: "10px" }}
                      >
                        Submit
                      </Button>
                    </form>
                    {error && (
                      <div className="my-3 p-3 bg-danger text-white">
                        {error.message}
                      </div>
                    )}
                  </Box>
                </Modal>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
