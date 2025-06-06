import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import userInfo from '../mocks/users.json'



const Login = () => {
  useEffect(() =>{
  localStorage.clear();
  });
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = userInfo.users;

    const foundUser = users.find(u => u.name === user && u.password === pass);

    if (foundUser) {
      const userDataToStore = {
        id: foundUser.id,
        name: foundUser.name,
        image: foundUser.image,
        esAdmin: foundUser.esAdmin
      };

      localStorage.setItem("user", JSON.stringify(userDataToStore));
      navigate('/home');
    } else {
      alert('Credenciales inválidas');
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