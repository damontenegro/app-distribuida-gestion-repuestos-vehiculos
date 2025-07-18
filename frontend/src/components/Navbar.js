import React from 'react';
import './Navbar.css';

const Navbar = ({ onLogout, setView, currentView }) => {
  const handleClick = (view) => {
    setView(view);
  };

  const getClass = (view) => {
    return currentView === view ? 'menu-button active' : 'menu-button';
  };

  return (
    <nav className="navbar">
      <h2>Menú</h2>
      <div className="menu-buttons">
        <button className={getClass('repuestos')} onClick={() => handleClick('repuestos')}>
          Repuestos
        </button>
        <button className={getClass('agregar')} onClick={() => handleClick('agregar')}>
          Agregar Repuesto
        </button>
        <button className={getClass('ventas')} onClick={() => handleClick('ventas')}>
          Registrar Venta
        </button>
        <button className={getClass('lista')} onClick={() => handleClick('lista')}>
          Ventas Registradas
        </button>
        <button className="logout-button" onClick={onLogout}>
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

