import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';

const IP = 'localhost';

export function RegisterForm({ onClose }) {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        phoneNumber: '',
        nombre: '',
        apellido: '',
        dni: '',
        cod_materias: [''], // Inicia con un campo de materia vacío
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleMateriaChange = (index, value) => {
        const updatedMaterias = [...formData.materias];
        updatedMaterias[index] = value;
        setFormData({ ...formData, cod_materias: updatedMaterias });
    };

    const addMateriaField = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            cod_materias: [...prevFormData.materias, ''],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            role: 2, // Rol siempre es 2 (docente)
        };

        console.log(payload);

        try {
            const response = await fetch(`http://${IP}:3000/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                onClose();
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

            {formData.cod_materias.map((cod_materias, index) => (
                <Form.Group className="mb-3" key={index}>
                    <Form.Label>{`Materia ${index + 1}`}</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={`Materia ${index + 1}`}
                        value={materia}
                        onChange={(e) => handleMateriaChange(index, e.target.value)}
                    />
                </Form.Group>
            ))}
            <Button variant="secondary" onClick={addMateriaField}>
                Añadir Materia
            </Button>

            <Button type="submit" style={{ marginTop: "10px" }}>Registrar</Button>
        </Form>
    );
}
