//logica del negocio:se toman decisiones, se hacen validaciones y se conecta el backend con la base de datos.

package services

import (
	"errors"
	"proyectoarquisoft/config"
	"proyectoarquisoft/models"
)

var estadosValidos = map[string]bool{ //uso de mapa ya que es más eficiente porque se busca por clave
	"activa":     true,
	"cancelada":  true,
	"finalizada": true,
}

// Obtener todos las actividades de la base de datos
func GetActividades() ([]models.Actividad, error) {
	var actividades []models.Actividad
	result := config.DB.Find(&actividades) //de gorm
	return actividades, result.Error
}

// Obtener una actividad por su ID
func GetActividadPorID(id string) (*models.Actividad, error) {
	var actividad models.Actividad //Devuelve un puntero a la estructura Actividad
	result := config.DB.First(&actividad, id)
	if result.Error != nil {
		return nil, result.Error
	}
	return &actividad, nil
}

// Agregar una nueva actividad en la base de datos
func AddActividad(actividad models.Actividad) error {
	if !estadosValidos[actividad.Estado] {
		return errors.New("estado inválido")
	}
	return config.DB.Create(&actividad).Error
}

// Actualizar una actividad existente y guarda los cambios en la bd
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
	actividad.Instructor = updatedActividad.Instructor
	actividad.Categoria = updatedActividad.Categoria
	actividad.CupoMAX = updatedActividad.CupoMAX
	if !estadosValidos[updatedActividad.Estado] {
		return errors.New("estado inválido. Debe ser 'activa', 'cancelada' o 'finalizada'")
	}

	return config.DB.Save(&actividad).Error
}

// Eliminar una actividad por id usando gorm
func DeleteActividad(id uint) error {
	result := config.DB.Delete(&models.Actividad{}, id) //usa soft delete por defecto (gorm.model) el registro no se borra del todo sino se marca como eliminado
	return result.Error
}
