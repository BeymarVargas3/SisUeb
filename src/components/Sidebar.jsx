import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiHome, BiSolidReport, BiStats, BiTask } from "react-icons/bi";
import "../styles/sidebar.css";
import facultad from "../assets/facultad.png";
import carrera from "../assets/la-licenciatura.png";
import materia from "../assets/presentacion.png";
import LogoUeb from "../assets/UEB.png";
const Sidebar = () => {
  const [proyectosVisible, setProyectosVisible] = useState(false);
  const [parametrosVisible, setParametrosVisible] = useState(false);
  const [requisitosVisible, setRequisitosVisible] = useState(false);
  const [reportesVisible, setReportesVisible] = useState(false);
  const [administracionVisible, setAdministracionVisible] = useState(false);

  const handleDashboardClick = () => {
    setAdministracionVisible(false);
    setReportesVisible(false);
    setRequisitosVisible(false);
    setParametrosVisible(false);
    setProyectosVisible(false);
  };
  const handleProyectosClick = () => {
    setAdministracionVisible(false);
    setReportesVisible(false);
    setRequisitosVisible(false);
    setParametrosVisible(false);
    setProyectosVisible(!proyectosVisible);
  };
  const handleParametrosClick = () => {
    setAdministracionVisible(false);
    setReportesVisible(false);
    setRequisitosVisible(false);
    setParametrosVisible(!parametrosVisible);
    setProyectosVisible(false);
  };
  const handleRequisitosClick = () => {
    setAdministracionVisible(false);
    setReportesVisible(false);
    setRequisitosVisible(!requisitosVisible);
    setParametrosVisible(false);
    setProyectosVisible(false);
  };
  const handleReportesClick = () => {
    setAdministracionVisible(false);
    setReportesVisible(!reportesVisible);
    setRequisitosVisible(false);
    setParametrosVisible(false);
    setProyectosVisible(false);
  };
  const handleAdministracionClick = () => {
    setAdministracionVisible(!administracionVisible);
    setReportesVisible(false);
    setRequisitosVisible(false);
    setParametrosVisible(false);
    setProyectosVisible(false);
  };
  return (
    <div className="menu">
      <div className="logo">
        <img src={LogoUeb} className="logo-icon" />
        <h2 className="logoname">Universidad Evangelica Boliviana</h2>
      </div>
      <hr className="separatortitle" />
      <div className="menu--list">
        {/* Dashboard */}
        <Link to="/" className="item" onClick={handleDashboardClick}>
          <BiHome className="icon" />
          Dashboard
        </Link>
        {/* Proyectos */}
        <div
          className={`separator ${proyectosVisible ? "active" : ""}`}
          onClick={handleProyectosClick}
        >
          Proyectos
          {proyectosVisible && (
            <div className="sub-menu">
              <a href="/proyectos" className="item">
                <BiTask className="icon" />
                Gestionar proyectos
              </a>
              <a href="#" className="item">
                <BiSolidReport className="icon" />
                Gestionar requisitos
              </a>
            </div>
          )}
        </div>
        {/* Requisitos */}
        <div
          className={`separator ${requisitosVisible ? "active" : ""}`}
          onClick={handleRequisitosClick}
        >
          Requisitos
          {requisitosVisible && (
            <div className="sub-menu">
              <a href="#" className="item">
                <BiStats className="icon" />
                Gestionar requisitos
              </a>
            </div>
          )}
        </div>
        {/* Parametro y configuracion */}
        <div
          className={`separator ${parametrosVisible ? "active" : ""}`}
          onClick={handleParametrosClick}
        >
          Parámetro y configuración
          {parametrosVisible && (
            <div className="sub-menu">
              <Link to="/Facultad" className="item">
                <img src={facultad} alt="facultad" />
                Facultad
              </Link>
              <Link to="Carrera" className="item">
                <img src={carrera} alt="carrera" />
                Carrera
              </Link>
              <a href="#" className="item">
                <img src={materia} alt="materia" />
                Materia
              </a>
            </div>
          )}
        </div>
        {/* Reportes */}
        <div
          className={`separator ${reportesVisible ? "active" : ""}`}
          onClick={handleReportesClick}
        >
          Reportes
          {reportesVisible && (
            <div className="sub-menu">
              <a href="#" className="item">
                <BiTask className="icon" />
                Reportes estadisticos
              </a>
              <a href="#" className="item">
                <BiSolidReport className="icon" />
                Reportes para control
              </a>
            </div>
          )}
        </div>
        {/* Aministracion*/}
        <div
          className={`separator ${administracionVisible ? "active" : ""}`}
          onClick={handleAdministracionClick}
        >
          Usuario, seguridad y auditoria
          {administracionVisible && (
            <div className="sub-menu">
              <a href="#" className="item">
                <BiTask className="icon" />
                Gestionar usuarios
              </a>
              <a href="#" className="item">
                <BiSolidReport className="icon" />
                Gestionar roles y permisos
              </a>
              <a href="#" className="item">
                <BiSolidReport className="icon" />
                Administración de bitacora
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
