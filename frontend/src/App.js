import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [view, setView] = useState('repuestos'); // vista actual: repuestos, agregar, ventas, lista

  const handleLogin = async () => {
    try {
      const response = await fetch('http://app-repuestos-alb-538252510.us-east-1.elb.amazonaws.com/login', {
        method: 'POST'
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
      } else {
        alert('Error al iniciar sesión.');
      }
    } catch (error) {
      console.error('Error en login:', error);
      alert('Error de red al iniciar sesión.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <div className="app-container">
      {token ? (
        <>
          <Navbar onLogout={handleLogout} setView={setView} currentView={view} />
          <Dashboard view={view} />
        </>
      ) : (
        <Login setToken={setToken} onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;

