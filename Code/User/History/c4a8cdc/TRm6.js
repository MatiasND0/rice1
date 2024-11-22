import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseJwt } from "./jwtParser";
import { Container, Button, Table, Modal, Form, InputGroup } from 'react-bootstrap';// Incorrecto para exportación default


export function tabla_Reservas({ data, onDelete, userrole }) {
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
                    {userrole && (
                        <>
                            <th className="px-4 py-2" onClick={() => handleSort('nombre')}>Nombre {renderSortArrow('nombre')}</th>
                            <th className="px-4 py-2" onClick={() => handleSort('apellido')}>Apellido {renderSortArrow('apellido')}</th>
                            <th className="px-4 py-2" onClick={() => handleSort('nro_telefono')}>Número de Teléfono {renderSortArrow('nro_telefono')}</th>
                            <th className="px-4 py-2" onClick={() => handleSort('aula')}>Aula {renderSortArrow('aula')}</th>
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

export default tabla_Reservas;