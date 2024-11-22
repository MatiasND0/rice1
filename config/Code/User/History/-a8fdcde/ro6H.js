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
    const [materiaInput, setMateriaInput] = useState(""); // Estado para el input de materia
    const [proyectoresDisponibles, setProyectoresDisponibles] = useState([]);
    const [mensajeExito, setMensajeExito] = useState("");

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
            console.log(reservaData);
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
                    setMateriaInput("");
                    setAula("");
                    setProyectoresDisponibles([]);
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

    // Filtra las materias en función del texto ingresado en materiaInput
    const filteredMaterias = parsedToken?.materias.filter((materia) =>
        `${materia.carrera} ${materia.cod_materia} ${materia.materia}`.toLowerCase().includes(materiaInput.toLowerCase())
    );

    return (
        <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Reserva de Proyectores</h1>

            {mensajeExito && <div className="mb-4 text-green-500">{mensajeExito}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Código de selección de semana y turno */}
                {/* ... */}
                
                {proyector && (
                    <div className="space-y-2">
                        <label htmlFor="cod_materia" className="block text-sm font-medium text-gray-700">Selecciona materia:</label>
                        <input
                            type="text"
                            id="cod_materia"
                            value={materiaInput}
                            onChange={(e) => setMateriaInput(e.target.value)}
                            placeholder="Busca una materia"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        />
                        <div className="border border-gray-300 mt-1 rounded-md max-h-48 overflow-y-auto">
                            {filteredMaterias.map((materia) => (
                                <div
                                    key={materia.cod_materia}
                                    onClick={() => {
                                        setMateria(materia.cod_materia);
                                        setMateriaInput(`${materia.carrera} | ${materia.cod_materia} | ${materia.materia}`);
                                    }}
                                    className="cursor-pointer px-4 py-2 hover:bg-indigo-100"
                                >
                                    {`${materia.carrera} | ${materia.cod_materia} | ${materia.materia}`}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {aula && <Button type="submit" className="w-full">Reservar Proyector</Button>}
            </form>
        </div>
    );
}
