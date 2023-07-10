//react context import
import React, { createContext, useReducer } from "react";

// Defines the intial state
const initialState = {
  isLoggedIn: false
};

// Login action type
export const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS';

//useReducer to initialize state
const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOGIN_STATUS:
      return {
        ...state,
        isLoggedIn: action.payload
      };
    default:
      return state;
  }
};

//UserContext initial state
export const UserContext = createContext(initialState);

//Create the provider component
export const UserProvider = ({ children }) => {
  const [state, userDispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};


