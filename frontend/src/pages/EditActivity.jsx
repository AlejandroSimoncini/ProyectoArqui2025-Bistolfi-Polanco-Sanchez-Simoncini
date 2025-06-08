// src/pages/EditActivity.jsx
import { useParams, useNavigate } from 'react-router-dom';
import activities from '../mocks/activities.json';
import { useState } from 'react';
import '../styles/EditActivity.css';

const EditActivity = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const activity = activities.activities.find(a => a.id === Number(id));

  const [formData, setFormData] = useState({
    title: activity?.title || "",
    professor: activity?.professor || "",
    day: activity?.day || "",
    time: activity?.time || "",
    duration: activity?.duration || "",
    category: activity?.category || "",
    capacity: activity?.capacity || "",
    description: activity?.description || "",
    imagen: activity?.imagen || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Actividad editada (simulado)\n\n" + JSON.stringify(formData, null, 2));
    navigate(`/actividad/${id}`);
  };
  // console.log("EditActivity cargado");

  if (!activity) return <p>Actividad no encontrada.</p>;

  return (
    <div className="edit-container">
      <h2>Editar actividad: {activity.title}</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key} className="form-group">
            <label>{key}</label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
};

export default EditActivity;
