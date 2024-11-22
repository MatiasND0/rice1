const handleAction = async () => {
  let url = '';
  let method = '';
  let body = {}; // Inicializar un objeto vacío para el cuerpo de la solicitud
  
  if (actionType === 'delete') {
    url = `http://${IP}:3000/delete-booking/${deleteId}`;
    method = 'DELETE';
  } else if (actionType === 'retire') {
    // Obtener el objeto reserva que corresponde a la acción
    const reserva = data.find(res => res.id_reserva === deleteId);
    
    // Asegurarse de que la reserva exista y luego incluir 'aula' en el cuerpo de la solicitud
    if (reserva) {
      body = {
        aula: reserva.aula, // Añadir 'aula' al cuerpo
      };
    }

    url = `http://${IP}:3000/retire-booking/${deleteId}`;
    method = 'PATCH'; // Suponiendo que el retiro sea un PATCH
  } else if (actionType === 'return') {
    url = `http://${IP}:3000/return-booking/${deleteId}`;
    method = 'PATCH'; // Suponiendo que la devolución sea un PATCH
  }

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json', // Asegurarse de que se envía JSON
      },
      body: method === 'PATCH' ? JSON.stringify(body) : undefined, // Solo enviar body si el método es 'PATCH'
    });

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
