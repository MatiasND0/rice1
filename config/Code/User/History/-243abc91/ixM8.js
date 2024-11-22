import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './index.css'; 
import './App.css';
import MyNavbar from './components/utils/navbar';
import Inicio from './components/Inicio';
import Login from './components/Login';
import InventarioInstrumentos from './components/InventarioInstrumentos';
import InventarioProyectores from './components/InventarioProyectores';
import InventarioNotebooks from './components/InventarioNotebooks';
import InventarioLibros from './components/InventarioLibros';
import ReservaProyector from './components/ReservaProyector';
import ReservaInstrumentos from './components/ReservaInstrumentos';
import AdminReservas from './components/AdminReservas';
import AdminRetiroDevolucion from './components/AdminRetiroDevolucion';
import AdminUsuarios from './components/AdminUsuarios';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);

  return (
    <main className='App'>
      <Router>
        <MyNavbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/instrumentos" element={<InventarioInstrumentos />} />
          <Route path="/proyectores" element={<InventarioProyectores />} />
          <Route path="/notebooks" element={<InventarioNotebooks />} />
          <Route path="/libros" element={<InventarioLibros />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUserType={setUserType} />} />
          <Route path="/reserva-proyector" element={<ReservaProyector />} />
          <Route path="/reserva-instrumentos" element={<ReservaInstrumentos />} />
          <Route path="/admin-reservas" element={<AdminReservas />} />
          <Route path="/admin-retiro-devolucion" element={<AdminRetiroDevolucion />} />
          <Route path="/admin-usuarios" element={<AdminUsuarios />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
