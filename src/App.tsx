import React, { useState } from "react";
import "./App.css";
import AsteroidForm from "./Asteroid/AsteroidForm.tsx";
import DisplayAsteroidDetails from "./Asteroid/DisplayAsteroidDetalis.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import AsteroidFormClassComp from "./Asteroid/AsteroidFormClassComp.tsx";

const App: React.FC = () => {
  const [asteroidDetails, setAsteroidDetails] = useState<any>(undefined);

  return (

      <Router>
        <Routes>
          <Route
            path="/"
            element={<AsteroidForm setAsteroidDetails={setAsteroidDetails} />}
          />
          <Route
            path="/getAsteroidDetalis"
            element={
      <DisplayAsteroidDetails asteroidDetails={asteroidDetails} />}
          />          
          {/* <Route
            path="/Class"
            element={<AsteroidFormClassComp asteroidDetails={asteroidDetails} />}
          /> */}
        </Routes>
      </Router>
  );
};

export default App;
