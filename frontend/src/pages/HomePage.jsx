import React from 'react';
import '../styles/home.css'; // Importás el CSS
import '../components/ActivityCard';
import './ActivityDetail'
import react, {useState} from 'react' ;
import ActivityCard from '../components/ActivityCard';
import ActivityDetail from './ActivityDetail';
import '../components/ActivityData' 
import { ActivitiesImages, ActivityInfo, ActivitySearch } from '../components/ActivityData';
import '../components/UserData'
import { UserInfo } from '../components/UserData';
import { AllUsersInfo } from '../components/UserData';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {



    const [selectedActivity, setSelectedActivity] = useState(null);

    const user = JSON.parse(localStorage.getItem("user"));

    const [showUsersList, setShowUsersList] = useState(false);
    const navigate = useNavigate();

    const handleShowUsersClick = () => {
        setShowUsersList(!showUsersList);
    };
    const handleAddActivity = () => navigate("/actividad/nueva");

    const [showMyActivities, setShowMyActivities] = useState(false);

const handleShowMyActivitiesClick = () => {
  setShowMyActivities(!showMyActivities);
};

const handleLogout = () => {
    localStorage.removeItem("user"); // Esto es crucial: elimina la sesión del usuario.
    navigate("/"); // Redirige a la ruta raíz, que en tu App.js es la página de Login.
};


  return (
        <div className="home-container"> {/* DIV PRINCIPAL*/}
        <div className="logout-button-container">
    <button onClick={handleLogout} className="logout-button">
        <strong>Cerrar Sesión</strong>
    </button>
</div>
            <div className="gridContainer"> {/* DISEÑO DEL CUADRO CON INFORMACIOIN DE LA PAGINA*/}
                {/*
                    2. Modificamos el renderizado condicional:
                    Ahora la lista de usuarios se mostrará SOLO SI el usuario es admin Y showUsersList es true.
                */}
                {user.esAdmin && showUsersList && (
                    <div className="allUsersList">
                        <AllUsersInfo/>
                    </div>
                )}
                <div className="parent">
                    <div className="div1"> {/* DIV CON DATOS MENORES DE LAS ACTIVIDADES*/}
                        <div className="left">
                            <ActivitiesImages selectedActivity={selectedActivity}/>
                        </div>
                        <div className="rigth">
                            <ActivityInfo selectedActivity={selectedActivity}/>
                        </div>
                    </div>
                    <div className="div2"> {/* DIV CON DATOS MENORES DEL USUARIO*/}
                        <div className="userData">
                            <UserInfo/>
                        </div>
                    </div>
                    <div className="div3"> {/* DIV CON BUSCADOR Y TODAS LAS ACTIVIDADES DEL GIMNASIO*/}
                        <div className='allActivityInfo'>
                            <ActivitySearch selectedActivity={selectedActivity}
                                            setSelectedActivity={setSelectedActivity}/>
                        </div>
                    </div>
                </div>
            </div>
            {/* BOTONES SOLO DISPONIBLES PARA ADMINISTRADORES*/}
            {user.esAdmin && (
                <div className="buttonContainer">
                    {/* 3. Agregamos el onClick al botón "Lista de Usuarios" */}
                    <button onClick={handleShowUsersClick}>
                        <strong>Lista de Usuarios</strong>
                    </button>
                    <button onClick={handleAddActivity}>
                    <strong>Agregar actividad</strong>
                </button>
                </div>
            )}
            {!user.esAdmin && (
  <div className="buttonContainer">
    <button onClick={handleShowMyActivitiesClick}>
      <strong>Mis Actividades</strong>
    </button>
  </div>
)}
{!user.esAdmin && showMyActivities && (
    <div className="myActivitiesList">
        <h2>Mis Actividades</h2>
        <ul>
                <li>No estás inscripto a ninguna actividad</li>
        </ul>
    </div>
)}


        </div>
    
  );
};

export default HomePage;