import { useEffect, useState } from 'react';

export function Usuarios({ onDelete, userrole }) {
    const [users, setUsers] = useState([]);
    const [sortColumn, setSortColumn] = useState('id_usuario'); // Columna predeterminada
    const [sortDirection, setSortDirection] = useState('asc'); // Dirección predeterminada

    // Obtener usuarios del endpoint
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3000/get-users');
                if (!response.ok) {
                    throw new Error('Error al obtener usuarios');
                }
                const data = await response.json();
                setUsers(data); // Guardar los datos en el estado 'users'
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchUsers();
    }, []);

    // Función de manejo de orden
    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    // Ordenar los datos o devolver un array vacío si `users` no es iterable
    const sortedData = Array.isArray(users) ? [...users].sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    }) : [];

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
                    <th className="px-4 py-2" onClick={() => handleSort('id_usuario')}>ID {renderSortArrow('id_usuario')}</th>
                    <th className="px-4 py-2" onClick={() => handleSort('username')}>Usuario {renderSortArrow('username')}</th>
                    <th className="px-4 py-2" onClick={() => handleSort('nombre')}>Nombre {renderSortArrow('nombre')}</th>
                    <th className="px-4 py-2" onClick={() => handleSort('apellido')}>Apellido {renderSortArrow('apellido')}</th>
                    <th className="px-4 py-2" onClick={() => handleSort('nro_telefono')}>Teléfono {renderSortArrow('nro_telefono')}</th>
                    <th className="px-4 py-2" onClick={() => handleSort('dni')}>DNI {renderSortArrow('dni')}</th>
                    {userrole && (
                        <th className="px-4 py-2" onClick={() => handleSort('rol')}>Rol {renderSortArrow('rol')}</th>
                    )}
                    <th className="px-4 py-2">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {sortedData.length > 0 ? (
                    sortedData.map((user) => (
                        <tr key={user.id_usuario}>
                            <td className="border px-4 py-2">{user.id_usuario}</td>
                            <td className="border px-4 py-2">{user.username}</td>
                            <td className="border px-4 py-2">{user.nombre}</td>
                            <td className="border px-4 py-2">{user.apellido}</td>
                            <td className="border px-4 py-2">{user.nro_telefono}</td>
                            <td className="border px-4 py-2">{user.dni}</td>
                            {userrole && (
                                <td className="border px-4 py-2">{user.rol}</td>
                            )}
                            <td className="border px-4 py-2">
                                <button className="text-red-600 hover:text-red-800" onClick={() => onDelete(user.id_usuario)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="8" className="border px-4 py-2 text-center">No hay usuarios disponibles</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}
