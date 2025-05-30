package services

import (
	"errors"
	"proyectoarquisoft/config"
	"proyectoarquisoft/models"
	"strings"
	"time"
)

// CrearActividad crea una nueva actividad
func CrearActividad(actividad *models.Actividad) error {
	result := config.DB.Create(actividad)
	return result.Error
}

// ObtenerActividad obtiene una actividad por su ID
func ObtenerActividad(id uint) (*models.Actividad, error) {
	var actividad models.Actividad
	result := config.DB.Preload("Categoria").Preload("Instructor").First(&actividad, id)
	if result.Error != nil {
		return nil, errors.New("actividad no encontrada")
	}
	return &actividad, nil
}

// BuscarActividades busca actividades según diferentes criterios
func BuscarActividades(keyword string, categoria string, fecha time.Time) ([]models.Actividad, error) {
	query := config.DB.Model(&models.Actividad{}).
		Preload("Categoria").
		Preload("Instructor")

	// Búsqueda por palabra clave en nombre
	if keyword != "" {
		query = query.Where("LOWER(nombre) LIKE ?", "%"+strings.ToLower(keyword)+"%")
	}

	// Búsqueda por categoría
	if categoria != "" {
		query = query.Joins("JOIN categorias ON categorias.id = actividades.categoria_id").
			Where("LOWER(categorias.tipo_deporte) = ?", strings.ToLower(categoria))
	}

	// Búsqueda por fecha
	if !fecha.IsZero() {
		// Buscar actividades en el mismo día
		inicio := time.Date(fecha.Year(), fecha.Month(), fecha.Day(), 0, 0, 0, 0, fecha.Location())
		fin := inicio.Add(24 * time.Hour)
		query = query.Where("dia_hora BETWEEN ? AND ?", inicio, fin)
	}

	var actividades []models.Actividad
	result := query.Find(&actividades)
	if result.Error != nil {
		return nil, errors.New("error al buscar actividades")
	}

	return actividades, nil
}

// ListarActividades obtiene todas las actividades disponibles
func ListarActividades() ([]models.Actividad, error) {
	var actividades []models.Actividad
	result := config.DB.Preload("Categoria").Preload("Instructor").Find(&actividades)
	if result.Error != nil {
		return nil, errors.New("error al obtener actividades")
	}
	return actividades, nil
}

// ActualizarActividad actualiza una actividad existente
func ActualizarActividad(id uint, actividad *models.Actividad) error {
	result := config.DB.Model(&models.Actividad{}).Where("id = ?", id).Updates(actividad)
	if result.Error != nil {
		return errors.New("error al actualizar actividad")
	}
	if result.RowsAffected == 0 {
		return errors.New("actividad no encontrada")
	}
	return nil
}

// EliminarActividad elimina una actividad por su ID
func EliminarActividad(id uint) error {
	result := config.DB.Delete(&models.Actividad{}, id)
	if result.Error != nil {
		return errors.New("error al eliminar actividad")
	}
	if result.RowsAffected == 0 {
		return errors.New("actividad no encontrada")
	}
	return nil
}

// ObtenerActividadesPorUsuario obtiene las actividades a las que está inscrito un usuario
func ObtenerActividadesPorUsuario(usuarioID uint) ([]models.Actividad, error) {
	var actividades []models.Actividad
	result := config.DB.
		Joins("JOIN inscripciones ON inscripciones.actividad_id = actividades.id").
		Where("inscripciones.usuario_id = ?", usuarioID).
		Preload("Categoria").
		Preload("Instructor").
		Find(&actividades)

	if result.Error != nil {
		return nil, errors.New("error al obtener actividades del usuario")
	}
	return actividades, nil
}
