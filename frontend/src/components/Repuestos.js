import './Repuestos.css';
import React, { useEffect, useState } from 'react';

const Repuestos = () => {
  const [repuestos, setRepuestos] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchRepuestos();
  }, [token]);

  const fetchRepuestos = async () => {
    try {
      const response = await fetch('http://app-repuestos-alb-538252510.us-east-1.elb.amazonaws.com/repuestos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('No autorizado');
      const data = await response.json();
      setRepuestos(data);
    } catch (error) {
      console.error('Error al obtener repuestos:', error.message);
    }
  };

  const eliminarRepuesto = async (codigo) => {
    const confirmar = window.confirm(`¿Estás seguro de eliminar el repuesto con código ${codigo}?`);
    if (!confirmar) return;

    try {
      const response = await fetch(`http://app-repuestos-alb-538252510.us-east-1.elb.amazonaws.com/repuestos/${codigo}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Actualizar la lista sin el repuesto eliminado
        setRepuestos(repuestos.filter(rep => rep.codigo !== codigo));
      } else {
        alert('Error al eliminar repuesto');
      }
    } catch (error) {
      console.error('Error al eliminar repuesto:', error.message);
    }
  };

  return (
  <div className="repuestos-container">
    <h2>Lista de Repuestos</h2>
    <div className="repuestos-lista">
      {repuestos.map((rep, index) => (
        <div key={index} className="repuesto-item">
          <div className="repuesto-info">
            <strong>{rep.codigo}</strong> - {rep.descripcion} - 
            <span className="repuesto-precio"> ${rep.precio.toFixed(2)}</span>
          </div>
          <button
            className="repuesto-boton"
            onClick={() => eliminarRepuesto(rep.codigo)}
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  </div>
);

};

export default Repuestos;

