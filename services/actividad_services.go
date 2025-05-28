//logica del negocio

package services

import (
	"proyectoarquisoft/config"
	"proyectoarquisoft/models"
)

// Obtener todos las actividades de la base de datos
func GetActividades() ([]models.Actividad, error) {
	var actividades []models.Actividad
	result := config.DB.Find(&actividades)
	return actividades, result.Error
}

// Obtener una actividad por su ID
func GetActividad(id string) (*models.Actividad, error) {
	var actividad models.Actividad
	result := config.DB.First(&actividad, id)
	if result.Error != nil {
		return nil, result.Error
	}
	return &actividad, nil
}

// Agregar una nueva actividad
func AddActividad(actividad models.Actividad) error {
	result := config.DB.Create(&actividad)
	return result.Error
}

// Actualizar una actividad existente
func UpdateActividad(id string, updatedActividad models.Actividad) error {
	var actividad models.Actividad
	result := config.DB.First(&actividad, id)
	if result.Error != nil {
		return result.Error
	}
	// Actualizar los campos
	actividad.Nombre = updatedActividad.Nombre
	actividad.Descripcion = updatedActividad.Descripcion
	actividad.Fecha = updatedActividad.Fecha
	actividad.Duracion = updatedActividad.Duracion
	actividad.Estado = updatedActividad.Estado
	actividad.CupoMAX = updatedActividad.CupoMAX
	return config.DB.Save(&actividad).Error
}

// Eliminar una actividad
func DeleteActividad(id uint) error {
	result := config.DB.Delete(&models.Actividad{}, id)
	return result.Error
}
