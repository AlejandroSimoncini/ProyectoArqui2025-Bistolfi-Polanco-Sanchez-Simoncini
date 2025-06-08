import { useParams, Link } from 'react-router-dom';
import activities from '../mocks/activities.json';
import { useState } from 'react';
import '../styles/ActivityDetail.css'; // ← nuevo import

function ActivityDetail() {
  const { id } = useParams();
  const activity = activities.activities.find(a => a.id === Number(id));
  const [inscripto, setInscripto] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

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
      <div className="activity-detail-container">
        <h1>Actividad no encontrada 😢</h1>
      </div>
    );
  }

  return (
    <div className="activity-detail-container">
      <h1>{activity.title}</h1>

      {activity.imagen && (
        <img
          src={activity.imagen}
          alt="Imagen actividad"
          className="activity-detail-img"
        />
      )}

      <p><strong>Profesor:</strong> {activity.professor}</p>
      <p><strong>Día:</strong> {activity.day}</p>
      <p><strong>Horario:</strong> {activity.time}</p>
      <p><strong>Duración:</strong> {activity.duration}</p>
      <p><strong>Categoría:</strong> {activity.category}</p>
      <p><strong>Cupo:</strong> {activity.capacity} personas</p>
      <p><strong>Descripción:</strong> {activity.description}</p>

      {!user?.esAdmin && (
        <>
          <button
            onClick={manejarInscripcion}
            disabled={inscripto}
            className="activity-detail-button"
          >
            {inscripto ? "Ya inscripto" : "Inscribirme"}
          </button>
          {mensaje && (
            <p className="activity-detail-message">{mensaje}</p>
          )}
        </>
      )}

      {user?.esAdmin && (
        <div className="admin-buttons">
          <button
            className="edit-button"
            onClick={() => alert("Funcionalidad de edición aún no implementada")}
          >
            Editar
          </button>
          <button
            className="delete-button"
            onClick={() => alert("Funcionalidad de eliminación aún no implementada")}
          >
            Eliminar
          </button>
        </div>
      )}

      <Link to="/home" className="back-link">← Volver al inicio</Link>
    </div>
  );
}

export default ActivityDetail;
