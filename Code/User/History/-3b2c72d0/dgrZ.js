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



  const [sortColumn, setSortColumn] = useState('fecha'); // Establecer 'fecha' como la columna predeterminada
  const [sortDirection, setSortDirection] = useState('desc'); // Establecer 'desc' como la dirección predeterminada

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

  return (

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
          <th className="px-4 py-2" onClick={() => handleSort('nro_telefono')}>Número de Teléfono {renderSortArrow('nro_telefono')}</th>
          <th className="px-4 py-2" onClick={() => handleSort('aula')}>Aula {renderSortArrow('aula')}</th>

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
              <td className="border px-4 py-2">{reserva.nro_telefono}</td>
              <td className="border px-4 py-2">{reserva.aula}</td>
              <td className="border px-4 py-2">
                <button className="text-red-600 hover:text-red-800" onClick={() => handleDeleteConfirm(reserva.id_reserva)}>
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

  // return (
  //     <div>
  //     <table className="table-auto w-full">
  //         <thead>
  //             <tr>
  //                 <th className="px-4 py-2" onClick={() => handleSort('id_reserva')}>ID {renderSortArrow('id_reserva')}</th>
  //                 <th className="px-4 py-2" onClick={() => handleSort('cod_rec')}>Proyector {renderSortArrow('cod_rec')}</th>
  //                 <th className="px-4 py-2" onClick={() => handleSort('fecha')}>Fecha {renderSortArrow('fecha')}</th>
  //                 <th className="px-4 py-2" onClick={() => handleSort('turno')}>Turno {renderSortArrow('turno')}</th>
  //                 <th className="px-4 py-2" onClick={() => handleSort('materias')}>Materia {renderSortArrow('materias')}</th>
  //                 {parsedToken.role && (
  //                     <>
  //                         <th className="px-4 py-2" onClick={() => handleSort('nombre')}>Nombre {renderSortArrow('nombre')}</th>
  //                         <th className="px-4 py-2" onClick={() => handleSort('apellido')}>Apellido {renderSortArrow('apellido')}</th>
  //                         <th className="px-4 py-2" onClick={() => handleSort('nro_telefono')}>Número de Teléfono {renderSortArrow('nro_telefono')}</th>
  //                         <th className="px-4 py-2" onClick={() => handleSort('aula')}>Aula {renderSortArrow('aula')}</th>
  //                     </>
  //                 )}
  //                 <th className="px-4 py-2">Acciones</th>
  //             </tr>
  //         </thead>
  //         <tbody>
  //             {sortedData.length > 0 ? (
  //                 sortedData.map((reserva) => (
  //                     <tr key={reserva.id_reserva}>
  //                         <td className="border px-4 py-2">{reserva.id_reserva}</td>
  //                         <td className="border px-4 py-2">{reserva.cod_rec}</td>
  //                         <td className="border px-4 py-2">{new Date(reserva.fecha).toLocaleDateString()}</td>
  //                         <td className="border px-4 py-2">{reserva.turno}</td>
  //                         <td className="border px-4 py-2">{reserva.materias}</td>
  //                         {parsedToken.role && (
  //                             <>
  //                                 <td className="border px-4 py-2">{reserva.nombre}</td>
  //                                 <td className="border px-4 py-2">{reserva.apellido}</td>
  //                                 <td className="border px-4 py-2">{reserva.nro_telefono}</td>
  //                                 <td className="border px-4 py-2">{reserva.aula}</td>
  //                             </>
  //                         )}
  //                         <td className="border px-4 py-2">
  //                             <button className="text-red-600 hover:text-red-800" onClick={() => handleDeleteConfirm(reserva.id_reserva)}>
  //                                 Eliminar
  //                             </button>
  //                         </td>
  //                     </tr>
  //                 ))
  //             ) : (
  //                 <tr>
  //                     <td colSpan="5" className="border px-4 py-2 text-center">No hay reservas disponibles</td>
  //                 </tr>
  //             )}
  //         </tbody>
  //     </table>

  //     <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
  //     <Modal.Header closeButton>
  //     <Modal.Title>Confirmar eliminación</Modal.Title>
  //     </Modal.Header>
  //     <Modal.Body>¿Estás seguro que deseas eliminar esta reserva?</Modal.Body>
  //     <Modal.Footer>
  //     <Button variant="secondary" onClick={() => setShowConfirm(false)}>Cancelar</Button>
  //     <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
  //     </Modal.Footer>
  //     </Modal>
  //     </div>
  // );
}