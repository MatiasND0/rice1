import React, { useState, useEffect } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';

const IP = 'localhost';

export function RegisterForm({ onClose }) {
    const [formData, setFormData] = useState({
        incrementalId: 0,
        username: '',
        password: '',
        phoneNumber: '',
        nombre: '',
        apellido: '',
        dni: '',
    });

    // Incrementar el ID cada vez que se muestra el formulario
    useEffect(() => {
        setFormData(prevFormData => ({
            ...prevFormData,
            incrementalId: prevFormData.incrementalId + 1
        }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                <Form.Label htmlFor="incrementalId">ID Incremental</Form.Label>
                <Form.Control
                    id="incrementalId"
                    name="incrementalId"
                    type="text"
                    value={formData.incrementalId}
                    readOnly
                />
            </Form.Group>

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
