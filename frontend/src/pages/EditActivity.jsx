import { useParams, useNavigate } from 'react-router-dom';
import activities from '../mocks/activities.json';
import { useState, useEffect } from 'react';
import '../styles/EditActivity.css';

const EditActivity = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const storedActivities = JSON.parse(localStorage.getItem("activities")) || activities.activities;
  const isNew = !id;
  const existingActivity = storedActivities.find(a => a.id === Number(id));

  const [formData, setFormData] = useState({
    id: null,
    title: "",
    professor: "",
    day: "",
    time: "",
    duration: "",
    category: "",
    capacity: 0,
    description: "",
    imagen: ""
  });

  useEffect(() => {
  if (!isNew) {
    if (existingActivity) {
      setFormData({ ...existingActivity });
    } else {
      console.warn("Actividad no encontrada para edición");
    }
  }
}, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "capacity" ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isNew) {
      const nuevaActividad = {
        ...formData,
        id: Date.now()
      };
      const nuevasActividades = [...storedActivities, nuevaActividad];
      localStorage.setItem("activities", JSON.stringify(nuevasActividades));
      alert("✅ Actividad creada con éxito");
      navigate("/home");
    } else {
      const actividadesActualizadas = storedActivities.map(a =>
        a.id === Number(id) ? { ...formData, id: Number(id) } : a
      );
      localStorage.setItem("activities", JSON.stringify(actividadesActualizadas));
      alert("✅ Cambios guardados");
      navigate(`/home/actividad/${id}`);
    }
  };

  if (!isNew && !existingActivity) {
    return <p>Actividad no encontrada.</p>;
  }

  return (
    <div className="edit-container">
      <h2>{isNew ? "Crear nueva actividad" : `Editar actividad: ${formData.title}`}</h2>

      {!isNew && (
        <p><strong>ID de actividad:</strong> {formData.id}</p>
      )}

      <form onSubmit={handleSubmit}>
        {/* Mapeamos manualmente para mejor control de orden y etiquetas */}
        <div className="form-group">
          <label>Título</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Profesor</label>
          <input type="text" name="professor" value={formData.professor} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Día</label>
          <input type="text" name="day" value={formData.day} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Horario</label>
          <input type="text" name="time" value={formData.time} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Duración</label>
          <input type="text" name="duration" value={formData.duration} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Categoría</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Cupo</label>
          <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>URL Imagen</label>
          <input type="text" name="imagen" value={formData.imagen} onChange={handleChange} />
        </div>

        <button type="submit">{isNew ? "Crear actividad" : "Guardar cambios"}</button>
      </form>
    </div>
  );
};

export default EditActivity;
