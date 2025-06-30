import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    function parseJwt(token) {
      try {
        return JSON.parse(atob(token.split('.')[1]));
      } catch (e) {
        return null;
      }
    }

    try {
      const res = await fetch('http://localhost:80/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user, contrasenia: pass })
      });

      if (!res.ok) {
        alert('Credenciales inválidas');
        return;
      }

      const data = await res.json();
      console.log("Datos recibidos del backend:", data);

      // Guardar token y datos de usuario en localStorage usando el JWT
      localStorage.setItem('token', data.token);

      const payload = parseJwt(data.token);
      console.log("Payload JWT:", payload);

      localStorage.setItem('user', JSON.stringify({
        id: payload.usuarioID, // o el campo correcto según tu JWT
        name: payload.username, // si existe
        esAdmin: payload.rol === "admin" // o como lo manejes
      }));

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
          type="text"
          placeholder="Usuario"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;