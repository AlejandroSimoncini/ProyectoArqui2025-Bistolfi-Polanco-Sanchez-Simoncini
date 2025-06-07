import { useParams, Link } from 'react-router-dom';
import activities from '../mocks/activities.json';
import { useState } from 'react';

function ActivityDetail() {
  const { id } = useParams(); // ID desde la URL
  const activity = activities.activities.find(a => a.id === Number(id));
  const [inscripto, setInscripto] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const manejarInscripcion = () => {
    if (inscripto) {
      setMensaje("Ya estás inscripto en esta actividad.");
    } else {
      setInscripto(true);
      setMensaje("¡Inscripción realizada con éxito! ✅");
    }
  };

  if (!activity) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Actividad no encontrada 😢</h1>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>{activity.title}</h1>
      <p><strong>Profesor:</strong> {activity.professor}</p>
      <p><strong>Día:</strong> {activity.day}</p>
      <p><strong>Horario:</strong> {activity.time}</p>
      <p><strong>Duración:</strong> {activity.duration}</p>
      <p><strong>Categoría:</strong> {activity.category}</p>
      <p><strong>Cupo:</strong> {activity.capacity} personas</p>
      <p><strong>Descripción:</strong> {activity.description}</p>

      <button
        onClick={manejarInscripcion}
        disabled={inscripto}
        style={{
          padding: '10px 20px',
          backgroundColor: inscripto ? '#ccc' : '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          marginTop: '20px',
          cursor: inscripto ? 'not-allowed' : 'pointer'
        }}
      >
        {inscripto ? "Ya inscripto" : "Inscribirme"}
      </button>

      {mensaje && (
        <p style={{ marginTop: 10, color: inscripto ? "green" : "red" }}>
          {mensaje}
        </p>
      )}

      <div style={{ marginTop: 30 }}>
        <Link to="/home" style={{
          textDecoration: 'none',
          backgroundColor: '#007bff',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px'
        }}>
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default ActivityDetail;
