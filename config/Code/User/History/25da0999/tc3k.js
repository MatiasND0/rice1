import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/history">Historial de Reservas</Link>
      <Link to="/users">Administración de Usuarios</Link>
      <Link to="/transactions">Retiros/Devoluciones</Link>
    </div>
  );
};

export default Sidebar;