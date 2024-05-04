import React, { useState } from "react";
import axios from "axios";
import "../../styles/FacultadStyles.css";

const FacultadCrear = ({ mostrar, cerrarModal }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    estado: "A",
    detalle: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5034/api/Facultad/GuardarFacultad",
        formData
      );
      console.log("Datos guardados:", response.data);
      cerrarModal();
    } catch (error) {
      console.error("Error al guardar los datos:", error);
    }
  };

  return (
    <div className={mostrar ? "modal mostrar" : "modal"} onClick={cerrarModal}>
      <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
        <h2 className="TituloModal">Agregar nueva Facultad</h2>
        <form onSubmit={handleSubmit}>
          <div className="campo">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="campo">
            <label htmlFor="detalle">Detalle:</label>
            <textarea
              id="detalle"
              name="detalle"
              value={formData.detalle}
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>
          <div className="Butons--Acciones">
            <button type="submit">Guardar</button>
            <button onClick={cerrarModal}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FacultadCrear;
