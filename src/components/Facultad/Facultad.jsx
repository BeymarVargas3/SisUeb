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
    nombre: "",
    estado: "A",
    detalle: "",
  });
  useEffect(() => {
    getFacultades();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const getFacultades = async () => {
    const respuesta = await axios.get(url);
    setFacultades(respuesta.data);
  };

  const handleModalOpen = (type, data = {}) => {
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

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5034/api/Facultad/GuardarFacultad",
        formData
      );
      console.log("Datos guardados:", response.data);
      handleModalClose();
      getFacultades();
    } catch (error) {
      console.error("Error al guardar los datos:", error);
    }
  };

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
        <div className="col-12 col-1g-8 offset-0 offset-1g-12">
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
                        onClick={() =>
                          handleModalOpen("cambiarEstado", facultad)
                        }
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
            <form onSubmit={handleModalSubmit}>
              {modalData.type === "crear" && (
                <>
                  Crear
                  <div className="InputsValores">
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
                    <label> Detalle:</label>
                    <textarea
                      id="detalle"
                      name="detalle"
                      placeholder="Detalle"
                      value={formData.detalle}
                      onChange={handleChange}
                      cols="30"
                    />
                  </div>
                </>
              )}
              {(modalData.type === "editar" ||
                modalData.type === "cambiarEstado") && (
                <>
                  <input
                    type="text"
                    placeholder="Nombre"
                    defaultValue={modalData.data.nombre}
                  />
                  <input
                    type="text"
                    placeholder="Estado"
                    defaultValue={modalData.data.estado}
                  />
                  <input
                    type="text"
                    placeholder="Detalle"
                    defaultValue={modalData.data.detalle}
                  />
                </>
              )}
              {modalData.type === "eliminar" && (
                <p>¿Estás seguro de eliminar esta facultad?</p>
              )}
              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default Facultad;
