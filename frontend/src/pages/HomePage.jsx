import React, { useState } from 'react';
import '../styles/home.css';
import ActivityCard from '../components/ActivityCard';
import ActivityDetail from './ActivityDetail';
import { ActivitiesImages, ActivityInfo, ActivitySearch } from '../components/ActivityData';
import { UserInfo, AllUsersInfo } from '../components/UserData';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showUsersList, setShowUsersList] = useState(false);
  const [showMyActivities, setShowMyActivities] = useState(false);
  const [myActivities, setMyActivities] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleShowUsersClick = () => {
    setShowUsersList(!showUsersList);
  };

  const handleAddActivity = () => {
    navigate("/actividad/nueva");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleShowMyActivitiesClick = async () => {
    try {
      const res = await fetch(`http://localhost:8080/socio/actividades/${user.id}`, {
        headers: {
          'Authorization': 'Token ' + localStorage.getItem('token')
        }
      });
      if (!res.ok) throw new Error('Error al obtener actividades');
      const actividadesUsuario = await res.json();
      setMyActivities(actividadesUsuario);
      setShowMyActivities(true);
    } catch (error) {
      setMyActivities([]);
      setShowMyActivities(true);
    }
  };
  

  return (
    <div className="home-container">
      <div className="logout-button-container">
        <button onClick={handleLogout} className="logout-button">
          <strong>Cerrar Sesión</strong>
        </button>
      </div>

      <div className="gridContainer">
        {user.esAdmin && showUsersList && (
          <div className="allUsersList">
            <AllUsersInfo />
          </div>
        )}

        <div className="parent">
          <div className="div1">
            <div className="left">
              <ActivitiesImages selectedActivity={selectedActivity} />
            </div>
            <div className="rigth">
              <ActivityInfo selectedActivity={selectedActivity} />
            </div>
          </div>

          <div className="div2">
            <div className="userData">
              <UserInfo />
            </div>
          </div>

          <div className="div3">
            <div className='allActivityInfo'>
              <ActivitySearch
                selectedActivity={selectedActivity}
                setSelectedActivity={setSelectedActivity}
              />
            </div>
          </div>
        </div>
      </div>

      {/* BOTONES SOLO PARA ADMIN */}
      {user.esAdmin && (
        <div className="buttonContainer">
          <button onClick={handleShowUsersClick}>
            <strong>Lista de Usuarios</strong>
          </button>
          <button onClick={handleAddActivity}>
            <strong>Agregar actividad</strong>
          </button>
        </div>
      )}

      {/* BOTÓN SOLO PARA USUARIO */}
      {!user.esAdmin && (
        <div className="buttonContainer">
          <button onClick={handleShowMyActivitiesClick}>
            <strong>Mis Actividades</strong>
          </button>
        </div>
      )}

      {/* LISTADO DE ACTIVIDADES INSCRIPTAS */}
      {!user.esAdmin && showMyActivities && (
  <div className="myActivitiesList">
    <h2>Mis Actividades</h2>
    {myActivities.length === 0 ? (
      <p>No estás inscripto a ninguna actividad.</p>
    ) : (
      <div className="activityList">
        {myActivities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    )}
  </div>
)}

    </div>
  );
};

export default HomePage;