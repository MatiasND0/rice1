import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseJwt } from "./utils/jwtParser";
import { Button, Modal } from 'react-bootstrap';// Incorrecto para exportación default
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

  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch(`http://${IP}:3000/booked-proy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: parsedToken.id_usuario, role: parsedToken.role }),
      });
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error al realizar la solicitud POST:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [parsedToken]);

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDeleteConfirm = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://${IP}:3000/delete-booking/${deleteId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setData((prevData) => prevData.filter((reserva) => reserva.id_reserva !== deleteId));
        setShowConfirm(false);
      } else {
        console.error('Error al eliminar la reserva');
      }
    } catch (error) {
      console.error('Error en la solicitud de eliminación:', error);
    }
  };

  return (
    <div>
      {isAuthenticated && (
        <div>
          <h1>Bienvenido {parsedToken.username} | {getUserRole(parsedToken.role)} | {(parsedToken.phoneNumber)} </h1>
          <div>
            <h2>Reservas</h2>
            <Reservas data={data} onDelete={handleDeleteConfirm} userrole={parsedToken.role} />
            <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Confirmar eliminación</Modal.Title>
              </Modal.Header>
              <Modal.Body>¿Estás seguro que deseas eliminar esta reserva?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowConfirm(false)}>Cancelar</Button>
                <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
}
export default Inicio;
