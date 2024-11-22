import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseJwt } from "./utils/jwtParser";
import { Container, Button, Table, Modal, Form, InputGroup } from 'react-bootstrap';

const IP = 'localhost';

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

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            <TablaReservas data={data} onDelete={handleDeleteConfirm} userrole={parsedToken.role} />
            {parsedToken.role === 1 && (
              <>
                <Button variant="primary" onClick={handleShow}>
                  Registrar usuario
                </Button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Agregar</Modal.Title>
                  </Modal.Header>
                  <RegisterForm onClose={handleClose} />
                </Modal>
              </>
            )}
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

function TablaReservas({ data, onDelete, userrole }) {
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="px-4 py-2" onClick={() => handleSort('id_reserva')}>ID</th>
          <th className="px-4 py-2" onClick={() => handleSort('cod_rec')}>Proyector</th>
          <th className="px-4 py-2" onClick={() => handleSort('fecha')}>Fecha</th>
          <th className="px-4 py-2" onClick={() => handleSort('turno')}>Turno</th>
          <th className="px-4 py-2" onClick={() => handleSort('materias')}>Materia</th>
          {userrole && (
            <>
              <th className="px-4 py-2" onClick={() => handleSort('nombre')}>Nombre</th>
              <th className="px-4 py-2" onClick={() => handleSort('apellido')}>Apellido</th>
              <th className="px-4 py-2" onClick={() => handleSort('nro_telefono')}>Número de Teléfono</th>
              <th className="px-4 py-2" onClick={() => handleSort('aula')}>Aula</th>
            </>
          )}
          <th className="px-4 py-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.length > 0 ? (
          sortedData.map((reserva) => (
            <tr key={reserva.id_reserva}>
              <td className="border px-4 py-2">{reserva.id_reserva}</td>
              <td className="border px-4 py-2">{reserva.cod_rec}</td>
              <td className="border px-4 py-2">{new Date(reserva.fecha).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{reserva.turno}</td>
              <td className="border px-4 py-2">{reserva.materias}</td>
              {userrole && (
                <>
                  <td className="border px-4 py-2">{reserva.nombre}</td>
                  <td className="border px-4 py-2">{reserva.apellido}</td>
                  <td className="border px-4 py-2">{reserva.nro_telefono}</td>
                  <td className="border px-4 py-2">{reserva.aula}</td>
                </>
              )}
              <td className="border px-4 py-2">
                <button className="text-red-600 hover:text-red-800" onClick={() => onDelete(reserva.id_reserva)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="border px-4 py-2 text-center">No hay reservas disponibles</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default Inicio;
