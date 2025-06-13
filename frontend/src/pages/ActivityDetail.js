//import { useParams, Link } from 'react-router-dom';
import activities from '../mocks/activities.json';
import { useState, useEffect } from 'react';
import '../styles/ActivityDetail.css';
import { useParams, Link, useNavigate } from 'react-router-dom';


function ActivityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const activity = activities.activities.find(a => a.id === Number(id));
  const [inscripto, setInscripto] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const inscripciones = JSON.parse(localStorage.getItem("inscripciones")) || {};
    const userId = user?.id;
    const actividadesUsuario = inscripciones[userId] || [];
    if (actividadesUsuario.includes(Number(id))) {
      setInscripto(true);
    }
  }, [id, user?.id]);

  const manejarInscripcion = () => {
    const inscripciones = JSON.parse(localStorage.getItem("inscripciones")) || {};
    const userId = user?.id;

    if (!userId) {
      setMensaje("⚠️ Usuario no identificado.");
      return;
    }

    const actividadesUsuario = inscripciones[userId] || [];

    if (actividadesUsuario.includes(Number(id))) {
      setMensaje("Ya estás inscripto en esta actividad.");
      setInscripto(true);
    } else {
      const nuevasActividades = [...actividadesUsuario, Number(id)];
      inscripciones[userId] = nuevasActividades;
      localStorage.setItem("inscripciones", JSON.stringify(inscripciones));

      setInscripto(true);
      setMensaje("✅ ¡Inscripción realizada con éxito!");
    }
  };

  //creo que esta parte no hace nada, la dejo ante la duda...
  /*if (!activity) {
    return (
      <div className="activity-detail-container">
        <h1>Actividad no encontrada 😢</h1>
      </div>
    );
  }*/

  const handleDelete = () => {
    const confirmDelete = window.confirm("¿Estás seguro de que querés eliminar esta actividad?");
    if (!confirmDelete) return;

    const storedActivities = JSON.parse(localStorage.getItem("activities")) || [];
    const updatedActivities = storedActivities.filter(a => a.id !== Number(id));
    localStorage.setItem("activities", JSON.stringify(updatedActivities));

    // eliminamos inscripciones relacionadas
    const inscripciones = JSON.parse(localStorage.getItem("inscripciones")) || {};
    for (const userId in inscripciones) {
      inscripciones[userId] = inscripciones[userId].filter(actId => actId !== Number(id));
    }
    localStorage.setItem("inscripciones", JSON.stringify(inscripciones));

    alert("✅ Actividad eliminada con éxito");
    navigate("/home");
  };


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
          <Link to={`/actividad/${activity.id}/editar`}>
            <button className="edit-button">Editar</button>
          </Link>

          <button
            className="delete-button"
            onClick={handleDelete}
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
