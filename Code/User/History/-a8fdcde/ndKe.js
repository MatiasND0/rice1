import { useState, useEffect } from "react";
import { addWeeks, format, startOfWeek } from "date-fns";
import { es } from "date-fns/locale";
import Button from "./ui/Button";
import { parseJwt } from "./utils/jwtParser";
import DropdownList from "./ui/DropdownList"; // Importa tu componente DropdownList

const IP = process.env.REACT_APP_API_IP;

export default function ReservaProyectores() {
    const hoy = new Date();
    const inicioSemanaActual = startOfWeek(hoy, { weekStartsOn: 1 });

    const [semana, setSemana] = useState(null);
    const [proyector, setProyector] = useState("");
    const [hora, setHora] = useState("");
    const [aula, setAula] = useState("");
    const [cod_materia, setMateria] = useState(""); // Nuevo estado para materia
    const [proyectoresDisponibles, setProyectoresDisponibles] = useState([]);
    const [mensajeExito, setMensajeExito] = useState("");
    const [materias, setMaterias] = useState([]); // Estado para las materias

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

    // Consultar proyectores disponibles
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

    // Cargar materias del token cuando se monta el componente
    useEffect(() => {
        if (parsedToken && parsedToken.materias) {
            setMaterias(parsedToken.materias);
        }
    }, [parsedToken]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (semana && proyector && hora && cod_materia) { // Verificar que materia no esté vacío
            const fechaSeleccionada = format(semana, "yyyy-MM-dd");
            const reservaData = {
                fecha: fechaSeleccionada,
                turno: hora,
                nro_inv: proyector,
                username: parsedToken.username,
                cod_materia: cod_materia, // Incluir el campo materia en los datos de la reserva
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

    return (
        <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Reserva de Proyectores</h1>

            {mensajeExito && <div className="mb-4 text-green-500">{mensajeExito}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Selecciona una semana:</label>
                    <div className="grid grid-cols-6 gap-2">
                        {weekDates.map((date, index) => {
                            const yesterday = new Date();
                            yesterday.setDate(new Date().getDate() - 1);
                            const isPastDate = date.getTime() < yesterday.getTime();

                            return (
                                <div
                                    key={index}
                                    className={`p-4 border rounded-lg cursor-pointer ${semana?.getTime() === date.getTime() ? 'bg-blue-500 text-white' : isPastDate ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white'}`}
                                    onClick={!isPastDate ? () => setSemana(date) : null}
                                >
                                    {format(date, 'eeee, dd/MM', { locale: es })}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {semana && (
                    <div className="space-y-2">
                        <label htmlFor="hora" className="block text-sm font-medium text-gray-700">Selecciona un turno:</label>
                        <select
                            id="hora"
                            value={hora}
                            onChange={(e) => setHora(e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                            <option value="">Selecciona un turno</option>
                            <option value="Mañana">Mañana</option>
                            <option value="Tarde">Tarde</option>
                            <option value="Noche">Noche</option>
                        </select>
                    </div>
                )}

                {hora && (
                    <div className="space-y-2">
                        <label htmlFor="proyector" className="block text-sm font-medium text-gray-700">Selecciona un proyector:</label>
                        <select
                            id="proyector"
                            value={proyector}
                            onChange={(e) => setProyector(e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                            <option value="">Selecciona un proyector</option>
                            {proyectoresDisponibles.map((proyector) => (
                                <option key={proyector.nro_inv} value={proyector.nro_inv}>
                                    {proyector.cod_rec}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {proyector && materias.length > 0 && (
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Selecciona materia:</label>
                        <DropdownList
                            options={materias.map(m => ({
                                value: m.cod_materia, // Este es el valor que se almacenará
                                label: `${m.carrera} | ${m.cod_materia} | ${m.materia}`, // Este es el texto que se mostrará
                            }))}
                            placeholder="Selecciona una materia"
                            selectedValue={cod_materia} // Agregar el valor seleccionado
                            onSelect={(cod_materia) => setMateria(cod_materia)} // Almacena solo el cod_materia
                        />

                    </div>
                )}

                {cod_materia && (
                    <div className="space-y-2">
                        <label htmlFor="aula" className="block text-sm font-medium text-gray-700">Aula:</label>
                        <input
                            type="text"
                            id="aula"
                            value={aula}
                            onChange={(e) => setAula(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Ingresa aula"
                        />
                    </div>
                )}

                {cod_materia && (
                    <Button type="submit" className="w-full">Reservar Proyector</Button>
                )}
            </form>
        </div>
    );
}
