import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseJwt } from "./utils/jwtParser";
import { Reservas } from './utils/tablaReservas';

export default function AdminRetiroDevolucion() {

    const fechaActual = new Date().toISOString().split('T')[0];

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

    return (
        <>
            <h1>Retiros pendientes para el dia de hoy | {fechaActual}</h1>
            <Reservas parsedToken={parsedToken} />
        </>
    )
}