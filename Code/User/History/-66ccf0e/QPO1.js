import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseJwt } from "./utils/jwtParser";
import { Reservas } from './utils/tablaReservas';


const IP = process.env.REACT_APP_API_IP;

function Inicio() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const token = localStorage.getItem('token');
  const parsedToken = token ? parseJwt(token) : null;

  const getUserRole = (role) => {
    switch (role) {
      case 1:
        return 'Administrador';
      case 2:
        return 'Docente';
      case 3:
        return 'Alumno';
      default:
        return 'Usuario desconocido';
    }
  };
  

  return (
    <div>
      {isAuthenticated && (
        <div>
          <h1>Bienvenido {parsedToken.username} | {getUserRole(parsedToken.role)} | {(parsedToken.phoneNumber)} </h1>
          <div>
            <h2>Reservas</h2>
            <Reservas parsedToken={parsedToken} />
          </div>
        </div>
      )}
    </div>
  );
}
export default Inicio;
