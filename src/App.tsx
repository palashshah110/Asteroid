import React, { useState } from "react";
import "./App.css";
import AsteroidForm from "./Asteroid/AsteroidForm";
// import AsteroidDetails from "./Asteroid/AsteroidDetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DisplayAsteroidDetalis from "./Asteroid/DisplayAsteroidDetalis";
const App = (): JSX.Element => {
  // Task : Asteroid details
  // Get list of asteroid: https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY
  // Get asteroid details by ID: https://api.nasa.gov/neo/rest/v1/neo/3542519?api_key=DEMO_KEY
  // generate API key here: https://api.nasa.gov/

  // Create app to display a form.
  // The form has a field to enter the id of an asteroid.
  // On submit, move to new screen and show the details about the asteroid.
  // The form has another button called "Random asteroid".
  // On clicking that button, fetch the details of a random asteroid and display it.

  // Note: TypeScript and Material UI for Css must be used

  const [asteroidDetails, setAsteroidDetails] = useState<any>(undefined);
  return (
    <>
      <div className="Container">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<AsteroidForm setAsteroidDetails={setAsteroidDetails} />}
            />
            <Route
              path="/getAsteroidDetalis"
              element={
                <DisplayAsteroidDetalis asteroidDetails={asteroidDetails} />
              }
            />
          </Routes>
        </BrowserRouter>
        {/* <AsteroidDetails/> */}
      </div>
    </>
  );
};
export default App;
