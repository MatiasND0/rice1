import { useEffect, useState } from 'react';

export function Usuarios() {
    const [users, setUsers] = useState([]);

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

    return (
        <div></div>
    );
}
