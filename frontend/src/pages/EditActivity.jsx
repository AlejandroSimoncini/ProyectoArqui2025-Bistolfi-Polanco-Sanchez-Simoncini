import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/EditActivity.css';

const EditActivity = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;

  const [formData, setFormData] = useState({
    nombre: "",
    profesor: "",
    fecha: "",
    duracion: "",
    categoria: "",
    cupo_max: 0,
    descripcion: "",
    imagen: ""
  });

  // Cargar datos de la actividad desde el backend si es edición
  useEffect(() => {
    if (!isNew) {
      fetch(`http://localhost/actividades/${id}`)
        .then(res => res.json())
        .then(data => {
          setFormData({
            nombre: data.nombre || "",
            profesor: data.profesor || "",
            fecha: data.fecha || "",
            duracion: data.duracion || "",
            categoria: data.categoria || "",
            cupo_max: data.cupo_max || 0,
            descripcion: data.descripcion || "",
            imagen: data.imagen || ""
          });
        })
        .catch(() => {
          alert("No se pudo cargar la actividad");
          navigate("/home");
        });
    }
  }, [id, isNew, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "cupo_max" || name === "duracion" ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res;
      if (isNew) {
        res = await fetch("http://localhost/admin/actividad", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + localStorage.getItem("token")
          },
          body: JSON.stringify(formData)
        });
      } else {
        res = await fetch(`http://localhost/admin/actividad/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + localStorage.getItem("token")
          },
          body: JSON.stringify(formData)
        });
      }

      const data = await res.json();
      if (!res.ok) {
        alert(data.mensaje || "Error al guardar la actividad");
        return;
      }
      alert(isNew ? "✅ Actividad creada con éxito" : "✅ Cambios guardados");
      navigate("/home");
    } catch {
      alert("Error de conexión con el servidor");
    }
  };

  if (!isNew && !formData.nombre) {
    return <p>Cargando actividad...</p>;
  }

  return (
    <div className="edit-container">
      <h2>{isNew ? "Crear nueva actividad" : `Editar actividad: ${formData.nombre}`}</h2>
      {!isNew && (
        <p><strong>ID de actividad:</strong> {id}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Profesor</label>
          <input type="text" name="profesor" value={formData.profesor} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Fecha</label>
          <input type="text" name="fecha" value={formData.fecha} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Duración (minutos)</label>
          <input type="number" name="duracion" value={formData.duracion} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Categoría</label>
          <input type="text" name="categoria" value={formData.categoria} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Cupo máximo</label>
          <input type="number" name="cupo_max" value={formData.cupo_max} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} required />
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
