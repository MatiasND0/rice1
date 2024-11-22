import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseJwt } from "./utils/jwtParser";
import { Container, Button, Table, Modal, Form, InputGroup } from 'react-bootstrap';// Incorrecto para exportación default
import { Reservas } from './utils/tablaReservas';
import { RegisterForm } from './utils/formularioRegistroUsuario'

export default function AdminUsuarios() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
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

    return(
        <>
        
        <h1>Usuarios</h1>
                <Button variant="primary" onClick={handleShow}>
                  Registrar usuario
                </Button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Agregar</Modal.Title>
                  </Modal.Header>
                  <RegisterForm onClose={handleClose} />
                </Modal>

                <Reservas parsedToken={parsedToken} />
        </>
    )
}