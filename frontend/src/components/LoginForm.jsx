import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:80/login', { // Ajusta URL según tu backend
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          contrasenia: pass
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.mensaje || 'Credenciales inválidas');
        return;
      }

      const data = await response.json();
      localStorage.setItem('token', data.token); // Guardamos el token JWT
      navigate('/home');
    } catch (error) {
      alert('Error de conexión con el servidor');
    }
  };

  return (
    <div className="LoginContainer">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;