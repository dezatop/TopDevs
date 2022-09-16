//React
import React from "react";
//Libs
import { Routes, Route } from "react-router-dom";
//Components
import Employees from "components/Employees/Employees";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Employees />} />
      </Routes>
    </>
  );
}

export default App;
