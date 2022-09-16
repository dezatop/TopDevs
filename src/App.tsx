//React
import React from "react";
//Libs
import { Routes, Route, Navigate } from "react-router-dom";
//Components
import Employees from "components/Employees/Employees";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/employees" replace />} />
        <Route path="/employees" element={<Employees />} />
      </Routes>
    </>
  );
}

export default App;
