import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AsteroidFormClassComp from "./Asteroid/AsteroidFormClassComp.tsx";
import DisplayAsteroidDetalisClassComp from "./Asteroid/DisplayAsteroidDetalisClassComp.tsx";

const App: React.FC = () => {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AsteroidFormClassComp />} />
        <Route
          path="/getAsteroidDetalis"
          element={<DisplayAsteroidDetalisClassComp />}
        />
      </Routes> 
    </BrowserRouter> 
  );
}; 

export default App;
