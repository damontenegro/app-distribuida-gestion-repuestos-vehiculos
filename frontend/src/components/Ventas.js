import React, { useState, useEffect } from 'react';
import './Ventas.css';

function Ventas() {
  const [repuestos, setRepuestos] = useState([]);
  const [codigoSeleccionado, setCodigoSeleccionado] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [total, setTotal] = useState(0);
  const [mensaje, setMensaje] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchRepuestos = async () => {
      try {
        const response = await fetch('http://app-repuestos-alb-538252510.us-east-1.elb.amazonaws.com/repuestos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setRepuestos(data);
      } catch (error) {
        console.error('Error al obtener repuestos:', error);
      }
    };

    fetchRepuestos();
  }, [token]);

  useEffect(() => {
    const repuesto = repuestos.find((r) => r.codigo === codigoSeleccionado);
    if (repuesto) {
      setDescripcion(repuesto.descripcion);
      setPrecio(repuesto.precio);
    } else {
      setDescripcion('');
      setPrecio('');
    }
  }, [codigoSeleccionado, repuestos]);

  useEffect(() => {
    if (precio && cantidad) {
      setTotal(precio * cantidad);
    } else {
      setTotal(0);
    }
  }, [precio, cantidad]);

  const registrarVenta = async () => {
    const codigo = codigoSeleccionado;

    const response = await fetch('http://app-repuestos-alb-538252510.us-east-1.elb.amazonaws.com/ventas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ codigo, descripcion, precio, cantidad, total })
    });

    const data = await response.json();
    setMensaje(data.mensaje);

    // Limpiar campos
    setCodigoSeleccionado('');
    setDescripcion('');
    setPrecio('');
    setCantidad(1);
    setTotal(0);
  };

  return (
    <div className="ventas-container">
      <h2>Registrar Venta</h2>

      <select
        value={codigoSeleccionado}
        onChange={(e) => setCodigoSeleccionado(e.target.value)}
      >
        <option value="">Seleccione un código</option>
        {repuestos.map((rep, index) => (
          <option key={index} value={rep.codigo}>
            {rep.codigo} - {rep.descripcion}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Descripción"
        value={descripcion}
        readOnly
      />

      <input
        type="number"
        placeholder="Precio"
        value={precio}
        readOnly
      />

      <select
        value={cantidad}
        onChange={(e) => setCantidad(parseInt(e.target.value))}
      >
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>{num}</option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Total"
        value={total}
        readOnly
      />

      <button
        onClick={registrarVenta}
        disabled={!codigoSeleccionado || !descripcion || !precio}
      >
        Registrar
      </button>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default Ventas;

