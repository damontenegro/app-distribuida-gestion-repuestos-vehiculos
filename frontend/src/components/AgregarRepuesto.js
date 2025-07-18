import React, { useState } from 'react';
import './AgregarRepuesto.css';

function AgregarRepuesto() {
  const [codigo, setCodigo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [mensaje, setMensaje] = useState('');

  const agregarRepuesto = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://app-repuestos-alb-538252510.us-east-1.elb.amazonaws.com/repuestos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ codigo, descripcion, precio: parseFloat(precio) })
      });

      const data = await response.json();
      setMensaje(data.mensaje || 'Repuesto agregado');
      setCodigo('');
      setDescripcion('');
      setPrecio('');
    } catch (error) {
      console.error('Error:', error);
      setMensaje('Error al agregar repuesto');
    }
  };

  const botonDesactivado = !codigo || !descripcion || !precio;

  return (
    <div className="agregar-repuesto-container">
      <h2>Agregar Repuesto</h2>
      <input
        type="text"
        placeholder="Código"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <input
        type="number"
        step="0.01"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
      />
      <button onClick={agregarRepuesto} disabled={botonDesactivado}>
        Guardar Repuesto
      </button>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default AgregarRepuesto;

