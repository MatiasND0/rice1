import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { parseJwt } from "./utils/jwtParser";

const IP = 'localhost';

function Login({ setIsAuthenticated, setUserType, setMaterias }) { // Agrega setMaterias aquí
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = { username, password };
            const response = await fetch(`http://${IP}:3000/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
    
            if (result.token) {
                localStorage.setItem('token', result.token);
                const userData = parseJwt(result.token);
                setUserType(userData.id); // Aquí se establece el rol
                setIsAuthenticated(true);
                setMessage('Ingreso exitoso');

                // Establece las materias en el estado
                if (result.materias) {
                    setMaterias(result.materias);
                }

                // Muestra el mensaje por 2 segundos antes de redirigir
                setTimeout(() => {
                    navigate('/'); // Redirige a la ruta principal
                }, 1000);
            } else {
                setMessage('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
            setMessage('Error al iniciar sesión.');
        }
    };
    
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Text>
                    {message && <div className="alert alert-success">{message}</div>}
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={username} 
                                placeholder="Usuario" 
                                onChange={(e) => setUsername(e.target.value)} 
                                required 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="Password" 
                                required 
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Iniciar sesión</Button>
                    </Form>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Login;
