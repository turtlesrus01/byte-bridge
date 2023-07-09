import React, { useContext } from "react";
// Import the UserContext
import { UserContext } from "../utils/UserContext"; 
// Import the components
import { CalendarEmail } from "./CalendarEmail";

const Home = () => {
  // Access the state from UserContext
  const { state } = useContext(UserContext); 

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: "1px dotted #1a1a1a" }}
        >
          <h2>HOMEPAGE</h2>
        </div>
        <div className="col-12 col-md-8 mb-3">
          {state.isLoggedIn ? ( 
            <CalendarEmail /> // Render the CalendarEmail component if logged in
          ) : (
            // Render the default content if not logged in
            <div>Splashpage content</div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;