import React, { useEffect, useState } from 'react';



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
        <h2>Historial de Reservas</h2>
        <ul>
          {reservations.map((res) => (
            <li key={res.id}>{res.details}</li>
          ))}
        </ul>
      </div>
    );
}
