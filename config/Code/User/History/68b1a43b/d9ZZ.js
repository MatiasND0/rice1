export default function AdminRetiroDevolucion() {
    const fechaActual = new Date().toISOString();
    return(
        <h1>Retiros pendientes para el dia de hoy | {fechaActual}</h1>
    )
}