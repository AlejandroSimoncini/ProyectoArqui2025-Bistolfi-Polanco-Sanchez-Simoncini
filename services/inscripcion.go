package services

import (
	"errors"
	"proyectoarquisoft/config"
	"proyectoarquisoft/models"
	"time"
)

// InscribirUsuario inscribe un usuario en una actividad
func InscribirUsuario(usuarioID, actividadID uint) error {
	// Verificar si la actividad existe y tiene cupo
	var actividad models.Actividad
	if err := config.DB.First(&actividad, actividadID).Error; err != nil {
		return errors.New("actividad no encontrada")
	}

	// Contar inscripciones actuales
	var count int64
	if err := config.DB.Model(&models.Inscripcion{}).Where("actividad_id = ?", actividadID).Count(&count).Error; err != nil {
		return errors.New("error al verificar cupo")
	}

	if int(count) >= actividad.CupoMAX {
		return errors.New("no hay cupo disponible")
	}

	// Verificar si el usuario ya está inscrito
	var inscripcionExistente models.Inscripcion
	result := config.DB.Where("usuario_id = ? AND actividad_id = ?", usuarioID, actividadID).First(&inscripcionExistente)
	if result.Error == nil {
		return errors.New("usuario ya inscrito en esta actividad")
	}

	// Crear la inscripción
	inscripcion := models.Inscripcion{
		UsuarioID:   usuarioID,
		ActividadID: actividadID,
		Fecha:       time.Now(),
	}

	if err := config.DB.Create(&inscripcion).Error; err != nil {
		return errors.New("error al crear inscripción")
	}

	return nil
}
