package services

import (
	"proyectoarquisoft/config"
	"proyectoarquisoft/models"
)

// Obtener todos las actividades
func GetActividades() ([]models.Actividad, error) {
	var actividades []models.Actividad
	result := config.DB.Find(&actividades)
	return actividades, result.Error
}

// Obtener una actividad por ID
func GetActividadPorID(id string) (*models.Actividad, error) {
	var actividad models.Actividad
	result := config.DB.First(&actividad, id)
	if result.Error != nil {
		return nil, result.Error
	}
	return &actividad, nil
}

// Agregar una nueva actividad (para administradores)
func AddActividad(actividad models.Actividad) error {
	return config.DB.Create(&actividad).Error
}

// Actualizar una actividad existente (para administradores)
func UpdateActividad(id string, updatedActividad models.Actividad) error {
	var actividad models.Actividad
	result := config.DB.First(&actividad, id)
	if result.Error != nil {
		return result.Error
	}

	actividad.Nombre = updatedActividad.Nombre
	actividad.Descripcion = updatedActividad.Descripcion
	actividad.Fecha = updatedActividad.Fecha
	actividad.Duracion = updatedActividad.Duracion
	actividad.Profesor = updatedActividad.Profesor
	actividad.Categoria = updatedActividad.Categoria
	actividad.CupoMAX = updatedActividad.CupoMAX

	return config.DB.Save(&actividad).Error
}

// Eliminar una actividad (para administradores)
func DeleteActividad(id uint) error {
	return config.DB.Delete(&models.Actividad{}, id).Error
}
