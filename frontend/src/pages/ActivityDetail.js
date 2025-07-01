import { useState, useEffect } from 'react';
import '../styles/ActivityDetail.css';
import { useParams, Link, useNavigate } from 'react-router-dom';

function ActivityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [inscripto, setInscripto] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  // Traer la actividad desde el backend
  useEffect(() => {
    fetch(`http://localhost:80/actividades/${id}`)
      .then(res => res.json())
      .then(data => setActivity(data))
      .catch(() => setActivity(null));
  }, [id]);

  // Verificar si el usuario ya está inscripto
  useEffect(() => {
    if (!user || !user.id) return;
    const userIdNum = Number(user.id);
    if (isNaN(userIdNum)) {
      setMensaje("Usuario inválido en sesión. Cerrá sesión y volvé a ingresar.");
      return;
    }
    fetch(`http://localhost:80/socio/usuarios/${userIdNum}/actividades`, {
      headers: {
        'Authorization': 'Token ' + localStorage.getItem('token')
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("Actividades del usuario:", data);
        console.log("ID actual:", id);
        if (Array.isArray(data) && data.some(a => String(a.id) === String(id))) {
          setInscripto(true);
        }
      });
  }, [id, user]);

  // Inscripción usando el backend
  const manejarInscripcion = async () => {
    if (!user || !user.id) {
      setMensaje("⚠️ Usuario no identificado.");
      return;
    }
    const userIdNum = Number(user.id);
    if (isNaN(userIdNum)) {
      setMensaje("Usuario inválido en sesión. Cerrá sesión y volvé a ingresar.");
      return;
    }
    try {
      const res = await fetch(`http://localhost:80/socio/inscribir/${userIdNum}/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': 'Token ' + localStorage.getItem('token')
        }
      });
      let data;
      try {
        data = await res.json();
      } catch {
        setMensaje("Respuesta inesperada del servidor.");
        return;
      }
      if (!res.ok) {
        setMensaje(data.mensaje || "No se pudo inscribir. Verificá el cupo o tu sesión.");
        return;
      }
      setInscripto(true);
      setMensaje("✅ ¡Inscripción realizada con éxito!");
    } catch {
      setMensaje("Error de conexión con el servidor.");
    }
  };


  // Eliminar actividad usando el backend
  const handleDelete = async () => {
    const confirmDelete = window.confirm("¿Estás seguro de que querés eliminar esta actividad?");
    if (!confirmDelete) return;
    try {
      const res = await fetch(`http://localhost:80/admin/actividad/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Token ' + localStorage.getItem('token')
        }
      });
      if (!res.ok) {
        alert("No se pudo eliminar la actividad.");
        return;
      }
      alert("✅ Actividad eliminada con éxito");
      navigate("/home");
    } catch {
      alert("Error de conexión con el servidor.");
    }
  };

  if (!activity) {
    return (
      <div className="activity-detail-container">
        <h1>Actividad no encontrada </h1>
        <Link to="/home" className="back-link">← Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="activity-detail-container">
      <h1>{activity.nombre}</h1>

      {activity.imagen && (
        <img
          src={activity.imagen}
          alt="Imagen actividad"
          className="activity-detail-img"
        />
      )}

      <p><strong>Profesor:</strong> {activity.profesor}</p>
      <p><strong>Día y Hora:</strong> {activity.fechahorario}</p>
      <p><strong>Duración:</strong> {activity.duracion} minutos</p>
      <p><strong>Categoría:</strong> {activity.categoria}</p>
      <p><strong>Cupo máximo:</strong> {activity.cupo_max} personas</p>
      <p><strong>Descripción:</strong> {activity.descripcion}</p>

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