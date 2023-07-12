import "./App.css";
import React from "react";
// Apollo client methods
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
// import context
import { setContext } from "@apollo/client/link/context";
import { UserProvider } from "./utils/UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Components
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CalendarProps from "./components/CalendarProps";
import CalendarEmail from "./pages/CalendarEmail";
// import Calendar from "./pages/Calendar";
// Mui theme
import { createTheme, ThemeProvider } from "@mui/material/styles";

// GraphQL endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Request middleware
const authLink = setContext((_, { headers }) => {
  // Get auth token from local storage
  const token = localStorage.getItem("id_token");
  // Return headers for httpLink request
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Apollo client
const client = new ApolloClient({
  //authLink middleware to attach the JWT token to every request
  link: authLink.concat(httpLink),
  // Set up the cache
  cache: new InMemoryCache(),
});

// Font Family import
const theme = createTheme({
  typography: {
    fontFamily: [ 'Arial', 'sans-serif'].join(','),
    h3: {
      fontFamily: 'Caprasimo',
    },
    body1: {
      fontFamily: 'Rubik',
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <UserProvider>
          <Router>
            <div className="flex-column justify-flex-start min-100-vh">
              <Header />
              <div className="container">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/me" element={<Profile />} />
                  <Route path="/profiles/:username" element={<Profile />} />
                  <Route path="/calendarprops" element={<CalendarProps />} />
                  <Route path="/calendaremail" element={<CalendarEmail />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </Router>
        </UserProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
