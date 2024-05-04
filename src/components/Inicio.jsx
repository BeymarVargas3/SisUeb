import React, { useState, useEffect } from "react";
import "../styles/Content.css";
import ImagenUeb from "../assets/Fondo.png";

const Inicio = () => {
  const [horaActual, setHoraActual] = useState("");

  const obtenerHoraActual = () => {
    const ahora = new Date();
    const horas = ahora.getHours().toString().padStart(2, "0");
    const minutos = ahora.getMinutes().toString().padStart(2, "0");
    const segundos = ahora.getSeconds().toString().padStart(2, "0");
    const horaActualFormateada = `${horas}:${minutos}:${segundos}`;
    setHoraActual(horaActualFormateada);
  };

  useEffect(() => {
    obtenerHoraActual();
    const intervalo = setInterval(() => {
      obtenerHoraActual();
    }, 1000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="content">
      <div className="img--reloj">
        <img src={ImagenUeb} className="image--institucion" />
        <p className="reloj--actual">{horaActual}</p>
      </div>
    </div>
  );
};

export default Inicio;
