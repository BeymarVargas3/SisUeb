import React, { useState } from 'react';
import '../../styles/FuncionesGeneral.css';
const Carrera = () => {
  const [busqueda, setBusqueda] = useState('');
  const [filtroPor, setFiltroPor] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const handleBusquedaChange = (event) => {
    setBusqueda(event.target.value);
  };
  const handleFiltroPorChange = (event) => {
    setFiltroPor(event.target.value);
  };
  const handleFiltroEstadoChange = (event) => {
    setFiltroEstado(event.target.value);
  };
  const buscar = () => {
    console.log("Realizar búsqueda con los siguientes filtros:");
    console.log("Texto de búsqueda:", busqueda);
    console.log("Filtro por:", filtroPor);
    console.log("Estado:", filtroEstado);
  };

  return (
    <div>
      <h1 className='Titulo'>Datos Carrera</h1>
      {/* Menú de opciones */}
      <div className='Menu--Buttons'>
        <button className='Buttons'>Crear</button>
        <button className='Buttons'>Editar</button>
        <button className='Buttons'>Cambiar Estado</button>
        <button className='Buttons'>Eliminar</button>
        <button className='Buttons'>Consultas</button>
        <button className='Buttons'>Informe</button>
      </div>
      {/* Input de búsqueda */}
      <div className='Filtrado'>
        <h4>Por:</h4>
        <select className='ComboboxFiltro' value={filtroPor} onChange={handleFiltroPorChange}>
          <option value="">Seleccionar</option>
          {/* Opciones del combo */}
          <option value="Nombre">Nombre</option>
          <option value="Codigo">Codigo</option>
        </select>
        <input type="text" value={busqueda} onChange={handleBusquedaChange} />
        <label>Estado:</label>
        <select value={filtroEstado} onChange={handleFiltroEstadoChange}>
          <option value="">Seleccionar</option>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
        <button className='ButtonBuscar'onClick={buscar}>Buscar</button>
      </div>
      {/* Tabla o DataViewer */}
      <div className='TablaBD'>
        {/* Aquí puedes renderizar tu tabla o componente DataViewer para mostrar la base de datos de la Facultad */}
        <p>Tabla o DataViewer</p>
      </div>
    </div>
  );
};
export default Carrera;
