import React, { useEffect, useState } from 'react';
import Sidebar from './utils/sidebar';



export default function AdminReservas() {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
      fetch('http://localhost:3000/reservas')
        .then(response => response.json())
        .then(data => setReservations(data))
        .catch(error => console.error('Error al cargar el historial:', error));
    }, []);
  
    return (
      <div>
      </div>
    );
}
