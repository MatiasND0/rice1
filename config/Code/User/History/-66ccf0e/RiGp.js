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
    setDeleteId(id);  // Almacena el ID de la reserva a eliminar
    setShowConfirm(true);  // Muestra el modal de confirmación
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://${IP}:3000/delete-booking/${deleteId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setData((prevData) => prevData.filter((reserva) => reserva.id_reserva !== deleteId));
        setShowConfirm(false);  // Cierra el modal de confirmación
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
              <Modal.Body>
                ¿Estás seguro que deseas eliminar esta reserva?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowConfirm(false)}>
                  Cancelar
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                  Eliminar
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
}

function TablaReservas({ data, onDelete, userrole }) {
  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="px-4 py-2">ID</th>
          <th className="px-4 py-2">Proyector</th>
          <th className="px-4 py-2">Fecha</th>
          <th className="px-4 py-2">Turno</th>
          <th className="px-4 py-2">Materia</th>
          {userrole && (
            <>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Apellido</th>
              <th className="px-4 py-2">Numero de telefono</th>
              <th className="px-4 py-2">Aula</th>
            </>
          )}
          <th className="px-4 py-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((reserva) => (
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
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => onDelete(reserva.id_reserva)} // Llamar a la función de confirmación
                >
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

function RegisterForm({ onClose }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene la recarga de la página

    // Agregar el rol directamente en el cuerpo de la solicitud
    const payload = {
      ...formData,
      role: 2, // Rol siempre es 2 (docente)
    };

    try {
      const response = await fetch(`http://${IP}:3000/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        onClose(); // Cierra el formulario una vez registrado
      } else {
        const errorData = await response.json();
        console.error('Error en el registro:', errorData.message);
      }
    } catch (error) {
      console.error('Error al conectar con el backend:', error);
    }
  };

  return (
    <Form style={{ margin: "5%" }} onSubmit={handleSubmit}>


      <Form.Group className="mb-3">
        <Form.Label htmlFor="username">Correo institucional</Form.Label>
        <InputGroup>
          <Form.Control
            id="username"
            name="username"
            type="text"
            placeholder="Usuario"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <InputGroup.Text>@unlam.edu.ar</InputGroup.Text>
        </InputGroup>
      </Form.Group>


      <Form.Group className="mb-3">
        <Form.Label htmlFor="password">Contraseña</Form.Label>
        <Form.Control
          id="password"
          name="password"
          type="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="password">Confirme contraseña</Form.Label>
        <Form.Control
          id="password"
          name="password"
          type="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="nombre">Nombre</Form.Label>
        <Form.Control
          id="nombre"
          name="nombre"
          type="text"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="apellido">Apellido</Form.Label>
        <Form.Control
          id="apellido"
          name="apellido"
          type="text"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="dni">DNI</Form.Label>
        <Form.Control
          id="dni"
          name="dni"
          type="text"
          placeholder="DNI"
          value={formData.dni}
          onChange={handleChange}
          required
        />
      </Form.Group>



      <Form.Group className="mb-3">
        <Form.Label htmlFor="phoneNumber">Número de Teléfono</Form.Label>
        <Form.Control
          id="phoneNumber"
          name="phoneNumber"
          type="text"
          placeholder="Número de Teléfono"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </Form.Group>




      <Button type="submit">Registrar</Button>


    </Form>

  );
}

export default Inicio;