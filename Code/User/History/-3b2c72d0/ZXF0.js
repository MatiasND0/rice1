import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';

const IP = process.env.REACT_APP_API_IP;

export function Reservas({ parsedToken }) {

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
  const [actionType, setActionType] = useState(''); // Estado para manejar el tipo de acción

  const handleDeleteConfirm = (id) => {
    setDeleteId(id);
    setActionType('delete'); // Acción seleccionada para eliminar
    setShowConfirm(true);
  };
  const handleRetiroConfirm = (id) => {
    setDeleteId(id);
    setActionType('retire'); // Acción seleccionada para retiro
    setShowConfirm(true);
  };
  const handleDevolvioConfirm = (id) => {
    setDeleteId(id);
    setActionType('return'); // Acción seleccionada para devolución
    setShowConfirm(true);
  };

  const handleAction = async () => {
    let url = '';
    let method = '';
    if (actionType === 'delete') {
      url = `http://${IP}:3000/delete-booking/${deleteId}`;
      method = 'DELETE';
    } else if (actionType === 'retire') {
      url = `http://${IP}:3000/retire-booking/${deleteId}`;
      method = 'PATCH'; // Suponiendo que el retiro sea un PATCH
    } else if (actionType === 'return') {
      url = `http://${IP}:3000/return-booking/${deleteId}`;
      method = 'PATCH'; // Suponiendo que la devolución sea un PATCH
    }

    try {
      const response = await fetch(url, { method });

      if (response.ok) {
        setData((prevData) => prevData.filter((reserva) => reserva.id_reserva !== deleteId));
        setShowConfirm(false);
      } else {
        console.error(`Error al ${actionType === 'delete' ? 'eliminar' : actionType === 'retire' ? 'retirar' : 'devolver'} la reserva`);
      }
    } catch (error) {
      console.error(`Error en la solicitud de ${actionType === 'delete' ? 'eliminación' : actionType === 'retire' ? 'retiro' : 'devolución'}:`, error);
    }
  };

  const [sortColumn, setSortColumn] = useState('fecha');
  const [sortDirection, setSortDirection] = useState('desc');

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

  const renderSortArrow = (column) => {
    if (sortColumn === column) {
      return sortDirection === 'asc' ? ' ↑' : ' ↓';
    }
    return '';
  };

  const getButtonColor = () => {
    switch (actionType) {
      case 'delete':
        return 'danger'; // Rojo para eliminar
      case 'retire':
        return 'warning'; // Amarillo para retiro
      case 'return':
        return 'success'; // Verde para devolución
      default:
        return 'secondary';
    }
  };

  return (
    <div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2" onClick={() => handleSort('id_reserva')}>ID {renderSortArrow('id_reserva')}</th>
            <th className="px-4 py-2" onClick={() => handleSort('cod_rec')}>Proyector {renderSortArrow('cod_rec')}</th>
            <th className="px-4 py-2" onClick={() => handleSort('fecha')}>Fecha {renderSortArrow('fecha')}</th>
            <th className="px-4 py-2" onClick={() => handleSort('turno')}>Turno {renderSortArrow('turno')}</th>
            <th className="px-4 py-2" onClick={() => handleSort('materias')}>Materia {renderSortArrow('materias')}</th>
            <th className="px-4 py-2" onClick={() => handleSort('nombre')}>Nombre {renderSortArrow('nombre')}</th>
            <th className="px-4 py-2" onClick={() => handleSort('apellido')}>Apellido {renderSortArrow('apellido')}</th>
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
                <td className="border px-4 py-2">{reserva.nombre}</td>
                <td className="border px-4 py-2">{reserva.apellido}</td>
                <td className="border px-4 py-2">
                  <button className="text-red-600 hover:text-red-800" onClick={() => handleDeleteConfirm(reserva.id_reserva)}>
                    Eliminar
                  </button>
                  <button className="text-yellow-600 hover:text-yellow-800" onClick={() => handleRetiroConfirm(reserva.id_reserva)}>
                    Retiro
                  </button>
                  <button className="text-blue-600 hover:text-blue-800" onClick={() => handleDevolvioConfirm(reserva.id_reserva)}>
                    Devolvió
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

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{actionType === 'delete' ? 'Confirmar eliminación' : actionType === 'retire' ? 'Confirmar retiro' : 'Confirmar devolución'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {actionType === 'delete'
            ? '¿Estás seguro que deseas eliminar esta reserva?'
            : actionType === 'retire'
            ? '¿Estás seguro que deseas retirar esta reserva?'
            : '¿Estás seguro que esta reserva fue devuelta?'}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>Cancelar</Button>
          <Button variant={getButtonColor()} onClick={handleAction}>
            {actionType === 'delete'
              ? 'Eliminar'
              : actionType === 'retire'
              ? 'Retirar'
              : 'Devolver'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}