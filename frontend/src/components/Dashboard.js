import React from 'react';
import Repuestos from './Repuestos';
import AgregarRepuesto from './AgregarRepuesto';
import Ventas from './Ventas';
import ListaVentas from './ListaVentas';
import './Dashboard.css';

const Dashboard = ({ view }) => {
  return (
    <div className="dashboard-container">
      <h1>Sistema de Gestión de Repuestos</h1>

      {view === 'repuestos' && <Repuestos />}
      {view === 'agregar' && <AgregarRepuesto />}
      {view === 'ventas' && <Ventas />}
      {view === 'lista' && <ListaVentas />}
    </div>
  );
};

export default Dashboard;

