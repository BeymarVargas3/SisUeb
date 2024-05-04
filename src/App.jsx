import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Inicio from "./components/Inicio";
import Facultad from "./components/Facultad/Facultad";
import Carrera from "./components//Carrera/Carrera";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div className="View--Principal">
          <Sidebar />
          <div className="View--Contenido">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/Facultad" element={<Facultad />} />
              <Route path="/Carrera" element={<Carrera />} />
            </Routes>
            <div>Usuario Adm</div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};
export default App;
