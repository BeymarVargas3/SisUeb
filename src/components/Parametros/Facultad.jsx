import React, { useState, useEffect } from "react";
import "../../styles/FuncionesGeneral.css";
import axios from "axios";

const Facultad = () => {
  const url = "http://localhost:5034/api/Facultad/ListarFacultad";
  const [facultades, setFacultades] = useState([]);
  const [modalData, setModalData] = useState({
    show: false,
    type: "",
    data: {},
  });
  const [formData, setFormData] = useState({
    id: 0,
    nombre: "",
    estado: "",
    detalle: "",
  });

  useEffect(() => {
    getFacultades();
  }, []);
  useEffect(() => {
    if (modalData.type === "cambiarEstado" && formData.id !== 0) {
      handleFormSubmit();
    }
  }, [formData, modalData.type]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getFacultades = async () => {
    const respuesta = await axios.get(url);
    setFacultades(respuesta.data);
  };

  const handleModalOpen = (type, data = {}) => {
    setFormData({
      id: data.id || 0,
      nombre: data.nombre || "",
      estado: data.estado || "A",
      detalle: data.detalle || "",
    });
    setModalData({
      show: true,
      type,
      data,
    });
  };

  const handleModalClose = () => {
    setModalData({
      show: false,
      type: "",
      data: {},
    });
  };

  const handleCambiarEstado = async (facultad) => {
    setFormData(facultad);
    modalData.type = "cambiarEstado";
    handleFormSubmit();
  };

  const handleFormSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    try {
      let response;
      if (modalData.type === "crear") {
        response = await axios.post(
          "http://localhost:5034/api/Facultad/GuardarFacultad",
          formData
        );
      } else if (modalData.type === "editar") {
        response = await axios.put(
          "http://localhost:5034/api/Facultad/ModificarFacultad",
          formData
        );
      } else if (modalData.type === "cambiarEstado") {
        response = await axios.put(
          `http://localhost:5034/api/Facultad/CambiarEstadoFacultad?id=${formData.id}`
        );
      }
      if (response && response.data) {
        console.log("Datos guardados:", response.data);
      } else {
        console.log("La respuesta no contiene datos.");
      }
      handleModalClose();
      getFacultades();
    } catch (error) {
      console.error("Error al guardar los datos:", error);
    }
  };

  const renderForm = () => (
    <form onSubmit={handleFormSubmit}>
      <div className="InputsValores">
        {modalData.type !== "editar" && (
          <>
            <label>Id:</label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              readOnly
            />
          </>
        )}
        <label>Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
      </div>
      <div className="InputsValores">
        <label>Detalle:</label>
        <textarea
          id="detalle"
          name="detalle"
          placeholder="Detalle"
          value={formData.detalle}
          onChange={handleChange}
          cols="30"
        />
      </div>
      <button type="submit">
        {modalData.type === "crear" ? "Guardar" : "Modificar"}
      </button>
    </form>
  );

  return (
    <div>
      <h1 className="Titulo">Datos Facultad</h1>
      <div className="Menu--Buttons">
        <button
          className="Buttons"
          onClick={() => handleModalOpen("crear", {})}
        >
          Crear
        </button>
        <button
          className="Buttons"
          onClick={() => handleModalOpen("editar", {})}
        >
          Editar
        </button>
        <button
          className="Buttons"
          onClick={() => handleModalOpen("cambiarEstado", {})}
        >
          Cambiar Estado
        </button>
        <button
          className="Buttons"
          onClick={() => handleModalOpen("eliminar", {})}
        >
          Eliminar
        </button>
        <button
          className="Buttons"
          onClick={() => handleModalOpen("consultas", {})}
        >
          Consultas
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
                  <th>Facultad</th>
                  <th>Estado</th>
                  <th>Detalle</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {facultades.map((facultad) => (
                  <tr key={facultad.id}>
                    <td>{facultad.id}</td>
                    <td>{facultad.nombre}</td>
                    <td>{facultad.estado}</td>
                    <td>{facultad.detalle}</td>
                    <td>
                      <button
                        className="Buttons"
                        onClick={() => handleModalOpen("editar", facultad)}
                      >
                        Editar
                      </button>
                      <button
                        className="Buttons"
                        onClick={() => handleCambiarEstado(facultad)}
                      >
                        Cambiar Estado
                      </button>
                      <button
                        className="Buttons"
                        onClick={() => handleModalOpen("eliminar", facultad)}
                      >
                        Eliminar
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
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>
              &times;
            </span>
            {modalData.type === "eliminar" ? (
              <p>¿Estás seguro de eliminar esta facultad?</p>
            ) : (
              renderForm()
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Facultad;
