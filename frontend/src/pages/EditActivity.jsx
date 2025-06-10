// src/pages/EditActivity.jsx
import { useParams, useNavigate } from 'react-router-dom';
import activities from '../mocks/activities.json';
import { useState, useEffect } from 'react';
import '../styles/EditActivity.css';

const EditActivity = () => {
  const { id } = useParams(); // puede ser undefined si es nueva actividad
  const navigate = useNavigate();

  // Cargamos actividades desde localStorage o mock
  const storedActivities = JSON.parse(localStorage.getItem("activities")) || activities.activities;

  // Si hay id, buscamos la actividad; si no, estamos en modo "crear"
  const isNew = !id;
  const existingActivity = storedActivities.find(a => a.id === Number(id));

  // Estado del formulario
  const [formData, setFormData] = useState({
    Nombre: "",
    profesor: "",
    dia: "",
    tiempo: "",
    duracion: "",
    categoria: "",
    capacidad: "",
    descripcion: "",
  });

  // Si estamos editando, cargamos los datos de la actividad al estado
  useEffect(() => {
    if (!isNew && existingActivity) {
      setFormData(existingActivity);
    }
  }, [existingActivity, isNew]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isNew) {
      // Crear nueva actividad
      const nuevaActividad = {
        ...formData,
        id: Date.now() // genera un ID único
      };
      const nuevasActividades = [...storedActivities, nuevaActividad];
      localStorage.setItem("activities", JSON.stringify(nuevasActividades));
      alert("✅ Actividad creada con éxito");
      navigate("/home");
    } else {
      // Editar actividad existente (solo simulación)
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
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key} className="form-group">
            <label>{key}</label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">{isNew ? "Crear actividad" : "Guardar cambios"}</button>
      </form>
    </div>
  );
};

export default EditActivity;
