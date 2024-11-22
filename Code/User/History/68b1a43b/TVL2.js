import { Reservas } from './utils/tablaReservas';

export default function AdminRetiroDevolucion() {
    const fechaActual = new Date().toISOString().split('T')[0];
    return(
        <h1>Retiros pendientes para el dia de hoy | {fechaActual}</h1>

    )
}