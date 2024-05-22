import React, { useState, useEffect } from "react";
import "../../styles/FuncionesGeneral.css";
import axios from "axios";
import editarIcon from "../../assets/editar-archivo.png";
import eliminarIcon from "../../assets/borrar.png";
import cambiarEstadoIcon from "../../assets/desactivar.png";

const Carrera = () => {
  const url = "http://localhost:5034/api/Carrera/ListarCarrera";
  const [carreras, setCarreras] = useState([]);
  const [modalData, setModalData] = useState({
    show: false,
    type: "",
    data: {},
  });
  const [formData, setFormData] = useState({
    id: "",
    sigla: "",
    nombre: "",
    estado: "",
    detalle: "",
    idFacultad: "",
  });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [facultades, setFacultades] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    getCarreras();
    axios
      .get("http://localhost:5034/api/Facultad/ListarFacultad") // Cambia esta URL a tu endpoint real
      .then((response) => {
        setFacultades(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las facultades:", error);
      });
  }, []);

  const getCarreras = async () => {
    const respuesta = await axios.get(url);
    setCarreras(respuesta.data);
  };

  const handleModalOpen = (type, data = {}) => {
    setFormData({
      id: data.id || 0,
      sigla: data.sigla || "",
      nombre: data.nombre || "",
      estado: data.estado || "A",
      detalle: data.detalle || "",
      idFacultad: data.idFacultad || 0,
    });
    setModalData({
      show: true,
      type,
      data,
    });
    setPosition({
      x: window.innerWidth / 2 - 250,
      y: window.innerHeight / 2 - 150,
    });
  };

  const handleModalClose = () => {
    setModalData({
      show: false,
      type: "",
      data: {},
    });
  };

  const handleModificarEstado = async (accion, carrera) => {
    try {
      if (accion === "cambiarEstado") {
        await axios.put(
          `http://localhost:5034/api/Carrera/CambiarEstadoCarrera?id=${carrera.id}`
        );
      } else if (accion === "eliminar") {
        await axios.delete(
          `http://localhost:5034/api/Carrera/EliminarCarrera?id=${carrera.id}`
        );
      }
      getCarreras(); // Refresh faculty list after any action
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    try {
      let response;
      if (modalData.type === "crear") {
        response = await axios.post(
          "http://localhost:5034/api/Carrera/GuardarCarrera",
          formData
        );
      } else if (modalData.type === "editar") {
        response = await axios.put(
          "http://localhost:5034/api/Carrera/ModificarCarrera",
          formData
        );
      } else if (modalData.type === "consultar") {
        response = await axios.get(
          `http://localhost:5034/api/Carrera/BuscarCarrera?id=${formData.id}`
        );
        handleModalOpen("consultar", response.data);
      }
      if (response && response.data) {
        console.log("Datos guardados:", response.data);
        console.log();
      } else {
        console.log("La respuesta no contiene datos.");
      }
      getCarreras();
    } catch (error) {
      console.error("Error al guardar los datos:", error);
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };
  const handleRowClick = (carrera) => {
    setFormData(carrera);
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const renderForm = () => (
    <form onSubmit={handleFormSubmit} className="form">
      <div className="modal-content">
        {modalData.type === "crear" && (
          <>
            <label className="modal-title">CREAR Carrera</label>
          </>
        )}
        {modalData.type === "editar" && (
          <>
            <label className="modal-title">MODIFICAR Carrera</label>
            <div className="form-group">
              <label>Id:</label>
              <input
                type="text"
                id="id"
                name="id"
                placeholder="ID"
                onChange={handleChange}
                value={formData.id}
              />
            </div>
          </>
        )}
        {modalData.type === "consultar" && (
          <>
            <label className="modal-title">CONSULTAR Carrera</label>
            <div className="form-group">
              <label>Id:</label>
              <input
                type="text"
                id="id"
                name="id"
                placeholder="ID"
                onChange={handleChange}
                value={formData.id}
              />
            </div>
          </>
        )}
        <div className="form-group">
          <label>Sigla:</label>
          <input
            type="text"
            id="sigla"
            name="sigla"
            placeholder="Sigla"
            onChange={handleChange}
            value={formData.sigla}
          />
        </div>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            onChange={handleChange}
            value={formData.nombre}
          />
        </div>
        <div className="form-group">
          <label>Detalle:</label>
          <textarea
            id="detalle"
            name="detalle"
            placeholder="Detalle"
            onChange={handleChange}
            value={formData.detalle}
            cols="30"
          />
        </div>
        <div className="form-group">
          <label>Facultad:</label>
          <select
            id="idFacultad"
            name="idFacultad"
            onChange={handleChange}
            value={formData.idFacultad}
          >
            <option value="">Seleccione una Facultad</option>
            {facultades.map((facultad) => (
              <option key={facultad.id} value={facultad.id}>
                {facultad.nombre}
              </option>
            ))}
          </select>
        </div>
        <button className="button" type="submit">
          {modalData.type}
        </button>
      </div>
    </form>
  );

  return (
    <div onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <h1 className="Titulo">Datos Carrera</h1>
      <div className="Menu--Buttons">
        <button
          className="Buttons"
          onClick={() => handleModalOpen("crear", {})}
        >
          Crear
        </button>
        <button
          className="Buttons"
          onClick={(e) => {
            handleModalOpen("editar", formData);
          }}
        >
          Editar
        </button>
        <button
          className="Buttons"
          onClick={() => handleModificarEstado("cambiarEstado", formData)}
        >
          Cambiar Estado
        </button>
        <button
          className="Buttons"
          onClick={() => handleModificarEstado("eliminar", formData)}
        >
          Eliminar
        </button>
        <button
          className="Buttons"
          onClick={() => handleModalOpen("consultar", formData)}
        >
          Consultar
        </button>
        <button
          className="Buttons"
          onClick={() => handleModalOpen("informe", {})}
        >
          Informe
        </button>
      </div>
      <div className="tabla">
        <div>
          <div
            className="table-responsive"
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Codigo</th>
                  <th>Carrera</th>
                  <th>Estado</th>
                  <th>Detalle</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {carreras.map((carrera) => (
                  <tr key={carrera.id} onClick={() => handleRowClick(carrera)}>
                    <td>{carrera.id}</td>
                    <td>{carrera.nombre}</td>
                    <td>{carrera.estado}</td>
                    <td>{carrera.detalle}</td>
                    <td>
                      <button
                        className="Buttons"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleModalOpen("editar", carrera);
                        }}
                      >
                        <img src={editarIcon} alt="Editar" />
                      </button>
                      <button
                        className="Buttons"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleModificarEstado("cambiarEstado", carrera);
                        }}
                      >
                        <img src={cambiarEstadoIcon} alt="Editar" />
                      </button>
                      <button
                        className="Buttons"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleModificarEstado("eliminar", carrera);
                        }}
                      >
                        <img src={eliminarIcon} alt="Editar" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {modalData.show && (
        <div className="modal-overlay">
          <div
            className="modal"
            onMouseDown={handleMouseDown}
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
          >
            <span className="close" onClick={handleModalClose}>
              &times;
            </span>
            {modalData.type === "eliminar" ? (
              <div className="modal-content">
                <p>¿Estás seguro de eliminar esta carrera?</p>
                <button
                  className="button"
                  onClick={() =>
                    handleModificarEstado("eliminar", modalData.data)
                  }
                >
                  Sí
                </button>
                <button
                  className="button cancel-button"
                  onClick={handleModalClose}
                >
                  No
                </button>
              </div>
            ) : (
              renderForm()
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrera;
