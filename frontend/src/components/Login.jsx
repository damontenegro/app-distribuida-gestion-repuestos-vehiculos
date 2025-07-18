import React, { useState } from 'react';
import './Login.css'; // Asegúrate de tener este archivo en la misma carpeta

const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      if (onLogin) {
        await onLogin(); // ejecuta el login real que viene desde App.js
      }
    } catch (error) {
      alert('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Sistema de Gestión de Repuestos</h1>
      <div className="login-card">
        <h2 className="login-subtitle">Iniciar Sesión</h2>
        <button className="login-button" onClick={handleLogin} disabled={loading}>
          {loading ? 'Cargando...' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default Login;

