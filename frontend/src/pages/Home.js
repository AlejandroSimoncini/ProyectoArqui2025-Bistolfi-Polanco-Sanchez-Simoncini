import { useState } from 'react';
import ActivityCard from '../components/ActivityCard';

function Home() {
  const [activities] = useState([
    {
      id: 1,
      title: "Spinning",
      day: "Lunes",
      time: "18:00",
      professor: "Laura",
      category: "Cardio",
      description: "Clase intensa de cardio sobre bicicleta fija."
    },
    {
      id: 2,
      title: "Funcional",
      day: "Martes",
      time: "19:00",
      professor: "Carlos",
      category: "Fuerza",
      description: "Entrenamiento funcional de cuerpo completo."
    }
  ]);

  const [search, setSearch] = useState("");

  const filteredActivities = activities.filter((activity) =>
    activity.title.toLowerCase().includes(search.toLowerCase()) ||
    activity.category.toLowerCase().includes(search.toLowerCase()) ||
    activity.day.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>Actividades del gimnasio</h1>
      <input
        type="text"
        placeholder="Buscar por título, categoría o día"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: 8, width: '100%', marginBottom: 20 }}
      />
      {filteredActivities.length === 0 ? (
        <p>No se encontraron actividades.</p>
      ) : (
        filteredActivities.map(activity => (
          <ActivityCard key={activity.id} activity={activity} />
        ))
      )}
    </div>
  );
}

export default Home;
