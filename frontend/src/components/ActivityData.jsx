import React, { useState } from "react";
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

const ActivityInfo = () =>{
    const [selectedActivity, setSelectedActivity] = useState(null);

    return(
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

const ActivitySearch = () =>{
    const activiies_1 = JSON.parse(ActivityData.activities)
    const [activities] = useState(activiies_1);
    const [search, setSearch] = useState("");
    const [selectedActivity, setSelectedActivity] = useState(null);

    const filteredActivities = activities.filter((activity) =>
        activiies_1.title.toLowerCase().includes(search.toLowerCase()) ||
        activiies_1.category.toLowerCase().includes(search.toLowerCase()) ||
        activiies_1.day.toLowerCase().includes(search.toLowerCase())
    );

    return(
        <div>
            <input 
            type="text" 
            placeholder = "Buscar por titulo, categoria o dia"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search"
            />
            {filteredActivities.length === 0 ? (
                <p>No se encontraron actividades.</p>
            ) : (
                filteredActivities.map(activity => (
                    <ActivityCard
                    key={activity.id}
                    activity={activity}
                   onClick={() => setSelectedActivity(activity)}
                    />

                ))
            )}
        </div>
    );
}
export { ActivitiesImages, ActivityInfo, ActivitySearch};
