import React, { useState, useEffect } from 'react';
import '../styles/home.css';
import '../pages/ActivityDetail'
import ActivityCard from '../components/ActivityCard'
import ActivityData from '../mocks/activities.json'



const ActivitiesImages = () => {
  const defaultProfileImage = "https://i.pinimg.com/474x/bd/f4/d3/bdf4d3fe1f9a17136319df951fe9b3e0.jpg";
  const [selectedActivity, setSelectedActivity] = useState(null);


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

const ActivityInfo = () => {
  const [selectedActivity, setSelectedActivity] = useState(null);

  return (
    <div>
      {selectedActivity ? (
        <>
          <p><strong>Profesor: </strong>{selectedActivity.professor}</p>
          <p><strong>Actividad: {selectedActivity.category}</strong></p>
          <p><strong>Día: {selectedActivity.day}</strong></p>
          <p><strong>Hora: {selectedActivity.time}</strong></p>
          <button className="activityButton">Ver mas info.</button>
        </>
      ) : (
        <p>Hacé clic en una actividad para ver los detalles</p>
      )}
    </div>
  );
}

const ActivitySearch = ({ selectedActivity, setSelectedActivity }) => {
  const [search, setSearch] = useState("");
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [allActivities, setAllActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar actividades del backend al montar el componente
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('http://localhost:8080/actividades');
        if (!response.ok) {
          throw new Error('Error al cargar actividades');
        }
        const data = await response.json();
        setAllActivities(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching activities:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const handleSearch = () => {
    const lowerSearch = search.toLowerCase().trim();

    if (lowerSearch === "") {
      setFilteredActivities([]);
      setHasSearched(false);
      return;
    }

    const results = allActivities.filter((activity) =>
      (activity.title && activity.title.toLowerCase().includes(lowerSearch)) ||
      (activity.category && activity.category.toLowerCase().includes(lowerSearch)) ||
      (activity.day && activity.day.toLowerCase().includes(lowerSearch)) ||
      (activity.time && activity.time.toLowerCase().includes(lowerSearch)) ||
      (activity.professor && activity.professor.toLowerCase().includes(lowerSearch))
    );

    setFilteredActivities(results);
    setHasSearched(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  if (loading) return <p>Cargando actividades...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="activity-search-container">
      <input
        type="text"
        placeholder="Buscar por título, categoría, día, hora o profesor"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyPress}
        className="search-input"
        disabled={loading}
      />
      <button
        onClick={handleSearch}
        className="search-button"
        disabled={loading}
      >
        Buscar
      </button>

      {hasSearched && (
        <div className="search-results">
          {filteredActivities.length === 0 ? (
            <p className="no-results">No se encontraron actividades.</p>
          ) : (
            filteredActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onClick={() => setSelectedActivity(activity)}
                className="activity-card"
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};
export { ActivitiesImages, ActivityInfo, ActivitySearch };
