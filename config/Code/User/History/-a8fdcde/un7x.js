import { useState, useEffect } from "react";
import { addWeeks, format, startOfWeek } from "date-fns";
import { es } from "date-fns/locale";
import Button from "./ui/Button";
import { parseJwt } from "./utils/jwtParser";

const IP = 'localhost';

export default function ReservaProyectores() {
    const hoy = new Date();
    const inicioSemanaActual = startOfWeek(hoy, { weekStartsOn: 1 });

    const [semana, setSemana] = useState(null);
    const [proyector, setProyector] = useState("");
    const [hora, setHora] = useState("");
    const [aula, setAula] = useState("");
    const [cod_materia, setMateria] = useState("");
    const [proyectoresDisponibles, setProyectoresDisponibles] = useState([]);
    const [mensajeExito, setMensajeExito] = useState("");
    const [searchTerm, setSearchTerm] = useState(""); // Nuevo estado para búsqueda
    const [filteredMaterias, setFilteredMaterias] = useState([]); // Estado para materias filtradas

    const getWeekDates = () => {
        return Array.from({ length: 14 }, (_, i) => {
            const date = new Date(inicioSemanaActual);
            date.setDate(inicioSemanaActual.getDate() + i);
            return date;
        }).filter(date => date.getDay() !== 0); // Filtrar para omitir domingos
    };

    const weekDates = getWeekDates();
    const token = localStorage.getItem('token');
    const parsedToken = token ? parseJwt(token) : null;

    // Filtrar materias cuando cambia el término de búsqueda o el token
    useEffect(() => {
        if (parsedToken && parsedToken.materias) {
            setFilteredMaterias(
                parsedToken.materias.filter((materia) =>
                    `${materia.carrera} ${materia.cod_materia} ${materia.materia}`
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm, parsedToken]);

    useEffect(() => {
        const fetchProyectoresDisponibles = async () => {
            if (semana && hora) {
                try {
                    const fechaSeleccionada = format(semana, "yyyy-MM-dd");
                    const response = await fetch(`http://${IP}:3000/avaliable-proy`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ fecha: fechaSeleccionada, turno: hora }),
                    });
                    const data = await response.json();
                    setProyectoresDisponibles(data);
                } catch (error) {
                    console.error("Error al cargar los proyectores disponibles:", error);
                }
            }
        };
        fetchProyectoresDisponibles();
    }, [semana, hora]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (semana && proyector && hora && cod_materia) {
            const fechaSeleccionada = format(semana, "yyyy-MM-dd");
            const reservaData = {
                fecha: fechaSeleccionada,
                turno: hora,
                nro_inv: proyector,
                username: parsedToken.username,
                cod_materia: cod_materia,
                aula: aula,
            };
            try {
                const response = await fetch(`http://${IP}:3000/book-proy`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(reservaData),
                });

                if (response.ok) {
                    setMensajeExito("Reserva realizada exitosamente!");
                    setSemana(null);
                    setProyector("");
                    setHora("");
                    setMateria("");
                    setAula("");
                    setProyectoresDisponibles([]);
                    setSearchTerm(""); // Limpiar búsqueda
                } else {
                    const result = await response.json();
                    setMensajeExito(`Error: ${result.error}`);
                }
            } catch (error) {
                console.error("Error al realizar la reserva:", error);
                setMensajeExito("Ocurrió un error al realizar la reserva");
            }
        } else {
            setMensajeExito("Por favor, completa todos los campos.");
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Reserva de Proyectores</h1>

            {mensajeExito && <div className="mb-4 text-green-500">{mensajeExito}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Campos de selección de semana, turno y proyector omitidos por brevedad */}

                {proyector && (
                    <div className="space-y-2">
                        <label htmlFor="cod_materia" className="block text-sm font-medium text-gray-700">Selecciona materia:</label>
                        <input
                            type="text"
                            placeholder="Buscar materia..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <select
                            id="cod_materia"
                            value={cod_materia}
                            onChange={(e) => setMateria(e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                            <option value="">Selecciona una materia</option>
                            {filteredMaterias.map((materia) => (
                                <option key={materia.cod_materia} value={materia.cod_materia}>
                                    {`${materia.carrera} | ${materia.cod_materia} | ${materia.materia}`}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Campo de aula y botón de envío omitidos por brevedad */}
            </form>
        </div>
    );
}
