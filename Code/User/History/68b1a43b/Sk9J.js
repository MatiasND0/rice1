import { Reservas } from './utils/tablaReservas';

export default function AdminRetiroDevolucion() {

    const fechaActual = new Date().toISOString().split('T')[0];

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
            {/* <Reservas /> */}
        </>
    )
}