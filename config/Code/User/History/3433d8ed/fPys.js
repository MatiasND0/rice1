import React, { useState, useEffect } from 'react';
import { Container, Button, Table, Modal, Form } from 'react-bootstrap';
import { parseJwt } from "./utils/jwtParser";

const IP = 'localhost';

function InventarioProyectores() {
    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false); // Popup de confirmación
    const [selectedItem, setSelectedItem] = useState(null); // Estado para almacenar el ítem a eliminar

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseConfirm = () => setShowConfirm(false); // Cerrar el modal de confirmación

    const token = localStorage.getItem('token');
    const parsedToken = token ? parseJwt(token) : null;

    const isAdministrator = parsedToken && (parsedToken.role === 1);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://${IP}:3000/inventory`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ table: 'proyectores' }),
            });
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error al realizar la solicitud POST:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async () => {
        if (!selectedItem) return;

        try {
            const response = await fetch(`http://${IP}:3000/remove-item`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ table: 'proyectores', nro_inv: selectedItem.nro_inv }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setData(data.filter(item => item.nro_inv !== selectedItem.nro_inv)); // Elimina el ítem del estado
            setSelectedItem(null);
            setShowConfirm(false); // Cierra el modal después de eliminar
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDeleteClick = (item) => {
        setSelectedItem(item); // Guarda el ítem que se desea eliminar
        setShowConfirm(true); // Muestra el popup de confirmación
    };

    const handleAdd = (newItem) => {
        setData([...data, newItem]);
    };

    return (
        <Container fluid>
            {isAdministrator && (
                <Button variant="primary" onClick={handleShow}>
                    Agregar elemento
                </Button>
            )}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar</Modal.Title>
                </Modal.Header>
                <FormProy onAdd={handleAdd} onClose={handleClose} />
            </Modal>

            {/* Modal de Confirmación */}
            <Modal show={showConfirm} onHide={handleCloseConfirm}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas eliminar el proyector con Nro. Inv {selectedItem?.nro_inv}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseConfirm}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>

            <TableData data={data} onDelete={handleDeleteClick} userrole={isAdministrator} />
        </Container>
    );
}

function TableData({ data, onDelete, userrole }) {
    return (
        <table className="table-auto w-full">
            <thead>
                <tr>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Código de reserva</th>
                    <th className="px-4 py-2">Marca</th>
                    <th className="px-4 py-2">Modelo</th>
                    <th className="px-4 py-2">Serial Number</th>
                    {userrole && (
                        <th className="px-4 py-2">Acciones</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? (
                    data.map((item) => (
                        <tr key={item.id}>
                            <td className="border px-4 py-2">{item.nro_inv}</td>
                            <td className="border px-4 py-2">{item.cod_rec}</td>
                            <td className="border px-4 py-2">{item.marca}</td>
                            <td className="border px-4 py-2">{item.modelo}</td>
                            <td className="border px-4 py-2">{item.sn}</td>
                            {userrole && (
                                <td className="border px-4 py-2">
                                    <button
                                        className="text-red-600 hover:text-red-800"
                                        onClick={() => onDelete(item)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={userrole ? 6 : 5} className="border px-4 py-2 text-center">
                            No hay reservas disponibles
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

function FormProy({ onAdd, onClose }) {
    const [formData, setFormData] = useState({ table: 'proyectores', estado: 'Fun_D' });

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        formData.hdmi = formData.hdmi ? 1 : 0;
        formData.vga = formData.vga ? 1 : 0;

        try {
            const response = await fetch(`http://${IP}:3000/add-item`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            onAdd(formData); // Agrega el nuevo elemento al estado
            onClose(); // Cierra el modal
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Form style={{ margin: "5%" }} onSubmit={handleSubmit}>
            {/* Form fields */}
            {/* ... */}
            <Button type="submit">Submit</Button>
        </Form>
    );
}

export default InventarioProyectores;
