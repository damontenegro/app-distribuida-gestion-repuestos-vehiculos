import React, { useEffect, useState } from 'react';
import './ListaVentas.css';

function ListaVentas() {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://app-repuestos-alb-538252510.us-east-1.elb.amazonaws.com/ventas', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setVentas(data);
        } else {
          console.error('Error al obtener ventas');
        }
      } catch (err) {
        console.error('Error de red:', err);
      }
    };

    fetchVentas();
  }, []);

  const handleEliminar = async (id) => {
    const confirmar = window.confirm('¿Estás seguro de que deseas eliminar esta venta?');
    if (!confirmar) return;

    const token = localStorage.getItem('token');
    const response = await fetch(`http://app-repuestos-alb-538252510.us-east-1.elb.amazonaws.com/ventas/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      setVentas(ventas.filter((venta) => venta._id !== id));
    } else {
      alert('Error al eliminar la venta');
    }
  };

  return (
    <div className="ventas-lista">
      <h2>Ventas Registradas</h2>
      {ventas.map((venta) => (
        <div key={venta._id} className="venta-card">
          <p><strong>{venta.codigo}</strong> - {venta.descripcion}</p>
          <p>Precio: ${venta.precio} | Cantidad: {venta.cantidad} | Total: ${venta.total}</p>
          <p className="venta-fecha">{new Date(venta.fecha).toLocaleString()}</p>
          <button onClick={() => handleEliminar(venta._id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}

export default ListaVentas;

