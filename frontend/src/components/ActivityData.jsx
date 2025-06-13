import React, { useState } from "react";
import '../styles/home.css';
import '../pages/ActivityDetail'
import ActivityCard from '../components/ActivityCard'
import { Link } from 'react-router-dom';

const ActivitiesImages = ({ selectedActivity }) => {
  const defaultProfileImage = "https://i.pinimg.com/474x/bd/f4/d3/bdf4d3fe1f9a17136319df951fe9b3e0.jpg";
  return (
    <div>
      {selectedActivity ? (
        <img
          src={selectedActivity.imagen || defaultProfileImage}
          alt="Actividad"
          className="activityImg"
        />
      ) : (
        <p>No hay actividad seleccionada.</p>
      )}
    </div>
  );
};

const ActivityInfo = ({ selectedActivity }) => {
  return (
    <div>
      {selectedActivity ? (
        <>
          <p><strong>Profesor: </strong>{selectedActivity.professor}</p>
          <p><strong>Actividad: {selectedActivity.category}</strong></p>
          <p><strong>Día: {selectedActivity.day}</strong></p>
          <p><strong>Hora: {selectedActivity.time}</strong></p>

          <Link to={`/home/actividad/${selectedActivity.id}`}>
            <button className="activityButton">Ver más info.</button>
          </Link>
        </>
      ) : (
        <p>Hacé clic en una actividad para ver los detalles</p>
      )}
    </div>
  );
};

const ActivitySearch = ({ selectedActivity, setSelectedActivity }) => {
  const storedActivities = JSON.parse(localStorage.getItem("activities")) || require('../mocks/activities.json').activities;
  const [search, setSearch] = useState("");
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    const lowerSearch = search.toLowerCase().trim();

    // No buscamos si no se escribió nada
    if (lowerSearch === "") {
      setFilteredActivities([]);
      setHasSearched(false);
      return;
    }

    const results = storedActivities.filter((activity) =>
      activity.title.toLowerCase().includes(lowerSearch) ||
      activity.category.toLowerCase().includes(lowerSearch) ||
      activity.day.toLowerCase().includes(lowerSearch) ||
      activity.time.toLowerCase().includes(lowerSearch) ||
      activity.professor.toLowerCase().includes(lowerSearch)
    );

    setFilteredActivities(results);
    setHasSearched(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Buscar por título, categoría, día, hora o profesor"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyPress}
        className="search"
      />

      {hasSearched && filteredActivities.length === 0 ? (
        <p>No se encontraron actividades.</p>
      ) : (
        hasSearched && filteredActivities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            onClick={() => setSelectedActivity(activity)}
          />
        ))
      )}
    </div>
  );
};


export { ActivitiesImages, ActivityInfo, ActivitySearch };
