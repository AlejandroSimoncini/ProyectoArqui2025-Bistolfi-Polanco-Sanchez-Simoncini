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


const HomePage = () => {




    const user = JSON.parse(localStorage.getItem("user"));

    const [showUsersList, setShowUsersList] = useState(false);

    const handleShowUsersClick = () => {
        setShowUsersList(!showUsersList);
    };

  return (
        <div className="home-container"> {/* DIV PRINCIPAL*/}
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
                            <ActivitiesImages/>
                        </div>
                        <div className="rigth">
                            <ActivityInfo/>
                        </div>
                    </div>
                    <div className="div2"> {/* DIV CON DATOS MENORES DEL USUARIO*/}
                        <div className="userData">
                            <UserInfo/>
                        </div>
                    </div>
                    <div className="div3"> {/* DIV CON BUSCADOR Y TODAS LAS ACTIVIDADES DEL GIMNASIO*/}
                        <div className='allActivityInfo'>
                            <ActivitySearch/>
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
                    <button>
                        <strong>Agregar actividad</strong>
                    </button>
                </div>
            )}
        </div>
    
  );
};

export default HomePage;
